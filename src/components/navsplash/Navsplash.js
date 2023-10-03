//import { useState } from "react";
import { Link } from "react-router-dom";
import css from "./Navsplash.module.css";
//import Button from "../button/Button";

// const electron = window.require('electron');
// const remote = electron.remote
// const {BrowserWindow,dialog,Menu} = remote

//External
import cssGlobal from "../../components/globalcss/GlobalCSS.module.css";

export default function Navsplash(page) {
  // document.querySelector("#exit-btn").addEventListener("click", function (e) {
  //   ipcRenderer.send("close-me");
  // });

  var navsplash = document.getElementById("splashboard-navbarsmall-box");
  var navsplashfull = document.getElementById("splashboard-navbarsmall");
  var splashboard = document.getElementById("splashboard");

  function navsplashMenu(type) {
    var navsplashfull = document.getElementById("splashboard-navbarsmall");
    var navsplash = document.getElementById("splashboard-navbarsmall-box");
    var splashboard = document.getElementById("splashboard");
    if (type === 1) {
      navsplashfull.style.transform = "scale(1)";
      setTimeout(() => {
        navsplash.style.transform = "translateX(0%)";
      }, 0);
      // splashboard.classList.replace(css["splashboard"], css["splashboard-hidden"]);
      document.body.style.overflow = 'hidden';
    }else if(type === 2){
      setTimeout(() => {
        navsplashfull.style.transform = "scale(0)";
      }, 150);
      navsplash.style.transform = "translateX(-100%)";
      // splashboard.classList.replace(css["splashboard-hidden"], css["splashboard"]);
      document.body.style.overflow = 'auto';
    }
  }

  window.addEventListener('click', function(functionInside) {
    var navsplashfull = document.getElementById("splashboard-navbarsmall");
    if (functionInside.target == navsplashfull) {
      navsplashMenu(2);
    }
  });

  // window.addEventListener("resize", function() {
  //     if (window.matchMedia("(min-width: 1000px)").matches) {
  //         if(navsplashfull){
  //             navsplashMenu(2);
  //         }
  //     };
  // });

  window.addEventListener('keyup', function(functionInside) {
    var navsplash = document.getElementById("splashboard-navbarsmall-box");
    var navsplashfull = document.getElementById("splashboard-navbarsmall");
    if (functionInside.key === "Escape") {
      if(navsplash && navsplash.style.transform === "translateX(0%)"){
        navsplashMenu(2);
      }
    }else if(functionInside.shiftKey) {
      if(functionInside.key === "M"){
        if(navsplash && navsplash.style.transform === "translateX(0%)"){
          navsplashMenu(2);
        }else if(
          navsplashfull && navsplashfull.style.transform !== "scale(1)" &&
          window.innerWidth < 1000
        ){
          navsplashMenu(1);
        }
      }
    }
  });

  if (page.number === "1") {
    var pageName = "Splashboard";
  } else if (page.number === "2") {
    var pageName = "Chatrooms";
  } else if (page.number === "3") {
    var pageName = "Settings";
  } else if (page.number === "4") {
    var pageName = "Integrations";
  } else if (page.number === "5") {
    var pageName = "Billing";
  } else if (page.number === "6") {
    var pageName = "Notifications";
  }

  var navHTML = (
    <div className={`${css["splashboard-navbar-pages"]} ${cssGlobal["flex-center-center"]}`}>
      <Link className={css["splashboard-navbar-link"]} to="/splashboard">
        <div className={
            page.number === "1"
              ? css["splashboard-navbar-pages-box-active"]
              : css["splashboard-navbar-pages-box"]
          }>
          <div className={css["splashboard-navbar-pages-icon"]}>
            <p>
              <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-palette fa-1x"}`}></i>
            </p>
          </div>
          <div className={css["splashboard-navbar-pages-page"]}>
            <p>Splashboard</p>
          </div>
          {/* <div className={css["splashboard-navbar-pages-unread"]}><div className={css["splashboard-unread"]}><p>1</p></div></div> */}
        </div>
      </Link>
      <Link className={css["splashboard-navbar-link"]}
        to="/splashboard/chatrooms"
      >
        <div className={
            page.number === "2"
              ? css["splashboard-navbar-pages-box-active"]
              : css["splashboard-navbar-pages-box"]
          }>
          <div className={css["splashboard-navbar-pages-icon"]}>
            <p>
              <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-comments fa-1x"}`}></i>
            </p>
          </div>
          <div className={css["splashboard-navbar-pages-page"]}>
            <p>Chatrooms</p>
          </div>
          {/* <div className={css["splashboard-navbar-pages-unread"]}><div className={css["splashboard-unread"]}><p>1</p></div></div> */}
        </div>
      </Link>
      <Link className={css["splashboard-navbar-link"]}
        to="/splashboard/settings"
      >
        <div className={
            page.number === "3"
              ? css["splashboard-navbar-pages-box-active"]
              : css["splashboard-navbar-pages-box"]
          }>
          <div className={css["splashboard-navbar-pages-icon"]}>
            <p>
              <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-cog fa-1x"}`}></i>
            </p>
          </div>
          <div className={css["splashboard-navbar-pages-page"]}>
            <p>Settings</p>
          </div>
          {/* <div className={css["splashboard-navbar-pages-unread"]}><div className={css["splashboard-unread"]}><p>1</p></div></div> */}
        </div>
      </Link>
      <Link className={css["splashboard-navbar-link"]}
        to="/splashboard/integrations"
      >
        <div className={
            page.number === "4"
              ? css["splashboard-navbar-pages-box-active"]
              : css["splashboard-navbar-pages-box"]
          }>
          <div className={css["splashboard-navbar-pages-icon"]}>
            <p>
              <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-link fa-1x"}`}></i>
            </p>
          </div>
          <div className={css["splashboard-navbar-pages-page"]}>
            <p>Integrations</p>
          </div>
          {/* <div className={css["splashboard-navbar-pages-unread"]}><div className={css["splashboard-unread"]}><p>1</p></div></div> */}
        </div>
      </Link>
      <Link className={css["splashboard-navbar-link"]}
        to="/splashboard/billing"
      >
        <div className={
            page.number === "5"
              ? css["splashboard-navbar-pages-box-active"]
              : css["splashboard-navbar-pages-box"]
          }>
          <div className={css["splashboard-navbar-pages-icon"]}>
            <p>
              <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-credit-card fa-1x"}`}></i>
            </p>
          </div>
          <div className={css["splashboard-navbar-pages-page"]}>
            <p>Billing</p>
          </div>
          {/* <div className={css["splashboard-navbar-pages-unread"]}><div className={css["splashboard-unread"]}><p>1</p></div></div> */}
        </div>
      </Link>
      <Link className={css["splashboard-navbar-link"]}
        to="/splashboard/notifications"
      >
        <div className={
            page.number === "6"
              ? css["splashboard-navbar-pages-box-active"]
              : css["splashboard-navbar-pages-box"]
          }>
          <div className={css["splashboard-navbar-pages-icon"]}>
            <p>
              <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-envelope fa-1x"}`}></i>
            </p>
          </div>
          <div className={css["splashboard-navbar-pages-page"]}>
            <p>Notifications</p>
          </div>
        </div>
      </Link>
      <Link className={css["splashboard-navbar-link"]} to="/staffboard">
        <div className={css["splashboard-navbar-pages-box"]}>
          <div className={css["splashboard-navbar-pages-icon"]}>
            <p>
              <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-pizza-slice fa-1x"}`}></i>
            </p>
          </div>
          <div className={css["splashboard-navbar-pages-page"]}>
            <p>Staffboard</p>
          </div>
        </div>
      </Link>
      <Link className={css["splashboard-navbar-link"]} to="/">
        <div className={css["splashboard-navbar-pages-box"]}>
          <div className={css["splashboard-navbar-pages-icon"]}>
            <p>
              <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-earth-americas fa-1x"}`}></i>
            </p>
          </div>
          <div className={css["splashboard-navbar-pages-page"]}>
            <p>Website</p>
          </div>
        </div>
      </Link>
    </div>
  );

  if (page.type === "top") {
    return (
      <div className={css["splashboard-title"]}>
        <div className={css["splashboard-title-box"]}>
          <h1>{pageName}</h1>
        </div>
        <div className={css["splashboard-title-menu"]}>
          <button onClick={() => navsplashMenu(1)}>
            <i className={`${css["fas"]} ${css["fa-bars"]} ${"fas fa-bars"}`}></i>
          </button>
        </div>
      </div>
    );
  } else if (page.type === "nav") {
    return (
      <div className={cssGlobal["splashboard-navbar"]}>
        <div className={css["splashboard-navbar-desktop"]}>
          <div className={css["splashboard-navbar-title"]}>
            <h1>Splashboard</h1>
          </div>
          {navHTML}
        </div>

        {/* mobile version */}
        <div id="splashboard-navbarsmall" className={css["splashboard-navbarsmall"]}>
          <div id="splashboard-navbarsmall-box" className={css["splashboard-navbarsmall-box"]}>
            <div className={css["navsplashsmall-title"]}>
              <div className={css["navsplashsmall-title-text"]}>
                <h1>Splashboard</h1>
              </div>
              <div className={css["navsplashsmall-title-close"]}>
                <p>
                  <i
                    onClick={() => navsplashMenu(2)} className={`${css["fas"]} ${css["fa-times"]} ${"fas fa-times"}`}></i>
                </p>
              </div>
            </div>

            {navHTML}
          </div>
        </div>
      </div>
    );
  }
}
