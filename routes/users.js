const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

/* GET users listing. */
router.get("/profile/:id", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    console.log(user);
    res.render("user/profile", { user });
  } catch (e) {
    next(e);
  }
});

//deleteOne

//user
module.exports = router;
