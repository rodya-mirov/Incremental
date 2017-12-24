// @flow
declare module "big-integer-types" {
  declare class BigInteger {
    plus(addend: BigIntInput): BigInteger;
    minus(subtractand: BigIntInput): BigInteger;
    times(multiplicand: BigIntInput): BigInteger;
    divide(divisor: BigIntInput): BigInteger;
    compare(comparable: BigIntInput): number;
    toString(): string;
  }

  declare type BigIntInput = number | string | BigInteger;
  declare type BigIntFn = (void | number | string | BigInteger) => BigInteger;
}

declare module "big-integer" {
  import type { BigIntFn } from "big-integer-types";
  declare export default BigIntFn
}
