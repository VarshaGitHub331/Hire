const WrapAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next)
      .then((data) => {
        console.log("done");
        next();
      })
      .catch((e) => console.log(e));
  };
};
module.exports = WrapAsync;
