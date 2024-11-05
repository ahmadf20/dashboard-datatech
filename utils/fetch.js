const loader = document.querySelector("#loader");
const error = document.querySelector("#error");

function fetchData(onSuccess) {
  loader.style.display = "block";

  fetch("https://api.github.com/users")
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((err) => {
      const message = "Failed to fetch data: " + err.message;

      error.innerHTML = message;
      alert(message);
    })
    .finally(() => {
      loader.style.display = "none";
    });
}

export { fetchData };
