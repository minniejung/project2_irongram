const router = require("express").Router();
const PostModel = require("../models/post");
const UserModel = require("../models/user");
const uploader = require("../config/cloudinary");
const cloudinary = require("cloudinary");
router.get("/posts", async (req, res) => {
  try {
    // const test = await PostModel.find().sort({ created_at: "descending" });
    const user = await UserModel.findById(req.session.currentUser)
      .populate("posts")
      .sort({ created_at: "descending" });
<<<<<<< HEAD
    console.log(user);
    res.render("post/posts", {
      posts: user.posts,
=======

    res.render("post/posts", {
      posts: user.posts,
      user,
>>>>>>> 82e3e10fb795eca6855d7c682dc3ed065f07f1c8
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
          $push: { posts: post._id },
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

router.put("/posts/create/:id", async (req, res) => {
  try {
    const { brigthness, contrast, saturation, vignette, filter } = req.body;
    let post = await PostModel.findById(req.params.id);
    const newUrl = cloudinary.url(`${post.filename}.jpg`, {
      transformation: [
<<<<<<< HEAD
        filter ? 
        { effect: `art:${filter}` } : "",
=======
        filter ? { effect: `art:${filter}` } : "",
>>>>>>> 82e3e10fb795eca6855d7c682dc3ed065f07f1c8
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
<<<<<<< HEAD
          
      ],
    });
  
=======
      ],
    });

>>>>>>> 82e3e10fb795eca6855d7c682dc3ed065f07f1c8
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
/* TODO
uploader.destroy("image"), 
delete image from the cloudinary
*/
router.post("/posts/delete/:id", async (req, res) => {
  try {
    console.log(req.body);
    await PostModel.findByIdAndDelete(req.params.id);
    res.redirect("/posts");
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
