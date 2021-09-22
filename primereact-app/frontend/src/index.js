import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Signup from "./components/signup/signup";
import Signin from "./components/signin/signin";
import Home from "./components/home/home";
import Clothes from "./components/clothes/clothes";
import Buypopup from "./components/buypopup/buypopup";
import Cart from "./components/cart/cart";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <Signin />
      </Route>
      <Route path="/register">
        <Signup />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/clothes">
        <Clothes />
      </Route>
      <Route path="/buy">
        <Buypopup />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
