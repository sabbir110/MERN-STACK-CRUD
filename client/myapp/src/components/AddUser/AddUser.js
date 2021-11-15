import React, { useRef } from "react";

const AddUser = () => {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const newUser = { name, email };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data) {
          alert("Data Insert Success");
          e.target.reset();
        }
      });
    e.preventDefault();
  };
  return (
    <div>
      <h2>Please Add an User</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" placeholder="Name" ref={nameRef} name="" id="" />
        <input type="text" placeholder="Email" ref={emailRef} name="" id="" />
        <input type="submit" value="ADD" />
      </form>
    </div>
  );
};

export default AddUser;
