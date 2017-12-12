import bigInt from 'big-integer';

import { MAKE_WIDGETS, SELL_WIDGETS, HIRE_WORKER_DRONE, UPDATE } from '../actionTypes';

export function makeWidgetsAction(numWidgets=bigInt(1)) {
  return { type: MAKE_WIDGETS, numWidgets: numWidgets };
}

export function sellWidgetsAction(numWidgets=bigInt(1)) {
  return { type: SELL_WIDGETS, numWidgets: numWidgets };
}

export function hireWorkerDronesAction(numWorkerDrones=bigInt(1)) {
  return { type: HIRE_WORKER_DRONE, numWorkerDrones: numWorkerDrones };
}

export function updateAction(numTicks=bigInt(1)) {
  return { type: UPDATE, numTicks: numTicks };
}
