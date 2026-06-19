import { AppError, handleError } from "../util/appError.js";
export default (err, req, res, next) => {
  const error = handleError(err);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
