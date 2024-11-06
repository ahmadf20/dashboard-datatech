function getData() {
  return JSON.parse(localStorage.getItem("users-data")) || [];
}

function setData(data) {
  localStorage.setItem("users-data", JSON.stringify(data));
}

export { getData, setData };
