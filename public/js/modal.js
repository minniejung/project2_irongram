const modal = document.querySelector("#modal");
const btnModal = document.querySelectorAll(".btn-modal");
const closeBtn = document.querySelectorAll(".close");

const modalJoin = document.querySelector(".modalJoin");
const joinBtn = document.querySelectorAll(".joinBtn");
const modalWindow = document.querySelector(".modal-window");

// Event modal

function modalOn(item) {
  const popup = item.parentElement.childNodes[1];
  popup.style.display = "flex";
}

// function modalOff() {
//   modal.style.display = "none";
// }

function modalOff(item) {
  const popup = item.parentElement.parentElement.parentElement;
  // console.log("popup :>> ", popup);
  popup.style.display = "none";
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

modal.onclick = (e) => {
  const evTarget = e.target;
  console.log("hi");
  if (evTarget.classList.contains("modal-overlay")) {
    modalOff();
  }
};

// modal for join list

console.log(modalJoin);
function modalInModalOn() {
  modalJoin.style.display = "flex";
}

joinBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    modalInModalOn();
  });
});
