import React, { useState } from "react";
import "./sportsshirt.css";

const shirt = [
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
  const [clothes, setClothes] = useState({});

  const [confirmOrder, setConfirmOrder] = useState({
    image: "",
    team: "",
    size: "S",
    amount: 1,
    delivery: "",
    totalPrice: 0,
  });

  const buyShirt = (item) => {
    setButtonPopup(true);
    setClothes(item);
    setConfirmOrder({ ...confirmOrder, team: item.team, image: item.src });
    console.log(item);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(confirmOrder);
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
        <table>
          {/*   <tr>
            <th>Shirt</th>
            <th>Price</th>
            <th>Team</th>
            <th>Buy</th>
          </tr> */}

          {shirt.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.src} alt="" />
                </td>
                <td>{item.price}</td>
                <td>{item.team}</td>
                <td>
                  <button
                    className="Buying-button"
                    onClick={(e) => buyShirt(item)}
                  >
                    BUY
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
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
                onChange={handleOrder}
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
                id="image"
                name="image"
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
