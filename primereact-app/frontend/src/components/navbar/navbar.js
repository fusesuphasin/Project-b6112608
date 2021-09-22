import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { PrimeIcons } from "primereact/api";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(3);

  const items = [
    {
      label: "PRIMEREACT",
      icon: "pi pi-fw pi-home",
      command: (event) => {
        window.location.href = "/home";
      },
    },
    {
      label: "Shirt",
      icon: "pi pi-fw pi-calendar",
      command: (event) => {
        window.location.href = "/clothes";
      },
    },
    {
      label: "Cart",
      icon: "pi pi-shopping-cart",
      command: (event) => {
        window.location.href = "/cart";
      },
    },
  ];

  const logoutHandle = (e) => {
    window.location.href = "/";
  };

  const cartHandle = (e) => {
    window.location.href = "/cart";
  };

  return (
    <div>
      <div className="card">
        <Menubar
          model={items}
          /* start={<InputText placeholder="Search" type="text" />} */
          end={
            <Button
              label="Logout"
              icon="pi pi-power-off"
              onClick={logoutHandle}
            />
          }
        />
      </div>
    </div>
  );
};

export default Navbar;
