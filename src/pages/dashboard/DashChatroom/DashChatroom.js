//React
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
import css from "./DashChatroom.module.css";

export default function DashChatroom() {
  var planName = "Animal Investigations";
  var planID = "934KL0P13W";
  var planTypeID = "s1";

  var username = "Dasho";

  const appTheme = 0;;

  document.documentElement.setAttribute("data-apptheme", appTheme);
  document.body.style.overflow = 'auto';

  var hostingPlan = 'remove later';


  return (
    <div className={cssGlobal["dashboard-full"]}>
      <Navdash number="5" type="nav" />
      <Addons />
      <div className={cssGlobal["dashboard-section"]}>
        <div className={css["dashboard"]}>
          <Navdash number="5" type="top" />
          <div className={css["dashboard-stretch"]}>
            <div className={css["chatroom-box"]}>
              <div className={css["chatroom-info"]}>
                <h1>Server Support</h1>
                <div className={css["spacing-break2"]}></div>

                <p>
                  <b>Description:</b>
                  <br />
                  Server support chatroom. Can only be viewed by the server
                  owner and admins
                </p>
                <div className={css["spacing-break1"]}></div>

                <p>
                  <b>Plan Details:</b>
                  <br />
                  Hosting Type: {hostingPlan(planTypeID, "hostingType")}
                  <br />
                  Plan Type: {hostingPlan(planTypeID, "hostingPlan")}
                  <br />
                  Plan Name: {planName}
                  <br />
                  Plan ID: {planID}
                </p>

                <p>
                  <b>Participants:</b>
                </p>
                <div className={css["chatroom-party"]}>
                  <div className={css["chatroom-party-icon"]}>
                    <i className={`${css["fa-life-ring"]} ${css["fa-1x"]} ${"fas fa-life-ring"}`}></i>
                  </div>
                  <div className={css["chatroom-party-people"]}>
                    <p>
                      Support
                      <br />
                      <span className={css["small-text"]}>Support</span>
                    </p>
                  </div>
                </div>

                <div className={css["chatroom-party"]}>
                  <div className={css["chatroom-party-icon"]}>
                    <i className={`${css["fa-user-alt"]} ${css["fa-1x"]} ${"fas fa-user-alt fa-1x"}`}></i>
                  </div>
                  <div className={css["chatroom-party-people"]}>
                    <p>
                      {username}
                      <br />
                      <span className={css["small-text"]}>Owner</span>
                    </p>
                  </div>
                </div>

                <div className={css["chatroom-party"]}>
                  <div className={css["chatroom-party-icon"]}>
                    <i className={`${css["fa-paper-plane"]} ${css["fa-1x"]} ${"fas fa-paper-plane fa-1x"}`}></i>
                  </div>
                  <div className={css["chatroom-party-people"]}>
                    <p>
                      Frank
                      <br />
                      <span className={css["small-text"]}>Admin</span>
                    </p>
                  </div>
                </div>
                <div className={css["spacing-break3"]}></div>
              </div>

              <div className={css["chatroom-chatroom"]}>
                <div className={css["chatroom-chatroom-title"]}>
                  <h1>
                    <i className={`${css["fas"]} ${css["fa-circle"]} ${"fas fa-circle"}`}></i>
                    Active Connection
                  </h1>
                </div>

                <div className={css["chatroom-messages"]}>
                  <div className={css["chatroom-date"]}>
                    <p>24th July 2021</p>
                  </div>

                  <div className={css["chatroom-self"]}>
                    <p>test message from me</p>
                  </div>

                  <div className={css["chatroom-other"]}>
                    <p>hey test from the other person</p>
                  </div>
                </div>

                <div className={css["chatroom-input"]}>
                  <div className={css["chatroom-upload"]}>
                    <p>
                      <i className={`${css["fas"]} ${css["fa-plus-circle"]} ${"fas fa-plus-circle"}`}></i>
                    </p>
                  </div>
                  <div className={css["chatroom-type"]}>
                    <p>
                      <input type="text" placeholder="Type your message here" />
                    </p>
                  </div>
                  <div className={css["chatroom-emoji"]}>
                    <p>
                      <i className={`${css["fas"]} ${css["fa-smile"]} ${"fas fa-smile"}`}></i>
                    </p>
                  </div>
                  <div className={css["chatroom-submit"]}>
                    <p>
                      <i className={`${css["fas"]} ${css["fa-arrow-circle-right"]} ${"fas fa-arrow-circle-right"}`}></i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
