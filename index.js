import { populateTable } from "./utils/table.js";
import { sortData } from "./utils/sort.js";

const data = [
  {
    name: "Ahmad Faaiz Al-auza'i",
    email: "ahmadfaaiz@gmail.com",
    age: 22,
    status: true,
  },
  {
    name: "Zulfikar Salim Sukomulyo",
    email: "zulfikarsalim@gmail",
    age: 10,
    status: false,
  },
  {
    name: "Puteri Sari",
    email: "puterisari@gmail",
    age: 18,
    status: true,
  },
  {
    name: "Siti Fadilah",
    email: "siti_fadilah@gmail",
    age: 25,
    status: false,
  },
];

let users = [...data];

const content = document.querySelector("#content");
populateTable(users, content);

const sortBy = document.querySelector("#sort-by");
const sortType = document.querySelector("#sort-type");

sortBy.addEventListener("change", (e) => {
  users = sortData(users, e.target.value, sortType.value);
  content.innerHTML = "";
  populateTable(users, content);
});

sortType.addEventListener("change", (e) => {
  users = sortData(users, sortBy.value, e.target.value);
  content.innerHTML = "";
  populateTable(users, content);
});

// Filter
const filterStatus = document.querySelector("#filter-status");

filterStatus.addEventListener("change", (e) => {
  const status = e.target.value;
  const filteredData = sortData(data, sortBy.value, sortType.value).filter(
    (user) => {
      if (status === "all") return true;
      return user.status === (status === "active");
    }
  );

  content.innerHTML = "";
  users = [...filteredData];

  populateTable(users, content);
});
