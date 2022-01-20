const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const uploader = require("../config/cloudinary");
const postModel = require("../models/post");

/* GET users listing. */
router.get("/settings/:id", async (req, res, next) => {
  try {
    if (req.session.currentUser._id === req.params.id) {
      const user = await userModel.findById(req.params.id);
      res.render("user/user-edit", { user });
    } else {
      res.redirect(`/profile/${req.params.id}`);
    }
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
      const { name, lastname, email, password, bio, existingImage } = req.body;
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
          lastname,
          email,
          password,
          bio,
          image: newImage,
        },
        { new: true }
      );
      res.redirect(`/profile/${id}`);
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
    const followedUser = await userModel.findOne({
      _id: req.params.id,
      followers: { $in: req.session.currentUser._id },
    });
    res.render("user/profile", {
      user,
      followedUser: followedUser ? true : false,
      js: ["profile.js"],
      css: ["profile.css"],
    });
  } catch (e) {
    next(e);
  }
});

// Update Follower
router.get("/follower/:id", async (req, res, next) => {
  try {
    const userId = await userModel.findById(req.params.id);
    res.status(200).json(userId.followers.length);
  } catch (e) {
    next(e);
  }
});

router.post("/profile/add/:id", async (req, res, next) => {
  try {
    const foundedFollower = await userModel.findOne({
      _id: req.body.followedId,
      followers: { $in: req.body.currentUserId },
    });
    if (foundedFollower) {
      //UNFOLLOW
      await userModel.findByIdAndUpdate(
        req.body.currentUserId,
        {
          $pull: { following: req.body.followedId },
        },
        { new: true }
      );

      await userModel.findByIdAndUpdate(
        req.body.followedId,
        {
          $pull: { followers: req.body.currentUserId },
        },
        { new: true }
      );
      res.status(201).json({ followedUser: false });
    } else {
      //FOLLOW
      await userModel.findByIdAndUpdate(
        req.body.currentUserId,
        {
          $push: { following: req.body.followedId },
        },
        { new: true }
      );
      await userModel.findByIdAndUpdate(
        req.body.followedId,
        {
          $push: { followers: req.body.currentUserId },
        },
        { new: true }
      );
      res.status(201).json({ followedUser: true });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
