import bigInt from 'big-integer';

import { MAKE_WIDGETS, SELL_WIDGETS, HIRE_WORKER_DRONE, UPDATE, HIRE_SALES_DRONE, LOG } from '../actionTypes';

import { eternalLog, expiringLog } from '../logs';

export function makeWidgetsAction(numWidgets=bigInt(1)) {
  return { type: MAKE_WIDGETS, numWidgets: numWidgets };
}

export function sellWidgetsAction(numWidgets=bigInt(1)) {
  return { type: SELL_WIDGETS, numWidgets: numWidgets };
}

export function hireWorkerDronesAction(numWorkerDrones=bigInt(1)) {
  return { type: HIRE_WORKER_DRONE, numWorkerDrones: numWorkerDrones };
}

export function hireSalesDronesAction(numSalesDrones=bigInt(1)) {
  return { type: HIRE_SALES_DRONE, numSalesDrones: numSalesDrones };
}

export function updateAction(numTicks=bigInt(1)) {
  return { type: UPDATE, numTicks: numTicks };
}

export function expiringLogAction(message, duration) {
  return { type: LOG, log: expiringLog(message, duration) };
}

export function eternalLogAction(message, duration) {
  return { type: LOG, log: eternalLog(message, duration) };
}
