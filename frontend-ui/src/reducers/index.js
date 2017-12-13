import bigInt from 'big-integer';

import { MAKE_WIDGETS, SELL_WIDGETS, HIRE_WORKER_DRONE, UPDATE, HIRE_SALES_DRONE } from '../actionTypes';

const initialState = {
  amtMoney: bigInt(0),
  numWidgets: bigInt(0),
  widgetSellPrice: bigInt(4),

  numWorkerDrones: bigInt(0),
  workerDronePrice: bigInt(10),
  workerDroneUpkeep: bigInt(1),
  workerDroneProduction: bigInt(1),

  numSalesDrones: bigInt(0),
  salesDronePrice: bigInt(25),
  salesDroneUpkeep: bigInt(2),
  salesDroneProduction: bigInt(1),
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

function tryUpkeepTicks(amtMoney, numDrones, eachUpkeep) {
  const numSuccesses = bigInt.min(numDrones, amtMoney.divide(eachUpkeep));
  const numFailures = numDrones.minus(numSuccesses);
  const upkeepPaid = numSuccesses.times(eachUpkeep);

  return { numSuccesses, numFailures, upkeepPaid };
}

// TODO: the 'num ticks' functionality is totally unused/ignored for now
function doUpdate(prevState, action) {
  let newWidgets = prevState.numWidgets;
  let newMoney = prevState.amtMoney;

  // TODO: messaging when drones quit!
  const doWorkerUpkeep = tryUpkeepTicks(newMoney, prevState.numWorkerDrones, prevState.workerDroneUpkeep);

  const newWorkerDrones = doWorkerUpkeep.numSuccesses;
  newMoney = newMoney.minus(doWorkerUpkeep.upkeepPaid);
  newWidgets = newWidgets.plus(doWorkerUpkeep.numSuccesses.times(prevState.workerDroneProduction));

  // TODO: messaging when drones quit!
  const doSalesUpkeep = tryUpkeepTicks(newMoney, prevState.numSalesDrones, prevState.salesDroneUpkeep);

  const newSalesDrones = doSalesUpkeep.numSuccesses;
  newMoney = newMoney.minus(doSalesUpkeep.upkeepPaid);
  newMoney = newMoney.plus(doSalesUpkeep.numSuccesses.times(prevState.salesDroneProduction).times(prevState.widgetSellPrice));
  newWidgets = newWidgets.minus(doSalesUpkeep.numSuccesses.times(prevState.salesDroneProduction));

  return {
    ...prevState,
    numWidgets: newWidgets,
    amtMoney: newMoney,

    numWorkerDrones: newWorkerDrones,
    numSalesDrones: newSalesDrones,
  }
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
