/**
 * Custome Error API Extend Error main class
 * @constructor
 * @param {string} message Error message
 * @param {number} statusCode Error Status code
 */
class CustomeErrorAPI extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 *
 * @param {string} message
 * @param {number} statusCode
 * @returns Error object
 */
const customError = (message, statusCode) => {
  return new CustomeErrorAPI(message, statusCode);
};

module.exports = {
  CustomeErrorAPI,
  customError,
};
