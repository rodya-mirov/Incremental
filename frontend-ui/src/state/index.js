// @flow

import bigInt from "big-integer";
import type { BigInteger } from "big-integer";
import { Log } from "../logs";

export type State = {
  amtMoney: BigInteger,
  numWidgets: BigInteger,
  numMaterials: BigInteger,

  materialBuyPrice: BigInteger,
  materialsPerWidget: BigInteger, // number of materials required to produce a widget
  widgetSellPrice: BigInteger,

  numBuyerDrones: BigInteger,
  buyerDronePrice: BigInteger,
  buyerDroneUpkeep: BigInteger,
  buyerDroneProduction: BigInteger,

  numWorkerDrones: BigInteger,
  workerDronePrice: BigInteger,
  workerDroneUpkeep: BigInteger,
  workerDroneProduction: BigInteger,

  numSalesDrones: BigInteger,
  salesDronePrice: BigInteger,
  salesDroneUpkeep: BigInteger,
  salesDroneProduction: BigInteger,

  logs: Array<Log>
};

export function copyState(state: State): State {
  return {
    ...state,
    logs: state.logs.map(log => log.copy())
  };
}

export const initialState: State = {
  amtMoney: bigInt(0),
  numWidgets: bigInt(0),
  numMaterials: bigInt(10),

  materialBuyPrice: bigInt(3),
  materialsPerWidget: bigInt(1),
  widgetSellPrice: bigInt(10),

  numBuyerDrones: bigInt(0),
  buyerDronePrice: bigInt(15),
  buyerDroneUpkeep: bigInt(1),
  buyerDroneProduction: bigInt(1),

  numWorkerDrones: bigInt(0),
  workerDronePrice: bigInt(10),
  workerDroneUpkeep: bigInt(1),
  workerDroneProduction: bigInt(1),

  numSalesDrones: bigInt(0),
  salesDronePrice: bigInt(25),
  salesDroneUpkeep: bigInt(2),
  salesDroneProduction: bigInt(1),

  logs: []
};
