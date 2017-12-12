import bigInt from 'big-integer';

import { MAKE_WIDGETS, SELL_WIDGETS, HIRE_WORKER_DRONE, UPDATE, HIRE_SALES_DRONE } from '../actionTypes';

const initialState = {
  amtMoney: bigInt(0),
  numWidgets: bigInt(0),
  widgetSellPrice: bigInt(3),

  numWorkerDrones: bigInt(0),
  workerDronePrice: bigInt(10),
  workerDroneUpkeep: bigInt(1),

  numSalesDrones: bigInt(0),
  salesDronePrice: bigInt(25),
  salesDroneUpkeep: bigInt(1),
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

function buySalesDrone(prevState, action) {
  const toHire = bigInt.min(action.numSalesDrones, prevState.amtMoney.divide(prevState.salesDronePrice));
  return {
    ...prevState,
    numSalesDrones: prevState.numSalesDrones.plus(toHire),
    amtMoney: prevState.amtMoney.minus(toHire.times(prevState.salesDronePrice))
  }
}

function calculateUpkeep(prevState) {
  const workersUpkeep = prevState.numWorkerDrones.times(prevState.workerDroneUpkeep);
  const salesUpkeep = prevState.numSalesDrones.times(prevState.salesDroneUpkeep);

  return workersUpkeep.plus(salesUpkeep);
}

function doUpdate(prevState, action) {
  const toMake = prevState.numWorkerDrones.times(action.numTicks);
  const toSell = bigInt.min(prevState.numWidgets, prevState.numSalesDrones.times(action.numTicks));

  const newWidgets = prevState.numWidgets.plus(toMake).minus(toSell);
  let newMoney = prevState.amtMoney.plus(toSell.times(prevState.widgetSellPrice));

  const upkeep = calculateUpkeep(prevState);
  newMoney = newMoney.minus(upkeep);  

  return {
    ...prevState,
    numWidgets: newWidgets,
    amtMoney: newMoney
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
    case HIRE_SALES_DRONE:
      return buySalesDrone(prevState, action);
    case UPDATE:
      return doUpdate(prevState, action);
    default:
      console.error("Unrecognized action type: " + action.type + "; action was '" + JSON.stringify(action) + "'");
      return prevState;
  }
}

export { initialState };
export default mainReducer;
