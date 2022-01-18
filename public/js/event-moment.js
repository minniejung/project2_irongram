const currentDate = document.querySelector("#date");
const currentTime = document.querySelector("#time");

// To show current day & time
const today = moment().format("YYYY-MM-DD");
currentDate.value = today;
const time = moment().format("HH:mm");
currentTime.value = time;
