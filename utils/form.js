function populateForm(user) {
  document.getElementById("id").value = user.id;
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("age").value = user.age;
  document.getElementById("status").checked = user.status;
}

function clearForm() {
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("age").value = "";
  document.getElementById("status").checked = false;
}

function getFormData() {
  return {
    id: document.getElementById("id").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value,
    status: document.getElementById("status").checked,
  };
}

function submitForm(user, users) {
  if (user.id) {
    const index = users.findIndex((u) => u.id === Number(user.id));
    users[index] = user;
  } else {
    user.id = Date.now();
    users.push(user);
  }
}

function validateForm(user) {
  if (!user.name || !user.email || !user.age) {
    alert("Please fill in all fields");
    return false;
  }

  if (user.age < 1 || user.age > 99) {
    alert("Age must be between 1 and 99");
    return false;
  }

  if (user.email.indexOf("@") === -1) {
    alert("Please enter a valid email");
    return false;
  }

  return true;
}

export { populateForm, clearForm, getFormData, submitForm };
