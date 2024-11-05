function getData() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function setData(data) {
  localStorage.setItem("users", JSON.stringify(data));
}

export { getData, setData };
