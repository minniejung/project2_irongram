console.log("Hello Momo");

const followBtn = document.getElementById("follow");
const followingBtn = document.getElementById("following");
const followingCount = document.getElementById("following-count");
const followersCount = document.getElementById("followers-count");

const displayFollowerNumbers = (followers) => {
  followersCount.innerHTML = followers;
};

const handleClick = (e) => {
  const payloadUsers = {
    currentUserId: e.target.dataset.currentuser,
    followedId: e.target.dataset.id,
  };
  addFollower(e.target.dataset.id, payloadUsers).then((dbRes) => {
    
    followBtn.innerHTML = dbRes.data.followedUser ? 'Unfollow' : 'Follow';
    getFollower(payloadUsers.followedId)
      .then((followersCount) => displayFollowerNumbers(followersCount.data))
      .catch((e) => console.error(e));
  });
};

// AJAX
const getFollower = (id) => axios.get(`/follower/${id}`);

const addFollower = (id, payload) => axios.post(`/profile/add/${id}`, payload);

followBtn.addEventListener("click", handleClick);
