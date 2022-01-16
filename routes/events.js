const router = require("express").Router();
const Event = require("../models/Event");
// const userModel = require("../models/user");
const uploader = require("./../config/cloudinary");

// GET Event List
router.get("/events", async (req, res) => {
  try {
    res.render("event/events", {
      events: await Event.find(),
    });
  } catch (e) {
    console.error(e);
  }
});

// GET Event create

router.get("/events/create", async (req, res) => {
  try {
    res.render("event/event-create", {
      events: await Event.find(),
    });
  } catch (e) {
    console.error(e);
  }
});

// POST Event create
router.post(
  "/events/create",
  uploader.single("image"),
  async (req, res, next) => {
    try {
      const { title, host_id, date, time, address, description, price } =
        req.body;
      console.log("** CONSOLE req.body >>>", req.body);
      let image = req.file.path;

      const createdEvent = await Event.create({
        title,
        host_id,
        date,
        time,
        address,
        description,
        price,
        image,
      });
      console.log("** CONSOLE createdEvent >>>", createdEvent);
      res.redirect("/events");
    } catch (e) {
      next(e);
    }
  }
);

// GET Event update
router.get("/events/update/:id", async (req, res) => {
  try {
    console.log("** CONSOLE req.params.id >>>", req.params.id);
    const eventToUptate = await Event.findById(req.params.id);
    res.render("event/event-update", { eventToUptate });
  } catch (e) {
    console.error(e);
  }
});

// POST Event update
router.post(
  "/events/update/:id",
  uploader.single("image"),
  async (req, res, next) => {
    try {
      console.log("** CONSOLE req.params.id >>>", req.params.id);
      const { id } = req.params;
      const {
        title,
        host_id,
        date,
        time,
        address,
        description,
        price,
        existingImage,
      } = req.body;
      let newImage;
      if (req.file) newImage = req.file.path;
      else newImage = existingImage;
      const updatedEvent = await Event.findByIdAndUpdate(
        id,
        {
          title,
          host_id,
          date,
          time,
          address,
          description,
          price,
          image: newImage,
        },
        { new: true }
      );
      console.log("** CONSOLE updatedEvent >>>", updatedEvent);
      res.redirect("/events");
    } catch (e) {
      next(e);
    }
  }
);

// POST Event delete
router.get("/events/delete/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect("/events");
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
