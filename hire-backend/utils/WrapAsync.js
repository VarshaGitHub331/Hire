const WrapAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((e) => console.log(e));
  };
};
module.exports = WrapAsync;
