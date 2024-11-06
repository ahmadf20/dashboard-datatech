import { useState } from "react";
import { sortData } from "../utils/sort";

export const Table = ({ users = [], onEditUser, onDeleteUser }) => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortType, setSortType] = useState("asc");

  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    return user.status === (filter === "active");
  });

  const sortedUsers = sortData(filteredUsers, sortBy, sortType);

  return (
    <>
      <div className="filter-container">
        <div>
          Status:
          <select title="status" onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          Sort By:
          <select title="sort" onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="status">Status</option>
          </select>
          <select title="type" onChange={(e) => setSortType(e.target.value)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table border={1}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.status ? "Active" : "Inactive"}</td>
                <td>
                  <div className="flex">
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        onEditUser(user);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => onDeleteUser(user)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
