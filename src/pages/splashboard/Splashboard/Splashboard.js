//React
import React, { lazy, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
//import Button from "../../../components/button/Button";
import axios from "axios";

//External
import {
  /*viewNotification,
  closeNotification,
  scrollReveal,*/
  LazyLoad,
  Addons,
  snackbarNotification,
  newNotification,
} from "../../../components/addons/Addons";

import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";
import Navsplash from "../../../components/navsplash/Navsplash";

//Main
import css from "./Splashboard.module.css";

//Extra
import bannerColoursList from "../../../components/data/bannerColours";
import integrationList from "../../../components/data/integrationList.json";
import { APIRoutes } from "../../../components/data/APIRoutes";

export default function Splashboard() {

  //user static
  var [userID, setUserID] = useState();
  var [userRank, setUserRank] = useState(); //employee member stuff
  var [bannerID, setBannerID] = useState(); //id
  var [username, setUsername] = useState(); //username
  var [appTheme, setAppTheme] = useState(); //0 for dark, 1 for light
  var [emailList, setEmailList] = useState();

  //user dynamic
  var [disposable, setDisposable] = useState(); //0 for not active, 1 for active disposable server
  var [disposableCount, setDisposableCount] = useState();
  var [notificationUnreadCount, setNotificationUnreadCount] = useState(); //notification count
  var [StaffUnreadAlerts, setStaffUnreadAlerts] = useState(); //staff unread alerts count
  var [planList, setPlanList] = useState();


  //external data
  var [SDSstatus, setSDSstatus] = useState(0); //0 some offline, 1 all online, 2 some busy
  var sessionID = localStorage.getItem("sessionID");

/*
  //dummy data */
  var [userID, setUserID] = useState("12345678-1234-1243-1234-123456789012");
  var [userRank, setUserRank] = useState("Member"); //employee member stuff
  var [bannerID, setBannerID] = useState("red"); //colour
  var [username, setUsername] = useState("Yoodle23"); //username
  var [appTheme, setAppTheme] = useState("dark"); //0 for dark, 1 for light
  var [emailList, setEmailList] = useState([
    {
      ID: 1,
      email: "yoyo@gmail.com",
      default: true,
    },
    {
      ID: 2,
      email: "longemailtesting_breakingpoint@gmail.com",
      default: false,
    }
  ]);
  var [disposable, setDisposable] = useState(0); //0 for not active, 1 for active disposable server
  var [disposableCount, setDisposableCount] = useState(5);
  var [notificationUnreadCount, setNotificationUnreadCount] = useState(0); //notification count
  var [StaffUnreadAlerts, setStaffUnreadAlerts] = useState(9); //staff unread alerts count
  var [planList, setPlanList] = useState([
    {
      serverID: '423K51LQM9E2M',
      name: "1234567890123456",
      icon: "https://cdn.st.ax/v2/logo.svg",
      time: 634,
      statusLive: 1,
    },
    {
      serverID: '423K51LQMP523M',
      name: "My Server Animal",
      icon: "https://cdn.st.ax/v2/logo.svg",
      time: 811,
      statusLive: 0,
    }
  ]);
//*/

  document.documentElement.setAttribute("data-apptheme", appTheme);
  document.body.style.overflow = 'auto';


  var incData = useLocation().state;

  useEffect(() => {
    APIRequest("all");
    if(incData && incData.errorScreen === 1) {
      //check if serverError exist
      invalidServerOn();
    }else{
      return
    }
  })

  var userStatic = [
    APIRoutes.userRank,
    APIRoutes.bannerID,
    APIRoutes.username,
    APIRoutes.appTheme,
    APIRoutes.emailList,
  ];

  var userDynamic = [
    APIRoutes.disposable,
    APIRoutes.disposableCount,
    APIRoutes.notificationUnreadCount,
    APIRoutes.staffUnreadAlerts,
    APIRoutes.planList,
  ]

  var externalDynamic = [
    APIRoutes.SDSstatus, //SDS status
  ]


  function APIRequest(type) {

    //verify session
    axios.get(APIRoutes.meURL, {
      headers: {
        Authorization: `sessionID ${sessionID}`,
      },
    })
    .then(responseMe => {
      setUserID(responseMe.data.userID)
      //user data
      if(type === "userStatic" || type === "all"){
        axios.all(userStatic.map(type => axios.get(APIRoutes.userURL + responseMe.data.userID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setUserRank(response[1].data.userRank);
          setBannerID(response[2].data.bannerID);
          setUsername(response[3].data.username);
          setAppTheme(response[4].data.appTheme);
          setEmailList(response[5].data.emailList);
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
      if(type === "userDynamic" || type === "all"){
        axios.all(userDynamic.map(type => axios.get(APIRoutes.userURL + responseMe.data.userID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setDisposable(response[0].data.disposable);
          setDisposableCount(response[1].data.disposableCount);
          setNotificationUnreadCount(response[2].data.notificationUnreadCount);
          setStaffUnreadAlerts(response[3].data.staffUnreadAlerts);
          setPlanList(response[4].data.planList);
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
      //external data
      if(type === "externalDynamic" || type === "all"){
        axios.all(externalDynamic.map(type => APIRoutes.userStatus + type), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setSDSstatus(response[0].data.SDSstatus);
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
  }

  function sendAPI(type, data){
    if(type === "createDroplet"){
      setCreateDropletSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          createDroplet: 1,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("userDynamic");
          snackbarNotification(1, "Droplet Created");
        }else{
          snackbarNotification(3, "Error Creating Droplet");
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
        setCreateDropletSubmitDisabled(false);
      });
    }else{
      return;
    }
  }

  var [createDropletSubmitDisabled, setCreateDropletSubmitDisabled] = useState(false);

  function Sessiontest(){
    sessionStorage.setItem("test", "test");
    localStorage.setItem("test", "test");
  }

  function sessionsee(){
    console.log(sessionStorage);
    console.log(localStorage);
    document.cookie = "test=TEST";
    console.log(document.cookie);
  }

  var welcomeMessageList = [
    "Welcome back to your cozy living room. Look at that! The weather's great today isn't it...virtually?",
    "Welcome back to your private lounge! I'm telling you, it's good to have you back!  How was the trip here?",
    "Hooray! You have returned! The kingdom awaits you. Just a minute, virtual tea will be served at once!",
    "Hey there! It's about time you arrived. Take a seat on that chair first! Make yourself at home.",
    "It's great to have you here! Hopefully the journey wasn't too long? Let me grab that coat for you!",
    "Hey there! We have been expecting you... It's about time you arrived! How are you feeling today?",
    "Nice to have you back here! So tell me, what amazing things have you been up to recently?",
  ];

  var [randomMessage, setRandomMessage] = useState(welcomeMessageList[Math.floor(Math.random() * welcomeMessageList.length)]);

  const logo = "https://cdn.st.ax/v2/logo.svg";

  //the modal functions you need to redeclare the variables inside function itself

  function invalidServerOff() {
    var splashinvalidserverbox = document.getElementById("invalidserver-box");
    var splashinvalidserverfull = document.getElementById("invalidserver-full");
    splashinvalidserverbox.style.transform = "scale(0.4)";
    setTimeout(() => {
      splashinvalidserverfull.style.transform = "scale(0)";
    }, 150);
    document.body.style.overflow = 'auto';
  }

  function invalidServerOn() {
    var splashinvalidserverbox = document.getElementById("invalidserver-box");
    var splashinvalidserverfull = document.getElementById("invalidserver-full");

    splashinvalidserverbox.scrollTop = 0;
    splashinvalidserverfull.style.transform = "scale(1)";
    splashinvalidserverbox.style.transform = "scale(1)";
    document.body.style.overflow = 'hidden';
  }

  //var splashinvalidserverbox = document.getElementById("invalidserver-box");
  //var splashinvalidserverfull = document.getElementById("invalidserver-full");
  //these variables are for the window.onclick and keyup

  window.onclick = function (closeModal) {
    var splashinvalidserverfull = document.getElementById("invalidserver-full");
    if (closeModal.target === splashinvalidserverfull) {
      invalidServerOff();
    }
  };

  window.onkeyup = function (functionInside) {
    if (functionInside.keyCode === 27) {
      //escape key
      var splashinvalidserverfull = document.getElementById("invalidserver-full");
      if (splashinvalidserverfull && splashinvalidserverfull.style.transform === "scale(1)") {
        invalidServerOff();
      }
    }
  };

  let notificationLive = 0; // Change Later
  function notificationCheck() {
    if (notificationLive === 0) {
      document
        .getElementById("notifications-shortcut")
        .classList.add("splashboard-pages-box1");
      document
        .getElementById("notifications-shortcut")
        .classList.remove("splashboard-pages-box1-unread");
    } else {
      document
        .getElementById("notifications-shortcut")
        .classList.add("splashboard-pages-box1-unread");
      document
        .getElementById("notifications-shortcut")
        .classList.remove("splashboard-pages-box1");
    }
  }

  const integrationLoginDisplay = integrationList
    .filter((integrationList) => integrationList.connected === 1)
    .map((list) => (
      <div key={list.name + "key"} className={`${css["login-method-box"]} ${cssGlobal["flex-center-left"]}`}>
        <div className={css["login-method-box-photo"]}>
          <img
            style={{ backgroundColor: list.background }}
            src={require("../../../images/integrations/icons/" +
              list.name.toLowerCase() +
              ".svg")}
          />
        </div>
        <div className={css["login-method-box-text"]}>
          <p>
            <b>{list.name}</b>
            <br />
            {list.connectedName}
          </p>
        </div>
      </div>
    ));

  return (
    <div className={cssGlobal["splashboard-full"]}>
      <Addons />
      <Navsplash number="1" type="nav" />
      {/* modal windows start */}
      <div id="invalidserver-full" className={css["invalidserver-full"]}>
        <div id="invalidserver-box" className={css["invalidserver-box"]}>
          <div className={css["invalidserver-info"]}>
            <h1>Invalid Server</h1>
            <p><b>The server you are looking for is one of the following:</b></p>
            <li><i className={`${css["fas"]} ${css["fa-arrow-right"]}  ${"fas fa-arrow-right"}`}></i>The server is invalid and does not exist.</li>
            <li><i className={`${css["fas"]} ${ css["fa-arrow-right"]}  ${"fas fa-arrow-right"}`}></i>The server has been deleted</li>
            <li><i className={`${css["fas"]} ${css["fa-arrow-right"]}  ${"fas fa-arrow-right"}`}></i>You have insufficient permissions to the server</li>
            <p><i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${"fas fa-exclamation-circle"}`}></i>If you believe this is an error, please contact support in your chatroom</p>
            <button onClick={() => invalidServerOff()}>
              <p>Close</p>
            </button>
          </div>
          <div className={css["invalidserver-art"]}></div>
        </div>
      </div>
      {/* modal window end */}
      <div id="splashboard" className={cssGlobal["splashboard-section"]}>
        <div className={cssGlobal["splashboard"]}>
          <div className={cssGlobal["splashboard-main"]}>
            <Navsplash number="1" type="top" />
            <div id="splashboard-banner" className={css["splashboard-banner"]}
              style={{
                background: bannerColoursList.find(colour => colour.name === bannerID).background,
                color: bannerColoursList.find(colour => colour.name === bannerID).text
              }}>
              <div className={css["splashboard-banner-text"]}>
                <div className={css["splashboard-banner-message"]}>
                  {!username ?
                    <span>
                      <span style={{marginBottom: "20px", height: "30px"}} className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour2"]}`}></span>
                      <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour2"]}`}></span>
                      <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour2"]}`}></span>
                      <span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span>
                    </span>:
                    <span>
                      <h1>Welcome back, {username}</h1>
                      <p>{randomMessage}</p>
                    </span>
                  }
                </div>
                <div className={css["splashboard-banner-profile"]}>
                  <div className={css["profile-photo"]} id="profile-photo">
                    {/* <img src="https://cdn.onionz.dev/global/images/favicon.png"/> */}
                    {/* if(isset($_SESSION['avatar']) && $_SESSION['avatar'] != NULL){
                        <img src="/data/uploads/'.$_SESSION['avatar'].'" />
                    }else{
                        <img src="https://cdn.onionz.dev/global/images/favicon.png" />
                    } */}
                  </div>
                </div>
              </div>
            </div>

            {/* testing code can remove in final  */}
            <button onClick={() => snackbarNotification(1, "Error adding email breakpoint testing")}>snackbar test</button>
            <button onClick={() => snackbarNotification(3, "Error adding email")}>snackbar test 2</button>
            {/* <button onClick={() => paymentSound()}>payment sound</button> */}
            <button onClick={() => newNotification("fas fa-comments", "Message from John12", "Staffboard Messages", "/status")}>
              test notification
            </button>
            <Link to="/splashboard" state={{errorScreen: 1}}>invalidserver modal</Link>
            <br/><Link to="/dashboard">Dashboard</Link>
            <button onClick={() => Sessiontest()}>session test</button>
            <button onClick={() => sessionsee()}>session see</button>

            {!planList ?
              <span>
                <div className={cssGlobal["splashboard-subtitle"]}>
                  <p>
                    <b>Droplets</b>
                  </p>
                </div>
                <div className={css["splashboard-server"]}>
                  {[...Array(2)].map((number, index) => (
                    <div key={index} className={css["splashboard-server-box"]}>
                      <div className={css["splashboard-server-icon"]}>
                        <div className={css["splashboard-server-icon-box"]}>
                        </div>
                      </div>
                      <div className={css["splashboard-server-info"]}>
                        <p>
                          <b><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></b>
                        </p>
                        <span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour2"]}`}></span>
                      </div>
                      <div className={css["splashboard-server-time"]}>
                        <p>
                          <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span>
                        </p>
                        <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour2"]}`}></span>
                      </div>
                      <div style={{pointerEvents: "none"}} className={css["splashboard-server-button"]}>
                        <Link className={css["splashboard-server-link"]} to="/">
                          <div style={{backgroundColor: "var(--theme2)", color: "var(--theme2)"}} className={`${css["splashboard-server-button-inside"]} ${cssGlobal["flex-center-center"]}`}>
                            <i className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={css["splashboard-server-message"]}>
                  <p>
                    <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span>
                    <span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour1"]}`}></span>
                  </p>
                </div>
              </span>:
              <span>
                <div className={cssGlobal["splashboard-subtitle"]}>
                  <p>
                    <b>My Droplets</b>
                  </p>
                </div>
                <div className={css["splashboard-server"]}>
                  {planList.map((list) => (
                    <div key={list.serverID} className={css["splashboard-server-box"]}>
                      <div className={css["splashboard-server-icon"]}>
                        <div className={css["splashboard-server-icon-box"]}>
                          <img src={list.icon} />
                        </div>
                      </div>
                      <div className={css["splashboard-server-info"]}>
                        <p>
                          <b>{list.name}</b>
                        </p>
                        <span className={
                          list.statusLive === 1 ? css["online-tag"]:
                          (list.statusLive === 0 ? css["offline-tag"]:(list.statusLive === 2 ? css["expired-tag"]:""))
                        }>
                          <span className={css["online-tag-text"]}>Online</span>
                          <span className={css["offline-tag-text"]}>Offline</span>
                          <span className={css["expired-tag-text"]}>Expired</span>
                        </span>
                      </div>
                      <div className={css["splashboard-server-time"]}>
                        <p> Time: <span className={css["grey-text"]}>{list.time} hours left</span></p>
                        <div className={css["splashboard-server-bar"]}>
                          <div className={css["splashboard-server-bar-progress"]} style={{ width: "calc(" + list.time + "%/10)" }}>
                            <br />
                          </div>
                        </div>
                      </div>
                      <div className={css["splashboard-server-button"]}>
                        <Link className={css["splashboard-server-link"]} to={"/" + list.serverID }>
                          <div className={`${css["splashboard-server-button-inside"]} ${cssGlobal["flex-center-center"]}`}>
                            <i className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={css["splashboard-server-message"]}>
                  <p>
                    Server not showing up? New servers take a while to appear.
                    <br />
                    If not, contact support in your chatroom{" "}
                    <Link to="/splashboard/chatrooms">here</Link>
                  </p>
                </div>
              </span>
            }

            <div id="shortcuts"></div>
            <div className={cssGlobal["splashboard-subtitle"]}>
              <p>
                <b>Shortcuts</b>
              </p>
            </div>
            {SDSstatus === null || SDSstatus === undefined ?
              <div className={`${css["splashboard-pages"]} ${cssGlobal["flex-stretch-left"]}`}>
                {[...Array(4)].map((number, index) => (
                  <div key={index} style={{pointerEvents: "none"}} className={css["splashboard-pages-box"]}>
                    <div>
                        <div className={css["splashboard-pages-link"]}>
                          <div style={{width: "45px", marginLeft: "auto"}} className={css["login-method-box-photo"]}>
                            {/* copied this div for easier css */}
                          </div>
                          <span className={css["splashboard-pages-info"]}>
                            <h1><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span></h1>
                            <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                          </span>
                        </div>
                    </div>
                  </div>
                ))}
              </div>:
              <div className={`${css["splashboard-pages"]} ${cssGlobal["flex-stretch-left"]}`}>
                <div className={css["splashboard-pages-box"]}>
                  <Link to="/splashboard/notifications">
                    <div id="notifications-shortcut" className={notificationUnreadCount === 0 ? (css["splashboard-notifications-normal"]): (css["splashboard-notifications-unread"])}>
                        <div className={css["splashboard-pages-link"]}>
                          <p><i className={`${css["fas"]} ${css["fa-bell"]} ${css["fa-3x"]} ${"fas fa-bell fa-3x"}`}></i></p>
                          <span className={css["splashboard-pages-info"]}>
                            <h1>Notifications</h1>
                            <span className={css["splashboard-pages-info-unread"]}>
                              <p>{notificationUnreadCount}</p>
                            </span>
                            <span className={css["splashboard-pages-info-normal"]}>
                              <p>No new</p>
                            </span>
                          </span>
                        </div>
                    </div>
                  </Link>
                </div>

                <div className={css["splashboard-pages-box"]}>
                  <Link to="/status">
                    <div className={SDSstatus === 2 ? (css["splashboard-status-busy"]):(SDSstatus === 0 ? (css["splashboard-status-offline"]):css["splashboard-status-normal"])}>
                      <div className={css["splashboard-pages-link"]}>
                        <p><i className={`${css["fas"]} ${css["fa-satellite-dish"]} ${css["fa-3x"]} ${"fas fa-satellite-dish fa-3x"}`}></i></p>
                        <span className={css["splashboard-pages-info"]}>
                          <h1> Status</h1>
                          <span className={css["splashboard-pages-info-offline"]}>
                            <p>Some Offline</p>
                          </span>
                          <span className={css["splashboard-pages-info-busy"]}>
                            <p>Some Busy</p>
                          </span>
                          <span className={css["splashboard-pages-info-normal"]}>
                            <p>All Online</p>
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className={css["splashboard-pages-box"]}>
                  <Link to="/docs">
                    <div className={css["splashboard-support"]}>
                        <div className={css["splashboard-pages-link"]}>
                          <p><i className={`${css["fas"]} ${ css["fa-question-circle"]} ${css["fa-3x"]} ${"fas fa-question-circle fa-3x"}`}></i></p>
                          <span className={css["splashboard-pages-info"]}>
                            <h1>Support</h1>
                            <p>Documentation</p>
                          </span>
                        </div>
                    </div>
                  </Link>
                </div>

                <div className={css["splashboard-pages-box"]}>
                  <Link to="/staff">
                    <div className={StaffUnreadAlerts === 0 ? (css["splashboard-staff-normal"]):(css["splashboard-staff-unread"])}>
                        <div className={css["splashboard-pages-link"]}>
                          <p><i className={`${css["fas"]} ${css["fa-pizza-slice"]} ${css["fa-3x"]} ${"fas fa-pizza-slice fa-3x"}`}></i></p>
                          <span className={css["splashboard-pages-info"]}>
                            <h1>Staff Panel</h1>
                            <span className={css["splashboard-pages-info-unread"]}>
                              <p>9 new alerts</p>
                            </span>
                            <span className={css["splashboard-pages-info-normal"]}>
                              <p>No new alerts</p>
                            </span>
                          </span>
                        </div>
                    </div>
                  </Link>
                </div>

              </div>
            }

            <div id="disposable"></div>

            <div className={cssGlobal["splashboard-subtitle"]}>
              <p>
                <b>Disposable Droplets</b>
              </p>
            </div>
            {!disposableCount  ?
              <div className={css["splashboard-server"]}>
                {[...Array(1)].map((number, index) => (
                  <div key={index} className={css["splashboard-server-box"]}>
                    <div className={css["splashboard-server-icon"]}>
                      <div className={css["splashboard-server-icon-box"]}>
                      </div>
                    </div>
                    <div className={css["splashboard-server-info"]}>
                      <p>
                        <b><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></b>
                      </p>
                      <span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour2"]}`}></span>
                    </div>
                    <div className={css["splashboard-server-time"]}>
                      <p>
                        <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span>
                      </p>
                      <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour2"]}`}></span>
                    </div>
                    <div style={{pointerEvents: "none"}} className={css["splashboard-server-button"]}>
                      <Link className={css["splashboard-server-link"]} to="/">
                        <div style={{backgroundColor: "var(--theme2)", color: "var(--theme2)"}} className={`${css["splashboard-server-button-inside"]} ${cssGlobal["flex-center-center"]}`}>
                          <i className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>:
              (disposable === 0 ? (
                <div className={css["disposable-servers-explain"]}>
                  <p>
                    Disposable servers are temporary droplets that users can
                    create. They are designed as experimental droplets for users
                    to run tests without impacting their main plan.
                  </p>
                  <div className={css["disposable-servers-explain-section"]}>
                    <div className={css["disposable-servers-explain-box"]}>
                      <h1>Disposable Droplet Features:</h1>
                      <p>
                        <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                        OS Choice<br />
                        <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                        Kernel & Application choice<br />
                        <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                        Language Selection <br />
                        <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                        5 custom ports
                      </p>
                    </div>
                  </div>
                  <p>
                    {disposableCount === 1 ? (
                      <span>{disposableCount} disposable left today</span>
                    ) : (
                      <span>{disposableCount} disposables left today</span>
                    )}
                  </p>
                  <button style={createDropletSubmitDisabled === true ? {opacity: "60%", cursor: "default"}:{cursor: "pointer"}} disabled={createDropletSubmitDisabled} onClick={() => sendAPI('createDroplet')} className={css["disposable-servers-create"]}>
                    Create Droplet
                  </button>
                </div>
              ):(
                <div className={css["splashboard-server"]}>
                  <div className={css["splashboard-server-box"]}>
                    <div className={css["splashboard-server-icon"]}>
                      <p>
                        <i className={`${css["fas"]} ${css["fa-server"]} ${css["fa-2x"]} ${"fas fa-server fa-2x"}`}></i>
                      </p>
                    </div>
                    <div className={css["splashboard-server-info"]}>
                      <p>
                        <b>Disposable Server</b>
                      </p>
                      <span className={css["online-tag"]}>
                        <span className={css["online-tag-text"]}>Online</span>
                        <span className={css["offline-tag-text"]}>Offline</span>
                      </span>
                    </div>
                    <div className={css["splashboard-server-time"]}>
                      <p>
                        Time:{" "}
                        <span className={css["grey-text"]}>32 minutes left</span>
                      </p>
                      <div className={css["splashboard-server-bar"]}>
                        <div className={css["splashboard-server-bar-progress"]}
                          style={{ width: "calc(32* 100%/60)" }}>
                          <br />
                        </div>
                      </div>
                    </div>
                    <div className={css["splashboard-server-button"]}>
                      <p>
                        <a href="/">
                          <i className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            }

            {/* <p><b>User Documentation</b></p>
                        <div className={css["splashboard-documents"]}>

                            <a className={css["splashboard-documents-box"]} href="/">
                                <div className={css["splashboard-documents-preview"]}>

                                </div>
                                <div className={css["splashboard-documents-title"]}>
                                    <p><b>Test Document</b>
                                    <br/>Employee Category</p>
                                </div>
                            </a>

                            <a className={css["splashboard-documents-box"]} href="/">
                                <div className={css["splashboard-documents-preview"]}>

                                </div>
                                <div className={css["splashboard-documents-title"]}>
                                    <p><b>Test Document</b>
                                    <br/>Employee Category</p>
                                </div>
                            </a>

                            <a className={css["splashboard-documents-box"]} href="/">
                                <div className={css["splashboard-documents-preview"]}>

                                </div>
                                <div className={css["splashboard-documents-title"]}>
                                    <p><b>Test Document</b>
                                    <br/>Employee Category</p>
                                </div>
                            </a>

                            <div className={css["splashboard-documents-more"]}>
                                <a href="/"><i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i></a>
                            </div>
                        </div> */}
          </div>

          <div className={cssGlobal["splashboard-side"]}>
            <div className={cssGlobal["splashboard-subtitle"]}>
              <p>
                <b>Login Options</b>
              </p>
            </div>
            <div className={css["settings-login"]}>
              {!emailList ?
                <p>
                  <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour1"]}`}></span>
                  <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour1"]}`}></span>
                  <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span>
                </p>:
                <p>
                  All your emails and some integrations allow alternative login
                  methods to your account. These are all the ways you can login:
                </p>
              }
            </div>
            {!emailList ?
              <div className={`${css["login-method"]} ${cssGlobal["flex-stretch-left"]}`}>
                {[...Array(4)].map((number, index) => (
                  <div key={index} className={`${css["login-method-box"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["login-method-box-photo"]}>
                    </div>
                    <div className={css["login-method-box-text"]}>
                      <p>
                        <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span>
                        <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour1"]}`}></span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>:
              <div className={`${css["login-method"]} ${cssGlobal["flex-stretch-left"]}`}>
                {emailList.map((list) => (
                  <div key={list.ID} className={`${css["login-method-box"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["login-method-box-photo"]}>
                      <img alt="logo" src={logo} />
                    </div>
                    <div className={css["login-method-box-text"]}>
                      <p><b>Email</b><br />{list.email}</p>
                    </div>
                  </div>
                ))}
                {integrationLoginDisplay}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
