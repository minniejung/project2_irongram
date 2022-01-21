let likeBtns = document.querySelectorAll(".btn-like");

const displayLikesNumbers = (likes, likesCount) => {
  likesCount.innerHTML = `${likes} Likes`;
};

// Like
const listenOnLikeBtn = (e) => {
  const payloadUsers = {
    currentUserId: e.target.dataset.currentuser,
    likesId: e.target.dataset.id,
    postId: e.target.dataset.postid,
  };
  const likesCountHTML = e.target.parentElement.querySelector(".likes-count");
  addLike(e.target.dataset.id, payloadUsers).then((dbRes) => {
    togglingLikeBtn(dbRes.data.likedPost, e.target);
    getLike(payloadUsers.postId)
      .then((likesCount) =>
        displayLikesNumbers(likesCount.data, likesCountHTML)
      )
      .catch((e) => console.error(e));
  });
};
const showEvent = (e) => console.log(e);
const getLike = (id) => axios.get(`/like/${id}`);
const addLike = (id, payload) => axios.post(`/addlike/${id}`, payload);

likeBtns.forEach((likeBtn) => {
  likeBtn.addEventListener("click", listenOnLikeBtn);
});

const togglingLikeBtn = (status, button) => {
  const css = status ? "fas fa-heart" : "far fa-heart";
  button.className = css;
};
