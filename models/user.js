const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://minecraft.fr/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png",
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: String,
  role: {
    type: String,
    enum: ["unser", "admin"],
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  favoritePost: [
    {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  //   ? Populate ? Modeles à prévoir ?
  //   followers: [
  //     {
  //       type: null,
  //     },
  //   ],
  //   following: null,
});

const User = model("user", userSchema);

module.exports = User;
