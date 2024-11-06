import { useEffect, useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
import { getData, setData } from "./utils/localstorage";

function App() {
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("https://api.github.com/users");
      const data = await res.json();

      const userData = data.map((user) => ({
        id: user.id,
        name: user.login,
        email: user.login + "@gmail.com",
        age: user.id + 10,
        status: user.site_admin,
      }));

      setUsers(userData);
      setData(userData);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load the data from local storage if exists
    // Otherwise fetch the data from the API

    const data = getData();

    if (data.length > 0) {
      setUsers(data);
    } else {
      fetchData();
    }
  }, []);

  return (
    <>
      <h1>DataTech Dashboard</h1>

      <Form
        onSaveUser={(user) => {
          const index = users.findIndex((u) => u.id === user.id);

          if (index !== -1) {
            const newUsers = [...users];
            newUsers[index] = user;

            setUsers(newUsers);
            setData(newUsers);
          } else {
            setUsers([...users, user]);
            setData([...users, user]);
          }
        }}
        userData={selectedUser}
        clearUser={() => setSelectedUser(null)}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table
          users={users}
          onEditUser={setSelectedUser}
          onDeleteUser={(user) => {
            const newUser = users.filter((u) => u.id !== user.id);
            setUsers(newUser);
            setData(newUser);
          }}
        />
      )}
    </>
  );
}

export default App;
