// @flow

import bigInt from "big-integer";

export class Log {
  isFinished: () => boolean;
  getMessage: () => string;
  getPriority: () => bigInt;
  tick: () => void;
  copy: () => Log;

  constructor(
    checkIfFinished: () => boolean,
    getMessage: () => string,
    getPriority: () => bigInt,
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
  constructor(message: string, duration: bigInt) {
    let ticker = {
      value: duration
    };

    super(
      () => ticker.value <= 0,
      () => message,
      () => ticker.value,
      () => {
        ticker.value = ticker.value <= 0 ? 0 : ticker.value - 1;
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
      () => 0,
      () => undefined,
      () => new EternalLog(message)
    );
  }
}
