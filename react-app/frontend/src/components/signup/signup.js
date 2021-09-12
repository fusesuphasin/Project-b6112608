import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./signup.css";

function Signup() {
  const [users, setUsers] = useState({
    name: "",
    email: "",
    password: "",
    birthday: "",
    address: "",
    phone: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(users);

    fetch("http://localhost:4200/signup/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users),
    })
      /*   .then((res) => {
        if (res.ok) {
          history.push("/home");
        }
      }) */
      .then((res) => res.json())
      .then((data) => {
        console.log("register successfully");
        //history.push("/home");
      })
      .catch((err) => console.log("can't register "));
  };

  const updateUsers = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };
  /* 
  const handleEmailChanged = (e) => {
    console.log(e.target.name + "  " + e.target.value);
    setUsers({ [users.email]: e.target.value });
    console.log(users[e.target.name]);
  }; */

  const previewImage = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
    let reader = new FileReader();
    reader.onload = (e) => {
      let file = document.getElementById("preview");
      file.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {});

  return (
    <div>
      <form>
        <div
          style={{
            fontSize: 24,
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          <label>Register</label>
        </div>
        <div>
          <label>Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="input-register"
            value={users.name}
            onChange={updateUsers}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="input-register"
            value={users.email}
            onChange={updateUsers}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="input-register"
            value={users.password}
            onChange={updateUsers}
          />
        </div>
        <div>
          <label>Birthday</label>
          <input
            id="birthday"
            name="birthday"
            type="date"
            className="input-register"
            value={users.birthday}
            onChange={updateUsers}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            id="address"
            name="address"
            type="text"
            className="input-register"
            value={users.address}
            onChange={updateUsers}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            id="phone"
            name="phone"
            type="text"
            className="input-register"
            value={users.phone}
            onChange={updateUsers}
          />
        </div>
        <div>
          <label>
            Image
            <input
              className="inputfile"
              id="image"
              name="image"
              type="file"
              className="input-register"
              value={users.image}
              onChange={previewImage}
              accept="image/*"
            />
          </label>
          <img
            id="preview"
            style={{
              borderRadius: "50%",
              border: "1px solid black",
              width: "100px",
              height: "100px",
              marginLeft: "180px",
            }}
          />
        </div>

        <input
          type="submit"
          value="SUBMIT"
          className="input-register"
          onClick={handleSubmit}
          style={{
            fontSize: 20,
            marginTop: "1rem",
            textAlign: "center",
          }}
        />
      </form>
    </div>
  );
}

export default Signup;
