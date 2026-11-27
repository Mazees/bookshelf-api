import response from "../utils/response.js";
import ClientError from "../exceptions/client-error.js";

const ErrorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ClientError) {
    return response(res, err.statusCode, err.message);
  }

  const statusCode = err.statusCode || err.status || 500;
  const message =
    statusCode < 500 ? err.message : "Internal Server Error";

  console.error("Unhandled error:", err);
  return response(res, statusCode, message);
};

export default ErrorHandler;
