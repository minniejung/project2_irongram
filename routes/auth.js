const router = require("express").Router();
const user = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/auth/signup", (req, res) => {
  res.render("auth/signup");
});

router.get("/auth/signin", (req, res) => {
  res.render("auth/signin");
});

router.post("/auth/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await user.findOne({ email: newUser.email });
    res.render("signup");
    if (foundUser) {
      req.flash("error", "Email already regristered");
      res.redirect("/auth/signin");
    } else {
      const hashedPwd = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPwd;
      await user.create(newUser);
      req.flash("success", "Succeed");
      res.redirect("/auth/signin");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
