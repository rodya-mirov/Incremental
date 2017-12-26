function payBuyerDroneUpkeep(prevState: State): State {
  let result = transactionHelper(
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
    prevState = addLog(prevState, new ExpiringLog(message, bigInt(100)));
  }

  return {
    ...prevState,
    amtMoney: prevState.amtMoney.minus(result.inputConsumed),
    numBuyerDrones: result.successes
  };
}

function payWorkerDroneUpkeep(prevState: State): State {
  let result = transactionHelper(
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
    prevState = addLog(prevState, new ExpiringLog(message, bigInt(100)));
  }

  return {
    ...prevState,
    amtMoney: prevState.amtMoney.minus(result.inputConsumed),
    numWorkerDrones: result.successes
  };
}

function paySalesDroneUpkeep(prevState: State): State {
  let result = transactionHelper(
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
    prevState = addLog(prevState, new ExpiringLog(message, bigInt(100)));
  }

  return {
    ...prevState,
    amtMoney: prevState.amtMoney.minus(result.inputConsumed),
    numSalesDrones: result.successes
  };
}

function payAllUpkeep(prevState: State): State {
  prevState = payBuyerDroneUpkeep(prevState);
  prevState = payWorkerDroneUpkeep(prevState);
  prevState = paySalesDroneUpkeep(prevState);

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
export default function handleUpdateAction(prevState, action: UpdateAction) {
  prevState = sortAndPruneLogs(prevState);
  prevState = payAllUpkeep(prevState);

  prevState = buyMaterials(
    prevState,
    prevState.buyerDroneProduction.times(prevState.numBuyerDrones)
  );
  prevState = makeWidgets(
    prevState,
    prevState.workerDroneProduction.times(prevState.numWorkerDrones)
  );
  prevState = sellWidgets(
    prevState,
    prevState.salesDroneProduction.times(prevState.numSalesDrones)
  );

  return prevState;
}
