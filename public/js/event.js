const currentDate = document.querySelector("#date");
const currentTime = document.querySelector("#time");

const description = document.querySelectorAll(".descriptionView");

const deleteEvent = document.querySelector("#deleteEvent");
const deleteYes = document.querySelector("#deleteYes");

const joinBtn = document.querySelector("#joinBtn");
const maybeBtn = document.querySelector("#maybeBtn");

// Limit the description text length
function limitTextStr(string, length) {
  return string.length > length ? string.substring(0, length) + "..." : string;
}

description.forEach((el) => {
  // console.log(el.innerHTML);
  el.innerHTML = limitTextStr(el.innerHTML, 200);
});

// Event Form
// API - Google map - auto complete
function initialize() {
  const input = document.getElementById("address");
  new google.maps.places.Autocomplete(input);
}
google.maps.event.addDomListener(window, "load", initialize);

// Confrim msg before delete an event
deleteEvent.addEventListener("click", () => {
  confirmForDelete.style.display = "block";
});

deleteNo.addEventListener("click", () => {
  confirmForDelete.style.display = "none";
});

// Button for JOIN or MAYBE
joinBtn.addEventListener("click", () => {
  console.log("a");
  joinList.style.display = "block";
  maybeList.style.display = "none";
});

maybeBtn.addEventListener("click", () => {
  console.log("b");
  maybeList.style.display = "block";
  joinList.style.display = "none";
});
