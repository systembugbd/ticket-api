const { CustomeErrorAPI } = require('../error/customError');
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomeErrorAPI) {
    return res.status(err.statusCode).json({ message: err.message });
  } else {
    return res.status(500).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};
module.exports = errorHandler;
