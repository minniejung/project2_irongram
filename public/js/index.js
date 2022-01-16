const filters = document.querySelectorAll(".filter");
const image = document.querySelector("#image-uploaded");
const containerImage = document.getElementById("container-image");
const vignette = document.getElementById("vignette");
//DOM MANIPULATION
function updateImageUrl(imageObj) {
  image.src = imageObj.urlMedia;
}

function listenOnUpdateFilters() {
  filters.forEach((btn) => (btn.onclick = handleFilter));
}
function listenOnUpdateVignette() {
  vignette.onclick = handleFilter;
}
//AJAX
const updateImage = (id, payload) => axios.put(`/posts/create/${id}`, payload);

//Handlers
function handleFilter(e) {
  const payload = {
    filter: e.target.dataset.filter,
    imageUrl: image.src,
    fileName: image.dataset.fileName,
  };
  updateImage(image.dataset.id, payload)
    .then((success) => updateImageUrl(success.data))
    .catch((err) => console.error(err));
}
//EVENTS LISTENERS

listenOnUpdateFilters();
listenOnUpdateVignette();
