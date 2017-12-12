import bigInt from 'big-integer';

import { MAKE_WIDGETS, SELL_WIDGETS } from '../actionTypes';

export function makeWidgetsAction(numWidgets=bigInt(1)) {
  return { type: MAKE_WIDGETS, numWidgets: numWidgets };
}

export function sellWidgetsAction(numWidgets=bigInt(1)) {
  return { type: SELL_WIDGETS, numWidgets: numWidgets };
}