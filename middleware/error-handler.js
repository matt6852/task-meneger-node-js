const { CustomAPIError } = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    console.log("inside");
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: err.errors.name.message });
};

module.exports = errorHandlerMiddleware;
