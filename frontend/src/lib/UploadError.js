export default class UploadError extends Error {
  constructor(message, errorType) {
    super(message);
    this.errorType = errorType;
  }
}
