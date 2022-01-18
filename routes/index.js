const express = require("express");
const User = require("../models/user");
const router = express.Router();
const userModel = require("../models/user");

/* GET home page. */
function retrievesAllposts(users){
  let allPosts = []
  users.map(el=> allPosts.push(el.posts))
  return allPosts;
}
router.get("/", async (req, res, next) => {
  try {

    // const user = await userModel.findById(req.session.currentUser._id).populate('following posts');
    // let allPostsFollowers = retrievesAllposts(user.following)
    // let userPosts =  retrievesAllposts(user.posts);
    // console.log(userPosts)
 
    res.render("index", { users: await userModel.find(), title: "IronGram" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
