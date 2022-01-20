const router = require("express").Router();

const UserModel = require("../models/user");

router.post("/search", async (req, res, next) => {
  try {
    const users = await UserModel.find({
      name: { $regex: String(req.body.value), $options: "i" },
    });
    res.status(201).json(users);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
