import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Toast from "../toast/Toast";

import "../signin/signin.css";

const testListSuccess = [
  {
    id: 1,
    title: "Login Successfull",
    description: "",
    backgroundColor: "#5cb85c",
    // icon: checkIcon,
  },
];

const testListError = [
  {
    id: 1,
    title: "Email or Password weren't correct.",
    description: "Please check your Email and Password",
    backgroundColor: "#d9534f",
    // icon: errorIcon,
  },
];

function Signin() {
  let history = useHistory();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    email: String,
    password: String,
    /*  currentUser: null,
    message: "", */
  });
  const [getuser, setGetuser] = useState();

  useEffect(() => {}, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    /*   console.log(user); */

    fetch("http://localhost:4201/signin/login", {
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
        console.log(data.email);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          history.push("/home");
        }, 500);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("fname", data.first_name);
        sessionStorage.setItem("lname", data.last_name);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  return (
    <div className="signIn">
      <Toast
        triger={success}
        toastList={testListSuccess}
        position="top-right"
      />
      <Toast triger={error} toastList={testListError} position="top-right" />
      <div class="loginForm">
        <div className="form-div">
          <form /* onSubmit={this.onSubmit} */>
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <div>
              <label>Email</label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={onChange}
                />
              </div>
            </div>

            <div>
              <label>Password</label>
              <div>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={onChange}
                />
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div>
                <button className="buy-button" onClick={onSubmit}>
                  Login
                </button>
              </div>
              <div>
                <Link to="/register">
                  <button className="buy-button">Register</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
