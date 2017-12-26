//@flow
import { BigInteger } from "../libs/big-int-wrapper";

import type { UpdateAction } from "../actions";
import type { State, UpkeepState } from "../state";
import { ExpiringLog } from "../logs";

import {
  TICKS_PER_SECOND,
  TICKS_PER_UPKEEP,
  UNITS_PER_BUY
} from "../constants";

import * as reducers from "./general";

function payBuyerDroneUpkeep(prevState: State): State {
  let result = reducers.transactionHelper(
    prevState.numBuyerDrones,
    prevState.amtMoney,
    prevState.buyerDroneUpkeep,
    0
  );

  if (result.failures.compare(0) > 0) {
    let message =
      "Lost " +
      result.failures.toString() +
      " buyer drones because their salary could not be paid!";
    prevState = reducers.addLog(
      prevState,
      new ExpiringLog(message, new BigInteger(100))
    );
  }

  return {
    ...prevState,
    amtMoney: prevState.amtMoney.minus(result.inputConsumed),
    numBuyerDrones: result.successes
  };
}

function payWorkerDroneUpkeep(prevState: State): State {
  let result = reducers.transactionHelper(
    prevState.numWorkerDrones,
    prevState.amtMoney,
    prevState.workerDroneUpkeep,
    0
  );

  if (result.failures.compare(0) > 0) {
    let message =
      "Lost " +
      result.failures.toString() +
      " worker drones because their salary could not be paid!";
    prevState = reducers.addLog(
      prevState,
      new ExpiringLog(message, new BigInteger(100))
    );
  }

  return {
    ...prevState,
    amtMoney: prevState.amtMoney.minus(result.inputConsumed),
    numWorkerDrones: result.successes
  };
}

function paySalesDroneUpkeep(prevState: State): State {
  let result = reducers.transactionHelper(
    prevState.numSalesDrones,
    prevState.amtMoney,
    prevState.salesDroneUpkeep,
    0
  );

  if (result.failures.compare(0) > 0) {
    let message =
      "Lost " +
      result.failures.toString() +
      " sales drones because their salary could not be paid!";
    prevState = reducers.addLog(
      prevState,
      new ExpiringLog(message, new BigInteger(100))
    );
  }

  return {
    ...prevState,
    amtMoney: prevState.amtMoney.minus(result.inputConsumed),
    numSalesDrones: result.successes
  };
}

// Decrement the upkeep state by one, progressing toward _doom_
function tickUpkeepState(prevState: State): State {
  let newUpkeepState: UpkeepState = {
    ...prevState.upkeepState,
    ticksUntilPayday: prevState.upkeepState.ticksUntilPayday.minus(1)
  };
  prevState = {
    ...prevState,
    upkeepState: newUpkeepState
  };
  prevState = addUpkeepWarning(prevState);
  return prevState;
}

function computeUpkeepDue(upkeepState: UpkeepState): BigInteger {
  return upkeepState.numBuyerDrones
    .times(upkeepState.buyerDroneUpkeep)
    .plus(upkeepState.numWorkerDrones.times(upkeepState.workerDroneUpkeep))
    .plus(upkeepState.numSalesDrones.times(upkeepState.salesDroneUpkeep));
}

function addUpkeepWarning(prevState: State): State {
  let ticksRemaining = prevState.upkeepState.ticksUntilPayday;
  let upkeepDue = computeUpkeepDue(prevState.upkeepState);
  let message =
    "Upkeep of $" +
    upkeepDue.toString() +
    " due in " +
    ticksRemaining.divide(TICKS_PER_SECOND).toString() +
    " seconds!";

  return reducers.addLog(
    prevState,
    new ExpiringLog(message, new BigInteger(1))
  );
}

function resetUpkeepState(prevState: State): State {
  let newUpkeepState: UpkeepState = {
    ticksUntilPayday: new BigInteger(TICKS_PER_UPKEEP),

    numBuyerDrones: prevState.numBuyerDrones,
    buyerDroneUpkeep: prevState.buyerDroneUpkeep,

    numWorkerDrones: prevState.numWorkerDrones,
    workerDroneUpkeep: prevState.workerDroneUpkeep,

    numSalesDrones: prevState.numSalesDrones,
    salesDroneUpkeep: prevState.salesDroneUpkeep
  };

  return { ...prevState, upkeepState: newUpkeepState };
}

function doAllProgress(prevState: State): State {
  let buyProgressResult = prevState.buyProgress
    .plus(prevState.buyerDroneProduction.times(prevState.numBuyerDrones))
    .divmod(UNITS_PER_BUY);
  let makeProgressResult = prevState.makeProgress
    .plus(prevState.workerDroneProduction.times(prevState.numWorkerDrones))
    .divmod(UNITS_PER_BUY);
  let sellProgressResult = prevState.sellProgress
    .plus(prevState.salesDroneProduction.times(prevState.numSalesDrones))
    .divmod(UNITS_PER_BUY);

  prevState = reducers.buyMaterials(prevState, buyProgressResult.quotient);
  prevState = reducers.makeWidgets(prevState, makeProgressResult.quotient);
  prevState = reducers.sellWidgets(prevState, sellProgressResult.quotient);

  return {
    ...prevState,
    buyProgress: buyProgressResult.remainder,
    makeProgress: makeProgressResult.remainder,
    sellProgress: sellProgressResult.remainder
  };
}

function payAllUpkeep(prevState: State): State {
  let prevUpkeepState = prevState.upkeepState;

  if (prevUpkeepState.ticksUntilPayday.compare(0) <= 0) {
    console.log(
      "Upkeep due! Ticks: " + prevUpkeepState.ticksUntilPayday.toString()
    );
    prevState = payBuyerDroneUpkeep(prevState);
    prevState = payWorkerDroneUpkeep(prevState);
    prevState = paySalesDroneUpkeep(prevState);
    prevState = resetUpkeepState(prevState);
  } else {
    prevState = tickUpkeepState(prevState);
  }

  return prevState;
}

function sortAndPruneLogs(prevState: State): State {
  const logs = prevState.logs
    .map(log => {
      let newLog = log.copy();
      newLog.tick();
      return newLog;
    })
    .filter(log => !log.isFinished())
    .sort((a, b) =>
      a
        .getPriority()
        .minus(b.getPriority())
        .compare(0)
    );

  return { ...prevState, logs };
}

// TODO: action.numTicks is completely ignored
export default function handleUpdateAction(
  prevState: State,
  action: UpdateAction
) {
  prevState = sortAndPruneLogs(prevState);
  prevState = payAllUpkeep(prevState);

  prevState = doAllProgress(prevState);

  return prevState;
}
