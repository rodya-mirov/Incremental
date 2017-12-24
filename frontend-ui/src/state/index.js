// @flow

import bigInt from "big-integer";
import { Log } from "../logs";

export type State = {
  amtMoney: bigInt,
  numWidgets: bigInt,
  numMaterials: bigInt,

  materialBuyPrice: bigInt,
  materialsPerWidget: bigInt, // number of materials required to produce a widget
  widgetSellPrice: bigInt,

  numBuyerDrones: bigInt,
  buyerDronePrice: bigInt,
  buyerDroneUpkeep: bigInt,
  buyerDroneProduction: bigInt,

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
