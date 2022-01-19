const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const PostModel = require("../models/post");


/* GET home page. */
const sortedElementsByDateDesc = (items) =>
  Object.assign([], items).sort((a, b) => {
    let datea = new Date(a.created_at);
    let dateb = new Date(b.created_at);
    return dateb - datea;
  });
getImagesFromSuscribed = (images, users) => {
  const imagesFromSuscribed = [];
  for (var i = 0; i < images.length; i++) {
    for (var j = 0; j < users.length; j++) {
      if (images[i].user_id.toString() === users[j].toString()) {
        imagesFromSuscribed.push(images[i]);
      }
    }
  }

  return imagesFromSuscribed;
}
router.get("/", async (req, res, next) => {
  try {
    const allPosts = await PostModel.find();
    const user = await userModel.findById(req.session.currentUser._id);
    user.following.push(user._id);
    const postsFollowings = getImagesFromSuscribed(allPosts, user.following);
    const sortedPosts = sortedElementsByDateDesc(postsFollowings);

    res.render("index", {
      users: await userModel.find(),
      sortedPosts,
      title: "IronGram",
    });
  } catch (e) {
    next(e);
  }
})

module.exports = router;
