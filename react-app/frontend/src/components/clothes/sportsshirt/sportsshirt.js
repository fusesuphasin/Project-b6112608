import React, { useState, useEffect, useRef } from "react";
import Toast from "../../toast/Toast";
import "./sportsshirt.css";

const testListSuccess = [
  {
    id: 1,
    title: "Order Successfull",
    description: "",
    backgroundColor: "#5cb85c",
    // icon: checkIcon,
  },
];

const testListError = [
  {
    id: 1,
    title: "Can not order product.",
    description: "",
    backgroundColor: "#d9534f",
    // icon: errorIcon,
  },
];

const shirtOld = [
  {
    team: "MAN U",
    price: 200,
    src: "https://www.imagehandler.net/preview/?istyle=0000&fmt=jpg&w=300&h=300&cmp=100&c=999&img=A1052961000&iset=0108&iindex=0007",
  },
  {
    team: "MAN City",
    price: 200,
    src: "https://www.imagehandler.net/preview/?istyle=0000&fmt=jpg&w=300&h=300&cmp=100&c=999&img=A1053359000&iset=0108&iindex=0007",
  },
  {
    team: "Liverpool",
    price: 200,
    src: "https://www.imagehandler.net/preview/?istyle=0000&fmt=jpg&w=300&h=300&cmp=100&c=999&img=A1055679000&iset=0108&iindex=0007",
  },
  {
    team: "Arsenal",
    price: 200,
    src: "https://www.imagehandler.net/preview/?istyle=0000&fmt=jpg&w=300&h=300&cmp=100&c=999&img=A1054685000&iset=0108&iindex=0007",
  },
  {
    team: "Tottenham ",
    price: 200,
    src: "https://www.imagehandler.net/preview/?istyle=0000&fmt=jpg&w=300&h=300&cmp=100&c=999&img=A1052243000&iset=0108&iindex=0007",
  },
];

function Sportsshirt() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [clothes, setClothes] = useState({});
  const [totalPrice, setTotalPrice] = useState(Number);
  const [shirt, setShirt] = useState([]);

  const [confirmOrder, setConfirmOrder] = useState({
    image: "",
    team: "",
    size: "S",
    amount: 1,
    delivery: "",
    totalPrice: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4201/sportshirt/getProduct"
        );
        const json = await response.json();
        console.log(json);
        setShirt(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    /* const valuesArray = JSON.parse(shirt1);
    setShirt2(valuesArray); */
  }, []);

  const buyShirt = (item) => {
    setButtonPopup(true);
    setClothes(item);
    setConfirmOrder({ ...confirmOrder, team: item.team, image: item.src });
    console.log(item);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmOrder({
      ...confirmOrder,
      totalPrice: totalPrice,
    });

    console.log(confirmOrder);

    fetch("http://localhost:4201/purchase/shirt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(confirmOrder),
    })
      .then((res) => {
        console.log("Order successfully");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      })
      .catch((err) => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 500);
        console.log("can't register ");
      });
  };

  const amountOnChange = (e) => {
    setTotalPrice(clothes.price * e.target.value);

    setConfirmOrder({
      ...confirmOrder,
      totalPrice: clothes.price * e.target.value,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = (e) => {
    setConfirmOrder({ ...confirmOrder, [e.target.name]: e.target.value });
  };

  const showPopup = () => {
    setButtonPopup(false);
    setConfirmOrder({
      image: "",
      team: "",
      size: "",
      amount: 1,
      delivery: "",
      totalPrice: 0,
    });
  };

  const Popup = (props) => {
    return props.triger ? (
      <div className="popup">
        <div className="popup-inner">
          <button className="close-btn" onClick={showPopup}>
            X
          </button>
          {props.children}
        </div>
      </div>
    ) : (
      ""
    );
  };

  return (
    <div>
      <Toast
        triger={success}
        toastList={testListSuccess}
        position="top-right"
      />
      <Toast triger={error} toastList={testListError} position="top-right" />
      <div className="shirt-table">
        <h4
          style={{
            margin: "auto",
            padding: "10px",
            textAlign: "center",
          }}
        >
          List of Product
        </h4>

        {shirt.map((data) => {
          return (
            <div className="listshirt-div">
              <img className="listshirt-img" src={data.src} alt="" />
              <div className="product-detail">
                <div className="product-team">{data.team}</div>
                <div className="product-description">
                  {/* {data.description} */}
                </div>
              </div>
              <div className="product-action">
                <span className="product-price">${data.price}</span>
                <button
                  className="buy-button"
                  value={data}
                  icon="pi pi-shopping-cart"
                  label="Buy"
                  onClick={(e) => buyShirt(data)}
                  /* onChange={clothesHandle} */
                >
                  Buy
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Popup triger={buttonPopup}>
        <div>
          <form action="">
            <h2>สั่งซื้อ</h2>
            <div className="center-div">
              <img
                className="center"
                src={clothes.src}
                alt={clothes.src}
                id="image"
                name="image"
              />
            </div>
            <div className="comfirm-div">
              <label className="label">team</label>
              <div id="team" name="team">
                {clothes.team}
              </div>
            </div>
            <div className="comfirm-div">
              <label className="label">Size</label>
              <select
                id="size"
                name="size"
                value={confirmOrder.size || "S"}
                onChange={handleOrder}
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="X">X</option>
              </select>
            </div>
            <div className="comfirm-div">
              <label className="label">Amount</label>
              <select
                id="amount"
                name="amount"
                value={confirmOrder.amount || 1}
                onChange={amountOnChange}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
              </select>
            </div>
            <div className="comfirm-div">
              <label className="label">Total Price</label>
              <div
                id="totalPrice"
                name="totalPrice"
                value={confirmOrder.src}
                onChange={handleOrder}
              >
                {confirmOrder.amount == 1
                  ? clothes.price
                  : clothes.price * confirmOrder.amount}
              </div>
            </div>
            <div className="center-div">
              <button onClick={handleSubmit}>ยืนยันคำสั่งซื้อ</button>
            </div>
          </form>
        </div>
      </Popup>
    </div>
  );
}

export default Sportsshirt;
