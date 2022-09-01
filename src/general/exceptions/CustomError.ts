export class CustomError extends Error {
  public cause

  constructor(message?: string, cause?: Error) {
    super(message)
    this.name = this.constructor.name
    this.cause = cause
  }
}
