import React, { useState } from "react";
import { Link, useNavigate, useHistory } from "react-router-dom";
import cssAddon from "./Addons.module.css";
import cssGlobal from "../globalcss/GlobalCSS.module.css";
import axios from "axios";
//import Button from "../button/Button";

// const electron = window.require('electron');
// const remote = electron.remote
// const {BrowserWindow,dialog,Menu} = remote

//Sounds
import notificationPing from "../../sounds/notificationPing.mp3";

const logo = "https://cdn.st.ax/v2/logo.svg";

//Global Checks
window.addEventListener("offline", (event) => {
  snackbarNotification(2, "You are offline");
});

window.addEventListener("online", (event) => {
  snackbarNotification(1, "You are online");
});

window.addEventListener("drop", (event) => {
  event.preventDefault();
});


//Time Formatter
export function timeFormatter(type, dateTimeString) {
  var originalDate = new Date(dateTimeString);
  if(type === "long"){
    var formatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
  }else{
    var formatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
  }

  var formatResult = originalDate.toLocaleString("en-GB", formatOptions).toUpperCase()
    .replace(",", "")
    .replace(" AM", "AM")
    .replace(" PM", "PM")
    .replace(" 0:", " 12:");

  if(type === "long"){
    var hoverFormat = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  }else{
    var hoverFormat = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  }

  var hoverDate = originalDate.toLocaleString("en-GB", hoverFormat)
    .replace("at ", "")
    .replace(" am", "am")
    .replace(" pm", "pm")
    .replace(" 0:", " 12:");

  return <span title={hoverDate}>{formatResult}</span>;
}


// OnContextMenu

let mouseX;
let mouseY;

document.addEventListener("mousemove", function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  contextMenu(event);
});

document.addEventListener('click', (event) => {
  if(document.getElementById('contextmenu').style.transform === "scale(1)"){
    contextMenu(event);
  }
});

function contextMenu(event){
  var contextmenu = document.getElementById('contextmenu');
  var contextmenubox = document.getElementById('contextmenu-box');
  if(contextmenu.style.transform === "scale(1)"){
    contextmenubox.style.transform = "scale(0.4)";
    setTimeout(() => {
      contextmenu.style.transform = "scale(0)";
    }, 150);
  }else{
    // Set the position for menu
    if(mouseX > window.innerWidth - contextmenubox.offsetWidth - 20){
      contextmenubox.style.left = "calc(100% - " + contextmenubox.offsetWidth + "px - 20px)";
    }else{
      contextmenubox.style.left = mouseX + "px";
    }

    if(mouseY > window.innerHeight - contextmenubox.offsetHeight - 20){
      contextmenubox.style.top = "calc(100dvh - " + contextmenubox.offsetHeight + "px - 20px)";
      //chose 20 cause of padding from menu to page max
    }else{
      contextmenubox.style.top = mouseY + "px";
    }

    contextmenubox.scrollTop = 0;
    contextmenu.style.transform = "scale(1)";
    contextmenubox.style.transform = "scale(1)";
  }
}


//Axios
export async function Dynamic(link) {
  var value = [];
  axios
    .get(link.link)
    .then(function (response) {
      var value = response.data;
    })
    .catch(function () {
      console.log("error");
      //this is testing phase only - remove console log after
    })
    .finally(function () {
      //you can run the other commands on the page itself
    });

  return <p>hi {value}</p>;
}

//Bubbles animation

export function Bubbles() {
  return (
    <div className={cssGlobal["bubble-section"]}>
      <div className={cssGlobal["bubble"]}></div>
      <div className={cssGlobal["bubble"]}></div>
      <div className={cssGlobal["bubble"]}></div>
      <div className={cssGlobal["bubble"]}></div>
      <div className={cssGlobal["bubble"]}></div>
      <div className={cssGlobal["bubble"]}></div>
      <div className={cssGlobal["bubble"]}></div>
      <div className={cssGlobal["bubble"]}></div>
      <div className={cssGlobal["bubble"]}></div>
      <div className={cssGlobal["bubble"]}></div>
    </div>
  );
}

//Scroll Reveal
export function scrollReveal() {
  //how many pixels below element's top line to start revealing the element
  var rselementpoint = 50;

  var rselements = document.getElementsByClassName("rs-element");
  //section with class name "rselement" will be revealed on scroll down and stay visible
  for (var i = 0; i < rselements.length; i++) {
    var windowheight = window.innerHeight;
    var rselementtop = rselements[i].getBoundingClientRect().top;
    var rselementbottom = rselements[i].getBoundingClientRect().bottom;
    if (rselementtop < windowheight - rselementpoint) {
      //if user scrolls in view of element
      rselements[i].classList.add(cssGlobal["rs-element-active"]);
    } else {
      // rselements[i].classList.remove('rselement-active');
      //if user scrolls past element
    }
    if (rselementbottom < 0 + rselementpoint) {
      // rselements[i].classList.remove('rselement-active');
      // if user scrolls from bottom to top
    }
  }

  var rselementsboth = document.getElementsByClassName("rs-element-both");
  //section with class name "rselementboth" will be revealed on scroll up and down

  for (var i = 0; i < rselementsboth.length; i++) {
    var windowheight = window.innerHeight;
    var rselementtop = rselementsboth[i].getBoundingClientRect().top;
    var rselementbottom = rselementsboth[i].getBoundingClientRect().bottom;
    if (rselementtop < windowheight - rselementpoint) {
      rselementsboth[i].classList.add(cssGlobal["rs-element-active"]);
      //if user scrolls in view of element
    } else {
      rselementsboth[i].classList.remove(cssGlobal["rs-element-active"]);
      //if user scrolls past element
    }
    if (rselementbottom < -200 + rselementpoint) {
      rselementsboth[i].classList.remove(cssGlobal["rs-element-active"]);
      // if user scrolls from bottom to top
    }
  }
}

//Payment Sound
export function paymentSound() {
  var paysound = new Audio("/assets/sounds/success.m4a");
  paysound.playbackRate = 1;
  paysound.volume = 0.5;
  paysound.play();
}

//Notification Popup

var notification = document.getElementById("Addons-notificationspopup");

var popupView = "";
//var notificationNumber = '';

export function newNotification(
  popupIcon,
  popupTitle,
  popupMessage,
  popupLink
) {
  popupView = popupLink;
  var notification = document.getElementById("Addons-notificationspopup");
  if (
    typeof notification !== "undefined" &&
    typeof popupTitle !== "undefined" &&
    typeof popupMessage !== "undefined" &&
    typeof popupLink !== "undefined"
  ) {
    if (notification.childElementCount >= 1) {
      notification.removeChild(notification.lastChild);
    }

    var notificationAudio = new Audio(notificationPing);
    notificationAudio.playbackRate = 1;
    notificationAudio.volume = 0.2;
    notificationAudio.play();
    setTimeout(() => {
      notificationAudio.pause();
      notificationAudio.currentTime = 0;
    }, 1000);

    var popup = document.createElement("div");
    notification.prepend(popup);
    popup.className = cssAddon["notification-box"];
    setTimeout(() => {
      notification.firstElementChild.setAttribute(
        "style",
        "transform: translateX(0%)"
      );
    }, 10);
    // if(notificationUnread == '0'){
    //     notificationNumber = '';
    // }else{
    //     notificationNumber = ' (' + notificationUnread + ' unread)';
    // }
    popup.innerHTML =
      '\
        <div id="Addons-notification-box-inside" class="' + cssAddon["notification-box-inside"] + '" id="notification-box-inside">\
            <div id="Addons-notification-box-icon" class="' + cssAddon["notification-box-icon"] +'">\
                <p id="Addons-notification-box-icon-p"><i id="Addons-notification-box-icon-icon" class="' + popupIcon + " fa-1x " + cssAddon["fa-1x"] +'"></i></p>\
            </div>\
            <div id="Addons-notification-box-info" class="' + cssAddon["notification-box-info"] +'">\
                <p id="Addons-notification-box-info-p"><b>' + popupTitle + "</b>\
                <br/>" + popupMessage + '</p>\
            </div>\
            <button onclick="event.stopPropagation()" id="Addons-notification-box-buttons" class="' + cssAddon["notification-box-buttons"] + ' ' + cssGlobal["flex-center-center"] + '">\
              <i id="Addons-notification-box-buttons-icon" class="fas ' + cssAddon["fas"] + ' fa-eye-slash" id="close-notification"></i>\
            </button>\
        </div>\
      ';

    document
      .getElementById("Addons-notification-box-inside")
      .addEventListener("click", () => viewNotification());
    document
      .getElementById("Addons-notification-box-buttons-icon")
      .addEventListener("click", () => closeNotification());
  } else {
    console.log("doesnt work");
  }
}

export function viewNotification() {
  window.location.href = popupView;
}

export function closeNotification(event) {
  var notification = document.getElementById("Addons-notificationspopup");
  if (window.matchMedia("(max-width: 425px)").matches) {
    notification.lastElementChild.style.transform = "translateY(-200%)";
  } else {
    notification.lastElementChild.style.transform = "translateX(200%)";
  }
  setTimeout(() => {
    notification.lastElementChild.style.display = "none";
  }, 150);
}

//Snackbar Message

export function snackbarNotification(icon, info) {
  var snackbar = document.getElementById("Addons-snackbar");
  var snackbarBoxIconText = "";
  if (typeof icon !== "undefined" && typeof info !== "undefined") {
    if (snackbar.childElementCount >= 1) {
      snackbar.removeChild(snackbar.lastChild);
    }
    snackbar.style.display = "block";
    var snackbarBox = document.createElement("div");
    snackbar.prepend(snackbarBox);
    snackbarBox.className = cssAddon["snackbar-box"];

    setTimeout(function () {
      snackbarBox.style.transform = "translateY(0%)";
    }, 10);
    if (icon === 1) {
      snackbarBoxIconText =
        '<i id="Addons-snackbar-info-icon" class="fas fa-check-circle"></i>';
      snackbarBox.style.backgroundColor = "var(--accent)";
      snackbarBox.style.color = "var(--accent-text)";
    } else if (icon === 2) {
      snackbarBoxIconText =
        '<i id="Addons-snackbar-info-icon" class="fas fa-times-circle"></i>';
      snackbarBox.style.backgroundColor = "var(--red)";
      snackbarBox.style.color = "var(--red-text)";
    } else if (icon === 3) {
      snackbarBoxIconText =
        '<i id="Addons-snackbar-info-icon" style="color:var(--accent)" class="fas fa-info-circle"></i>';
      snackbarBox.style.backgroundColor = "var(--theme3)";
      snackbarBox.style.color = "var(--text1)";
    }

    setTimeout(() => {
      snackbarBox.style.transform = "translateY(300%)";
    }, 3000);
    setTimeout(() => {
      snackbarBox.style.display = "none";
    }, 3200);

    snackbarBox.innerHTML =
      '\
        <div id="Addons-snackbar-inside" class="' + cssAddon["snackbar-inside"] + '">\
          <div id="Addons-snackbar-icon" class="' + cssAddon["snackbar-icon"] + '">' + snackbarBoxIconText + '</div>\
          <div id="Addons-snackbar-info" class="' + cssAddon["snackbar-info"] + '">\
            <p id="Addons-snackbar-info-p">' +info + "</p>\
          <div>\
        </div>\
      ";
  } else {
  }
}


//Lazy Load
export function LazyLoad(type) {
  if(type === 0){
    document.getElementById("Addons-lazy-load").style.opacity = "0%";
    setTimeout(() => {
      document.getElementById("Addons-lazy-load").style.pointerEvents = "none";
    }, 200);
  }else if(type === 1){
    document.getElementById("Addons-lazy-load").style.opacity = "100%";
  }
}

export function Addons(changes) {
  return (
    <div>
      <div id="Addons-lazy-load" style={{display:"none" }} className={`${cssAddon["lazy-load"]} ${cssGlobal["flex-center-center"]}`}>
        <Bubbles/>
        <div className={cssAddon["lazy-load-box"]}>
          <img src={logo} alt="logo"/>
        </div>
      </div>
      <div id="Addons-snackbar" className={cssAddon["snackbar"]}>
        <div id="Addons-snackbar-box" className={cssAddon["snackbar-box"]}></div>
      </div>
      {changes == "notifications" ? (
        <span></span>
      ):(
        <div id="Addons-notificationspopup" className={cssAddon["notificationspopup"]}>
          <div id="Addons-notification-box" className={cssAddon["notification-box"]}></div>
        </div>
      )}

      {/* oncontext menu */}
      <div id="contextmenu" className={`${cssAddon["contextmenu"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="contextmenu-box" className={cssAddon["contextmenu-box"]}>
          <Link to="/splashboard" className={cssAddon["contextmenu-box-link"]}>
            <div className={`${cssAddon["contextmenu-box-button-inside"]} ${cssGlobal["flex-center-center"]}`}>
              <div className={cssAddon["contextmenu-box-button-icon"]}>
                <i className={`${cssAddon["fas"]} ${cssAddon["fa-palette"]} ${"fas fa-palette"}`}></i>
              </div>
              <div className={cssAddon["contextmenu-box-button-info"]}>
                <p>Splashboard</p>
              </div>
            </div>
          </Link>
          <Link to="/" className={cssAddon["contextmenu-box-link"]}>
            <div className={`${cssAddon["contextmenu-box-button-inside"]} ${cssGlobal["flex-center-center"]}`}>
              <div className={cssAddon["contextmenu-box-button-icon"]}>
                <i className={`${cssAddon["fas"]} ${cssAddon["fa-1x"]} ${"fas fa-earth-americas"}`}></i>
              </div>
              <div className={cssAddon["contextmenu-box-button-info"]}>
                <p>Website</p>
              </div>
            </div>
          </Link>
          <button onClick={() => {window.location.reload()}} className={cssAddon["contextmenu-box-button"]}>
            <div className={`${cssAddon["contextmenu-box-button-inside"]} ${cssGlobal["flex-center-center"]}`}>
              <div className={cssAddon["contextmenu-box-button-icon"]}>
                <i className={`${cssAddon["fas"]} ${cssAddon["fa-undo"]} ${"fas fa-undo"}`}></i>
              </div>
              <div className={cssAddon["contextmenu-box-button-info"]}>
                <p>Refresh Page</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
