import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputMask } from "primereact/inputmask";
import "primeflex/primeflex.css";

function Signup() {
  const [users, setUsers] = useState({
    name: String,
    email: String,
    password: String,
    birthday: String,
    address: String,
    phone: String,
    img: String,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  const updateUsers = (e) => {
    setUsers({ [e.target.name]: e.target.value });
  };

  useEffect(() => {});

  return (
    <div className="p-d-flex p-jc-center">
      <div
        className="card"
        style={{
          marginTop: "5%",
          padding: "5%",
          boxShadow:
            "rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px",
        }}
      >
        <h2 className="p-text-center" style={{ marginTop: "-50px" }}>
          Register
        </h2>
        <form className="p-fluid">
          <div className="p-field">
            <label>Name</label>
            <InputText
              id="name"
              name="name"
              value={users.name}
              onChange={updateUsers}
            />
          </div>
          <div className="p-field">
            <label>Email</label>
            <InputText
              id="email"
              name="email"
              value={users.email}
              onChange={updateUsers}
            />
          </div>
          <div className="p-field">
            <label>Password</label>
            <Password
              id="password"
              name="password"
              value={users.password}
              onChange={updateUsers}
            />
          </div>
          <div className="p-field">
            <label>Birthday</label>
            <Calendar
              id="birthday"
              name="birthday"
              value={users.birthday}
              onChange={updateUsers}
            />
          </div>
          <div className="p-field">
            <label>Address</label>
            <InputText
              id="address"
              name="address"
              value={users.address}
              onChange={updateUsers}
            />
          </div>
          <div className="p-field">
            <label>Phone</label>
            <InputMask
              id="phone"
              name="phone"
              mask="(999) 999-9999"
              value={users.phone}
              onChange={updateUsers}
            />
          </div>
          <div className="p-field">
            <label>Image</label>
            <br />
            <FileUpload
              id="image"
              name="image"
              accept="image/*"
              value={users.image}
              onChange={updateUsers}
              uploadOptions={{
                style: { display: "none" },
              }}
              itemTemplate={(file, props) => {
                return (
                  <img
                    alt={file.name}
                    role="presentation"
                    src={file.objectURL}
                    style={{
                      borderRadius: "50%",
                      width: "100px",
                      height: "100px",
                      margin: "0 auto",
                    }}
                  />
                );
              }}
            />
          </div>
          <Button label="Submit" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
}

export default Signup;
