const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const users = await userModel.find();
    console.log(users);
    res.render("index", { users, title: "IronGram" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
