const modals = document.querySelectorAll(".modals");
const btnModal = document.querySelectorAll(".btn-modal");
const closeBtn = document.querySelectorAll(".close");

const modalJoin = document.querySelector(".modalJoin");
const joinBtn = document.querySelectorAll(".modalJoinBtn");
const closeModalBtn = document.querySelectorAll(".closeJoinModal");

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
