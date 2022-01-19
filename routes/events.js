const router = require("express").Router();
const Event = require("../models/Event");
// const userModel = require("../models/user");
const uploader = require("./../config/cloudinary");
const moment = require("moment");

// GET Event List
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find().populate("host_id");
    req.session.events = events;
    console.log(req.session.event);
    res.render("event/events", {
      css: ["event.css"],
      js: ["event.js", "event-moment.js"],
    });
  } catch (e) {
    console.error(e);
  }
});

// GET Event create

router.get("/events/create", async (req, res) => {
  try {
    console.log(
      "** CONSOLE Current user name >>> ",
      res.locals.currentUser.name
    );
    // console.log(req.body.date);
    res.render("event/event-create", {
      events: await Event.find(),
      user_id: res.locals.currentUser._id,
      css: ["event.css"],
      js: ["event.js", "event-moment.js"],
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
      console.log("** CONSOLE req.body.date >>>", req.body.date);
      let image;
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

// GET Event detail
router.get("/events/:id", async (req, res) => {
  try {
    // console.log("** CONSOLE req.params.id >>>", req.params.id);
    const eventDetail = await Event.findById(req.params.id).populate("host_id");
    const newDate = moment(eventDetail.date).format("YYYY-MM-DD");
    res.render("event/event-single", {
      eventDetail,
      newDate,
      css: ["event.css"],
      js: ["event.js", "event-moment.js"],
    });
  } catch (e) {
    console.error(e);
  }
});

// GET Event update
router.get("/events/update/:id", async (req, res) => {
  try {
    console.log("** CONSOLE req.params.id >>>", req.params.id);
    const eventToUpdate = await Event.findById(req.params.id).populate(
      "host_id"
    );

    console.log("** CONSOLE date to update >>>", eventToUpdate.date);
    eventToUpdate.date = moment(eventToUpdate.date).format("YYYY-MM-DD");
    eventToUpdate.date = JSON.stringify(eventToUpdate.date).slice(1, 11);
    const newDate = JSON.stringify(eventToUpdate.date).slice(1, 11);
    console.log(newDate);
    res.render("event/event-update", {
      eventToUpdate,
      newDate,
      css: ["event.css"],
    });
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
