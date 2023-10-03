//React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import Button from "../../../components/button/Button";
import axios from "axios";

//External
import {
  Test,
  Addons,
  LazyLoad,
  scrollReveal,
  snackbarNotification,
  newNotification,
  viewNotification,
  closeNotification,
} from "../../../components/addons/Addons";

import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";
import Navsplash from "../../../components/navsplash/Navsplash";

//Main
import css from "./SplashNotifications.module.css";

//Extra
import { APIRoutes } from "../../../components/data/APIRoutes";

export default function SplashSettings() {

  //user static
  var [appTheme, setAppTheme] = useState();
  var [userID, setUserID] = useState();


  var [unread, setUnread] = useState(-1);
  var [notificationList, setNotificationList] = useState();

/*
  //user dynamic
  var [notificationList, setNotificationList] = useState([
    {
      id: 1,
      title: "New Notification",
      message: "This is a new notification! which is long testing the line break capability",
      unread: true,
    },
    {
      id: 2,
      title: "New Notification",
      message: "This is a new 2 notification!",
      unread: true,
    },
    {
      id: 3,
      title: "New Notification",
      message: "This is a new 3 notification!",
      unread: false,
    },
    {
      id: 4,
      title: "New Notification",
      message: "This is a new 4 notification!",
      unread: false,
    },
  ])
  var [unread, setUnread] = useState(notificationList.map(list => list.unread === true).filter(Boolean).length);
*/

  //external data
  var sessionID = localStorage.getItem("sessionID");

  document.documentElement.setAttribute("data-apptheme", appTheme);
  document.body.style.overflow = 'auto';


  useEffect(() => {
    APIRequest("all");
  })

  var userStatic = [
    APIRoutes.appTheme,
  ]

  var userDynamic = [
    APIRoutes.unreadCount,
    APIRoutes.notificationList,
  ]

  function APIRequest(type) {
    //verify session
    axios.get(APIRoutes.meURL, {
      headers: {
        Authorization: `sessionID ${sessionID}`,
        },
    })
    .then(responseMe => {
      setUserID(responseMe.data.userID);
      //user static
      if(type === "userStatic" || type === "all"){
        axios.all(userStatic.map(type => axios.get(APIRoutes.userURL + responseMe.data.userID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setAppTheme(response[0].data.appTheme);
        }))
        .catch(error => {
          if(error.response){
            console.log(error.response.status);
            console.log(error.response.data);
          }else if(error.request){
            console.log(error.request);
          }else{
            console.log(error.message);
          }
        });
      }
      //user dynamic
      if(type === "userDynamic" || type === "all"){
        notificationCheck("off");
        axios.all(userDynamic.map(type => axios.get(APIRoutes.userURL + responseMe.data.userID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setUnread(response[0].data.unread);
          setNotificationList(response[1].data.notificationList);
        }))
        .catch(error => {
          if(error.response){
            console.log(error.response.status);
            console.log(error.response.data);
          }else if(error.request){
            console.log(error.request);
          }else{
            console.log(error.message);
          }
        })
        .finally(() => {
          notificationCheck("on");
        });
      }
    })
    .catch(error => {
      if(error.response){
        console.log(error.response.status);
        console.log(error.response.data);
      }else if(error.request){
        console.log(error.request);
      }else{
        console.log(error.message);
      }
    });
  }

  function sendAPI(type, data){
    if(type === "checkNotifications"){
      notificationCheck("off");
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          bannerID: data,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planDynamic");
        }
      })
      .catch(error => {
        if(error.response){
          console.log(error.response.status);
          console.log(error.response.data);
        }else if(error.request){
          console.log(error.request);
        }else{
          console.log(error.message);
        }
      })
      .finally(() => {
        notificationCheck("on");
      });
    }else if(type === "markRead"){
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          markRead: false,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planDynamic");
        }
      })
      .catch(error => {
        if(error.response){
          console.log(error.response.status);
          console.log(error.response.data);
        }else if(error.request){
          console.log(error.request);
        }else{
          console.log(error.message);
        }
      })
      .finally(() => {
      });
    }else{
      return;
    }
  }

  var [notificationCheckDisabled, setNotificationCheckDisabled] = useState(false);

  function notificationCheck(type) {
    if(type === "off"){
    setNotificationCheckDisabled(true);
    document.getElementById("notifications-reload").classList.add(css["notifications-reload-animation"]);
    }else if(type === "on"){
      setNotificationCheckDisabled(false);
      document.getElementById("notifications-reload").classList.remove(css["notifications-reload-animation"]);
    }

    if (unread === 0) {
      document.getElementById("notifications-unread-count").classList.replace(css["notifications-unread-count-active"], css["notifications-unread-count"]);
    }else{
      document.getElementById("notifications-unread-count").classList.replace(css["notifications-unread-count"], css["notifications-unread-count-active"]);
    }
  }

  return (
    <div className={cssGlobal["splashboard-full"]}>
      <Navsplash type="nav" number="6" />
      <Addons />
      <div className={cssGlobal["splashboard-section"]}>

        <Navsplash type="top" number="6" />
        <div className={cssGlobal["splashboard"]}>
          <div className={cssGlobal["splashboard-bottom"]}>

            {unread !== -1 ?
              <div className={`${css["notifications-section"]} ${cssGlobal["flex-flex-start-left"]}`}>

                <div className={css["notifications-settings"]}>
                  <h1>Notification Settings</h1>
                  <div className={css["notification-settings-section"]}>
                  </div>
                </div>

                <div className={css["notifications-unread"]}>
                  <div className={css["notifications-unread-title"]}>
                    <div className={css["notifications-unread-title-text"]}>
                      <h1>Unread Notifications</h1>
                    </div>

                    <div className={css["notifications-unread-title-icon"]}>
                      <button
                        disabled={notificationCheckDisabled}
                        title="Reload Notifications"
                        id="notifications-unread-count"
                        onClick={() => sendAPI("checkNotifications")}
                        className={unread === 0 ? (css["notifications-unread-count"]):(css["notifications-unread-count-active"])}
                        style={notificationCheckDisabled === true ? {cursor: "default", opacity: "60%"}:{cursor: "pointer"}}
                      >
                        <span className={css["notifications-unread-count-none"]}>
                          0 Notifications
                        </span>
                        <span className={css["notifications-unread-count-live"]}>
                          {unread === 1 ?
                            <span>{unread} Notification</span>:
                            <span>{unread} Notifications</span>
                          }
                        </span>
                        <i id="notifications-reload" className={`${css["fas"]} ${css["fa-sync"]} ${"fas fa-sync"}`}></i>
                        {/* stop animation timeout time is multiple of animation duration */}
                      </button>
                    </div>
                  </div>

                  <div className={`${css["notifications-list"]} ${cssGlobal["flex-center-left"]}`}>
                    {notificationList.filter((notificationList) => notificationList.unread === true).map((list) => (
                      <div key={list.id + "-key-unread"} className={`${css["notifications-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                        <div className={`${css["notifications-list-box-icon"]} ${cssGlobal["flex-center-center"]}`}>
                          <i className={`${css["fas"]} ${css["fa-server"]} ${"fas fa-server"}`}></i>
                        </div>
                        <div className={css["notifications-list-box-title"]}>
                          <p>{list.title}</p>
                        </div>
                        <div className={css["notifications-list-box-info"]}>
                          <p>{list.message}</p>
                        </div>
                        <div className={`${css["notifications-list-box-buttons"]} ${cssGlobal["flex-center-center"]}`}>
                          <button onClick={() => sendAPI("markRead")} title="Mark as Read" className={css["notifications-list-button-close"]}>
                            <p><i className={`${css["fas"]} ${css["fa-check"]} ${"fas fa-check"}`}></i></p>
                          </button>
                          <button className={css["notifications-list-button-view"]}>
                            <p><i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i></p>
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className={css["notifications-list-none"]}>
                      <p>
                        No more notifications!
                        <i className={`${css["fas"]} ${css["fa-couch"]} ${"fas fa-couch"}`}></i>
                      </p>
                    </div>
                  </div>
                </div>

                <div className={css["notifications-all"]}>
                  <div className={`${css["notifications-unread-title"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["notifications-unread-title-text"]}>
                      <h1>All Notifications</h1>
                    </div>
                  </div>

                  <div className={`${css["notifications-list"]} ${cssGlobal["flex-center-left"]}`}>
                    {notificationList.filter((notificationList) => notificationList.unread === false).map((list) => (
                      <div key={list.id + "-key"} className={`${css["notifications-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                        <div className={`${css["notifications-list-box-icon"]} ${cssGlobal["flex-center-center"]}`}>
                          <i className={`${css["fas"]} ${css["fa-server"]} ${"fas fa-server"}`}></i>
                        </div>
                        <div className={css["notifications-list-box-title"]}>
                          <p>{list.title}</p>
                        </div>
                        <div className={css["notifications-list-box-info"]}>
                          <p>{list.message}</p>
                        </div>
                        <div className={`${css["notifications-list-box-buttons"]} ${cssGlobal["flex-center-left"]}`}>
                          <button title="Mark as Read" className={css["notifications-list-button-close"]}>
                            <p><i className={`${css["fas"]} ${css["fa-check"]} ${"fas fa-check"}`}></i></p>
                          </button>
                          <button className={css["notifications-list-button-view"]}>
                            <p><i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i></p>
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className={css["notifications-list-none"]}>
                      <p>
                        Last 30 days
                        <i className={`${css["fas"]} ${css["fa-couch"]} ${"fas fa-couch"}`}></i>
                      </p>
                    </div>
                  </div>
                </div>

              </div>:
              <div className={`${css["notifications-section"]} ${cssGlobal["flex-flex-start-left"]}`}>

                <div className={css["notifications-unread"]}>
                  <div className={css["notifications-unread-title"]}>
                    <div className={css["notifications-unread-title-text"]}>
                      <h1>Unread Notifications</h1>
                    </div>
                    <div
                      className={css["notifications-unread-title-icon"]}
                    >
                      <button
                        disabled
                        style={{backgroundColor: "var(--theme2)", height: "50px", pointerEvents: "none"}}
                        className={css["notifications-unread-count-active"]}
                      >
                      </button>
                    </div>
                  </div>

                  <div className={`${css["notifications-list"]} ${cssGlobal["flex-center-left"]}`}>
                    {[...Array(2)].map((number, index) => (
                      <div key={index} className={`${css["notifications-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                        <div className={css["notifications-list-box-icon"]}>
                        </div>
                        <div className={css["notifications-list-box-title"]}>
                          <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                        </div>
                        <div className={css["notifications-list-box-info"]}>
                          <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                        </div>
                        <div className={`${css["notifications-list-box-buttons"]} ${cssGlobal["flex-center-left"]}`}>
                          <button disabled style={{height: "40px", pointerEvents: "none"}} className={css["notifications-list-button-close"]}>
                          </button>
                          <button disabled style={{height: "40px", pointerEvents: "none", backgroundColor: "var(--theme3)"}} className={css["notifications-list-button-view"]}>
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className={css["notifications-list-none"]}>
                      <p>
                        <span style={{margin: "auto"}} className={`${cssGlobal["lazy-text-20"]} ${cssGlobal["lazy-colour2"]}`}></span>
                        <i className={`${css["fas"]} ${css["fa-couch"]} ${"fas fa-couch"}`}></i>
                      </p>
                    </div>
                  </div>
                </div>

                <div className={css["notifications-all"]}>
                  <div className={css["notifications-unread-title"]}>
                    <div className={css["notifications-unread-title-text"]}>
                      <h1>All Notifications</h1>
                    </div>
                  </div>

                  <div className={`${css["notifications-list"]} ${cssGlobal["flex-center-left"]}`}>
                    {[...Array(4)].map((number, index) => (
                      <div key={index} className={`${css["notifications-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                        <div className={css["notifications-list-box-icon"]}>
                        </div>
                        <div className={css["notifications-list-box-title"]}>
                          <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                        </div>
                        <div className={css["notifications-list-box-info"]}>
                          <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                        </div>
                        <div className={`${css["notifications-list-box-buttons"]} ${cssGlobal["flex-center-center"]}`}>
                          <button disabled style={{height: "40px", pointerEvents: "none"}} className={css["notifications-list-button-close"]}>
                          </button>
                          <button disabled style={{height: "40px", pointerEvents: "none", backgroundColor: "var(--theme3)"}} className={css["notifications-list-button-view"]}>
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className={css["notifications-list-none"]}>
                      <p>
                        <span style={{margin: "auto"}} className={`${cssGlobal["lazy-text-20"]} ${cssGlobal["lazy-colour2"]}`}></span>
                        <i className={`${css["fas"]} ${css["fa-couch"]} ${"fas fa-couch"}`}></i>
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
