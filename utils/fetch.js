const loader = document.querySelector("#loader");
const error = document.querySelector("#error");

function fetchData(onSuccess) {
  loader.style.display = "block";

  fetch("https://api.github.com/users")
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((err) => {
      error.innerHTML = "Failed to fetch data: " + err.message;
    })
    .finally(() => {
      loader.style.display = "none";
    });
}

export { fetchData };
