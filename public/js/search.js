const searchBar = document.getElementById("search");
const listResult = document.getElementById("list-result-search");
const resultSearch = document.getElementById("result-search-bar");
//DOM
const displayResult = (users) => {
  listResult.innerHTML = "";
  if (!users || !search.value) {
    resultSearch.style.display = "none";
  } else {
    resultSearch.style.display = "block";
    users.forEach((el) => {
      listResult.appendChild(generateListUser(el));
    });
  }
};

const generateListUser = (user) => {
  const div = document.createElement("div");
  div.className = "users-result";
  div.innerHTML = `
  <a href="/profile/${user._id}" class="link-result">
  <img  class="img-search-result" src=${user.image} />
  <div class="user-result">
    ${user.name}
  </div></a>`;
  return div;
};
//HANDLE
const handleInoput = (e) => {
  const inputValue = { value: e.target.value };
  getUsers(inputValue)
    .then((dbRes) => displayResult(dbRes.data))
    .catch((e) => console.error(e));
};
//AJAX
const getUsers = (payload) => axios.post("/search", payload);

//LISTENNER
searchBar.oninput = handleInoput;
