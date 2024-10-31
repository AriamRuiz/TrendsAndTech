import axios from "axios";
import { useEffect, useState } from "react";

export default function ListUser() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.get("http://localhost/api/Register/").then(function (response) {
      console.log(response.data);
      setUsers(response.data);
    });
  }

  return (
    <div>
      <h2>List User</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>User Name</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => (
            <tr key={key}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <Link
                  to={`user/${user.id}/edit`}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </Link>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
