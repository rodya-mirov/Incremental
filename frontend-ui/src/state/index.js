// @flow

import { BigInteger } from "../libs/big-int-wrapper";
import { Log } from "../logs";

export type UpkeepState = {
  ticksUntilPayday: BigInteger,

  numBuyerDrones: BigInteger,
  buyerDroneUpkeep: BigInteger,

  numWorkerDrones: BigInteger,
  workerDroneUpkeep: BigInteger,

  numSalesDrones: BigInteger,
  salesDroneUpkeep: BigInteger
};

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
  buyProgress: BigInteger,

  numWorkerDrones: BigInteger,
  workerDronePrice: BigInteger,
  workerDroneUpkeep: BigInteger,
  workerDroneProduction: BigInteger,
  makeProgress: BigInteger,

  numSalesDrones: BigInteger,
  salesDronePrice: BigInteger,
  salesDroneUpkeep: BigInteger,
  salesDroneProduction: BigInteger,
  sellProgress: BigInteger,

  logs: Array<Log>,
  upkeepState: UpkeepState
};

export const initialState: State = {
  amtMoney: new BigInteger(0),
  numWidgets: new BigInteger(0),
  numMaterials: new BigInteger(10),

  materialBuyPrice: new BigInteger(3),
  materialsPerWidget: new BigInteger(1),
  widgetSellPrice: new BigInteger(10),

  numBuyerDrones: new BigInteger(0),
  buyerDronePrice: new BigInteger(15),
  buyerDroneUpkeep: new BigInteger(15),
  buyerDroneProduction: new BigInteger(1),
  buyProgress: new BigInteger(0),

  numWorkerDrones: new BigInteger(0),
  workerDronePrice: new BigInteger(10),
  workerDroneUpkeep: new BigInteger(10),
  workerDroneProduction: new BigInteger(1),
  makeProgress: new BigInteger(0),

  numSalesDrones: new BigInteger(0),
  salesDronePrice: new BigInteger(25),
  salesDroneUpkeep: new BigInteger(25),
  salesDroneProduction: new BigInteger(1),
  sellProgress: new BigInteger(0),

  logs: [],
  upkeepState: {
    ticksUntilPayday: new BigInteger(50),

    numBuyerDrones: new BigInteger(0),
    buyerDroneUpkeep: new BigInteger(0),

    numWorkerDrones: new BigInteger(0),
    workerDroneUpkeep: new BigInteger(0),

    numSalesDrones: new BigInteger(0),
    salesDroneUpkeep: new BigInteger(0)
  }
};
