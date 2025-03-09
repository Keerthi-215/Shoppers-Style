export class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (err, req, res, next) => {
  const isProduction = process.env.NODE_ENV === "production";

  // Log errors only in development mode
  if (!isProduction) {
    console.error("Error:", err);
  }

  let statusCode = err.statusCode || 500;
  let message = isProduction
    ? "An unexpected error occurred. Please try again later."
    : err.message;

  // Handle Mongoose Validation Errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // Handle MongoDB ObjectId Errors
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = "Invalid ID format.";
  }

  res.status(statusCode).json({
    status: "error",
    message,
    ...(isProduction ? {} : { stack: err.stack }), // Include stack trace in development
  });
};
