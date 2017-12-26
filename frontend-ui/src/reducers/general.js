// @flow
import { BigInteger, BigIntegerStatic } from "../libs/big-int-wrapper";
import type { BigIntInput } from "../libs/big-int-wrapper";

import type { State } from "../state";
import { Log } from "../logs";

export type TransactionResult = {
  successes: BigInteger,
  failures: BigInteger,
  inputConsumed: BigInteger,
  outputProduced: BigInteger
};

export function transactionHelper(
  numAttempts: BigInteger,
  availableResources: BigInteger,
  transactionCost: BigIntInput,
  transactionBenefit: BigIntInput
): TransactionResult {
  let successes = BigIntegerStatic.min(
    numAttempts,
    availableResources.divide(transactionCost) // intentionally: no fractional production
  );
  let failures = numAttempts.minus(successes);
  let inputConsumed = successes.times(transactionCost);
  let outputProduced = successes.times(transactionBenefit);

  return {
    successes,
    failures,
    inputConsumed,
    outputProduced
  };
}

export function buyMaterials(
  prevState: State,
  numMaterials: BigInteger
): State {
  let result = transactionHelper(
    numMaterials,
    prevState.amtMoney,
    prevState.materialBuyPrice,
    1
  );

  return {
    ...prevState,
    amtMoney: prevState.amtMoney.minus(result.inputConsumed),
    numMaterials: prevState.numMaterials.plus(result.outputProduced)
  };
}

export function makeWidgets(prevState: State, numWidgets: BigInteger): State {
  let result = transactionHelper(
    numWidgets,
    prevState.numMaterials,
    prevState.materialsPerWidget,
    1
  );

  return {
    ...prevState,
    numWidgets: prevState.numWidgets.plus(result.outputProduced),
    numMaterials: prevState.numMaterials.minus(result.inputConsumed)
  };
}

export function sellWidgets(prevState: State, numWidgets: BigInteger): State {
  let result = transactionHelper(
    numWidgets,
    prevState.numWidgets,
    1,
    prevState.widgetSellPrice
  );

  return {
    ...prevState,
    numWidgets: prevState.numWidgets.minus(result.inputConsumed),
    amtMoney: prevState.amtMoney.plus(result.outputProduced)
  };
}

export function hireBuyerDrones(
  prevState: State,
  numDrones: BigInteger
): State {
  let result = transactionHelper(
    numDrones,
    prevState.amtMoney,
    prevState.buyerDronePrice,
    1
  );

  return {
    ...prevState,
    amtMoney: prevState.amtMoney.minus(result.inputConsumed),
    numBuyerDrones: prevState.numBuyerDrones.plus(result.outputProduced)
  };
}

export function hireWorkerDrones(
  prevState: State,
  numDrones: BigInteger
): State {
  let result = transactionHelper(
    numDrones,
    prevState.amtMoney,
    prevState.workerDronePrice,
    1
  );

  return {
    ...prevState,
    amtMoney: prevState.amtMoney.minus(result.inputConsumed),
    numWorkerDrones: prevState.numWorkerDrones.plus(result.outputProduced)
  };
}

export function hireSalesDrones(
  prevState: State,
  numDrones: BigInteger
): State {
  let result = transactionHelper(
    numDrones,
    prevState.amtMoney,
    prevState.salesDronePrice,
    1
  );

  return {
    ...prevState,
    amtMoney: prevState.amtMoney.minus(result.inputConsumed),
    numSalesDrones: prevState.numSalesDrones.plus(result.outputProduced)
  };
}

export function addLog(prevState: State, log: Log) {
  const newLogs = prevState.logs.map(x => x);
  newLogs.push(log);

  return { ...prevState, logs: newLogs };
}
