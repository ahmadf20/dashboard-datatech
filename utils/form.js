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

  document.querySelector(".input-error.name").textContent = "";
  document.querySelector(".input-error.email").textContent = "";
  document.querySelector(".input-error.age").textContent = "";
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
  if (!validateForm(user)) return false;

  if (user.id) {
    const index = users.findIndex((u) => u.id === Number(user.id));
    users[index] = user;
  } else {
    user.id = Date.now();
    users.push(user);
  }

  return true;
}

function validateForm(user) {
  let isValid = true;

  const errorName = document.querySelector(".input-error.name");
  const errorEmail = document.querySelector(".input-error.email");
  const errorAge = document.querySelector(".input-error.age");

  errorName.textContent = "";
  errorEmail.textContent = "";
  errorAge.textContent = "";

  if (!user.name) {
    errorName.textContent = "Name cannot be empty";
    isValid = false;
  }

  if (!user.email) {
    errorEmail.textContent = "Email cannot be empty";
    isValid = false;
  }

  if (!user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errorEmail.textContent = "Email is not valid";
    isValid = false;
  }

  if (!user.age) {
    errorAge.textContent = "Age cannot be empty";
    isValid = false;
  }

  if (user.age < 0) {
    errorAge.textContent = "Age must be a positive number";
    isValid = false;
  }

  return isValid;
}

function attachInputErrorListener() {
  const nameField = document.querySelector("#name");
  const emailField = document.querySelector("#email");
  const ageField = document.querySelector("#age");

  nameField.addEventListener("input", () => {
    validateForm(getFormData());
  });

  emailField.addEventListener("input", () => {
    validateForm(getFormData());
  });

  ageField.addEventListener("input", () => {
    validateForm(getFormData());
  });
}

export {
  populateForm,
  clearForm,
  getFormData,
  submitForm,
  validateForm,
  attachInputErrorListener,
};
