import { useCallback, useEffect, useState } from "react";

const DefaultForm = {
  name: "",
  email: "",
  age: "",
  status: false,
};

export const Form = ({ userData, onSaveUser, clearUser }) => {
  const [form, setForm] = useState(DefaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const initializeForm = () => {
      setErrors({});
      setForm(userData ?? DefaultForm);
    };

    initializeForm();
  }, [userData]);

  const isUpdating = userData ? true : false;

  const clearForm = useCallback(() => {
    setForm(DefaultForm);
    clearUser();
    setErrors({});
  }, [clearUser]);

  const validateForm = (user) => {
    const tempErrors = {};

    if (!user.name) tempErrors.name = "Name cannot be empty";
    if (!user.email) tempErrors.email = "Email cannot be empty";
    if (!user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      tempErrors.email = "Invalid email format";
    }
    if (!user.age) tempErrors.age = "Age cannot be empty";
    if (user.age < 0) tempErrors.age = "Age cannot be negative";

    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { id: userData?.id ?? Date.now(), ...form };

    const errors = validateForm(newUser);
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    onSaveUser(newUser);
    clearForm();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    validateForm({ ...form, [name]: value });
    setForm({ ...form, [name]: value });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <b>{isUpdating ? "Edit User" : "Add User"}</b>

      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleOnChange}
      />
      <small className="input-error">{errors?.name}</small>

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleOnChange}
      />
      <small className="input-error">{errors?.email}</small>

      <label htmlFor="age">Age:</label>
      <input
        type="number"
        name="age"
        value={form.age}
        onChange={handleOnChange}
      />
      <small className="input-error">{errors?.age}</small>

      <div className="flex">
        <label htmlFor="status">Status:</label>
        <input
          type="checkbox"
          name="status"
          checked={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.checked })}
        />
        {form.status ? "Active" : "Inactive"}
      </div>

      <input type="submit" value={isUpdating ? "Update" : "Add"} />
      <input type="reset" value="Reset" onClick={clearForm} />
    </form>
  );
};
