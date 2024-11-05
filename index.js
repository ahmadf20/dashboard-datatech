import { populateTable } from "./utils/table.js";
import { resetSortFilter, sortData } from "./utils/sort.js";
import {
  attachInputErrorListener,
  clearForm,
  getFormData,
  populateForm,
  submitForm,
  validateForm,
} from "./utils/form.js";
import { getData, setData as saveData } from "./utils/data.js";
import { fetchData } from "./utils/fetch.js";

let users = [];

const content = document.querySelector("#content");
populateTable(users, content);

const sortBy = document.querySelector("#sort-by");
const sortType = document.querySelector("#sort-type");

sortBy.addEventListener("change", (e) => {
  const newUsers = sortData(users, e.target.value, sortType.value).filter(
    (user) => filterData(user, filterStatus.value)
  );
  populateTable(newUsers, content);
});

sortType.addEventListener("change", (e) => {
  const newUsers = sortData(users, sortBy.value, e.target.value).filter(
    (user) => filterData(user, filterStatus.value)
  );
  populateTable(newUsers, content);
});

// Filter
const filterStatus = document.querySelector("#filter-status");

function filterData(user, status) {
  if (status === "all") return true;
  return user.status === (status === "active");
}

filterStatus.addEventListener("change", (e) => {
  const status = e.target.value;
  const newUsers = sortData(users, sortBy.value, sortType.value).filter(
    (user) => filterData(user, status)
  );

  populateTable(newUsers, content);
});

// Edit & Delete
content.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const id = e.target.parentElement.parentElement.id;
    const user = users.find((u) => Number(u.id) === Number(id));

    populateForm(user);
  }

  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.parentElement.parentElement.id;
    users = users.filter((u) => {
      return Number(u.id) !== Number(id);
    });

    saveData(users);
    populateTable(users, content);
  }
});

// Form
const form = document.querySelector("form");

form.addEventListener("reset", () => {
  clearForm();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = getFormData();
  const res = submitForm(user, users);

  if (!res) return;

  clearForm();

  resetSortFilter(sortBy, sortType, filterStatus);
  saveData(users);
  populateTable(users, content);
});

function initializeData() {
  const data = getData();

  if (data.length > 0) {
    users = data;
    populateTable(users, content);
  } else {
    fetchData((data) => {
      const userData = data.map((user) => ({
        id: user.id,
        name: user.login,
        email: user.login + "@gmail.com",
        age: user.id + 10,
        status: user.site_admin,
      }));

      users = userData;
      saveData(users);
      populateTable(users, content);
    });
  }
}

initializeData();
attachInputErrorListener();
