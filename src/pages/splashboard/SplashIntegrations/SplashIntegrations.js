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
import css from "./SplashIntegrations.module.css";

//Extra
import integrationList from "../../../components/data/integrationList.json";
import { APIRoutes } from "../../../components/data/APIRoutes";

export default function SplashIntegrations() {

  //user static
  var [appTheme, setAppTheme] = useState();
  var [bannerID, setBannerID] = useState(6);
  var [username, setUsername] = useState();
  var [userID, setUserID] = useState();

  //user dynamic

  //external
  var sessionID = localStorage.getItem("sessionID");


  document.documentElement.setAttribute("data-apptheme", appTheme);
  document.body.style.overflow = 'auto';


  useEffect(() => {
    APIRequest("all");
  })

  var userStatic = [
    APIRoutes.appTheme,
    APIRoutes.bannerID,
    APIRoutes.username,
  ];

  var userDynamic =[
    APIRoutes.integrationList
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
        axios.all(userStatic.map(type => axios.get(APIRoutes.urlUser + responseMe.data.userID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setAppTheme(response[0].data);
          setBannerID(response[1].data);
          setUsername(response[2].data);
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
      //user dynamic not done
    })
    .catch(error => {
      //logout?
    });
  }

  function sendAPI(type, data){
    if(type === "deleteIntegration"){
      console.log("deleteIntegration" + data);

      /*
      axios.delete('link HERE/' + data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        APIRequest();
      })
      .catch(function (error) {
      });
      */
    }else{
      return;
    }
  }


  var [integrationDisplay, SetIntegrationDisplay] = useState(false);


  //integration modal
  var integrationinfobox = document.getElementById("integrationinfo-box");
  var integrationinfo = document.getElementById("integrationinfo");

  function IntegrationInfo() {
    var integrationinfobox = document.getElementById("integrationinfo-box");
    var integrationinfo = document.getElementById("integrationinfo");
    if (integrationinfo.style.transform === "scale(1)") {
      integrationinfobox.style.transform = "scale(0.4)";
      setTimeout(() => {
        integrationinfo.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    } else {
      integrationinfobox.scrollTop = 0;
      integrationinfo.style.transform = "scale(1)";
      integrationinfobox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
    }
  }

  window.onclick = function (closeModal) {
    var integrationinfo = document.getElementById("integrationinfo");
    if (closeModal.target === integrationinfo) {
      IntegrationInfo();
    }
  };

  window.onkeyup = function (closeEscape) {
    var integrationinfo = document.getElementById("integrationinfo");
    if (closeEscape.keyCode === 27) {
      if (integrationinfo.style.transform === "scale(1)") {
        IntegrationInfo();
      }
    }
  };

  var [IntegrationInfoDisplay, SetIntegrationInfoDisplay] = useState("none");

  function Integration(application) {
    SetIntegrationInfoDisplay(application);
  }

  const integrationsDisplay = integrationList.map((list) => (
    <div key={list.name + "key"} className={
        list.connected === 1
          ? css["integration-list-box-connected"]
          : css["integration-list-box"]
      }>
      <div className={css["integration-list-box-inside"]}>
        <div className={css["integration-list-image"]}>
          <img src={require("../../../images/integrations/wallpapers/" + list.name.toLowerCase() +".svg")}/>
        </div>
        <div className={css["integration-list-status"]}>
          <p>
            <b>{list.name}</b>
            <br />
            {list.connected === 1 ? (
              <span className={css["integration-list-status-connect"]}>
                <i className={`${css["far"]} ${css["fa-check-circle"]} ${"far fa-check-circle"}`}></i>Connected
              </span>
            ) : (
              <span className={css["integration-list-status-remove"]}>
                <i className={`${css["far"]} ${css["fa-times-circle"]} ${"far fa-times-circle"}`}></i>Not Connected
              </span>
            )}
          </p>
        </div>
        {list.connected === 1 && (
          <div className={css["integration-list-connected-info"]}>
            <p><b>Account:</b><br />{list.connectedName}</p>
          </div>
        )}
      </div>
      <div className={css["integration-list-box-tools"]}>
        <div className={css["integration-list-box-buttons"]}>
          <div className={css["integration-list-box-buttons-box"]}>
            {list.connected === 0 ? (
              <button
                onClick={() => {
                  IntegrationInfo();
                  Integration(list.name);
                }} className={css["integration-list-box-moreinfo"]}>
                <i className={`${css["fas"]} ${css["fas fa-info-circle"]} ${"fas fa-info-circle"}`}></i>
              </button>
            ) : (
              <button
                onClick={() => {
                  IntegrationInfo();
                  Integration(list.name);
                }} className={css["integration-list-box-moreinfo"]}>
                More Info
              </button>
            )}
          </div>
          <div className={css["integration-list-box-buttons-box"]}>
            {list.connected === 0 ? (
              <button className={css["integration-list-box-buttons-connect"]}>
                Connect
              </button>
            ) : (
              <button onClick={() => sendAPI("deleteIntegration", list.name)} className={css["integration-list-box-buttons-remove"]}>
                <i className={`${css["fas"]} ${css["fas fa-trash"]} ${"fas fa-trash"}`}></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className={cssGlobal["splashboard-full"]}>
      {/* modal window start */}
      <div id="integrationinfo" className={css["integrationinfo"]}>
        <div id="integrationinfo-box" className={css["integrationinfo-box"]}>
          {integrationList
            .filter(function (integrationList) {
              return integrationList.name === IntegrationInfoDisplay;
            })
            .map((list) => (
              <div key={list.name}>
                <h1>{list.name}</h1>
                <p>
                  <b>Application Features:</b>
                </p>
                <div className={css["integrationinfo-features"]}>
                  {list.features.includes("login") && (
                    <p>
                      <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                      <b>Login Option</b>
                      <br />
                      Allows users to use the login with {list.name} to access
                      their account
                    </p>
                  )}

                  <p>
                    <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                    <b>Email Integration</b>
                    <br />
                    Integrate gmail account to recieve notifications and
                    triggers
                  </p>
                </div>
                <p>
                  For more information on how to setup and use the integration,
                  please read the full documentation
                </p>
                <div className={css["integrationinfo-buttons"]}>
                  <button className={css["integrationinfo-buttons-box1"]} onClick={() => IntegrationInfo()}>
                    <p>Close</p>
                  </button>
                  <div className={css["integrationinfo-buttons-box2"]}>
                    <Link className={css["integrationinfo-buttons-link"]} to={"/" + list.name}>
                      <div className={css["integrationinfo-buttons-box-inside"]}>
                        <p><i className={`${css["fas"]} ${css["fa-file-alt"]}  ${"fas fa-file-alt"}`}></i>
                          View Docs
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* modal window end */}
      <Navsplash type="nav" number="4" />
      <div className={cssGlobal["splashboard-section"]}>
        <div className={cssGlobal["splashboard"]}>
          <div className={cssGlobal["splashboard-bottom"]}>
            <Navsplash type="top" number="4" />
            <Addons />
            {integrationDisplay ?
              <React.Fragment>
                <p>
                  Account Integrations allow you to integrate other platforms inside
                  your Stax Developer Studios account.
                </p>
                <p>
                  These connections give functions and tools when linked, making it
                  a recommended productivity feature! Users can connect as many as
                  they want, but not all are required with some having the same
                  features.
                </p>
                <div className={css["integration-list"]}>{integrationsDisplay}</div>
              </React.Fragment>:
              <React.Fragment>
                <p>
                  <span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span>
                </p>
                <p>
                  <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour1"]}`}></span>
                  <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span>
                </p>
                <div className={css["integration-list"]}>
                  {[...Array(4)].map((number, index) => (
                    <div key={index} className={css["integration-list-box"]}>
                      <div className={css["integration-list-box-inside"]}>
                        <div style={{height: "120px", backgroundColor: "var(--theme1)"}} className={css["integration-list-image"]}>
                        </div>
                        <div className={css["integration-list-status"]}>
                          <p>
                            <b><span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour1"]}`}></span></b>
                            <span style={{height: "25px"}} className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span>
                          </p>
                        </div>
                        {/* <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span>
                        <span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span> */}
                      </div>
                      <div className={css["integration-list-box-tools"]}>
                        <div className={css["integration-list-box-buttons"]}>
                          <div className={css["integration-list-box-buttons-box"]}>
                            <button disabled style={{height: "50px", pointerEvents: "none"}} className={css["integration-list-box-moreinfo"]}>
                            </button>
                          </div>
                          <div className={css["integration-list-box-buttons-box"]}>
                            <button disabled style={{height: "50px", pointerEvents: "none", backgroundColor: "var(--theme3)"}} className={css["integration-list-box-buttons-connect"]}>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
