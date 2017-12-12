import bigInt from 'big-integer';

import { MAKE_WIDGETS, SELL_WIDGETS, HIRE_WORKER_DRONE, UPDATE } from '../actionTypes';

const initialState = {
  amtMoney: bigInt(0),
  numWidgets: bigInt(0),
  widgetSellPrice: bigInt(2),

  numWorkerDrones: bigInt(0),
  workerDronePrice: bigInt(10),
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

function buyWorkerDrone(prevState, action) {
  const toHire = bigInt.min(action.numWorkerDrones, prevState.amtMoney.divide(prevState.workerDronePrice));
  return {
    ...prevState,
    numWorkerDrones: prevState.numWorkerDrones.plus(toHire),
    amtMoney: prevState.amtMoney.minus(toHire.times(prevState.workerDronePrice))
  }
}

function doUpdate(prevState, action) {
  const toMake = prevState.numWorkerDrones.times(action.numTicks);

  return {
    ...prevState,
    numWidgets: prevState.numWidgets.plus(toMake)
  };
}

function mainReducer(prevState = initialState, action) {
  switch (action.type) {
    case MAKE_WIDGETS:
      return makeWidgets(prevState, action);
    case SELL_WIDGETS:
      return sellWidgets(prevState, action);
    case HIRE_WORKER_DRONE:
      return buyWorkerDrone(prevState, action);
    case UPDATE:
      return doUpdate(prevState, action);
    default:
      return prevState;
  }
}

export { initialState };
export default mainReducer;
