// @flow

import { BigInteger } from "../libs/big-int-wrapper";
import { Log } from "../logs";

export type UpkeepCategoryState = {
  numDrones: BigInteger,
  upkeepPerDrone: BigInteger
};

export type UpkeepState = {
  ticksUntilPayday: BigInteger,

  buyerState: UpkeepCategoryState,
  workerState: UpkeepCategoryState,
  salesState: UpkeepCategoryState
};

export type DronesData = {
  numDrones: BigInteger,
  hirePrice: BigInteger,
  upkeepPrice: BigInteger,
  production: BigInteger,
  workProgress: BigInteger,
  progressPerUnit: BigInteger
};

export type State = {
  amtMoney: BigInteger,
  numWidgets: BigInteger,
  numMaterials: BigInteger,

  materialBuyPrice: BigInteger,
  materialsPerWidget: BigInteger, // number of materials required to produce a widget
  widgetSellPrice: BigInteger,

  buyerDronesData: DronesData,
  workerDronesData: DronesData,
  salesDronesData: DronesData,

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

  buyerDronesData: {
    numDrones: new BigInteger(0),
    hirePrice: new BigInteger(15),
    upkeepPrice: new BigInteger(15),
    production: new BigInteger(1),
    workProgress: new BigInteger(0),
    progressPerUnit: new BigInteger(10)
  },

  workerDronesData: {
    numDrones: new BigInteger(0),
    hirePrice: new BigInteger(10),
    upkeepPrice: new BigInteger(10),
    production: new BigInteger(1),
    workProgress: new BigInteger(0),
    progressPerUnit: new BigInteger(10)
  },

  salesDronesData: {
    numDrones: new BigInteger(0),
    hirePrice: new BigInteger(25),
    upkeepPrice: new BigInteger(25),
    production: new BigInteger(1),
    workProgress: new BigInteger(0),
    progressPerUnit: new BigInteger(10)
  },

  logs: [],
  upkeepState: {
    ticksUntilPayday: new BigInteger(50),

    buyerState: {
      numDrones: new BigInteger(0),
      upkeepPerDrone: new BigInteger(15)
    },

    workerState: {
      numDrones: new BigInteger(0),
      upkeepPerDrone: new BigInteger(10)
    },

    salesState: {
      numDrones: new BigInteger(0),
      upkeepPerDrone: new BigInteger(25)
    }
  }
};
