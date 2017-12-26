// @flow

import { initialState } from "../state";
import type { State } from "../state";
import type {
  Action,
  BuyMaterialsAction,
  MakeWidgetsAction,
  SellWidgetsAction,
  HireBuyerDronesAction,
  HireWorkerDronesAction,
  HireSalesDronesAction,
  ExpiringLogAction,
  EternalLogAction
} from "../actions";
import { ExpiringLog, EternalLog } from "../logs";

import * as reducers from "./general";
import handleUpdateAction from "./update";

function handleBuyMaterialsAction(prevState, action: BuyMaterialsAction) {
  return reducers.buyMaterials(prevState, action.numMaterials);
}

function handleMakeWidgetsAction(prevState, action: MakeWidgetsAction) {
  return reducers.makeWidgets(prevState, action.numWidgets);
}

function handleSellWidgetsAction(prevState, action: SellWidgetsAction) {
  return reducers.sellWidgets(prevState, action.numWidgets);
}

function handleHireBuyerDronesAction(prevState, action: HireBuyerDronesAction) {
  return reducers.hireBuyerDrones(prevState, action.numDrones);
}

function handleHireWorkerDronesAction(
  prevState,
  action: HireWorkerDronesAction
) {
  return reducers.hireWorkerDrones(prevState, action.numDrones);
}

function handleHireSalesDronesAction(prevState, action: HireSalesDronesAction) {
  return reducers.hireSalesDrones(prevState, action.numDrones);
}

function handleExpiringLogAction(prevState, action: ExpiringLogAction) {
  return reducers.addLog(
    prevState,
    new ExpiringLog(action.message, action.duration)
  );
}

function handleEternalLogAction(prevState, action: EternalLogAction) {
  return reducers.addLog(prevState, new EternalLog(action.message));
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
