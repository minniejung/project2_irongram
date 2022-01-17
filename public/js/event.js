const currentDate = document.querySelector("#dateNow");
const currentTime = document.querySelector("#timeNow");
const description = document.querySelectorAll(".descriptionView");
const deleteEvent = document.querySelector("#deleteEvent");
const deleteYes = document.querySelector("#deleteYes");

console.log(dateToUpdate);

// Limit the description text length
function limitTextStr(string, length) {
  return string.length > length ? string.substring(0, length) + "..." : string;
}

description.forEach((el) => {
  // console.log(el.innerHTML);
  el.innerHTML = limitTextStr(el.innerHTML, 200);
});

// To show current day & time
const today = moment().format("YYYY-MM-DD");
currentDate.value = today;

const timeNow = moment().format("HH:mm");
currentTime.value = timeNow;

// Event Form
// API - Google map - auto complete
function initialize() {
  const input = document.getElementById("address");
  new google.maps.places.Autocomplete(input);
}
google.maps.event.addDomListener(window, "load", initialize);

// Conrim msg before delete an event
deleteEvent.addEventListener("click", () => {
  confirmForDelete.style.display = "block";
});

deleteNo.addEventListener("click", () => {
  confirmForDelete.style.display = "none";
});
