// @flow

import bigInt from "big-integer";
import { Log } from "../logs";

export type State = {
  amtMoney: bigInt,
  numWidgets: bigInt,
  widgetSellPrice: bigInt,

  numWorkerDrones: bigInt,
  workerDronePrice: bigInt,
  workerDroneUpkeep: bigInt,
  workerDroneProduction: bigInt,

  numSalesDrones: bigInt,
  salesDronePrice: bigInt,
  salesDroneUpkeep: bigInt,
  salesDroneProduction: bigInt,

  logs: Array<Log>
};

export const initialState = {
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

  logs: []
};
