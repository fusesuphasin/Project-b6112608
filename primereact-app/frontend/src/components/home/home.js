import React from "react";
import Navbar from "../navbar/navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <img
        style={{
          width: "40%",
          margin: '0px auto',
          position: "absolute",
          top: "40%",
          right: 0,
          left: 0,
        }}
        src="https://www.primefaces.org/primereact/showcase/showcase/images/primereact-logo-dark.png"
        alt=""
      />
    </div>
  );
}

export default Home;
