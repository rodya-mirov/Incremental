// @flow

import bigInt from "big-integer";

export type UpdateAction = {
  type: "UPDATE",
  numTicks: bigInt
};

export type MakeWidgetsAction = {
  type: "MAKE_WIDGETS",
  numWidgets: bigInt
};

export type SellWidgetsAction = {
  type: "SELL_WIDGETS",
  numWidgets: bigInt
};

export type HireWorkerDronesAction = {
  type: "HIRE_WORKER_DRONES",
  numDrones: bigInt
};

export type HireSalesDronesAction = {
  type: "HIRE_SALES_DRONES",
  numDrones: bigInt
};

export type EternalLogAction = {
  type: "ADD_ETERNAL_LOG",
  message: string
};

export type ExpiringLogAction = {
  type: "ADD_EXPIRING_LOG",
  message: string,
  duration: bigInt
};

export type Action =
  | UpdateAction
  | MakeWidgetsAction
  | SellWidgetsAction
  | HireWorkerDronesAction
  | HireSalesDronesAction
  | EternalLogAction
  | ExpiringLogAction;

export function makeWidgetsAction(
  numWidgets: bigInt = bigInt(1)
): MakeWidgetsAction {
  return {
    type: "MAKE_WIDGETS",
    numWidgets: numWidgets
  };
}

export function sellWidgetsAction(
  numWidgets: bigInt = bigInt(1)
): SellWidgetsAction {
  return {
    type: "SELL_WIDGETS",
    numWidgets: numWidgets
  };
}

export function hireWorkerDronesAction(
  numWorkerDrones: bigInt = bigInt(1)
): HireWorkerDronesAction {
  return {
    type: "HIRE_WORKER_DRONES",
    numDrones: numWorkerDrones
  };
}

export function hireSalesDronesAction(
  numSalesDrones: bigInt = bigInt(1)
): HireSalesDronesAction {
  return {
    type: "HIRE_SALES_DRONES",
    numDrones: numSalesDrones
  };
}

export function expiringLogAction(
  message: string,
  duration: bigInt
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

export function updateAction(numTicks: bigInt): UpdateAction {
  return { type: "UPDATE", numTicks: numTicks };
}
