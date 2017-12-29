// @flow

import { BigInteger } from "../libs/big-int-wrapper";

type InstantCost = {|
  units: string,
  amtInstant: BigInteger
|};

type UpkeepCost = {|
  units: string,
  amtPerUpkeep: BigInteger
|};

type FullCost = {|
  units: string,
  amtInstant: BigInteger,
  amtPerUpkeep: BigInteger
|};

type CostInfo = InstantCost | UpkeepCost | FullCost;

export default (props: CostInfo): string => {
  let message;
  if (props.amtInstant && props.amtPerUpkeep) {
    message =
      props.units +
      props.amtInstant.toString() +
      ", " +
      props.units +
      props.amtPerUpkeep.toString() +
      " per cycle";
  } else if (props.amtInstant) {
    message = props.units + props.amtInstant.toString();
  } else {
    message = props.units + props.amtPerUpkeep.toString() + " per cycle";
  }

  return message;
};
