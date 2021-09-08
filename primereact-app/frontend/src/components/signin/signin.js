import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

function Signin() {
  const [user, setUser] = useState({
    email: String,
    password: String,
    /*  currentUser: null,
        message: "", */
  });

  const onChange = (e) => {
    setUser({ [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/home";
  };
  return (
    <div>
      <div className="p-d-flex p-jc-center">
        <div
          className="card"
          style={{
            position: "absolute",
            top: "25%",
            padding: "5%",
            boxShadow:
              "rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px",
          }}
        >
          <h2 className="p-text-center">Login</h2>
          <form className="p-fluid">
            <div className="p-field">
              <label>Email</label>
              <InputText
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={onChange}
              />
            </div>
            <div className="p-field">
              <label>Password</label>
              <Password
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={onChange}
              />
            </div>

            <div className="p-field">
              <Button label="Login" onClick={onSubmit} />
            </div>
            <Link to="/register">
              <div className="p-field">
                <Button label="Register" />
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
