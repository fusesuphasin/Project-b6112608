import React from "react";
import "./navbar.css";

function Navbar() {
  return (
    <div class="topnav">
      <a class="home" href="/home">
        REACT
      </a>
      <a href="/clothes">SHIRT</a>
      <div class="topnav-right">
        <a href="/cart">CART</a>
        <a href="/">LOGOUT</a>
      </div>
    </div>
  );
}

export default Navbar;
