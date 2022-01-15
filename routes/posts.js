const router = require("express").Router();
const PostModel = require("../models/post");
const uploader = require("../config/cloudinary");
const cloudinary = require("cloudinary");
router.get("/posts", async (req, res) => {
  try {
    res.render("post/posts", {
      posts: await PostModel.find(),
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/posts/upload", uploader.single("image"), async (req, res) => {
  try {
    if (req.file) {
      console.log(req.file);
      const post = await PostModel.create({
        urlMedia: req.file.path,
        filename: req.file.filename,
      });
      //console.log(post);
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
    });
  } catch (err) {
    console.error(err);
  }
});
router.put("/posts/create/:id", async (req, res) => {
  try {
    /* cloudinary.url(`irongram/${req.body.imageUrl}`, {
      effect: req.body.filter,
    });*/

    const post = await PostModel.findById(req.params.id);
    cloudinary.url(post.filename, {
      effect: "incognito",
    });
    res.status(201).json(post);
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
