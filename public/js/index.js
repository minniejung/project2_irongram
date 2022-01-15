const filters = document.querySelectorAll(".filter");
const image = document.querySelector("#image-uploaded");
const containerImage = document.getElementById("container-image");

//DOM MANIPULATION
function updateImageOnPage(image) {
  console.log(image);
  //  containerImage.innerHTML =
}

function listenOnUpdateFilters() {
  filters.forEach((btn) => (btn.onclick = handleFilter));
}

//AJAX
const updateImage = (id, payload) => axios.put(`/posts/create/${id}`, payload);

//Handlers
function handleFilter(e) {
  const filter = e.target.dataset.filter;
  const payload = {
    filter,
    imageUrl: image.src,
    fileName: image.dataset.fileName,
  };
  updateImage(image.dataset.id, payload)
    .then((success) => updateImageOnPage(success.data))
    .catch((err) => console.log(err));
}
//EVENTS LISTENERS

listenOnUpdateFilters();
