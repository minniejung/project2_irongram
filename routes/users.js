const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const uploader = require("../config/cloudinary");
const postModel = require("../models/post");

/* GET users listing. */
router.get("/settings/:id", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    // console.log(user);
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
    res.render("user/profile", { user, js: ["profile.js"] });
  } catch (e) {
    next(e);
  }
});

// Update Follower
router.get("/follower/:id", async (req, res, next) => {
  try {
    const userId = await userModel.findById(req.params.id);
    console.log(userId.followers);
    res.status(200).json(userId.followers.length);
  } catch (e) {
    next(e);
  }
});

router.post("/profile/add/:id", async (req, res, next) => {
  try {
    const foundedFollower = await userModel.findOne({
      id: req.body.followerId,
      followers: { $in: req.body.currentUserId },
    });
    console.log(foundedFollower, "test");
    // if (!foundedFollower.followers) {
    //   foundedFollower.followers = [];
    // }
    if (foundedFollower) {
      await userModel.findByIdAndUpdate(
        req.body.currentUserId,
        {
          $pull: { following: req.body.followerId },
        },
        { new: true }
      );
      await userModel.findByIdAndUpdate(
        req.body.followerId,
        {
          $pull: { followers: req.body.currentUserId },
        },
        { new: true }
      );
      // console.log(deleteOneFollower);
    } else {
      await userModel.findByIdAndUpdate(
        req.body.currentUserId,
        {
          $push: { following: req.body.followerId },
        },
        { new: true }
      );
      await userModel.findByIdAndUpdate(
        req.body.followerId,
        {
          $push: { followers: req.body.currentUserId },
        },
        { new: true }
      );
      res.status(201).send("new follower ok");
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
