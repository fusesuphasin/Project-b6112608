import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import reactImg from "./react.jpg";

import "../signin/signin.css";

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
    <div className="signIn">
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
