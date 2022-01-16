const date = document.querySelector("#date");
const time = document.querySelector("#time");

const today = moment().format("YYYY-MM-DD");
date.value = today;

const currentTime = moment().format("HH:mm");
time.value = currentTime;

console.log(today);
