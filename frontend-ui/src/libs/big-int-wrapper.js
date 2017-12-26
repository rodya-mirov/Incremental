//@flow

import bigInt from "big-integer";

function getValue(x: any): any {
  if (x.value) {
    return x.value;
  } else {
    return x;
  }
}

export class BigInteger {
  value: any; // because 'big-integer' isn't flow typed

  constructor(input: string | number | BigInteger) {
    if (input && input instanceof BigInteger) {
      this.value = input.value;
    } else {
      this.value = bigInt(input);
    }
  }

  plus(other: string | number | BigInteger): BigInteger {
    return new BigInteger(this.value.plus(getValue(other)));
  }

  minus(other: string | number | BigInteger): BigInteger {
    return new BigInteger(this.value.minus(getValue(other)));
  }

  times(other: string | number | BigInteger): BigInteger {
    return new BigInteger(this.value.times(getValue(other)));
  }

  divide(other: string | number | BigInteger): BigInteger {
    return new BigInteger(this.value.divide(getValue(other)));
  }

  divmod(
    other: string | number | BigInteger
  ): { quotient: BigInteger, remainder: BigInteger } {
    let result = this.value.divmod(getValue(other));
    return {
      quotient: new BigInteger(result.quotient),
      remainder: new BigInteger(result.remainder)
    };
  }

  compare(other: string | number | BigInteger): number {
    return this.value.compare(getValue(other));
  }

  toString(): string {
    return this.value.toString();
  }
}

export type BigIntInput = string | number | BigInteger;

export class BigIntegerStatic {
  static min(a: BigIntInput, b: BigIntInput): BigInteger {
    return new BigInteger(bigInt.min(getValue(a), getValue(b)));
  }
}
