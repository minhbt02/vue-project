export default class BadRequestError extends Error {
  constructor() {
    super();
    this.name = "BadRequestError";
  }
}
