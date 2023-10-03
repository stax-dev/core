//import React, { useState } from "react";
import { Link } from "react-router-dom";
//import Button from "../../../components/button/Button";

//External
import {
  Addons,
  scrollReveal,
  snackbarNotification,
  newNotification,
  viewNotification,
  closeNotification,
} from "../../../components/addons/Addons";

import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";
import Navdash from "../../../components/navdash/Navdash";

//Main
import css from "./DashConsole.module.css";

export default function DashConsole() {

  const appTheme = 0;;

  document.documentElement.setAttribute("data-apptheme", appTheme);
  document.body.style.overflow = 'auto';

  function editTabs() {
    var edittabsbox = document.getElementById("edittabs-box");
    var edittabs = document.getElementById("edittabs");
    if (edittabs.style.transform === "scale(1)") {
      edittabsbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        edittabs.style.transform = "Scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      edittabs.style.transform = "scale(1)";
      edittabsbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
    }
  }

  window.onKeyUp = function (keyType) {
    if (keyType.keyCode == 191) {
      // slash key
      document.getElementById("console-typebox").focus();
    }else if(keyType.keyCode === 27) {
      var edittabs = document.getElementById("edittabs");
      if (edittabs.style.transform === "scale(1)") {
        editTabs();
      }
    }
  };

  window.onClick = function (closeModal) {
    var edittabs = document.getElementById("edittabs");
    if (closeModal.target === edittabs) {
      editTabs();
    }
  };

  return (
    <div className={cssGlobal["dashboard-full"]}>
      <Navdash number="3" type="nav" />
      <Addons />
      {/* modal start */}
      <div id="edittabs" className={css["edittabs"]}>
        <div id="edittabs-box" className={css["edittabs-box"]}>
          <h1>Manage Console Tabs</h1>
          <div className={`${css["edittabs-tabs"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={`${css["edittabs-tabs-box"]} ${cssGlobal["flex-center-left"]}`}>
              <button className={css["edittabs-tabs-box-arrange"]}>
                <p><i className={`${css["fas"]} ${css["fa-menu"]} ${"fas fa-menu"}`}></i></p>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal end */}
      <div className={cssGlobal["dashboard-section"]}>
        <div className={css["dashboard"]}>
          <div className={css["dashboard-top"]}>
            <Navdash number="3" type="top" />
          </div>
          <div className={css["console-session-info"]}>
            <p>
              <i className={`${css["fas"]} ${css["fa-info-circle"]} ${"fas fa-info-circle"}`}></i>
              New console sessions are created when you login to your account, and are removed when you logout.
            </p>
          </div>
          <div className={css["console-embed"]}>

          </div>
          {/* <div className={`${css["console-split"]} ${cssGlobal["flex-flex-start-left"]}`}>
            <div className={css["console-box"]}>
              <p>test</p>
            </div>
            <div className={css["console-tabs"]}>
              <h1>Console Tabs</h1>
              <div className={`${css["console-tabs-list"]} ${cssGlobal["flex-center-center"]}`}>
                <button className={css["console-tabs-box-active"]}>
                  <div className={`${css["console-tabs-box-inside"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["console-tabs-arrange"]}>
                      <p><i className={`${css["fas"]} ${css["fa-bars"]} ${"fas fa-bars"}`}></i></p>
                    </div>
                    <div className={css["console-tabs-info"]}>
                      <p>Session #1</p>
                    </div>
                    <div className={`${css["console-tabs-buttons"]} ${cssGlobal["flex-center-left"]}`}>
                      <button className={css["console-tabs-buttons-edit"]}>
                        <i className={`${css["fas"]} ${css["fa-pencil"]} ${"fas fa-pencil"}`}></i>
                      </button>
                      <button className={css["console-tabs-buttons-delete"]}>
                        <i className={`${css["fas"]} ${css["fa-trash"]} ${"fas fa-trash"}`}></i>
                      </button>
                    </div>
                  </div>
                </button>

              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
