import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataScroller } from "primereact/datascroller";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import "./sportsshirt.css";

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
  const toast = useRef(null);
  const [clothes, setClothes] = useState({});
  const [shirt, setShirt] = useState();
  const [totalPrice, setTotalPrice] = useState(Number);
  const [confirmOrder, setConfirmOrder] = useState({
    image: "",
    team: "",
    size: "S",
    amount: 1,
    delivery: "",
    totalPrice: 0,
  });

  const [displayBasic, setDisplayBasic] = useState(false);
  const [total, setTotal] = useState(0);
  const [Data, setData] = useState([]);
  const [products, setProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4200/sportshirt/getProduct"
        );
        const json = await response.json();
        console.log(json);
        setShirt(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();

    console.log(shirt);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        style={{ width: "200px" }}
        src={rowData.src}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.src}
        className="product-image"
      />
    );
  };

  const buyOnclick = (e, item) => {
    setDisplayBasic(true);

    console.log(totalPrice + " $");

    setConfirmOrder({
      ...confirmOrder,
      team: item.team,
      image: item.src,
    });

    setClothes(item);
    console.log(confirmOrder);
  };

  const onHide = (name) => {
    setDisplayBasic(false);
    setData("");
    setTotalPrice(0);
  };

  const onHide1 = (name) => {
    setConfirmOrder({
      ...confirmOrder,
      totalPrice: totalPrice,
    });

    fetch("http://localhost:4200/purchase/shirt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(confirmOrder),
    })
      .then((res) => {
        //console.log("Order successfully");
        toast.current.show({
          severity: "success",
          summary: "Order Success",
          life: 3000,
        });
      })
      .catch((err) => {
        console.log("can't register ");
        /*  toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Message Content",
          life: 3000,
        }); */
      });
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide()}
          className="p-button-text"
        />
        <Button
          label="Order"
          icon="pi pi-check"
          onClick={() => onHide1()}
          autoFocus
        />
      </div>
    );
  };

  const clothesHandle = (e) => {
    setClothes({ [e.target.name]: e.target.value });
  };

  const clothesOnChange = (e) => {
    setConfirmOrder({ ...confirmOrder, [e.target.name]: e.target.value });
  };

  const amountOnChange = (e) => {
    setTotalPrice(clothes.price * e.target.value);

    setConfirmOrder({
      ...confirmOrder,
      totalPrice: clothes.price * e.target.value,
      [e.target.name]: e.target.value,
    });
  };

  const clothesAmount = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const clothesSize = ["S", "M", "L"];

  const itemTemplate = (data) => {
    return (
      <div className="product-item">
        <img
          src={data.src}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          alt={data.src}
          value={confirmOrder.src}
          name="src"
        />
        <div className="product-detail">
          <div className="product-team">{data.team}</div>
          <div className="product-description">{/* {data.description} */}</div>
        </div>
        <div className="product-action">
          <span className="product-price">${data.price}</span>
          <Button
            value={data}
            icon="pi pi-shopping-cart"
            label="Buy"
            onClick={(e) => buyOnclick(e, data)}
            /* onChange={clothesHandle} */
          ></Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="datascroller-demo">
        <div className="card">
          <DataScroller
            value={shirt}
            itemTemplate={itemTemplate}
            rows={5}
            buffer={0.4}
            header="List of Products"
          />
        </div>
      </div>

      <Dialog
        header="สั่งซื้อ"
        visible={displayBasic}
        style={{ width: "50vw" }}
        footer={renderFooter()}
        onHide={() => onHide()}
        closable={false}
      >
        <div>
          <h2 className="p-text-center"></h2>
          <form className="p-fluid">
            <div className="p-field">
              <img
                src={confirmOrder.image}
                onError={(e) =>
                  (e.target.src =
                    "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                }
                alt={confirmOrder.image}
                value={confirmOrder.image}
                name="src"
                style={{
                  width: "200px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>
            <div className="product-detail">
              <label>Team</label>
              <div className="product-team">{confirmOrder.team}</div>
              <div className="product-description"></div>
            </div>
            <div className="p-field"></div>
            <div className="p-field">
              <label>Size</label>
              <Dropdown
                name="size"
                value={confirmOrder.size || "S"}
                options={clothesSize}
                onChange={clothesOnChange}
                optionLabel=""
              />
            </div>
            <div className="p-field">
              <label>Amount</label>
              <Dropdown
                name="amount"
                value={confirmOrder.amount || 1}
                options={clothesAmount}
                onChange={amountOnChange}
                optionLabel=""
              />
            </div>
            <div className="p-field">
              <label>Total Price</label>
              <div id="totalPrice" name="totalPrice">
                {confirmOrder.amount == 1
                  ? clothes.price
                  : confirmOrder.amount * clothes.price}
              </div>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default Sportsshirt;
