import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  //Delete an User
  const handleDeleteUser = (id) => {
    const proced = window.confirm("Are you sure? You want to delete!!");
    if (proced) {
      const url = `http://localhost:5000/users/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const remainingUser = user.filter((user) => user._id !== id);
            setUser(remainingUser);
          }
        });
    }
  };
  return (
    <div>
      <h2> Users : {user.length} </h2>
      <ul>
        {user.map((data) => (
          <li key={data._id}>
            {data.name}:: {data.email}
            <Link to={`/users/update/${data._id}`}>
              <button> Update</button>
            </Link>
            <button onClick={() => handleDeleteUser(data._id)}> X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
