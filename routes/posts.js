const router = require("express").Router();
const PostModel = require("../models/post");
const UserModel = require("../models/user");
const uploader = require("../config/cloudinary");
const cloudinary = require("cloudinary");
const exposeLoginStatus = require("../middlewares/exposeLoginStatus");

router.get("/explorer", async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.render("post/posts", {
      posts,
      css: ["explorer.css"],
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/posts/upload", uploader.single("image"), async (req, res) => {
  try {
    if (req.file) {
      const post = await PostModel.create({
        urlMedia: req.file.path,
        filename: req.file.filename,
        user_id: req.session.currentUser._id,
        user_name: req.session.currentUser.name,
        user_image: req.session.currentUser.image,
        description: "",
      });
      await UserModel.findByIdAndUpdate(
        req.session.currentUser._id,
        {
          $push: { posts: { $each: [post._id], $position: 0 } },
        },
        { new: true }
      );
      res.redirect(`/posts/create/${post._id}`);
    } else {
      res.redirect("/posts");
    }
  } catch (err) {
    console.error(err);
  }
});
router.get("/posts/create/:id", async (req, res) => {
  try {
    res.render("post/post-create", {
      post: await PostModel.findById(req.params.id),
      css: ["images.css"],
    });
  } catch (err) {
    console.error(err);
  }
});

//UPDATE IMAGE ON CREATE AND UPDATE PAGE
router.put("/posts/update/:id", async (req, res) => {
  try {
    const { brigthness, contrast, saturation, vignette, filter, description } =
      req.body;
    let post = await PostModel.findById(req.params.id);
    const newUrl = cloudinary.url(`${post.filename}.jpg`, {
      transformation: [
        filter ? { effect: `art:${filter}` } : "",
        { quality: "auto" },
        vignette
          ? {
              effect: `vignette:${vignette}`,
            }
          : "",
        brigthness
          ? {
              effect: `brightness:${brigthness}`,
            }
          : "",
        saturation
          ? {
              effect: `saturation:${saturation}`,
            }
          : "",
        contrast
          ? {
              effect: `contrast:${contrast}`,
            }
          : "",
      ],
    });

    post = await PostModel.findByIdAndUpdate(
      req.params.id,
      { urlMedia: newUrl, description },
      { new: true }
    );
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
  }
});
router.get("/posts/:id", async (req, res) => {
  try {
    const likedPost = await PostModel.findOne({
      _id: req.params.id,
      likes: { $in: req.session.currentUser._id },
    });
    const post = await PostModel.findById(req.params.id).populate("user_id");
    res.render("post/single", {
      post,
      likedPost: likedPost ? true : false,
      css: ["index.css", "single-post.css"],
      js: ["edit-image.js", "likes.js"],
    });
  } catch (err) {
    console.error(err);
  }
});
router.get("/posts/update/:id", exposeLoginStatus, async (req, res, next) => {
  try {
    res.render("post/post-update", {
      post: await PostModel.findById(req.params.id),
      js: ["edit-image.js", "likes.js"],
      css: ["images.css"],
    });
  } catch (err) {
    next(err);
  }
});

router.get("/posts/delete/:id", async (req, res) => {
  try {
    const post = await PostModel.findByIdAndDelete(req.params.id);
    res.redirect(`/profile/${post.user_id}`);
  } catch (err) {
    console.error(err);
  }
});

// Likes router
router.get("/like/:id", async (req, res, next) => {
  try {
    const postUserId = await PostModel.findById(req.params.id);
    res.status(200).json(postUserId.likes.length);
  } catch (e) {
    next(e);
  }
});

router.post("/addlike/:id", async (req, res, next) => {
  try {
    const foundLike = await PostModel.findOne({
      _id: req.body.postId,
      likes: { $in: req.body.currentUserId },
    });
    if (foundLike) {
      //unlike
      await PostModel.findByIdAndUpdate(
        req.body.postId,
        {
          $pull: { likes: req.body.currentUserId },
        },
        {
          new: true,
        }
      );
      res.status(201).json({ likedPost: false });
    } else {
      // like
      await PostModel.findByIdAndUpdate(
        req.body.postId,
        {
          $push: { likes: req.body.currentUserId },
        },
        {
          new: true,
        }
      );
      res.status(201).json({ likedPost: true });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
