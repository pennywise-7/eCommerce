module.exports = (asyncFN) => {
  return (req, res, next) => {
    asyncFN(req, res, next).catch((error) => {
      next(error);
    });
  };
};
