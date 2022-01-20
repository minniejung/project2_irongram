const modal = document.querySelectorAll(".modal");
const btnModal = document.querySelectorAll(".btn-modal");
const closeBtn = document.querySelectorAll(".close");

const joinList = document.querySelectorAll(".joinList");
const joinBtn = document.querySelectorAll(".joinBtn");

// Event modal

function modalOn(item) {
  const popup = item.parentElement.childNodes[1];
  popup.style.display = "flex";
}

function modalOff(item) {
  const popup = item.parentElement.parentElement.parentElement;
  // console.log(popup);
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

// modal.forEach((el) => {
//   el.addEventListener("click", (e) => {
//     const evTarget = e.target;
//     console.log(evTarget);
//     if (evTarget.classList.contains("modal-overlay")) {
//       modalOff(el);
//     }
//   });
// });

//

log(joinList);
function modalInModalOn() {
  joinList.style.display = "flex";
}

joinBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    modalInModalOn(el);
  });
});
