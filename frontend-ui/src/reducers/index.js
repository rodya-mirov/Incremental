import bigInt from 'big-integer';

import { MAKE_WIDGETS, SELL_WIDGETS } from '../actionTypes';

const initialState = {
  amtMoney: bigInt(0),
  numWidgets: bigInt(0),
  widgetSellPrice: bigInt(2),
};

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

function mainReducer(prevState = initialState, action) {
  switch (action.type) {
    case MAKE_WIDGETS:
      return makeWidgets(prevState, action);
    case SELL_WIDGETS:
      return sellWidgets(prevState, action);
    default:
      return prevState;
  }
}

export { initialState };
export default mainReducer;
