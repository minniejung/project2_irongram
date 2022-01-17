const { model, Schema } = require("mongoose");

const eventSchema = new Schema({
  title: String,
  host_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  address: {
    type: String,
  },
  description: String,
  price: {
    type: String,
    default: "Free",
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/minniejung/image/upload/v1642248054/irongram/events_medium_vijplm.jpg",
  },
});

const Event = model("event", eventSchema);

module.exports = Event;
