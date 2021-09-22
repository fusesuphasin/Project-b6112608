import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";

function Signin() {
  const toast = useRef(null);
  const [user, setUser] = useState({
    email: String,
    password: String,
    /*  currentUser: null,
        message: "", */
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    console.log(user);
    e.preventDefault();

    fetch("http://localhost:4200/signin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      /*   .then((res) => {
        if (res.ok) {
          history.push("/home");
        }
      }) */
      .then((res) => res.json())
      .then((data) => {
        console.log("Yes");
        sessionStorage.setItem("email", data.email);
        //history.push("/home");
        toast.current.show({
          severity: "success",
          summary: "Login Successful",
          detail: "",
          life: 3000,
        });
        window.location.href = "/home";
      })
      .catch((err) => {
        console.log("error");
        toast.current.show({
          severity: "error",
          summary: "Email or Password weren't correct.",
          detail: "Please check your Email and Password",
          life: 3000,
        });
      });
  };

  return (
    <div>
      <Toast ref={toast} />
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
