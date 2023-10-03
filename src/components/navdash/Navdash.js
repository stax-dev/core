import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import css from "./Navdash.module.css";
//import Button from "../button/Button";

// const electron = window.require('electron');
// const remote = electron.remote
// const {BrowserWindow,dialog,Menu} = remote

//External
import cssGlobal from "../../components/globalcss/GlobalCSS.module.css";
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { FitAddon } from 'xterm-addon-fit';

export default function Navdash(page) {
  // document.querySelector("#exit-btn").addEventListener("click", function (e) {
  //   ipcRenderer.send("close-me");
  // });

  //user static
  var [username, SetUsername] = useState();

  //plan static
  var [planName, SetPlanName] = useState();
  var [planID, SetPlanID] = useState();

  //plan dynamic
  var [chatroomPing, SetChatroomPing] = useState(); //0 for none 1 for unread message(s)
  var [serverStatus, SetServerStatus] = useState(); //0 for offline 1 for online 2 for restarting
  var [chatroomChat, setChatroomChat] = useState();


  //dummy data
  /*
  var [chatroomChat, setChatroomChat] = useState([
    {
      author: "John12",
      message: "testing message hey helloooo",
    },
    {
      author: "Dasho",
      message: "replying to the message seeing if html works",
    },
    {
      author: "Stax",
      message: "yea thanks ill have a look at it soon",
    }
  ]);
  */

  function requestAPI(){
    //API Request
  }

  function sendAPI(type, data){
    if(type === "sendChat"){
      console.log("sendChat");
    }else if(type === "sendConsole"){
      console.log("sendConsole");
    }else{
      return;
    }
  }

  if (page.number === "1") {
    var pageName = "Dashboard";
  } else if (page.number === "2") {
    var pageName = "Files";
  } else if (page.number === "3") {
    var pageName = "Console";
  } else if (page.number === "4") {
    var pageName = "Analytics";
  } else if (page.number === "5") {
    var pageName = "Chatroom";
  } else if (page.number === "6") {
    var pageName = "History";
  } else if (page.number === "7") {
    var pageName = "Admin";
  } else if (page.number === "8") {
    var pageName = "Billing";
  }

  function serverOn() {
    document
      .getElementById("dashboard-top-buttons")
      .classList.add(css["server-status-online"]);
    document
      .getElementById("dashboard-top-buttons")
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
      .getElementById("dashboard-top-buttons")
      .classList.add(css["server-status-online"]);
    document
      .getElementById("dashboard-top-buttons")
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
      .getElementById("dashboard-top-buttons")
      .classList.add(css["server-status-offline"]);
    document
      .getElementById("dashboard-top-buttons")
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

  function navdashMenu(type) {
    var navdashsmallbox = document.getElementById(css["navdashsmall-box"]);
    var navdashsmall = document.getElementById(css["navdashsmall"]);
    if (type == 1) {
      navdashsmall.style.transform = "scale(1)";
      setTimeout(() => {
        navdashsmallbox.style.transform = "translateX(0%)";
      }, 0);
      document.body.style.overflow = 'hidden';
    } else if (type == 2) {
      setTimeout(() => {
        navdashsmall.style.transform = "scale(0)";
      }, 150);
      navdashsmallbox.style.transform = "translateX(-100%)";
      document.body.style.overflow = 'auto';
    }
  }

  window.addEventListener('click', function(closeModal) {
    var navdashsmall = document.getElementById(css["navdashsmall"]);
    if (closeModal.target == navdashsmall) {
      navdashMenu(2);
    }else if(closeModal.target == document.getElementById("dashconsole")){
      dashConsole();
    }else if(closeModal.target == document.getElementById("dashchatroom")){
      dashChatroom();
    }
  });

  // window.addEventListener("resize", function() {
  //     if (window.matchMedia("(min-width: 1000px)").matches) {
  //         if(navdashsmall){
  //             navdashMenu(2);
  //         }
  //     };
  // });

  // window.addEventListener('keydown', function(functionInside) {
  //   var navdashsmallbox = document.getElementById(css["navdashsmall-box"]);
  //   var navdashsmall = document.getElementById(css["navdashsmall"]);
  //   if(functionInside.shiftKey) {
  //     if(functionInside.key === "M"){
  //       if(navdashsmallbox && navdashsmallbox.style.transform === "translateX(0%)"){
  //         navdashMenu(2);
  //       }else if(
  //         navdashsmall && navdashsmall.style.transform !== "scale(1)" &&
  //         window.innerWidth < 1000
  //         ){
  //         navdashMenu(1);
  //       }
  //     }
  //   }
  // });

  /*
  above code is for keydown - all navs are currently keyup
  still deciding whether to

  keyup
  pros -cleaner code prevents toggle spam when hold down key
  cons - harder to press cause muscle memory of keyboard shortcuts

  keydown
  pros - easy shortcut muscle memory keyboard shortcuts
  cons - if user holds down itll spam it (but not coding downside just visual issue)

  */


 window.addEventListener('keydown', function(functionInside) {
  if(functionInside.key === "Enter"){
    if(document.getElementById("Navdash-dashchatroom-type-input-input") &&
      document.getElementById("Navdash-dashchatroom-type-input-input") === document.activeElement
    ){
      if(!functionInside.shiftKey){
        functionInside.preventDefault();
        sendChat();
      }
    }
  }
 });

  window.addEventListener('keyup', function(functionInside) {
    var navdashsmallbox = document.getElementById(css["navdashsmall-box"]);
    var navdashsmall = document.getElementById(css["navdashsmall"]);
    if (functionInside.key === "Escape") {
      if(document.getElementById("dashchatroom") && document.getElementById("dashchatroom").style.transform === "scale(1)"){
        dashChatroom();
      }else if(document.getElementById("dashconsole") && document.getElementById("dashconsole").style.transform === "scale(1)"){
        dashConsole();
      }else if(navdashsmallbox && navdashsmallbox.style.transform === "translateX(0%)"){
        navdashMenu(2);
      }
    }else if(functionInside.key === "/"){
      //slash key
      if(document.getElementById("Navdash-dashchatroom-type-input-input")){
        document.getElementById("Navdash-dashchatroom-type-input-input").focus();
      }
    }else if(functionInside.shiftKey) {
      if(functionInside.key === "M"){
        if(navdashsmallbox && navdashsmallbox.style.transform === "translateX(0%)"){
          navdashMenu(2);
        }else if(
            navdashsmall && navdashsmall.style.transform !== "scale(1)" &&
            window.innerWidth < 1000
          ){
           navdashMenu(1);
        }
      }
    }
  });

  function dashConsole() {
    var dashconsolebox = document.getElementById("dashconsole-box");
    var dashconsole = document.getElementById("dashconsole");
    if (dashconsole.style.transform === "scale(1)") {
      dashconsolebox.style.transform = "translateX(80%)";
      setTimeout(() => {
        dashconsole.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    } else {
      dashconsolebox.scrollTop = 0;
      dashconsole.style.transform = "scale(1)";
      dashconsolebox.style.transform = "translateX(0%)";
      navdashMenu(2);
      document.body.style.overflow = 'hidden';
    }
  }

  function dashChatroom() {
    var dashchatroombox = document.getElementById("dashchatroom-box");
    var dashchatroom = document.getElementById("dashchatroom");
    if (dashchatroom.style.transform === "scale(1)") {
      dashchatroombox.style.transform = "translateX(80%)";
      setTimeout(() => {
        dashchatroom.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    } else {
      dashchatroombox.scrollTop = 0;
      dashchatroom.style.transform = "scale(1)";
      dashchatroombox.style.transform = "translateX(0%)";
      navdashMenu(2);
      document.body.style.overflow = 'hidden';
      document.getElementById("Navdash-dashchatroom-main").scrollTop = document.getElementById("Navdash-dashchatroom-main").scrollHeight;
    }
  }

  function sendChat(){
    if(document.getElementById("Navdash-dashchatroom-type-input-input").value){
      console.log(document.getElementById("Navdash-dashchatroom-type-input-input").value);
      document.getElementById("Navdash-dashchatroom-type-input-input").value = "";
      document.getElementById("Navdash-dashchatroom-type-input-input").focus();
      sendAPI("sendChat");
    }
  }

  var navdashHTML = (
    <div>
      <div className={css["dashboard-navbar-title"]}>
        <div className={css["dashboard-navbar-title-image"]}>
          <div className={css["server-profile-photo"]}></div>
          {/* profile photo is added to this div above in style tag */}
        </div>
        {!planName || !serverStatus ?
          <div className={css["dashboard-navbar-title-text"]}>
            <p>
              <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour2"]}`}></span>
            </p>
            <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span>
          </div>:
          <div className={css["dashboard-navbar-title-text"]}>
            <p>
              {planName}
            </p>
            <span id="server-status" className={status}>
              <span className={css["online-tag-text"]}>
                <i className={`${css["fas"]} ${css["fa-circle"]} ${"fas fa-circle"}`}></i>
                Online
              </span>
              <span className={css["offline-tag-text"]}>
                <i className={`${css["fas"]} ${css["fa-circle"]} ${"fas fa-circle"}`}></i>
                Offline
              </span>
              <span className={css["restart-tag-text"]}>
                <i className={`${css["fas"]} ${css["fa-circle"]} ${"fas fa-circle"}`}></i>
                Restarting
              </span>
            </span>
          </div>
        }
      </div>
      <div className={`${css["dashboard-navbar-pages"]} ${cssGlobal["flex-stretch-center"]}`}>
        <Link className={css["dashboard-navbar-link"]} to="/dashboard">
          <div className={`${page.number === "1" ?
                (css["dashboard-navbar-pages-box-active"]):
                (css["dashboard-navbar-pages-box"])
            } ${cssGlobal["flex-center-left"]}`}>
            <div className={css["dashboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-th-large fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["dashboard-navbar-pages-page"]}>
              <p>Dashboard</p>
            </div>
            {/* <div className={css["dashboard-navbar-pages-unread"]}><div className={css["dashboard-unread"]}><p>1</p></div></div> */}
          </div>
        </Link>
        <Link className={css["dashboard-navbar-link"]} to="/files">
          <div className={`${page.number === "2" ?
                (css["dashboard-navbar-pages-box-active"]):
                (css["dashboard-navbar-pages-box"])
            } ${cssGlobal["flex-center-left"]}`}>
            <div className={css["dashboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-folder-open fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["dashboard-navbar-pages-page"]}>
              <p>Files</p>
            </div>
            {/* <div className={css["dashboard-navbar-pages-unread"]}><div className={css["dashboard-unread"]}><p>1</p></div></div> */}
          </div>
        </Link>
        <button className={css["dashboard-navbar-button"]} onClick={() => dashConsole()}>
          <div className={`${page.number === "3" ?
                (css["dashboard-navbar-pages-box-active"]):
                (css["dashboard-navbar-pages-box"])
            } ${cssGlobal["flex-center-left"]}`}>
            <div className={css["dashboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-terminal fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["dashboard-navbar-pages-page"]}>
              <p>Console</p>
            </div>
            {/* <div className={css["dashboard-navbar-pages-unread"]}><div className={css["dashboard-unread"]}><p>1</p></div></div> */}
          </div>
        </button>
        <Link className={css["dashboard-navbar-link"]} to="/analytics">
          <div className={`${page.number === "4" ?
                (css["dashboard-navbar-pages-box-active"]):
                (css["dashboard-navbar-pages-box"])
            } ${cssGlobal["flex-center-left"]}`}>
            <div className={css["dashboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-chart-pie fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["dashboard-navbar-pages-page"]}>
              <p>Analytics</p>
            </div>
            {/* <div className={css["dashboard-navbar-pages-unread"]}><div className={css["dashboard-unread"]}><p>1</p></div></div> */}
          </div>
        </Link>
        <button className={css["dashboard-navbar-button"]} onClick={() => dashChatroom()}>
          <div className={`${page.number === "5" ?
                (css["dashboard-navbar-pages-box-active"]):
                (css["dashboard-navbar-pages-box"])
            } ${cssGlobal["flex-center-left"]}`}>
            <div className={css["dashboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-comments fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["dashboard-navbar-pages-page"]}>
              <p>Chatroom</p>
            </div>
            {/* <div className={css["dashboard-navbar-pages-unread"]}><div className={css["dashboard-unread"]}><p>1</p></div></div> */}
          </div>
        </button>
        <Link className={css["dashboard-navbar-link"]} to="/history">
          <div className={`${page.number === "6" ?
                (css["dashboard-navbar-pages-box-active"]):
                (css["dashboard-navbar-pages-box"])
            } ${cssGlobal["flex-center-left"]}`}>
            <div className={css["dashboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-history fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["dashboard-navbar-pages-page"]}>
              <p>History</p>
            </div>
            {/* <div className={css["dashboard-navbar-pages-unread"]}><div className={css["dashboard-unread"]}><p>1</p></div></div> */}
          </div>
        </Link>
        <Link className={css["dashboard-navbar-link"]} to="/admin">
          <div className={`${page.number === "7" ?
                (css["dashboard-navbar-pages-box-active"]):
                (css["dashboard-navbar-pages-box"])
            } ${cssGlobal["flex-center-left"]}`}>
            <div className={css["dashboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-life-ring fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["dashboard-navbar-pages-page"]}>
              <p>Admin</p>
            </div>
            {/* <div className={css["dashboard-navbar-pages-unread"]}><div className={css["dashboard-unread"]}><p>1</p></div></div> */}
          </div>
        </Link>
        <Link className={css["dashboard-navbar-link"]} to="/billing">
          <div className={`${page.number === "8" ?
                (css["dashboard-navbar-pages-box-active"]):
                (css["dashboard-navbar-pages-box"])
            } ${cssGlobal["flex-center-left"]}`}>
            <div className={css["dashboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-wallet fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["dashboard-navbar-pages-page"]}>
              <p>Billing</p>
            </div>
            {/* <div className={css["dashboard-navbar-pages-unread"]}><div className={css["dashboard-unread"]}><p>1</p></div></div> */}
          </div>
        </Link>
        <Link className={css["dashboard-navbar-link"]} to="/splashboard">
          <div className={`${css["dashboard-navbar-pages-box"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["dashboard-navbar-pages-icon"]}>
              <p>
                <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-palette fa-1x"}`}></i>
              </p>
            </div>
            <div className={css["dashboard-navbar-pages-page"]}>
              <p>Splashboard</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );


  //xtermjs

  useEffect(() => {
    const terminalDiv = new Terminal({
      cursorBlink: true,
      focus: true,
      fontFamily: 'Inconsolata, monospace',
      fontSize: 14,
      rows: 10,
      width: '100%',
      theme: {
        background: 'black',
        foreground: 'white',
        selection: '#303338',
      }
    });
    const fitAddon = new FitAddon();
    terminalDiv.loadAddon(fitAddon);
    terminalDiv.open(document.getElementById("Navdash-dashconsole-main"));
    terminalDiv.writeln('Hello, World!');
    fitAddon.fit();
  });


  if (page.type === "top") {
    return (
      <div className={`${css["dashboard-top"]} ${cssGlobal["flex-center-left"]}`}>
        <div className={css["dashboard-top-title"]}>
          <h1>{pageName}</h1>
        </div>
        <div className={css["dashboard-top-menu"]}>
          <button onClick={() => navdashMenu(1)}>
            <i className={`${css["fas"]} ${css["fa-bars"]} ${"fas fa-bars"}`}></i>
          </button>
        </div>
      </div>
    );
  } else if (page.type === "nav") {
    return (
      <div className={cssGlobal["dashboard-navbar"]}>
        {/* desktop dashboard */}
        <div className={cssGlobal["dashboard-navbar-content"]}>
          {navdashHTML}
        </div>

        {/* mobile dashboard */}
        <div id={css["navdashsmall"]} className={css["navdashsmall"]}>
          <div id={css["navdashsmall-box"]} className={css["navdashsmall-box"]}>
            <div id="Nav-navbar-backdrop" className={`${css["navbar-backdrop"]} ${cssGlobal["flex-center-center"]}`}>
              <div id="Nav-navbar-backdrop-box1" className={css["navbar-backdrop-box1"]}></div>
            </div>
            <div id="Nav-navdashsmall-title" className={`${css["navdashsmall-title"]} ${cssGlobal["flex-center-left"]}`}>
              <div id="Nav-navdashsmall-title-text" className={css["navdashsmall-title-text"]}>
                <h1 id="Nav-navdashsmall-title-text-h1">Dashboard</h1>
              </div>
              <div id="Nav-navdashsmall-title-close" className={css["navdashsmall-title-close"]}>
                <button onClick={() => navdashMenu(2)} className={`${css["navdashsmall-title-close-button"]} ${cssGlobal["flex-center-center"]}`}>
                  <i id="Nav-navdashsmall-title-close-icon" className={`${css["fas"]} ${css["fa-times"]} ${"fas fa-times"}`}></i>
                </button>
              </div>
            </div>
            {navdashHTML}
          </div>
        </div>

        {/* console sidebar */}
        <div id="dashconsole" className={`${css["dashconsole"]} ${cssGlobal["flex-center-center"]}`}>
          <div id="dashconsole-box" className={css["dashconsole-box"]}>
            <div id="dashconsole-box-title" className={css["dashconsole-box-info"]}>
              <div className={`${css["dashconsole-box-title"]} ${cssGlobal["flex-center-left"]}`}>
                <div className={css["dashconsole-box-title-text"]}>
                  <h1 id="dashconsole-box-title-h1">Console</h1>
                </div>
                <div className={`${css["dashconsole-box-title-close"]} ${cssGlobal["flex-center-center"]}`}>
                  <button title="Restart Session" className={css["dashconsole-box-restart"]}>
                    <i className={`${css["fas"]} ${css["fa-undo"]} ${"fas fa-undo"}`}></i>
                  </button>
                  <button title="Close" className={`${css["dashconsole-box-close"]} ${cssGlobal["flex-center-center"]}`} onClick={() => dashConsole()}>
                    <i className={`${css["fas"]} ${css["fa-times"]} ${"fas fa-times"}`}></i>
                  </button>
                </div>
              </div>
            </div>
            <div id="Navdash-dashconsole-main" className={`${css["dashconsole-main"]}`}>
                {/* {[...Array(20)].map((number) => (
                  <span key={number}>this is an array spam but - this is supposed to be a canvas/iframe embed that people can type commands in like the vscode terminal
                  <br/>
                  999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                  </span>
                ))} */}
                {/* <div className={css["loader-circle"]}></div> */}
            </div>
            {/* loader circle display before console loads */}
            {/* <div className={`${css["dashconsole-main"]} ${cssGlobal["flex-center-center"]}`}>
              <div className={css["loader-circle"]}></div>
            </div> */}
          </div>
        </div>

         {/* chatroom sidebar */}
         <div id="dashchatroom" className={`${css["dashchatroom"]} ${cssGlobal["flex-center-center"]}`}>
          <div id="dashchatroom-box" className={css["dashchatroom-box"]}>
            <div id="dashchatroom-box-title" className={css["dashchatroom-box-info"]}>
              <div className={`${css["dashchatroom-box-title"]} ${cssGlobal["flex-center-left"]}`}>
                <div className={css["dashchatroom-box-title-text"]}>
                  <h1 id="dashchatroom-box-title-h1">Chatroom</h1>
                </div>
                <div className={`${css["dashchatroom-box-title-close"]} ${cssGlobal["flex-center-center"]}`}>
                  <button title="Close" className={`${css["dashchatroom-box-close"]} ${cssGlobal["flex-center-center"]}`} onClick={() => dashChatroom()}>
                    <i className={`${css["fas"]} ${css["fa-times"]} ${"fas fa-times"}`}></i>
                  </button>
                </div>
              </div>
            </div>
            {/* loading screen before chat loats up */}
            {/* <div className={`${css["dashchatroom-main"]} ${cssGlobal["flex-center-center"]}`}>
              <div className={css["loader-circle"]}></div>
            </div> */}
            <div id="Navdash-dashchatroom-main" className={css["dashchatroom-main"]}>
              <div className={css["chatroom-messages"]}>
                <div className={css["chatroom-date"]}>
                  <p>24th July 2021</p>
                </div>
                  {chatroomChat && (chatroomChat.map((list) => (
                    <div className={list.author === username ? (css["chatroom-self"]):(css["chatroom-other"])}>
                      <p><b>{list.author}</b>{list.message}</p>
                    </div>
                  )))}
              </div>
            </div>
            <div id="Navdash-dashchatroom-type" className={`${css["dashchatroom-type"]} ${cssGlobal["flex-center-center"]}`}>
              <div className={css["dashchatroom-type-input"]}>
                <textarea id="Navdash-dashchatroom-type-input-input" type="text" placeholder="Chat with Support"></textarea>
              </div>
              <div className={css["dashchatroom-type-send"]}>
                <button onClick={() => sendChat()}><i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i></button>
              </div>
            </div>
          </div>
        </div>



      </div>
    );
  }
}
