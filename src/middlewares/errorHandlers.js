export const notFound = (req, res, next) => {
  const error = new Error(`${req.originalUrl} NOT FOUND`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    status: statusCode
  });
};
