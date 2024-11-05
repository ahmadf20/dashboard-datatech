import { populateTable } from "./utils/table.js";
import { resetSortFilter, sortData } from "./utils/sort.js";
import {
  clearForm,
  getFormData,
  populateForm,
  submitForm,
} from "./utils/form.js";

let users = [
  {
    id: 1,
    name: "Ahmad Faaiz Al-auza'i",
    email: "ahmadfaaiz@gmail.com",
    age: 22,
    status: true,
  },
  {
    id: 2,
    name: "Zulfikar Salim Sukomulyo",
    email: "zulfikarsalim@gmail",
    age: 10,
    status: false,
  },
  {
    id: 3,
    name: "Puteri Sari",
    email: "puterisari@gmail",
    age: 18,
    status: true,
  },
  {
    id: 4,
    name: "Siti Fadilah",
    email: "siti_fadilah@gmail",
    age: 25,
    status: false,
  },
];

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

// Form
const form = document.querySelector("form");

form.addEventListener("reset", () => {
  clearForm();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = getFormData();
  submitForm(user, users);

  clearForm();

  resetSortFilter(sortBy, sortType, filterStatus);

  populateTable(users, content);
});

// Edit & Delete
content.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const id = e.target.parentElement.parentElement.id;
    const user = users.find((u) => u.id === Number(id));
    populateForm(user);
  }

  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.parentElement.parentElement.id;
    users = users.filter((u) => u.id !== Number(id));
    populateTable(users, content);
  }
});
