const constants = require("../constants/constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      return res.json({
        title: "Validation Failed",
        error: err.message,
        stackTrace: err.stack,
        statusCode:statusCode,

      });
    case constants.NOT_FOUND:
      return res.json({
        title: "Not Found",
        error: err.message,
        stackTrace: err.stack,
        statusCode:statusCode,
      });
    case constants.UNAUTHORIZED:
      return res.json({
        title: "Unauthorized",
        error: err.message,
        stackTrace: err.stack,
        statusCode:statusCode,

      });
    case constants.FORBIDDEN:
      return res.json({
        title: "Forbidden",
        error: err.message,
        stackTrace: err.stack,
        statusCode:statusCode,

      });
    case constants.SERVER_ERROR:
      return res.json({
        title: "Server Error",
        error: err.message,
        stackTrace: err.stack,
        statusCode:statusCode,

      });
 
    default:
     console.log(err.message)
     break
  }
};

module.exports = errorHandler;