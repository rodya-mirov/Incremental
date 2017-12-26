// @flow

import bigInt from "big-integer";
import type { BigInteger } from "big-integer";

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
  numMaterials: BigInteger = bigInt(1)
): BuyMaterialsAction {
  return {
    type: "BUY_MATERIALS",
    numMaterials: numMaterials
  };
}

export function makeWidgetsAction(
  numWidgets: BigInteger = bigInt(1)
): MakeWidgetsAction {
  return {
    type: "MAKE_WIDGETS",
    numWidgets: numWidgets
  };
}

export function sellWidgetsAction(
  numWidgets: BigInteger = bigInt(1)
): SellWidgetsAction {
  return {
    type: "SELL_WIDGETS",
    numWidgets: numWidgets
  };
}

export function hireBuyerDronesAction(
  numBuyerDrones: BigInteger = bigInt(1)
): HireBuyerDronesAction {
  return {
    type: "HIRE_BUYER_DRONES",
    numDrones: numBuyerDrones
  };
}

export function hireWorkerDronesAction(
  numWorkerDrones: BigInteger = bigInt(1)
): HireWorkerDronesAction {
  return {
    type: "HIRE_WORKER_DRONES",
    numDrones: numWorkerDrones
  };
}

export function hireSalesDronesAction(
  numSalesDrones: BigInteger = bigInt(1)
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

export function updateAction(numTicks: BigInteger = bigInt(1)): UpdateAction {
  return { type: "UPDATE", numTicks: numTicks };
}
