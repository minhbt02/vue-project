export default class DataBaseError extends Error {
  constructor(message?: string) {
    super();
    this.name = "DataBaseError";
    this.message = message ?? this.message;
  }
}
