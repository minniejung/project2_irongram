const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    console.log(req.session.currentUser._id)
    const users = await userModel.findById(req.session.currentUser._id).populate('followers');

    res.render("index", { users, title: "IronGram" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
