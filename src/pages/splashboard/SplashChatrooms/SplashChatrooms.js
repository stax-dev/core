//React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/button/Button";
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


import Navsplash from "../../../components/navsplash/Navsplash";
import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";

//Main
import css from "./SplashChatrooms.module.css";

//Extra
import bannerColoursList from "../../../components/data/bannerColours";
import { APIRoutes } from "../../../components/data/APIRoutes";

export default function SplashChatrooms() {

  //user static
  var [bannerID, setBannerID] = useState(6);
  var [username, setUsername] = useState();
  var [userID, setUserID] = useState();
  var [appTheme, setAppTheme] = useState();

  //user dynamic
  var [chatroomList, setChatroomList] = useState();

  //plan dyanmic
  var [chatroomList, setChatroomList] = useState();
  var [chatroomChat, setChatroomChat] = useState();

  //dummy data
 /*
  var [bannerID, setBannerID] = useState(2);
  var [username, setUsername] = useState("Dasho");
  var [userID, setUserID] = useState(1);
  var [appTheme, setAppTheme] = useState();
  var [chatroomList, setChatroomList] = useState([]);
  var [chatroomList, setChatroomList] = useState([
    {
      id: 1,
      name: "Server Name",
      type: "Droplet Hosting",
      lastMessage: "yea thanks ill have a look at it soon",
      unread: true,
    },
    {
      id: 2,
      name: "Server Name",
      type: "Droplet Hosting",
      lastMessage: "yea thanks ill have a look at it soon thanks ill get back to you soon",
      unread: false,
    },
    {
      id: 3,
      name: "Server Name",
      type: "Droplet Hosting",
      lastMessage: "yea thanks ill have a look at it soon",
      unread: true,
    },
  ]);
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

  //external data
  var sessionID = localStorage.getItem("sessionID");

  document.documentElement.setAttribute("data-apptheme", appTheme);
  document.body.style.overflow = 'auto';


  useEffect(() => {
    APIRequest("all");
  })

  var userStatic = [
    APIRoutes.bannerID,
    APIRoutes.username,
    APIRoutes.appTheme,
  ]

  var userDynamic = [
    APIRoutes.chatroomList,
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
      //user static
      if(type === "userStatic" || type === "all"){
        axios.all(userStatic.map(type => axios.get(APIRoutes.userURL + responseMe.data.userID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setBannerID(response[0].data);
          setUsername(response[1].data);
          setAppTheme(response[3].data);
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
        axios.all(userDynamic.map(type => axios.get(APIRoutes.userURL + responseMe + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setChatroomList(response[0].data);
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
    if(type === "markRead"){
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          markRead: data,
        }
      )
      .then(response => {
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
    }else if(type === "sendChat"){
      console.log("sendChat");
      axios.post('http URL HERE',
      {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `sessionID ${sessionID}`,
        },
        withCredentials: true,
      },
      {
        sendChat: data,
      }
    )
    .then(response => {
      document.getElementById("SplashChatrooms-dashchatroom-type-input-input").value = "";
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
    }else{
      return;
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
      document.body.style.overflow = 'hidden';
    }
  }

  function sendChat(){
    if(document.getElementById("SplashChatrooms-dashchatroom-type-input-input").value){
      console.log(document.getElementById("SplashChatrooms-dashchatroom-type-input-input").value);
      document.getElementById("SplashChatrooms-dashchatroom-type-input-input").focus();
      sendAPI("sendChat", document.getElementById("SplashChatrooms-dashchatroom-type-input-input").value);
    }
  }


  window.onclick = function (closeModal) {
    if(closeModal.target == document.getElementById("dashchatroom")){
      dashChatroom();
    }
  };

  // window.addEventListener("resize", function() {
  //     if (window.matchMedia("(min-width: 1000px)").matches) {
  //         if(navdashsmall){
  //             navdashMenu(2);
  //         }
  //     };
  // });

  window.onkeyup = function(functionInside){
    var navdashsmallbox = document.getElementById(css["navdashsmall-box"]);
    var navdashsmall = document.getElementById(css["navdashsmall"]);
    if (functionInside.keyCode === 27) {
      if(document.getElementById("dashchatroom").style.transform === "scale(1)"){
        dashChatroom();
      }
    }else if(functionInside.keyCode === 13){
      if(document.getElementById("SplashChatrooms-dashchatroom-type-input-input") === document.activeElement){
        sendChat();
      }
    }else if(functionInside.keyCode === 191){
      //slash key
      document.getElementById("SplashChatrooms-dashchatroom-type-input-input").focus();
    }
  };



  return (
    <div className={cssGlobal["splashboard-full"]}>

      {/* console sidebar */}
      <div id="dashchatroom" className={`${css["dashchatroom"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="dashchatroom-box" className={css["dashchatroom-box"]}>
          <div id="dashchatroom-box-title" className={css["dashchatroom-box-info"]}>
            <div className={`${css["dashchatroom-box-title"]} ${cssGlobal["flex-center-left"]}`}>
              <div className={css["dashchatroom-box-title-text"]}>
                <h1 id="dashchatroom-box-title-h1">Server Name</h1>
              </div>
              <div className={`${css["dashchatroom-box-title-close"]} ${cssGlobal["flex-center-center"]}`}>
                <button title="Close" className={css["dashchatroom-box-close"]} onClick={() => dashChatroom()}>
                  <i className={`${css["fas"]} ${css["fa-times"]} ${"fas fa-times"}`}></i>
                </button>
              </div>
            </div>
          </div>
          {/* loader screen before chat loads */}
          {/* <div className={`${css["dashchatroom-main"]} ${cssGlobal["flex-center-center"]}`}>
            <div className={css["loader-circle"]}></div>
          </div> */}
          <div className={css["dashchatroom-main"]}>
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
          <div className={`${css["dashchatroom-type"]} ${cssGlobal["flex-center-center"]}`}>
            <div className={css["dashchatroom-type-input"]}>
              <textarea id="SplashChatrooms-dashchatroom-type-input-input" type="text" placeholder="Chat with Support"></textarea>
            </div>
            <div className={css["dashchatroom-type-send"]}>
              <button onClick={() => sendChat()}><i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i></button>
            </div>
          </div>
        </div>
      </div>
      {/* modal end */}

      <Navsplash type="nav" number="2" />
      <div className={cssGlobal["splashboard-section"]}>
        <div className={cssGlobal["splashboard"]}>
          <div className={cssGlobal["splashboard-bottom"]}>
            <Navsplash type="top" number="2" />
            <Addons />
              <div className={css["chatrooms-title"]}>
                <h1>Account Chatroom</h1>
              </div>
                {!username || !userID ?
                  <div className={`${css["chatrooms-list"]} ${cssGlobal["flex-flex-start-left"]}`}>
                    <div className={`${css["chatrooms-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                      <div className={css["chatrooms-list-box-info"]}>
                        <h1><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span></h1>
                        <p><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                        <div className={css["chatrooms-list-message"]}>
                          <p><span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                        </div>
                      </div>
                      <div className={css["chatrooms-list-box-button"]}>
                        <button disabled className={css["chatrooms-list-button-personal"]} style={{pointerEvents: "none", backgroundColor: "var(--theme3)"}}></button>
                      </div>
                    </div>
                  </div>:
                  <div className={`${css["chatrooms-list"]} ${cssGlobal["flex-flex-start-left"]}`}>
                    <div className={`${css["chatrooms-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                      <div className={css["chatrooms-list-box-info"]}>
                        <h1>{username}</h1>
                        <p>Account Support</p>
                        <div className={css["chatrooms-list-message"]}>
                          <p>yea thanks ill have a look at it soon might be testing</p>
                        </div>
                      </div>
                      <div className={css["chatrooms-list-box-button"]}>
                        <button onClick={() => {dashChatroom();sendAPI("markRead")}} className={css["chatrooms-list-button-personal"]}
                          style={{background: bannerColoursList.find(colour => colour.id === bannerID).background}}
                        ><i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-angles-right"}`}></i></button>
                      </div>
                    </div>
                  </div>
                }
              <div className={css["chatrooms-title"]}>
                <h1>Server Chatrooms</h1>
              </div>
              {chatroomList ?
                <div className={`${css["chatrooms-list"]} ${cssGlobal["flex-flex-start-left"]}`}>
                  {chatroomList.map((list) => (
                    <div key={list.id + "-key"} className={`${css["chatrooms-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                      <div className={css["chatrooms-list-box-info"]}>
                        <h1>
                          {list.name}
                        </h1>
                        <p>{list.type}</p>
                        <div className={css["chatrooms-list-message"]}>
                          <p>
                            {list.unread === true &&
                              <i className={`${css["fas"]} ${css["fa-circle"]} ${"fas fa-circle"}`}></i>
                            }
                            {list.lastMessage}</p>
                        </div>
                      </div>
                      <div className={css["chatrooms-list-box-button"]}>
                        <button onClick={() => {dashChatroom();sendAPI("markRead")}}><i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-angles-right"}`}></i></button>
                      </div>
                    </div>
                  ))}
                </div>:
                <div className={`${css["chatrooms-list"]} ${cssGlobal["flex-flex-start-left"]}`}>
                  {[...Array(2)].map((number, index) => (
                    <div key={index} className={`${css["chatrooms-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                      <div className={css["chatrooms-list-box-info"]}>
                        <h1><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span></h1>
                        <p><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                        <div className={css["chatrooms-list-message"]}>
                          <p><span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                        </div>
                      </div>
                      <div className={css["chatrooms-list-box-button"]}>
                        <button disabled className={css["chatrooms-list-button-personal"]} style={{pointerEvents: "none", backgroundColor: "var(--theme3)"}}></button>
                      </div>
                    </div>
                  ))}
                </div>
              }
          </div>
        </div>
      </div>
    </div>
  );
}
