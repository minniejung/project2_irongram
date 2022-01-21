const modals = document.querySelectorAll(".modals");
const btnModal = document.querySelectorAll(".btn-modal");
const closeBtn = document.querySelectorAll(".close");

const modalJoin = document.querySelector(".modalJoin");
const joinBtn = document.querySelectorAll(".modalJoinBtn");
const closeModalBtn = document.querySelectorAll(".closeJoinModal");
const listMembers = document.querySelector("#list-members");

// Event modal

function modalOn(btn) {
  modalOff();
  const index = btn.getAttribute("index");
  const modal = document.querySelector(`.modals[index="${index}"]`);
  modal.style.display = "flex";
}

// function modalOff() {
//   modal.style.display = "none";
// }

function modalOff() {
  // const popup = item.parentElement.parentElement.parentElement;
  // console.log("popup :>> ", popup);
  modals.forEach((modal) => {
    modal.style.display = "none";
  });
}

btnModal.forEach((el) => {
  el.addEventListener("click", (e) => {
    modalOn(el);
  });
});

closeBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    modalOff(el);
  });
});

// modals.onclick = (e) => {
//   const evTarget = e.target;
//   if (evTarget.classList.contains("modal-overlay")) {
//     modalOff();
//   }
// };

// modal for join list

function joinModalOn() {
  modalJoin.style.display = "flex";
}

function joinModalOff() {
  modalJoin.style.display = "none";
}

joinBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    joinModalOn();
  });
});

closeModalBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    joinModalOff();
  });
});

// new (editing)

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
