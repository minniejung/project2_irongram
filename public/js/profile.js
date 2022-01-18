console.log("Hello Momo");

const followBtn = document.getElementById("follow");

const handleClick = (e) => {
  console.log(e.target.dataset);
  const payload = {
    currentUserId: e.target.dataset.currentuser,
    followerId: e.target.dataset.id,
  };
  addFollower(e.target.dataset.id, payload);
};

// AJAX
const addFollower = (id, playload) => {
  axios.post(`/profile/add/${id}`, playload);
};

followBtn.addEventListener("click", handleClick);
