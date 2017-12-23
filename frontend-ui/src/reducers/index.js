// @flow

import bigInt from "big-integer";

import {
  MAKE_WIDGETS,
  SELL_WIDGETS,
  HIRE_WORKER_DRONE,
  UPDATE,
  HIRE_SALES_DRONE,
  LOG
} from "../actionTypes";
import { ExpiringLog } from "../logs";
import { initialState } from "../state";
import type { State } from "../state";

function makeWidgets(prevState, action) {
  const numWidgets = prevState.numWidgets.plus(action.numWidgets);
  return {
    ...prevState,
    numWidgets: numWidgets
  };
}

function sellWidgets(prevState, action) {
  const toSell = bigInt.min(action.numWidgets, prevState.numWidgets);
  return {
    ...prevState,
    numWidgets: prevState.numWidgets.minus(toSell),
    amtMoney: prevState.amtMoney.plus(toSell.times(prevState.widgetSellPrice))
  };
}

function buyWorkerDrone(prevState, action) {
  const toHire = bigInt.min(
    action.numWorkerDrones,
    prevState.amtMoney.divide(prevState.workerDronePrice)
  );
  return {
    ...prevState,
    numWorkerDrones: prevState.numWorkerDrones.plus(toHire),
    amtMoney: prevState.amtMoney.minus(toHire.times(prevState.workerDronePrice))
  };
}

function buySalesDrone(prevState, action) {
  const toHire = bigInt.min(
    action.numSalesDrones,
    prevState.amtMoney.divide(prevState.salesDronePrice)
  );
  return {
    ...prevState,
    numSalesDrones: prevState.numSalesDrones.plus(toHire),
    amtMoney: prevState.amtMoney.minus(toHire.times(prevState.salesDronePrice))
  };
}

function addLog(prevState, action) {
  const newLogs = prevState.logs.map(x => x);
  newLogs.push(action.log);

  return {
    ...prevState,
    logs: newLogs
  };
}

function tryUpkeepTicks(amtMoney, numDrones, eachUpkeep) {
  const numSuccesses = bigInt.min(numDrones, amtMoney.divide(eachUpkeep));
  const numFailures = numDrones.minus(numSuccesses);
  const upkeepPaid = numSuccesses.times(eachUpkeep);

  return { numSuccesses, numFailures, upkeepPaid };
}

// TODO: the 'num ticks' functionality is totally unused/ignored for now
function doUpdate(prevState, action) {
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
    doSalesUpkeep.numSuccesses,
    prevState.numWidgets.divide(prevState.salesDroneProduction)
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

function mainReducer(prevState: State = initialState, action): State {
  switch (action.type) {
    // user actions ...
    case MAKE_WIDGETS:
      return makeWidgets(prevState, action);
    case SELL_WIDGETS:
      return sellWidgets(prevState, action);
    case HIRE_WORKER_DRONE:
      return buyWorkerDrone(prevState, action);
    case HIRE_SALES_DRONE:
      return buySalesDrone(prevState, action);

    // time-based events ...
    case UPDATE:
      return doUpdate(prevState, action);

    // system-generated events ...
    case LOG:
      return addLog(prevState, action);

    // error handling
    default:
      console.error(
        "Unrecognized action type: " +
          action.type +
          "; action was '" +
          JSON.stringify(action) +
          "'"
      );
      return prevState;
  }
}

export { initialState };
export default mainReducer;
