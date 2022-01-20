const currentDate = document.querySelector("#date");
const currentTime = document.querySelector("#time");

const description = document.querySelectorAll(".descriptionView");

const deleteEvent = document.querySelector("#deleteEvent");
const deleteYes = document.querySelector("#deleteYes");
const geocoder = new google.maps.Geocoder();

const joinBtn = document.querySelector("#joinBtn");
const maybeBtn = document.querySelector("#maybeBtn");

const listMembers = document.getElementById("list-members");
// Limit the description text length
function limitTextStr(string, length) {
  return string.length > length ? string.substring(0, length) + "..." : string;
}

description.forEach((el) => {
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
  joinList.style.display = "none";
  maybeList.style.display = "none";
});

deleteNo.addEventListener("click", () => {
  confirmForDelete.style.display = "none";
});

// Button for JOIN or MAYBE
joinBtn.addEventListener("click", () => {
  joinList.style.display = "block";
  maybeList.style.display = "none";
  confirmForDelete.style.display = "none";
});

maybeBtn.addEventListener("click", () => {
  maybeList.style.display = "block";
  joinList.style.display = "none";
  confirmForDelete.style.display = "none";
});
function generateListItem(user) {
  const li = document.createElement("li");
  li.className = "user";
  li.innerHTML = `
    <p>${user.name}</p>
    `;
  return li;
}

// Joining member list
function displayUsers(users) {
  listMembers.innerHTML = "";
  users.join.forEach((user) => listMembers.appendChild(generateListItem(user)));
}
function appendUser(user) {
  listMembers.appendChild(generateListItem(user));
}
const handleClick = (e) => {
  const payloadUsers = {
    eventId: e.target.dataset.id,
    currentUserId: e.target.dataset.currentuser,
  };
  joinMember(e.target.dataset.id, payloadUsers).then(() => {
    getMember(e.target.dataset.id)
      .then((dbres) => displayUsers(dbres.data))
      .catch((e) => console.error(e));
  });
};

// AJAX
const getMember = (id) => axios.get(`/events/list/${id}`);

const joinMember = (id, payload) => axios.post(`/events/join/${id}`, payload);

joinBtn.addEventListener("click", handleClick);
