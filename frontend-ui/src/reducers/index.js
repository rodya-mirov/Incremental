// @flow

import bigInt from "big-integer";

import { initialState } from "../state";
import type { State } from "../state";
import type {
  Action,
  UpdateAction,
  MakeWidgetsAction,
  SellWidgetsAction,
  HireWorkerDronesAction,
  HireSalesDronesAction,
  ExpiringLogAction,
  EternalLogAction
} from "../actions";
import { Log, ExpiringLog, EternalLog } from "../logs";

function handleMakeWidgetsAction(prevState, action: MakeWidgetsAction) {
  const newNumWidgets = prevState.numWidgets.plus(action.numWidgets);

  return {
    ...prevState,
    numWidgets: newNumWidgets
  };
}

function handleSellWidgetsAction(prevState, action: SellWidgetsAction) {
  const toSell = bigInt.min(action.numWidgets, prevState.numWidgets);
  return {
    ...prevState,
    numWidgets: prevState.numWidgets.minus(toSell),
    amtMoney: prevState.amtMoney.plus(toSell.times(prevState.widgetSellPrice))
  };
}

function handleHireWorkerDronesAction(
  prevState,
  action: HireWorkerDronesAction
) {
  const toHire = bigInt.min(
    action.numDrones,
    prevState.amtMoney.divide(prevState.workerDronePrice)
  );

  return {
    ...prevState,
    numWorkerDrones: prevState.numWorkerDrones.plus(toHire),
    amtMoney: prevState.amtMoney.minus(toHire.times(prevState.workerDronePrice))
  };
}

function handleHireSalesDronesAction(prevState, action: HireSalesDronesAction) {
  const toHire = bigInt.min(
    action.numDrones,
    prevState.amtMoney.divide(prevState.salesDronePrice)
  );

  const spentMoney = toHire.times(prevState.salesDronePrice);

  return {
    ...prevState,
    numSalesDrones: prevState.numSalesDrones.plus(toHire),
    amtMoney: prevState.amtMoney.minus(spentMoney)
  };
}

function addLog(prevState, log: Log) {
  const newLogs = prevState.logs.map(x => x);
  newLogs.push(log);

  return { ...prevState, logs: newLogs };
}

function handleExpiringLogAction(prevState, action: ExpiringLogAction) {
  return addLog(prevState, new ExpiringLog(action.message, action.duration));
}

function handleEternalLogAction(prevState, action: EternalLogAction) {
  return addLog(prevState, new EternalLog(action.message));
}

// TODO: action.numTicks is completely ignored
function handleUpdateAction(prevState, action: UpdateAction) {
  // helper function to manage the number of drones we could successfully pay upkeep for
  function tryUpkeepTicks(amtMoney, numDrones, eachUpkeep) {
    const numSuccesses = bigInt.min(numDrones, amtMoney.divide(eachUpkeep));
    const numFailures = numDrones.minus(numSuccesses);
    const upkeepPaid = numSuccesses.times(eachUpkeep);

    return { numSuccesses, numFailures, upkeepPaid };
  }

  const logs = prevState.logs
    .map(log => {
      let newLog = log.copy();
      newLog.tick();
      return newLog;
    })
    .filter(log => !log.isFinished())
    .sort((a, b) => a.getPriority() - b.getPriority());

  let newWidgets = prevState.numWidgets;
  let newMoney = prevState.amtMoney;

  // Worker drone upkeep
  const doWorkerUpkeep = tryUpkeepTicks(
    newMoney,
    prevState.numWorkerDrones,
    prevState.workerDroneUpkeep
  );

  const newWorkerDrones = doWorkerUpkeep.numSuccesses;
  newMoney = newMoney.minus(doWorkerUpkeep.upkeepPaid);
  newWidgets = newWidgets.plus(
    doWorkerUpkeep.numSuccesses.times(prevState.workerDroneProduction)
  );

  if (doWorkerUpkeep.numFailures > 0) {
    logs.push(
      new ExpiringLog(
        "Due to failed upkeep, had to fire " +
          doWorkerUpkeep.numFailures.toString() +
          " worker drones!",
        100
      )
    );
  }

  // Sales drone upkeep
  const doSalesUpkeep = tryUpkeepTicks(
    newMoney,
    prevState.numSalesDrones,
    prevState.salesDroneUpkeep
  );

  const newSalesDrones = doSalesUpkeep.numSuccesses;
  const actualSales = bigInt.min(
    doSalesUpkeep.numSuccesses.times(prevState.salesDroneProduction),
    prevState.numWidgets
  );
  // TODO BUG: can sell more widgets than actually exist
  newMoney = newMoney.minus(doSalesUpkeep.upkeepPaid);
  newMoney = newMoney.plus(
    actualSales
      .times(prevState.salesDroneProduction)
      .times(prevState.widgetSellPrice)
  );
  newWidgets = newWidgets.minus(
    actualSales.times(prevState.salesDroneProduction)
  );

  if (doSalesUpkeep.numFailures > 0) {
    logs.push(
      new ExpiringLog(
        "Due to failed upkeep, had to fire " +
          doSalesUpkeep.numFailures.toString() +
          " sales drones!",
        100
      )
    );
  }

  return {
    ...prevState,
    logs: logs,

    numWidgets: newWidgets,
    amtMoney: newMoney,

    numWorkerDrones: newWorkerDrones,
    numSalesDrones: newSalesDrones
  };
}

function mainReducer(prevState: State = initialState, action: Action): State {
  switch (action.type) {
    // TODO: see if flow will handle this error (otherwise do put everything in here)
    case "UPDATE":
      return handleUpdateAction(prevState, action);

    case "MAKE_WIDGETS":
      return handleMakeWidgetsAction(prevState, action);

    case "SELL_WIDGETS":
      return handleSellWidgetsAction(prevState, action);

    case "HIRE_WORKER_DRONES":
      return handleHireWorkerDronesAction(prevState, action);

    case "HIRE_SALES_DRONES":
      return handleHireSalesDronesAction(prevState, action);

    case "ADD_ETERNAL_LOG":
      return handleEternalLogAction(prevState, action);

    case "ADD_EXPIRING_LOG":
      return handleExpiringLogAction(prevState, action);

    default:
      console.error("Unsupported action type", action.type);
      return prevState;
  }
}

export default mainReducer;
