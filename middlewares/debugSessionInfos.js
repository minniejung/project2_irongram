module.exports = function debugSessionInfos(req, res, next) {
  console.log("------ WHAT'S IN SESSION ??? -------");
  console.log(req.session);
  next();
};
