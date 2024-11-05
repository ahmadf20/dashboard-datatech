export const populateTable = (data, id) => {
  content.innerHTML = "";
  data.forEach((user) => {
    id.innerHTML += `
       <tr id="${user.id}">
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.age}</td>
          <td>${user.status ? "Active" : "Inactive"}</td>
          <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </td>
       </tr>
    `;
  });
};
