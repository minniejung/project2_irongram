const router = require("express").Router();
const PostModel = require("../models/post");
const UserModel = require("../models/user");
const uploader = require("../config/cloudinary");
const cloudinary = require("cloudinary");
router.get("/posts", async (req, res) => {
  try {
    res.render("post/posts", {
      posts: await PostModel.find().sort({ created_at: "descending" }),
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
      });
      const user = await UserModel.findByIdAndUpdate(
        req.session.currentUser._id,
        {
          posts: post._id,
        },
        { new: true }
      );
      console.log(user);
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

router.put("/posts/create/:id", async (req, res) => {
  try {
    let post = await PostModel.findById(req.params.id);
    console.log(req.body);
    const newUrl = await cloudinary.url(`${post.filename}.jpg`, {
      transformation: [
        { effect: `art:${req.body.filter}` },
        { quality: 100 },
        {
          effect: req.body.vignette
            ? `vignette:${req.body.vignette}`
            : "vignette:0",
        },
      ],
    });
    console.log(newUrl);
    post = await PostModel.findByIdAndUpdate(
      req.params.id,
      { urlMedia: newUrl },
      { new: true }
    );
    console.log(post);
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
    });
  } catch (err) {
    console.error(err);
  }
});
/* TODO
uploader.destroy("image"), 
delete image from the cloudinary
*/
router.get("/posts/delete/:id", async (req, res) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id);
    res.redirect("/posts");
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
