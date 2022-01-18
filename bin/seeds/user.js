require("dotenv").config();
require("../../config/mongo");

const userModel = require("../../models/user");

const users = [
  {
    name: "Minyoung",
    lastname: "JUNG",
    email: "mignon@scoby.com",
    password: "scobyscoby",
    bio: "Hiiiiii",
  },
  {
    name: "Henri",
    lastname: "RIGOU",
    email: "beer@paresseux.com",
    password: "arigato",
    bio: "Arigato",
  },
  {
    name: "Mélodie",
    lastname: "SH",
    email: "Memelmelemle@mel.mel",
    password: "HelloWorld",
    bio: "Hello hello",
  },
];

(async function () {
  try {
    await userModel.deleteMany();
    await userModel.insertMany(users);
    console.log("Created users");
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
