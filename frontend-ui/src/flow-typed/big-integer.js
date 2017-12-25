// @flow
declare module "big-integer-types" {
  declare type DivModOutput = {| quotient: BigInteger, remainder: BigInteger |};
  declare type BigIntInput = number | string | BigInteger;

  declare type BigIntConstructor = (data?: BigIntInput) => BigInteger;

  declare class BigInteger {
    add(addend: BigIntInput): BigInteger;
    plus(addend: BigIntInput): BigInteger;

    minus(subtractand: BigIntInput): BigInteger;
    subtract(subtractand: BigIntInput): BigInteger;

    multiply(multiplicand: BigIntInput): BigInteger;
    times(multiplicand: BigIntInput): BigInteger;

    divide(divisor: BigIntInput): BigInteger;
    over(divisor: BigIntInput): BigInteger;

    mod(modulus: BigIntInput): BigInteger;
    modPow(exponent: BigIntInput, modulus: BigIntInput): BigInteger;

    divMod(divisor: BigIntInput): DivModOutput;

    compare(comparable: BigIntInput): number;

    toString(radix?: string): string;

    static min(a: BigIntInput, b: BigIntInput): BigInteger;
  }

  declare type BigIntFn = BigInteger & BigIntConstructor;
}

declare module "big-integer" {
  import type { BigIntFn } from "big-integer-types";

  declare module.exports: {
    bigInt: BigIntFn
  };
}
