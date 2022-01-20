const router = require("express").Router();

const UserModel = require("../models/user");

router.post("/search", async (req, res, next) => {
  try {
    const queryString = req.body.value;
    const queryStrings = queryString.split(" ");
    allQueries = [];
    queryStrings.forEach((element) => {
      allQueries.push({ name: { $regex: String(element) } });
    });
    const users = await UserModel.find({
      name: { $regex: String(req.body.value), $options: "i" },
    });
    if (!users || users.length === 0)
      res.status(400).send({ error: "No task was found" });
    res.status(201).json(users);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
