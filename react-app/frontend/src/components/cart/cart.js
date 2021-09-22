import React, { useEffect, useState, useRef } from "react";
import Navbar from "../navbar/navbar";
import Toast from "../toast/Toast";
import "./cart.css";

const testListSuccess = [
  {
    id: 1,
    title: "Cancel Order Successfull",
    description: "",
    backgroundColor: "#5cb85c",
    // icon: checkIcon,
  },
];

const testListError = [
  {
    id: 1,
    title: "Can not Cancel order product.",
    description: "",
    backgroundColor: "#d9534f",
    // icon: errorIcon,
  },
];

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

function Cart() {
  const [order, setOrder] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4201/purchase/getOrder");
        const json = await response.json();
        console.log(json);
        setOrder(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [order]);

  const deleteOrder = (rowData) => {
    //    const url = "http://localhost:4200/purchase/deleteOrder/" + rowData._id;
    const url = `http://localhost:4201/purchase/deleteOrder/${rowData}`;
    console.log(url + " take");
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => {
        console.log("Delete order successfully");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      })
      .catch((err) => {
        console.log("can't register ");
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  return (
    <div>
      <Navbar />
      <Toast
        triger={success}
        toastList={testListSuccess}
        position="top-right"
      />
      <Toast triger={error} toastList={testListError} position="top-right" />

      <div>
        <table className="cart-table">
          <tr>
            <th>Image</th>
            <th>Team</th>
            <th>Size</th>
            <th>Amount</th>
            <th>Total Price</th>
            <th>Cancel</th>
          </tr>

          {order.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.image} alt="" />
                </td>
                <td>{item.team}</td>
                <td>{item.size}</td>
                <td>{item.amount}</td>
                <td>{item.totalPrice}</td>
                <td>
                  <button
                    className="Buying-button"
                    onClick={(e) => deleteOrder(item._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Cart;
