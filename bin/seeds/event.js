require("dotenv").config();
require("../../config/mongo");

const eventModel = require("../../models/Event");
// const userModel = require("../../models/user")

// const events = [];

(async function () {
  try {
    await eventModel.deleteMany();
    const eventsCreated = await eventModel.insertMany(events);
    console.log(eventsCreated);
    process.exit();
  } catch (error) {
    consolr.error(error);
  }
})();
