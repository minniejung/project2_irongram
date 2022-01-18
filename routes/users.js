const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const uploader = require("../config/cloudinary");
const postModel = require("../models/post");

/* GET users listing. */
router.get("/settings/:id", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    console.log(user);
    res.render("user/user-edit", { user });
  } catch (e) {
    next(e);
  }
});

// GET Profile Edit
// router.get("/settings/edit/:id", async (req, res, next) => {
//   try {
//     const profileEdit = await userModel.findById(req.params.id);
//     res.render("user/user-edit", { user: profileEdit });
//   } catch (e) {
//     next(e);
//   }
// });

// POST Profile Edit
router.post(
  "/settings/edit/:id",
  uploader.single("image"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, password, bio, existingImage } = req.body;
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
      res.redirect(`/posts`);
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

router.get("/profile/:id", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id).populate("posts");
    res.render("user/profile", { user });
  } catch (e) {
    next(e);
  }
});

router.post("/profile/add/:id", async (req, res, next) => {
  try {
    await userModel.findByIdAndUpdate(
      req.body.currentUserId,
      {
        $push: { followers: req.body.followerId },
      },
      { new: true }
    );
  } catch (e) {
    next(e);
  }
});

module.exports = router;
