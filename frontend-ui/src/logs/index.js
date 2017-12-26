// @flow

import { BigInteger } from "../libs/big-int-wrapper";

export class Log {
  isFinished: () => boolean;
  getMessage: () => string;
  getPriority: () => BigInteger;
  tick: () => void;
  copy: () => Log;

  constructor(
    checkIfFinished: () => boolean,
    getMessage: () => string,
    getPriority: () => BigInteger,
    getTicked: () => void,
    toCopy: () => Log
  ) {
    this.isFinished = checkIfFinished;
    this.getMessage = getMessage;
    this.getPriority = getPriority;
    this.tick = getTicked;
    this.copy = toCopy;
  }
}

export class ExpiringLog extends Log {
  constructor(message: string, duration: BigInteger) {
    let ticker = {
      value: duration
    };

    super(
      () => ticker.value.compare(0) <= 0,
      () => message,
      () => ticker.value,
      () => {
        ticker.value =
          ticker.value.compare(0) <= 0
            ? new BigInteger(0)
            : ticker.value.minus(1);
      },
      () => new ExpiringLog(message, ticker.value)
    );
  }
}

export class EternalLog extends Log {
  constructor(message: string) {
    super(
      () => false,
      () => message,
      () => new BigInteger(0),
      () => undefined,
      () => new EternalLog(message)
    );
  }
}
