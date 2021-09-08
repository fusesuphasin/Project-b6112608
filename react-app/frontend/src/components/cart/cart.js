import React from "react";
import Navbar from "../navbar/navbar";
import "./cart.css";

const shirt = [
  {
    team: "MAN U",
    amount: 4,
    size: "M",
    totalprice: 3500,
    src: "https://www.imagehandler.net/preview/?istyle=0000&fmt=jpg&w=300&h=300&cmp=100&c=999&img=A1052961000&iset=0108&iindex=0007",
  },
  {
    team: "MAN City",
    amount: 2,
    size: "S",
    totalprice: 1200,
    src: "https://www.imagehandler.net/preview/?istyle=0000&fmt=jpg&w=300&h=300&cmp=100&c=999&img=A1053359000&iset=0108&iindex=0007",
  },
];

function cart() {
  return (
    <div>
      <Navbar />
      <div>
        <table className="cart-table">
          <tr>
            <th>Shirt</th>
            <th>Team</th>
            <th>Amount</th>
            <th>Total Price</th>
            <th>Cancel</th>
          </tr>

          {shirt.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.src} alt="" />
                </td>
                <td>{item.team}</td>
                <td>{item.size}</td>
                <td>{item.totalprice}</td>
                <td>
                  <button className="Buying-button">Cancel</button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default cart;
