const btnDeleteImage = document.getElementById("btn-delete-image");
console.log(btnDeleteImage);
const deleteImage = (id, payload) => axios.post(`/posts/delete/${id}`, payload);
//Handlers
function handleDeleteImage(e) {
  const payload = {
    idPost: e.target.dataset.id,
    filename: e.target.dataset.filename,
  };
  deleteImage(payload.idPost, payload);
}

btnDeleteImage.onclick = handleDeleteImage;
