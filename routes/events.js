const router = require("express").Router();
const Event = require("../models/Event");
const uploader = require("./../config/cloudinary");
const moment = require("moment");

// Sort events by date (HP)
const sortedElementsByDateDesc = (items) =>
  Object.assign([], items).sort((a, b) => {
    let datea = new Date(a.date);
    let dateb = new Date(b.date);
    return datea - dateb;
  });

// GET Event List
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find().populate("host_id");
    const sortedEvent = sortedElementsByDateDesc(events);
<<<<<<< HEAD
=======
    console.log(sortedEvent);
>>>>>>> origin/user
    req.session.events = sortedEvent;
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
    res.render("event/event-create", {
      events: await Event.find(),
      user_id: res.locals.currentUser._id,
      css: ["event-form.css"],
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
      res.redirect("/events");
    } catch (e) {
      next(e);
    }
  }
);

// GET Event detail
router.get("/events/:id", async (req, res) => {
  try {
    const eventDetail = await Event.findById(req.params.id).populate(
      "host_id join"
    );
    res.render("event/event-single", {
      eventDetail,
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
    const eventToUpdate = await Event.findById(req.params.id).populate(
      "host_id"
    );
    eventToUpdate.date = moment(eventToUpdate.date).format("YYYY-MM-DD");
    const newDate = JSON.stringify(eventToUpdate.date).slice(1, 11);
    res.render("event/event-update", {
      eventToUpdate,
      newDate,
      css: ["event-form.css"],
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

// Join member
router.get("/events/list/:id", async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate("join");

    res.status(200).json(event);
  } catch (e) {
    next(e);
  }
});

router.post("/events/join/:id", async (req, res, next) => {
  try {
    const foundEvent = await Event.findOne({
      _id: req.params.id,
      join: { $in: req.body.currentUserId },
    });
    if (!foundEvent) {
      await Event.findByIdAndUpdate(
        req.params.id,
        {
          $push: { join: req.body.currentUserId },
        },
        { new: true }
      );
      res.status(201).send(" join ok");
    } else {
      await Event.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { join: req.body.currentUserId },
        },
        { new: true }
      );
      res.status(201).send("not join ok");
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
