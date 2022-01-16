const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const uploader = require("../config/cloudinary");

/* GET users listing. */
router.get("/settings/:id", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    console.log(user);
    res.render("user/settings", { user });
  } catch (e) {
    next(e);
  }
});

// GET Profile Edit
router.get("/settings/edit/:id", async (req, res, next) => {
  try {
    const profileEdit = await userModel.findById(req.params.id);
    res.render("settings/edit", { profileEdit });
  } catch (e) {
    next(e);
  }
});

// POST Profile Edit
router.post(
  "/settings/edit/:id",
  uploader.single("image"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, password, bio } = req.body;
      let newImage;
      if (req.file) {
        newImage = req.file.path;
      } else {
        newImage = existingImage;
      }
      const editProfile = await userModel.findByIdAndUpdate(
        id,
        {
          name,
          email,
          password,
          bio,
          image: newImage,
        },
        { new: true }
      );
    } catch (e) {
      next(e);
    }
  }
);

// Delete
router.get("/settings/delete/:id", async (req, res, next) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

// update

module.exports = router;
