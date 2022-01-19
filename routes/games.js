const router = require("express").Router();

router.get("/games", async (req, res) => {
  res.render("game/games", { css: ["game.css"] });
});

module.exports = router;
