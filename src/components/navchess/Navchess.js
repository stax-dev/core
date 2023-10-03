//import { useState } from "react";
import { Link } from "react-router-dom";
import css from "./Navchess.module.css";
//import Button from "../button/Button";

// const electron = window.require('electron');
// const remote = electron.remote
// const {BrowserWindow,dialog,Menu} = remote

//External
import cssGlobal from "../../components/globalcss/GlobalCSS.module.css";

export default function navchessMenu(page) {
  // document.querySelector("#exit-btn").addEventListener("click", function (e) {
  //   ipcRenderer.send("close-me");
  // });

  //placeholders start
  var planName = "1234567890123456";
  var planID = "824KL0P82E";
  var chatroomPing = 0; //0 for none 1 for unread message(s)
  var serverStatus = 0;
  //placeholders end

  if (page.number === "1") {
    var pageName = "Chessboard";
  } else if (page.number === "2") {
    var pageName = "Chatrooms";
  } else if (page.number === "3") {
    var pageName = "Users";
  } else if (page.number === "4") {
    var pageName = "Servers";
  } else if (page.number === "5") {
    var pageName = "Corporate";
  } else if (page.number === "6") {
    var pageName = "Repository";
  } else if (page.number === "7") {
    var pageName = "Admin";
  }

  function serverOn() {
    document
      .getElementById("chessboard-top-buttons")
      .classList.add(css["server-status-online"]);
    document
      .getElementById("chessboard-top-buttons")
      .classList.remove(css["server-status-offline"]);
    document.getElementById("server-status").classList.add(css["online-tag"]);
    document
      .getElementById("server-status")
      .classList.remove(css["offline-tag"]);
    document
      .getElementById("server-status")
      .classList.remove(css["restart-tag"]);
  }

  function serverRestart() {
    document
      .getElementById("chessboard-top-buttons")
      .classList.add(css["server-status-online"]);
    document
      .getElementById("chessboard-top-buttons")
      .classList.remove(css["server-status-offline"]);
    document.getElementById("server-status").classList.add(css["restart-tag"]);
    document
      .getElementById("server-status")
      .classList.remove(css["offline-tag"]);
    document
      .getElementById("server-status")
      .classList.remove(css["online-tag"]);
  }

  function serverOff() {
    document
      .getElementById("chessboard-top-buttons")
      .classList.add(css["server-status-offline"]);
    document
      .getElementById("chessboard-top-buttons")
      .classList.remove(css["server-status-online"]);
    document.getElementById("server-status").classList.add(css["offline-tag"]);
    document
      .getElementById("server-status")
      .classList.remove(css["online-tag"]);
    document
      .getElementById("server-status")
      .classList.remove(css["restart-tag"]);
  }

  if (serverStatus === 0) {
    var tag = css["online-tag"];
    var buttonStatus = css["server-status-offline"];
    var status = css["offline-tag"];
  } else if (serverStatus === 1) {
    var tag = css["offline-tag"];
    var buttonStatus = css["server-status-online"];
    var status = css["online-tag"];
  } else if (serverStatus === 2) {
    var tag = css["restart-tag"];
    var buttonStatus = css["server-status-online"];
    var status = css["restart-tag"];
  }

  function navchessMenu(type) {
    var navchesssmallbox = document.getElementById(css["navchesssmall-box"]);
    var navchesssmall = document.getElementById(css["navchesssmall"]);
    if (type == 1) {
      navchesssmall.style.transform = "scale(1)";
      setTimeout(() => {
        navchesssmallbox.style.transform = "translateX(0%)";
      }, 0);
      // document.body.style.overflow = 'hidden';
    } else if (type == 2) {
      setTimeout(() => {
        navchesssmall.style.transform = "scale(0)";
      }, 150);
      navchesssmallbox.style.transform = "translateX(-100%)";
      // document.body.style.overflow = 'auto';
    }
  }

  window.onclick = function (closeModal) {
    var navchesssmall = document.getElementById(css["navchesssmall"]);
    if (closeModal.target == navchesssmall) {
      navchessMenu(2);
    }
  };

  // window.addEventListener("resize", function() {
  //     if (window.matchMedia("(min-width: 1000px)").matches) {
  //         if(navchesssmall){
  //             navchessMenu(2);
  //         }
  //     };
  // });

  window.onkeyup = function (closeEscape) {
    var navchesssmallbox = document.getElementById(css["navchesssmall-box"]);
    var navchesssmall = document.getElementById(css["navchesssmall"]);
    if (closeEscape.keyCode == 27) {
      if ((navchesssmallbox.style.transform = "translateX(0%)")) {
        navchessMenu(2);
      }
    }
  };

  var navchessHTML = (
    <div>
      <div className={css["chessboard-navbar-pages"]}>
        <Link className={css["chessboard-navbar-link"]} to="/chessboard">
          <div className={
              page.number === "1"
                ? css["chessboard-navbar-pages-box-active"]
                : css["chessboard-navbar-pages-box"]
            }>
            <div className={css["chessboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-chess-knight fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["chessboard-navbar-pages-page"]}>
              <p>Chessboard</p>
            </div>
            {/* <div className={css["chessboard-navbar-pages-unread"]}><div className={css["chessboard-unread"]}><p>1</p></div></div> */}
          </div>
        </Link>
        <Link className={css["chessboard-navbar-link"]}
          to="/chessboard/chatrooms"
        >
          <div className={
              page.number === "2"
                ? css["chessboard-navbar-pages-box-active"]
                : css["chessboard-navbar-pages-box"]
            }>
            <div className={css["chessboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-comments fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["chessboard-navbar-pages-page"]}>
              <p>Chatrooms</p>
            </div>
            {/* <div className={css["chessboard-navbar-pages-unread"]}><div className={css["chessboard-unread"]}><p>1</p></div></div> */}
          </div>
        </Link>
        <Link className={css["chessboard-navbar-link"]} to="/chessboard/users">
          <div className={
              page.number === "3"
                ? css["chessboard-navbar-pages-box-active"]
                : css["chessboard-navbar-pages-box"]
            }>
            <div className={css["chessboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-users fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["chessboard-navbar-pages-page"]}>
              <p>Users</p>
            </div>
            {/* <div className={css["chessboard-navbar-pages-unread"]}><div className={css["chessboard-unread"]}><p>1</p></div></div> */}
          </div>
        </Link>
        <Link className={css["chessboard-navbar-link"]}
          to="/chessboard/servers"
        >
          <div className={
              page.number === "4"
                ? css["chessboard-navbar-pages-box-active"]
                : css["chessboard-navbar-pages-box"]
            }>
            <div className={css["chessboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-server fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["chessboard-navbar-pages-page"]}>
              <p>Servers</p>
            </div>
            {/* <div className={css["chessboard-navbar-pages-unread"]}><div className={css["chessboard-unread"]}><p>1</p></div></div> */}
          </div>
        </Link>
        <Link className={css["chessboard-navbar-link"]}
          to="/chessboard/corporate"
        >
          <div className={
              page.number === "5"
                ? css["chessboard-navbar-pages-box-active"]
                : css["chessboard-navbar-pages-box"]
            }>
            <div className={css["chessboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-book fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["chessboard-navbar-pages-page"]}>
              <p>Corporate</p>
            </div>
            {/* <div className={css["chessboard-navbar-pages-unread"]}><div className={css["chessboard-unread"]}><p>1</p></div></div> */}
          </div>
        </Link>
        <Link className={css["chessboard-navbar-link"]}
          to="/chessboard/repository"
        >
          <div className={
              page.number === "6"
                ? css["chessboard-navbar-pages-box-active"]
                : css["chessboard-navbar-pages-box"]
            }>
            <div className={css["chessboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-code fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["chessboard-navbar-pages-page"]}>
              <p>Repository</p>
            </div>
            {/* <div className={css["chessboard-navbar-pages-unread"]}><div className={css["chessboard-unread"]}><p>1</p></div></div> */}
          </div>
        </Link>
        <Link className={css["chessboard-navbar-link"]} to="/chessboard/admin">
          <div className={
              page.number === "7"
                ? css["chessboard-navbar-pages-box-active"]
                : css["chessboard-navbar-pages-box"]
            }>
            <div className={css["chessboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-lock fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["chessboard-navbar-pages-page"]}>
              <p>Admin</p>
            </div>
            {/* <div className={css["chessboard-navbar-pages-unread"]}><div className={css["chessboard-unread"]}><p>1</p></div></div> */}
          </div>
        </Link>
        <Link className={css["chessboard-navbar-link"]} to="/staffboard">
          <div className={css["chessboard-navbar-pages-box"]}>
            <div className={css["chessboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-pizza-slice fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["chessboard-navbar-pages-page"]}>
              <p>Staffboard</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );

  if (page.type === "top") {
    return (
      <div className={css["chessboard-top"]}>
        <div className={css["chessboard-top-title"]}>
          <h1>{pageName}</h1>
        </div>
        <div className={css["chessboard-top-menu"]}>
          <button onClick={() => navchessMenu(1)}>
            <i className={`${css["fas"]} ${css["fa-bars"]} ${"fas fa-bars"}`}></i>
          </button>
        </div>
      </div>
    );
  } else if (page.type === "nav") {
    return (
      <div className={cssGlobal["chessboard-navbar"]}>
        {/* desktop chessboard */}
        <div className={css["chessboard-navbar-title"]}>
          <h1>Chessboard</h1>
        </div>
        <div className={cssGlobal["chessboard-navbar-content"]}>
          {navchessHTML}
        </div>

        {/* mobile chessboard */}
        <div id={css["navchesssmall"]} className={css["navchesssmall"]}>
          <div id={css["navchesssmall-box"]} className={css["navchesssmall-box"]}>
            <div id="Nav-navbar-backdrop" className={css["navbar-backdrop"]}>
              <div id="Nav-navbar-backdrop-box1" className={css["navbar-backdrop-box1"]}></div>
            </div>
            <div id="Nav-navchesssmall-title" className={css["navchesssmall-title"]}>
              <div id="Nav-navchesssmall-title-text" className={css["navchesssmall-title-text"]}>
                <h1 id="Nav-navchesssmall-title-text-h1">Chessboard</h1>
              </div>
              <div id="Nav-navchesssmall-title-close" className={css["navchesssmall-title-close"]}>
                <p id="Nav-navchesssmall-title-close-p">
                  <i id="Nav-navchesssmall-title-clocse-icon"
                    onClick={() => navchessMenu(2)} className={`${css["fas"]} ${css["fa-times"]} ${"fas fa-times"}`}></i>
                </p>
              </div>
            </div>
            {navchessHTML}
          </div>
        </div>
      </div>
    );
  }
}
