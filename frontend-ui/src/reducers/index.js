// @flow

import bigInt from "big-integer";
import type { BigInteger } from "big-integer";

import { initialState } from "../state";
import type { State } from "../state";
import type {
  Action,
  UpdateAction,
  BuyMaterialsAction,
  MakeWidgetsAction,
  SellWidgetsAction,
  HireBuyerDronesAction,
  HireWorkerDronesAction,
  HireSalesDronesAction,
  ExpiringLogAction,
  EternalLogAction
} from "../actions";
import { Log, ExpiringLog, EternalLog } from "../logs";

import handleUpdateAction from "./general";

type TransactionResult = {
  successes: BigInteger,
  failures: BigInteger,
  inputConsumed: BigInteger,
  outputProduced: BigInteger
};

function transactionHelper(
  numAttempts: BigInteger,
  availableResources: BigInteger,
  transactionCost: BigInteger | number,
  transactionBenefit: BigInteger | number
): TransactionResult {
  let successes = bigInt.min(
    numAttempts,
    availableResources.divide(transactionCost) // intentionally: no fractional production
  );
  let failures = numAttempts.minus(successes);
  let inputConsumed = successes.times(transactionCost);
  let outputProduced = successes.times(transactionBenefit);

  return {
    successes,
    failures,
    inputConsumed,
    outputProduced
  };
}

function buyMaterials(prevState: State, numMaterials: BigInteger): State {
  let result = transactionHelper(
    numMaterials,
    prevState.amtMoney,
    prevState.materialBuyPrice,
    1
  );

  return {
    ...prevState,
    amtMoney: prevState.amtMoney.minus(result.inputConsumed),
    numMaterials: prevState.numMaterials.plus(result.outputProduced)
  };
}

function makeWidgets(prevState: State, numWidgets: BigInteger): State {
  let result = transactionHelper(
    numWidgets,
    prevState.numMaterials,
    prevState.materialsPerWidget,
    1
  );

  return {
    ...prevState,
    numWidgets: prevState.numWidgets.plus(result.outputProduced),
    numMaterials: prevState.numMaterials.minus(result.inputConsumed)
  };
}

function sellWidgets(prevState: State, numWidgets: BigInteger): State {
  let result = transactionHelper(
    numWidgets,
    prevState.numWidgets,
    1,
    prevState.widgetSellPrice
  );

  return {
    ...prevState,
    numWidgets: prevState.numWidgets.minus(result.inputConsumed),
    amtMoney: prevState.amtMoney.plus(result.outputProduced)
  };
}

function hireBuyerDrones(prevState: State, numDrones: BigInteger): State {
  let result = transactionHelper(
    numDrones,
    prevState.amtMoney,
    prevState.buyerDronePrice,
    1
  );

  return {
    ...prevState,
    amtMoney: prevState.amtMoney.minus(result.inputConsumed),
    numBuyerDrones: prevState.numBuyerDrones.plus(result.outputProduced)
  };
}

function hireWorkerDrones(prevState: State, numDrones: BigInteger): State {
  let result = transactionHelper(
    numDrones,
    prevState.amtMoney,
    prevState.workerDronePrice,
    1
  );

  return {
    ...prevState,
    amtMoney: prevState.amtMoney.minus(result.inputConsumed),
    numWorkerDrones: prevState.numWorkerDrones.plus(result.outputProduced)
  };
}

function hireSalesDrones(prevState: State, numDrones: BigInteger): State {
  let result = transactionHelper(
    numDrones,
    prevState.amtMoney,
    prevState.salesDronePrice,
    1
  );

  return {
    ...prevState,
    amtMoney: prevState.amtMoney.minus(result.inputConsumed),
    numSalesDrones: prevState.numSalesDrones.plus(result.outputProduced)
  };
}

function addLog(prevState, log: Log) {
  const newLogs = prevState.logs.map(x => x);
  newLogs.push(log);

  return { ...prevState, logs: newLogs };
}

function handleBuyMaterialsAction(prevState, action: BuyMaterialsAction) {
  return buyMaterials(prevState, action.numMaterials);
}

function handleMakeWidgetsAction(prevState, action: MakeWidgetsAction) {
  return makeWidgets(prevState, action.numWidgets);
}

function handleSellWidgetsAction(prevState, action: SellWidgetsAction) {
  return sellWidgets(prevState, action.numWidgets);
}

function handleHireBuyerDronesAction(prevState, action: HireBuyerDronesAction) {
  return hireBuyerDrones(prevState, action.numDrones);
}

function handleHireWorkerDronesAction(
  prevState,
  action: HireWorkerDronesAction
) {
  return hireWorkerDrones(prevState, action.numDrones);
}

function handleHireSalesDronesAction(prevState, action: HireSalesDronesAction) {
  return hireSalesDrones(prevState, action.numDrones);
}

function handleExpiringLogAction(prevState, action: ExpiringLogAction) {
  return addLog(prevState, new ExpiringLog(action.message, action.duration));
}

function handleEternalLogAction(prevState, action: EternalLogAction) {
  return addLog(prevState, new EternalLog(action.message));
}

function mainReducer(prevState: State = initialState, action: Action): State {
  switch (action.type) {
    case "UPDATE":
      return handleUpdateAction(prevState, action);

    case "BUY_MATERIALS":
      return handleBuyMaterialsAction(prevState, action);

    case "MAKE_WIDGETS":
      return handleMakeWidgetsAction(prevState, action);

    case "SELL_WIDGETS":
      return handleSellWidgetsAction(prevState, action);

    case "HIRE_WORKER_DRONES":
      return handleHireWorkerDronesAction(prevState, action);

    case "HIRE_BUYER_DRONES":
      return handleHireBuyerDronesAction(prevState, action);

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
