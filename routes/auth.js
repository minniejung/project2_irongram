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

router.post("/auth/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await user.findOne({ email: email });

    if (!foundUser) {
      req.flash("error", "Email not regristered");
      res.redirect("/auth/signup");
    } else {
      const pwd = bcrypt.compareSync(password, foundUser.password);
      if (pwd) {
        req.flash("success", "Welcome");
        const userObject = foundUser.toObject();
        delete userObject.password;
        req.session.currentUser = userObject;
        res.redirect("/");
      } else {
        req.flash("warning", "wrong password");
        res.redirect("/auth/signin");
      }
    }
  } catch (err) {
    next(err);
  }
});

router.get("/auth/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
