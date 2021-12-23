const checkMiddleware = (req, res, next) => {
  console.log('Check Middleware is called');
  next();
};

module.exports = checkMiddleware;
