class Log {
  constructor(checkIfFinished, getMessage, getPriority, getTicked, toCopy) {
    this.isFinished = checkIfFinished;
    this.getMessage = getMessage;
    this.getPriority = getPriority;
    this.tick = getTicked;
    this.copy = toCopy;
  }
}

export function eternalLog(message) {
  return new Log(() => false, () => message, () => 0, () => undefined, () => eternalLog(message));
}

export function expiringLog(message, duration) {
  let ticker = {
    value: duration
  };

  return new Log(
    () => ticker.value <= 0,
    () => message,
    () => ticker.value,
    () => (ticker.value = (ticker.value <= 0 ? 0 : ticker.value - 1)),
    () => expiringLog(message, ticker.value)
  );
}
