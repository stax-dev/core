import { useState } from "react";
import { Link } from "react-router-dom";
import css from "./Footer.module.css";
//import Button from "../button/Button";

// const electron = window.require('electron"]}>
// const remote = electron.remote
// const {BrowserWindow,dialog,Menu} = remote

function Footer() {
  // document.querySelector("#exit-btn").addEventListener("click", function (e) {
  //  ipcRenderer.send("close-me");
  // });

  return (
    <div id="020102" className={css["footer-full"]}>
      <div id="020103" className={css["footer"]}>
        <div id="020104" className={css["footer-logo"]}>
          <img src="https://cdn.st.ax/v2/logo.svg" />
          <p id="020501">
            <b>Stax Developer Suite</b>
          </p>
          <p id="020502">
            The Stax Developer Suite is a programming ecosystem for developers
            worldwide. Visit different pages to learn more about our products
            and services.
          </p>
          <p>Happy Travels!</p>
        </div>
        <div id="020105" className={css["footer-box1"]}>
          <p id="020503">
            <b>Explore</b>
          </p>
          <p id="020504">
            <Link id="020701" to="/">
              Home
            </Link>
          </p>
          <p id="020505">
            <Link id="020702" to="/products">
              Products
            </Link>
          </p>
          <p>
            <Link to="/support">Support</Link>
          </p>
        </div>
        <div id="020106" className={css["footer-box2"]}>
          <p id="020506">
            <b>Dashboard</b>
          </p>
          <p id="020507">
            <Link id="020703" to="/splashboard">
              Splashboard
            </Link>
          </p>
          <p id="020508">
            <Link id="020704" to="/login">
              Login
            </Link>
          </p>
          <p id="020509">
            <Link id="020705" to="/register">
              Register
            </Link>
          </p>
        </div>
        <div id="020107" className={css["footer-box3"]}>
          <p id="020510">
            <b>Company</b>
          </p>
          <p>
            <Link to="/status">Status</Link>
          </p>
          <p id="020511">
            <Link id="020706" to="/about">
              About Us
            </Link>
          </p>
          <p id="020512">
            <Link id="020707" to="/legal">
              Legal
            </Link>
          </p>
        </div>
      </div>
      <p>Stax &copy; {new Date().getFullYear()}</p>
    </div>
  );
}

export default Footer;
