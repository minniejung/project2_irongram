require("dotenv").config();
require("../../config/mongo");

const PostModel = require("../../models/post");

const posts = [
  {
    urlMedia:
      "https://res.cloudinary.com/dtjpoyvv5/image/upload/e_art:daguerre/v1/irongram/tzeifpdkvehgwjywnrff.jpg",
    likes: null,
    filters: "zorro",
    tags: null,
  },
  {
    urlMedia:
      "https://res.cloudinary.com/dtjpoyvv5/image/upload/e_art:zorro/v1/irongram/yrdfv5ulxnzczerycdvj.jpg",
    likes: null,
    filters: "eucalyptus",
    tags: null,
  },
  {
    urlMedia:
      "https://res.cloudinary.com/dtjpoyvv5/image/upload/e_art:sizzle/v1/irongram/m2ytzt2qyo6s0d5dryzh.jpg",
    likes: null,
    filters: "linen",
    tags: null,
  },
];

(async function () {
  try {
    await PostModel.deleteMany();
    await PostModel.insertMany(posts);
    console.log("created posts");
    process.exit();
  } catch (err) {
    console.log(err);
  }
})();
