const { model, Schema } = require("mongoose");

const postModel = new Schema({
  urlMedia: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "like" }],
  filename: String,
  filters: {
    type: String,
    enum: [
      "al_dente",
      "athena",
      "audrey",
      "aurora",
      "daguerre",
      "eucalyptus",
      "fes",
      "frost",
      "hairspray",
      "hokusai",
      "incognito",
      "linen",
      "peacock",
      "primavera",
      "quartz",
      "red_rock",
      "refresh",
      "sizzle",
      "sonnet",
      "ukulele",
      "zorro",
    ],
  },
  tags: { type: Schema.Types.ObjectId, ref: "tags" },
});

const Post = model("post", postModel);

module.exports = Post;
