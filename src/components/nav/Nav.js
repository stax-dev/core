//import { useState } from "react";
import { Link } from "react-router-dom";
import css from "./Nav.module.css";
//import Button from "../button/Button";

// const electron = window.require('electron');
// const remote = electron.remote
// const {BrowserWindow,dialog,Menu} = remote

import cssGlobal from "../globalcss/GlobalCSS.module.css";

export default function Nav(pages) {
  // document.querySelector("#exit-btn").addEventListener("click", function (e) {
  //   ipcRenderer.send("close-me");
  // });

  //var navbarsmallbox = document.getElementById(css["navbarsmall-box"]);
  //var navbarsmall = document.getElementById(css["navbarsmall"]);

  function navbarMenu(type) {
    var navbarsmallbox = document.getElementById(css["navbarsmall-box"]);
    var navbarsmall = document.getElementById(css["navbarsmall"]);
    if (type === 1) {
      navbarsmall.style.transform = "scale(1)";
      setTimeout(() => {
        navbarsmallbox.style.transform = "translateX(0%)";
      }, 0);
      document.body.style.overflow = 'hidden';
    } else if (type === 2) {
      setTimeout(() => {
        navbarsmall.style.transform = "scale(0)";
      }, 150);
      navbarsmallbox.style.transform = "translateX(-100%)";
      document.body.style.overflow = 'auto';
    }
  }

  window.addEventListener('click', function(closeModal) {
    var navbarsmall = document.getElementById(css["navbarsmall"]);
    if (closeModal.target === navbarsmall) {
      navbarMenu(2);
    }
  });

  window.addEventListener('keyup', function(functionInside) {
    var navbarsmallbox = document.getElementById(css["navbarsmall-box"]);
    var navbarsmall = document.getElementById(css["navbarsmall"]);
    if (functionInside.key == "Escape") {
      if(navbarsmallbox && navbarsmallbox.style.transform === "translateX(0%)"){
        navbarMenu(2);
      }
    }else if(functionInside.shiftKey) {
      if(functionInside.key === "M"){
        if(navbarsmallbox && navbarsmallbox.style.transform === "translateX(0%)"){
          navbarMenu(2);
        }else if(
            navbarsmall && navbarsmall.style.transform !== "scale(1)" &&
            window.innerWidth < 800
          ){
            navbarMenu(1);
        }
      }
    }
  });

  // window.addEventListener("resize", function() {
  //   if (window.matchMedia("(min-width: 1000px)").matches) {
  //     navbarMenu(2);
  //   };
  // });

  return (
    <div id="Nav-react-div">
      {/* small navbar */}
      <div id={css["navbarsmall"]} className={css["navbarsmall"]}>
        <div id={css["navbarsmall-box"]} className={css["navbarsmall-box"]}>
          <div id="Nav-navbar-backdrop" className={css["navbar-backdrop"]}>
            <div id="Nav-navbar-backdrop-box1" className={css["navbar-backdrop-box1"]}></div>
          </div>
          <div id="Nav-navbarsmall-title" className={css["navbarsmall-title"]}>
            <div id="Nav-navbarsmall-title-text" className={css["navbarsmall-title-text"]}>
              <h1 id="Nav-navbarsmall-title-text-h1">Stax Dev Suite</h1>
            </div>
            <div id="Nav-navbarsmall-title-close" className={css["navbarsmall-title-close"]}>
              <button id="Nav-navbarsmall-title-close-button"
                onClick={() => navbarMenu(2)}>
                <i id="Nav-navbarsmall-title-clocse-icon" className={`${css["fas"]} ${css["fa-times"]} ${"fas fa-times"}`}></i>
              </button>
            </div>
          </div>
          <div id="Nav-navbarsmall-menu" className={css["navbarsmall-menu"]}>
            <Link id="Nav-navbarsmall-link-a"
              to="/" className={
                pages.number === "1"
                  ? css["navbarsmall-link-active"]
                  : css["navbarsmall-link"]
              }>
              <div id="Nav-navbarsmall-list" className={css["navbarsmall-list"]}>
                <div id="Nav-navbarsmall-info" className={css["navbarsmall-info"]}>
                  <p id="Nav-navbarsmall-info-p">Home</p>
                </div>
                <div id="Nav-navbarsmall-icon" className={css["navbarsmall-icon"]}>
                  <p id="Nav-navbarsmall-icon-p">
                    <i id="Nav-navbarsmall-icon-icon" className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
                  </p>
                </div>
              </div>
            </Link>
            <Link id="Nav-navbarsmall-link--2"
              to="/products" className={
                pages.number === "2"
                  ? css["navbarsmall-link-active"]
                  : css["navbarsmall-link"]
              }>
              <div id="Nav-navbarsmall-list--2" className={css["navbarsmall-list"]}>
                <div id="Nav-navbarsmall-info--2" className={css["navbarsmall-info"]}>
                  <p id="Nav-navbarsmall-info-p--2">Products</p>
                </div>
                <div id="Nav-navbarsmall-icon--2" className={css["navbarsmall-icon"]}>
                  <p id="Nav-navbarsmall-icon-p--2">
                    <i id="Nav-navbarsmall-icon-icon" className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
                  </p>
                </div>
              </div>
            </Link>
            <Link id="Nav-navbarsmall-link--3"
              to="/support" className={
                pages.number === "3"
                  ? css["navbarsmall-link-active"]
                  : css["navbarsmall-link"]
              }>
              <div id="Nav-navbarsmall-list--3" className={css["navbarsmall-list"]}>
                <div id="Nav-navbarsmall-info--3" className={css["navbarsmall-info"]}>
                  <p id="Nav-navbarsmall-info-p--3">Support</p>
                </div>
                <div id="Nav-navbarsmall-icon--3" className={css["navbarsmall-icon"]}>
                  <p id="Nav-navbarsmall-icon-p--3">
                    <i id="Nav-navbarsmall-icon-icon" className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
                  </p>
                </div>
              </div>
            </Link>
            <Link id="Nav-navbarsmall-link--4"
              to="/status" className={
                pages.number === "4"
                  ? css["navbarsmall-link-active"]
                  : css["navbarsmall-link"]
              }>
              <div id="Nav-navbarsmall-list--4" className={css["navbarsmall-list"]}>
                <div id="Nav-navbarsmall-info--4" className={css["navbarsmall-info"]}>
                  <p id="Nav-navbarsmall-info-p--4">Status</p>
                </div>
                <div id="Nav-navbarsmall-icon--4" className={css["navbarsmall-icon"]}>
                  <p id="Nav-navbarsmall-icon-p--4">
                    <i id="Nav-navbarsmall-icon-icon" className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
                  </p>
                </div>
              </div>
            </Link>
            <div id="Nav-navbarsmall-link-big" className={css["navbarsmall-link-big"]}>
              <div id="Nav-navbarsmall-button" className={css["navbarsmall-button"]}>
                <div id="Nav-navbarsmall-button-login" className={css["navbarsmall-button-login"]}>
                  <button type="button" id="Nav-navbarsmall-button-login-input">
                    <Link to="/login">Login</Link>
                  </button>
                </div>
                <div id="Nav-navbarsmall-button-register" className={css["navbarsmall-button-register"]}>
                  <button
                    type="button" id="Nav-navbarsmall-button-register-input"
                  >
                    <Link to="/register">Register</Link>
                  </button>
                </div>
                {/* <div id="Nav-navbarsmall-button-splashboard" className={css["navbarsmall-button-splashboard"]}>
                      <button type="button" id="Nav-navbarsmall-button-splashboard-input">
                        <Link to="/splashboard">Splashboard</Link>
                      </button>
                    </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* main navbar */}
      <div id="Nav-navbar" className={`${css["navbar"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="Nav-logo" className={css["logo"]}>
          <Link id="Nav-logo-a" to="/">
            <img id="Nav-logo-img"
              alt="Stax Developer Suite Logo"
              src="https://cdn.st.ax/v2/logo.svg"
            />
          </Link>
        </div>
        <div id="Nav-menu" className={css["menu"]}>
          <ul>
            {/* i set opacity 100% as the else{} cause if its not the style tag will be empty and then its an error */}
            <Link id="Nav-menu-a"
              style={
                pages.number === "1"
                  ? {
                      backgroundColor: "var(--theme3)",
                      color: "var(--accent)",
                    }
                  : { opacity: "100%" }
              }
              to="/"
            >
              Home
            </Link>
            <Link id="Nav-menu-a--2"
              style={
                pages.number === "2"
                  ? {
                      backgroundColor: "var(--theme3)",
                      color: "var(--accent)",
                    }
                  : { opacity: "100%" }
              }
              to="/products"
            >
              Products
            </Link>
            <Link id="Nav-menu-a--3"
              style={
                pages.number === "3"
                  ? {
                      backgroundColor: "var(--theme3)",
                      color: "var(--accent)",
                    }
                  : { opacity: "100%" }
              }
              to="/support"
            >
              Support
            </Link>
            <Link id="Nav-menu-a--4"
              style={
                pages.number === "4"
                  ? {
                      backgroundColor: "var(--theme3)",
                      color: "var(--accent)",
                    }
                  : { opacity: "100%" }
              }
              to="/status"
            >
              Status
            </Link>
          </ul>
        </div>
        <div id="Nav-menu-small" className={css["menu-small"]}>
          <button id="Nav-menu-small-button" onClick={() => navbarMenu(1)}>
            <i id="Nav-menu-small-icon" className={`${css["fas"]} ${css["fa-bars"]} ${"fas fa-bars"}`}></i>
          </button>
        </div>
        {/* <div id="Nav-loginbutton" className={css["loginbutton"]}>
              <div id="Nav-loginbutton-splashboard" className={css["loginbutton-splashboard"]}>
                <button type="button" id="Nav-loginbutton-splashboard-input" className={css["splashboard-form"]}>
                  <Link to="/splashboard">Splashboard</Link>
                </button>
              </div>
            </div> */}
        <div id="Nav-loginbutton--2" className={css["loginbutton"]}>
          <div id="Nav-loginbutton-login" className={css["loginbutton-login"]}>
            <button
              type="button" id="Nav-loginbutton-login-button" className={css["login-form"]}>
              <Link to="/login">Login</Link>
            </button>
          </div>
          <div id="Nav-loginbutton-login--3" className={css["loginbutton-register"]}>
            <button
              type="button" id="Nav-loginbutton-register-button" className={css["register-form"]}>
              <Link to="/register">Register</Link>
            </button>
          </div>
        </div>
        {/* } */}
      </div>
    </div>

    /*<nav className={css.navbar}>
      <div className={css.logo}>
        <Link to="/">
          <img alt="Stax Developer Suite Logo" src="https://cdn.st.ax/v2/logo-512.png" />
        </Link>
      </div>

      {/* <ul>
        <li>
          <Link to="/">🏠 Home</Link>
        </li>
        <li>
          <Link to="/wiki">📚 Wiki</Link>
        </li>
        <Button className={css.inline}
          text={loggedIn ? "Logout" : "Login"}
          onClick={login}
        />
        <span className={css.loginStatus}>
          {loggedIn ? "Logged in" : "Not logged in"}
        </span>
      </ul>
      <div className={css.menu}>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/support">Support</Link>
          <Button className={css.login}
            text={loggedIn? "Splashboard" : "Login"}
            onClick={login}
          />
        </ul>
      </div>
    </nav>*/
  );
}
