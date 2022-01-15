require("dotenv").config();
require("../../config/mongo");

const PostModel = require("../../models/post");

const posts = [
  {
    urlMedia: "test.jpg",
    likes: null,
    filters: "zorro",
    tags: null,
  },
  {
    urlMedia: "test2.jpg",
    likes: null,
    filters: "eucalyptus",
    tags: null,
  },
  {
    urlMedia: "test3.jpg",
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
