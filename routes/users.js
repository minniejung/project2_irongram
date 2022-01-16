const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/profile/:id", function (req, res, next) {
  res.render("profile/:id");
});

//user
module.exports = router;
