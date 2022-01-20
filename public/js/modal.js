const modal = document.getElementById("modal");
const btnModal = document.getElementById("btn-modal");
const closeBtn = modal.querySelector(".close");

function modalOn() {
  modal.style.display = "flex";
}

function modalOff() {
  modal.style.display = "none";
}

btnModal.addEventListener("click", (e) => {
  modalOn();
});

closeBtn.addEventListener("click", (e) => {
  modalOff();
});

function isModalOn() {
  return modal.style.display === "flex";
}

modal.addEventListener("click", (e) => {
  const evTarget = e.target;
  if (evTarget.classList.contains("modal-overlay")) {
    modalOff();
  }
});

window.addEventListener("keyup", (e) => {
  if (isModalOn() && e.key === "Escape") {
    modalOff();
  }
});
