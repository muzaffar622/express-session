export class ErrorHandler extends Error {
  constructor(statusCode, message, error) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.errorMsg ? error : "UNKNOWN";
    console.log("ERROR DETAILS: ", this.errorMsg || this.message);
  }
}
export const error = (err, res) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  const { statusCode, message } = err;

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
};
