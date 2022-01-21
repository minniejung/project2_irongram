const description = document.querySelectorAll(".descriptionView");

const deleteEvent = document.querySelector("#deleteEvent");
const deleteYes = document.querySelector("#deleteYes");

const joinBtn = document.querySelector("#joinBtnInDetail");

const listMembers = document.querySelector("#list-members");
const closeJoinList = document.querySelector("#closeJoinList");

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
  joinList.style.display = "none";
});

deleteNo.addEventListener("click", () => {
  confirmForDelete.style.display = "none";
});

// Button for JOIN
joinBtn.addEventListener("click", () => {
  console.log("Join btn is working");
  joinList.style.display = "block";
  confirmForDelete.style.display = "none";
});

closeJoinList.addEventListener("click", () => {
  joinList.style.display = "none";
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
