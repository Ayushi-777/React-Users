import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("https://jsonplaceholder.typicode.com/users");
    setUser(result.data.reverse());
  };

  const deleteUser = async id => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-7">
        <h1>Home Page</h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">phone</th>
              <th scope="col">website</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                
                <td>
                  <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger "
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Link>
                  <Link className="btn btn-info mt-2 " to="/users/add">Add User</Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
