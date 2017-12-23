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

import { EternalLog, ExpiringLog } from "../logs";

export function makeWidgetsAction(numWidgets: bigInt = bigInt(1)) {
  return { type: MAKE_WIDGETS, numWidgets: numWidgets };
}

export function sellWidgetsAction(numWidgets: bigInt = bigInt(1)) {
  return { type: SELL_WIDGETS, numWidgets: numWidgets };
}

export function hireWorkerDronesAction(numWorkerDrones: bigInt = bigInt(1)) {
  return { type: HIRE_WORKER_DRONE, numWorkerDrones: numWorkerDrones };
}

export function hireSalesDronesAction(numSalesDrones: bigInt = bigInt(1)) {
  return { type: HIRE_SALES_DRONE, numSalesDrones: numSalesDrones };
}

export function updateAction(numTicks: bigInt = bigInt(1)) {
  return { type: UPDATE, numTicks: numTicks };
}

export function expiringLogAction(message: string, duration: bigInt) {
  return { type: LOG, log: new ExpiringLog(message, duration) };
}

export function eternalLogAction(message: string) {
  return { type: LOG, log: new EternalLog(message) };
}
