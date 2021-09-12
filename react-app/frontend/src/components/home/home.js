import React, { useState } from "react";
import Navbar from "../navbar/navbar";

function Home() {
  const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const [fname, setFname] = useState(sessionStorage.getItem("fname"));
  const [lname, setLname] = useState(sessionStorage.getItem("lname"));
  return (
    <div>
      <Navbar />

      <img
        style={{
          width: "40%",
          margin: "0px auto",
          position: "absolute",
          top: "30%",
          right: 0,
          left: 0,
        }}
        src="https://natahouse.com/static/a7226e980cdd03e0ea4400310225cf55/e2ca6/react_js.jpg"
        alt=""
      />
    </div>
  );
}

export default Home;
