const filters = document.querySelectorAll(".filter");
const image = document.querySelector("#image-uploaded");
const containerImage = document.getElementById("container-image");
const vignette = document.getElementById("vignette");
const brigthness = document.getElementById("brigthness");
const saturation = document.getElementById("saturation");
const contrast = document.getElementById("contrast");
const btnVignette = document.getElementById("btn-vignette-reset");
const btnBrightness = document.getElementById("btn-brigthness-reset");
const btnSaturation = document.getElementById("btn-brigthness-reset");
const btnContrast = document.getElementById("btn-brigthness-reset");
const inputUpload = document.getElementById("upload-btn");

let payload = {
  vignette: 0,
  filter: "",
  imageUrl: image ? image.src : null,
  brigthness: 0,
  contrast: 0,
  saturation: 0,
};

//DOM MANIPULATION
function updateImageUrl(imageObj) {
  image.src = imageObj.urlMedia;
}

function listenOnUpdateFilters() {
  filters.forEach((btn) => (btn.onclick = handleFilter));
}

function listenOnUpdateVignette() {
  vignette.oninput = handleVignette;
}

function listenOnUpdateBrigthness() {
  brigthness.oninput = handleBrightness;
}
function listenOnUpdateSaturation() {
  saturation.oninput = handleSaturation;
}
function listenOnUpdateContrast() {
  contrast.oninput = handleContrast;
}
//AJAX
const updateImage = (id) => axios.put(`/posts/update/${id}`, payload);

function handleFilter(e) {

  (payload.filter = e.target.dataset.filter),
    (payload.imageUrl = image.src),
    (payload.fileName = image.dataset.fileName),
    updateImage(image.dataset.id, payload)
      .then((success) => updateImageUrl(success.data))
      .catch((err) => console.error(err));
}
function handleVignette(e) {
  payload.vignette = vignette.value;
  updateImage(image.dataset.id, payload)
    .then((success) => updateImageUrl(success.data))
    .catch((err) => console.error(err));
}
function handleBrightness() {
  payload.brigthness = brigthness.value;
  updateImage(image.dataset.id, payload)
    .then((success) => updateImageUrl(success.data))
    .catch((err) => console.error(err));
}
function handleContrast() {
  payload.contrast = contrast.value;
  updateImage(image.dataset.id, payload)
    .then((success) => updateImageUrl(success.data))
    .catch((err) => console.error(err));
}
function handleSaturation() {
  payload.saturation = saturation.value;
  updateImage(image.dataset.id, payload)
    .then((success) => updateImageUrl(success.data))
    .catch((err) => console.error(err));
}

//EVENTS LISTENERS
btnVignette.addEventListener("click", () => {
  payload.vignette = null;
  updateImage(image.dataset.id, payload)
    .then((success) => updateImageUrl(success.data))
    .catch((err) => console.error(err));
});
btnBrightness.addEventListener("click", () => {
  payload.brigthness = null;
  updateImage(image.dataset.id, payload)
    .then((success) => updateImageUrl(success.data))
    .catch((err) => console.error(err));
});
btnSaturation.addEventListener("click", () => {
  payload.saturation = null;
  updateImage(image.dataset.id, payload)
    .then((success) => updateImageUrl(success.data))
    .catch((err) => console.error(err));
});
btnContrast.addEventListener("click", () => {
  payload.constrast = null;
  updateImage(image.dataset.id, payload)
    .then((success) => updateImageUrl(success.data))
    .catch((err) => console.error(err));
});

listenOnUpdateFilters();
listenOnUpdateVignette();
listenOnUpdateBrigthness();
listenOnUpdateContrast();
listenOnUpdateSaturation();
