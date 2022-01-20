const searchBar = document.getElementById("search");
const listResult = document.getElementById("list-result-search");
//DOM

const displayResult = (users) => {
  listResult.innerHTML = "";
  users.forEach((el) => {
    listResult.appendChild(generateListUser(el));
  });
};

const generateListUser = (user) => {
  const li = document.createElement("li");
  li.className = "user-result";
  li.innerHTML = user.name;
  return li;
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
