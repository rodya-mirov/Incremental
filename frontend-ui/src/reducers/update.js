//@flow
import { BigInteger } from "../libs/big-int-wrapper";

import type { Log } from "../logs";
import type { UpdateAction } from "../actions";
import type { State, UpkeepState, UpkeepCategoryState } from "../state";
import { ExpiringLog } from "../logs";

import { TICKS_PER_SECOND, TICKS_PER_UPKEEP } from "../constants";

import * as reducers from "./general";

function payUpkeepHelper(
  currentUpkeep: UpkeepCategoryState,
  currentMoney: BigInteger,
  droneNamePlural: string
): { newMoney: BigInteger, lostDrones: BigInteger, newLogs: Array<Log> } {
  let result = reducers.transactionHelper(
    currentUpkeep.numDrones,
    currentMoney,
    currentUpkeep.upkeepPerDrone,
    0
  );

  const newLogs = [];
  if (result.failures.compare(0) > 0) {
    const message =
      "Lost " +
      result.failures.toString() +
      " " +
      droneNamePlural +
      " because their salary could not be paid!";
    newLogs.push(new ExpiringLog(message, new BigInteger(100)));
  }

  return {
    newMoney: currentMoney.minus(result.inputConsumed),
    lostDrones: result.failures,
    newLogs: newLogs
  };
}

function payBuyerDroneUpkeep(prevState: State): State {
  let result = payUpkeepHelper(
    prevState.upkeepState.buyerState,
    prevState.amtMoney,
    "buyer drones"
  );

  for (let log: Log of result.newLogs) {
    prevState = reducers.addLog(prevState, log);
  }

  return {
    ...prevState,
    amtMoney: result.newMoney,
    buyerDronesData: {
      ...prevState.buyerDronesData,
      numDrones: prevState.buyerDronesData.numDrones.minus(result.lostDrones)
    }
  };
}

function payWorkerDroneUpkeep(prevState: State): State {
  let result = payUpkeepHelper(
    prevState.upkeepState.workerState,
    prevState.amtMoney,
    "buyer drones"
  );

  for (let log: Log of result.newLogs) {
    prevState = reducers.addLog(prevState, log);
  }

  return {
    ...prevState,
    amtMoney: result.newMoney,
    workerDronesData: {
      ...prevState.workerDronesData,
      numDrones: prevState.workerDronesData.numDrones.minus(result.lostDrones)
    }
  };
}

function paySalesDroneUpkeep(prevState: State): State {
  let result = payUpkeepHelper(
    prevState.upkeepState.salesState,
    prevState.amtMoney,
    "buyer drones"
  );

  prevState = reducers.addLogs(prevState, result.newLogs);

  return {
    ...prevState,
    amtMoney: result.newMoney,
    salesDronesData: {
      ...prevState.salesDronesData,
      numDrones: prevState.salesDronesData.numDrones.minus(result.lostDrones)
    }
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
  let perCategory = cat => cat.numDrones.times(cat.upkeepPerDrone);
  return perCategory(upkeepState.buyerState)
    .plus(perCategory(upkeepState.workerState))
    .plus(perCategory(upkeepState.salesState));
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
  let makeUpkeepState = dronesData => {
    return {
      numDrones: dronesData.numDrones,
      upkeepPerDrone: dronesData.upkeepPrice
    };
  };

  let newUpkeepState: UpkeepState = {
    ticksUntilPayday: new BigInteger(TICKS_PER_UPKEEP),

    buyerState: makeUpkeepState(prevState.buyerDronesData),
    workerState: makeUpkeepState(prevState.workerDronesData),
    salesState: makeUpkeepState(prevState.salesDronesData)
  };

  return { ...prevState, upkeepState: newUpkeepState };
}

function doAllProgress(prevState: State): State {
  let doProgress = dronesData =>
    dronesData.workProgress
      .plus(dronesData.production.times(dronesData.numDrones))
      .divmod(dronesData.progressPerUnit);

  let buyProgressResult = doProgress(prevState.buyerDronesData);
  prevState = reducers.buyMaterials(prevState, buyProgressResult.quotient);

  let makeProgressResult = doProgress(prevState.workerDronesData);
  prevState = reducers.makeWidgets(prevState, makeProgressResult.quotient);

  let sellProgressResult = doProgress(prevState.salesDronesData);
  prevState = reducers.sellWidgets(prevState, sellProgressResult.quotient);

  return {
    ...prevState,
    buyerDronesData: {
      ...prevState.buyerDronesData,
      workProgress: buyProgressResult.remainder
    },
    workerDronesData: {
      ...prevState.workerDronesData,
      workProgress: makeProgressResult.remainder
    },
    salesDronesData: {
      ...prevState.salesDronesData,
      workProgress: sellProgressResult.remainder
    }
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
