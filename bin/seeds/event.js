require("dotenv").config();
require("../../config/mongo");

const eventModel = require("../../models/Event");
// const userModel = require("../../models/user");

const events = [
  {
    title: "Friday Ironbeer Night 🍻",
    host_id: "61e6d83c5fee44b4caa9b01a",
    date: "2022-01-21",
    time: "19:00",
    address: "Deskopolitan Voltaire, 226 Bd Voltaire, 75011 Paris",
    price: "Free",
    description: "After work, Let's get some beer!",
    image:
      "https://res.cloudinary.com/minniejung/image/upload/v1642436540/irongram/wgnlzydawihcpaojxwen.png",
  },
  {
    title: "Chasing Home Concert 🎤",
    host_id: "61e6d83c5fee44b4caa9b01a",
    date: "2022-02-11",
    time: "21:30",
    address: "New Morning",
    price: "10 Euros",
    description: "Rock'n Roll 🎸",
    image:
      "https://res.cloudinary.com/minniejung/image/upload/v1642263897/irongram/eqdyaxsivcqyyjhl5tmt.jpg",
  },
  {
    title: "Picnic 🥖",
    host_id: "61e6d83c5fee44b4caa9b01a",
    date: "2022-05-01",
    time: "12:00",
    address: "Eiffel tower",
    price: "Food and drink",
    description: "Yay!",
    image:
      "https://res.cloudinary.com/minniejung/image/upload/v1642262848/irongram/tv7eqswalve131jwynft.jpg",
  },
  {
    title: "Cezanne / Kandinsky",
    host_id: "61e6d83c5fee44b4caa9b01a",
    date: "2022-01-31",
    time: "20:00",
    address: "Atelier des lumières",
    price: "16 Euros",
    description: "Art",
    image:
      "https://res.cloudinary.com/minniejung/image/upload/v1642264524/irongram/fydklmobr14ir5d6i3mc.jpg",
  },
  {
    title: "NON FUNGIBLE CONFERENCE 2022",
    host_id: "61e6d83c5fee44b4caa9b01a",
    date: "2022-04-04",
    time: "16:00",
    address:
      "Aavilhão Carlos Lopes Av. Sidónio Pais 16 1070-051 Lisboa Portugal",
    price: "50 Euros",
    description: "WAGMI",
    image:
      "https://res.cloudinary.com/minniejung/image/upload/v1642264757/irongram/tk4wydgoigquebwln219.jpg",
  },
];

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
