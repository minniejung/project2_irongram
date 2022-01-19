const router = require("express").Router();
const PostModel = require("../models/post");
const UserModel = require("../models/user");
const uploader = require("../config/cloudinary");
const cloudinary = require("cloudinary");
const protectPrivateRoute = require("../middlewares/protectPrivateRoute");

router.get("/posts", async (req, res) => {
  try {
    // const test = await PostModel.find().sort({ created_at: "descending" });
    const posts = await PostModel.find();
    console.log(req.session.currentUser);
    res.render("post/posts", {
      posts,
      css: ["images.css"],
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
    const { brigthness, contrast, saturation, vignette, filter } = req.body;
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
      { urlMedia: newUrl },
      { new: true }
    );
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
  }
});
router.get("/posts/:id", async (req, res) => {
  try {
    res.render("post/single", {
      post: await PostModel.findById(req.params.id),
      css: ["images.css"],
      js: ["edit-image.js"],
    });
  } catch (err) {
    console.error(err);
  }
});
router.get("/posts/update/:id", async (req, res, next) => {
  try {
    res.render("post/post-update", {
      post: await PostModel.findById(req.params.id),
    });
  } catch (err) {
    next(err);
  }
});
/* TODO
uploader.destroy("image"), 
delete image from the cloudinary
*/
router.post("/posts/delete/:id", async (req, res) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id);
    res.redirect("/posts");
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
