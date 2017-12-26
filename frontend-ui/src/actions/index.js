// @flow

import { BigInteger } from "../libs/big-int-wrapper";

export type UpdateAction = {
  type: "UPDATE",
  numTicks: BigInteger
};

export type BuyMaterialsAction = {
  type: "BUY_MATERIALS",
  numMaterials: BigInteger
};

export type MakeWidgetsAction = {
  type: "MAKE_WIDGETS",
  numWidgets: BigInteger
};

export type SellWidgetsAction = {
  type: "SELL_WIDGETS",
  numWidgets: BigInteger
};

export type HireBuyerDronesAction = {
  type: "HIRE_BUYER_DRONES",
  numDrones: BigInteger
};

export type HireWorkerDronesAction = {
  type: "HIRE_WORKER_DRONES",
  numDrones: BigInteger
};

export type HireSalesDronesAction = {
  type: "HIRE_SALES_DRONES",
  numDrones: BigInteger
};

export type EternalLogAction = {
  type: "ADD_ETERNAL_LOG",
  message: string
};

export type ExpiringLogAction = {
  type: "ADD_EXPIRING_LOG",
  message: string,
  duration: BigInteger
};

export type Action =
  | UpdateAction
  | BuyMaterialsAction
  | MakeWidgetsAction
  | SellWidgetsAction
  | HireBuyerDronesAction
  | HireWorkerDronesAction
  | HireSalesDronesAction
  | EternalLogAction
  | ExpiringLogAction;

export function buyMaterialsAction(
  numMaterials: BigInteger = new BigInteger(1)
): BuyMaterialsAction {
  return {
    type: "BUY_MATERIALS",
    numMaterials: numMaterials
  };
}

export function makeWidgetsAction(
  numWidgets: BigInteger = new BigInteger(1)
): MakeWidgetsAction {
  return {
    type: "MAKE_WIDGETS",
    numWidgets: numWidgets
  };
}

export function sellWidgetsAction(
  numWidgets: BigInteger = new BigInteger(1)
): SellWidgetsAction {
  return {
    type: "SELL_WIDGETS",
    numWidgets: numWidgets
  };
}

export function hireBuyerDronesAction(
  numBuyerDrones: BigInteger = new BigInteger(1)
): HireBuyerDronesAction {
  return {
    type: "HIRE_BUYER_DRONES",
    numDrones: numBuyerDrones
  };
}

export function hireWorkerDronesAction(
  numWorkerDrones: BigInteger = new BigInteger(1)
): HireWorkerDronesAction {
  return {
    type: "HIRE_WORKER_DRONES",
    numDrones: numWorkerDrones
  };
}

export function hireSalesDronesAction(
  numSalesDrones: BigInteger = new BigInteger(1)
): HireSalesDronesAction {
  return {
    type: "HIRE_SALES_DRONES",
    numDrones: numSalesDrones
  };
}

export function expiringLogAction(
  message: string,
  duration: BigInteger
): ExpiringLogAction {
  return {
    type: "ADD_EXPIRING_LOG",
    message: message,
    duration: duration
  };
}

export function eternalLogAction(message: string): EternalLogAction {
  return {
    type: "ADD_ETERNAL_LOG",
    message: message
  };
}

export function updateAction(
  numTicks: BigInteger = new BigInteger(1)
): UpdateAction {
  return { type: "UPDATE", numTicks: numTicks };
}
