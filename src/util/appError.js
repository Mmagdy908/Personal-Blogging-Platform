export class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleError = (err) => {
  let error = err;

  if (err.cause?.code === 11000) error = new AppError(400, err.message);

  return error;
};
