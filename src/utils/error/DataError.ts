export default class DataError extends Error {
  constructor(message?: string) {
    super();
    this.name = "DataError";
    this.message = message ?? this.message;
  }
}
