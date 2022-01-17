const filters = document.querySelectorAll(".filter");
const image = document.querySelector("#image-uploaded");
const containerImage = document.getElementById("container-image");
const vignette = document.getElementById("vignette");
const btnVignette = document.getElementById("btn-vignette-reset");

let payload = {
  vignette: 0,
  filter: "",
  imageUrl: image.src,
};
//DOM MANIPULATION
function updateImageUrl(imageObj) {
  image.src = imageObj.urlMedia;
}

function listenOnUpdateFilters() {
  filters.forEach((btn) => (btn.onclick = handleFilter));
}
function listenOnUpdateVignette() {
  vignette.onchange = handleVignette;
}
//AJAX
const updateImage = (id) => axios.put(`/posts/create/${id}`, payload);

//Handlers
function handleFilter(e) {
  (payload.filter = e.target.dataset.filter),
    (payload.imageUrl = image.src),
    (payload.fileName = image.dataset.fileName),
    console.log(payload);
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
//EVENTS LISTENERS
btnVignette.addEventListener("click", () => {
  payload.vignette = null;
  updateImage(image.dataset.id, payload);
});
listenOnUpdateFilters();
listenOnUpdateVignette();
