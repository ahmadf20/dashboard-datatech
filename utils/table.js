export const populateTable = (data, id) => {
  data.forEach((user) => {
    id.innerHTML += `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>${user.status ? "aktif" : "tidak aktif"}</td>
    `;
  });
};
