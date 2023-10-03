import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
//import Button from "../../../components/button/Button";
import axios from "axios";

//External
import {
  Addons,
  LazyLoad,
  snackbarNotification,
  /*scrollReveal,
  newNotification,
  viewNotification,
  closeNotification,*/
} from "../../../components/addons/Addons";

import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";
import Navdash from "../../../components/navdash/Navdash";

//Main
import css from "./Dashboard.module.css";

//Extra
import bannerColoursList from "../../../components/data/bannerColours.json";
// import blacklistWords from "../../../components/data/blacklistWords.json";
import { APIRoutes } from "../../../components/data/APIRoutes";

export default function Dashboard() {

  var StatReloadTime = 5000; //miliseconds
  document.documentElement.setAttribute("data-apptheme", appTheme);
  document.body.style.overflow = 'auto';


  //user data
  var [appTheme, setAppTheme] = useState();
  var [userID, setUserID] = useState();
  var [bannerID, SetBannerID] = useState();
  var [userJoin, SetUserJoin] = useState();

  //static plan data
  var [planName, setPlanName] = useState();
  var [planCreated, setPlanCreated] = useState();
  var [planStorage, SetPlanStorage] = useState();
  var [planRAM, setPlanRAM] = useState();

  //dynamic plan data
  var [serverStatus, setserverStatus] = useState(); //1 online, 2 restart and 0 offline
  var [chatroomPing, setChatroomPing] = useState(); //0 for no new message, 1 for unread message(s).onst appTheme = 0
  //server stats
  var CPUDataRaw = null //percentage
  var RAMDataRaw = null //gb
  var [StorageDataRaw, setStorageDataRaw] = useState(); //gb
  var [planUptime, setPlanUptime] = useState() //hours

  //external data
  var sessionID = localStorage.getItem("sessionID");
  var planID = window.location.pathname.split("/")[1];
  //url is url/{planID}/[page] so 2nd slash

  /* dummy data */
  /*
  var [appTheme, setAppTheme] = useState();
  var [userID, setUserID] = useState("12345678-1234-1234-123456789012");
  var [bannerID, SetBannerID] = useState("purple");
  var [userJoin, SetUserJoin] = useState("10th June 2020");
  var [planName, setPlanName] = useState("1234567890123456");
  var [planID, setPlanID] = useState("12345678-1234-1234-123456789012");
  var [planCreated, setPlanCreated] = useState("8th June 2020");
  var [planStorage, SetPlanStorage] = useState(150);
  var [planRAM, setPlanRAM] = useState(5);
  var [serverStatus, setserverStatus] = useState(0); //1 online, 2 restart and 0 offline
  var [chatroomPing, setChatroomPing] = useState(0); //0 for no new message, 1 for unread message(s).onst appTheme = 0
  var CPUDataRaw = 45 //percentage
  var RAMDataRaw = 2.3 //gb
  var [StorageDataRaw, setStorageDataRaw] = useState(52); //gb
  var [planUptime, setPlanUptime] = useState(825) //hours
  //*/


  useEffect(() => {
    APIRequest("all");

    //Test Code
    /*
    const statLoad = setInterval(StatsAPItest, StatReloadTime);
    return () => {
      clearInterval(statLoad);

    }
    */

    //Real
    /*
    const statLoadFast = setInterval(() => {
      APIRequest("serverStatsFast");
    }, Number(StatReloadTime));
    const statLoadSlow = setInterval(() => {
      APIRequest("serverStatsSlow");
    }, Number(StatReloadTime * 10));
    return () => {
      clearInterval(statLoadFast);
      clearInterval(statLoadSlow)
    }
    */
  }, []);

  var userStatic = [
    APIRoutes.appTheme,
    APIRoutes.bannerID,
    APIRoutes.userJoin,
  ];

  var planStatic = [
    APIRoutes.planName,
    APIRoutes.planID,
    APIRoutes.planCreated,
    APIRoutes.planStorage,
    APIRoutes.planRAM,
  ];

  var planDynamic = [
    APIRoutes.serverStatus,
    APIRoutes.chatroomPing,
  ]

  var serverStatsFast = [
    "URL", //CPUDataRaw
    "URL", //RAMDataRaw
  ];

  var serverStatsSlow = [
    "URL", //StorageDataRaw
    "URL", //planUptime
  ];

  function APIRequest(type){
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
          setAppTheme(response[0].data.appTheme);
          SetBannerID(response[1].data.bannerID);
          SetUserJoin(response[2].data.userJoin);
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
      //plan data (usually called once)
      if(type === "planStatic" || type === "all"){
        axios.all(planStatic.map(type => axios.get(APIRoutes.planURL + planID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setPlanName(response[0].data.planName);
          setPlanCreated(response[1].data.planCreated);
          SetPlanStorage(response[2].data.planStorage);
          setPlanRAM(response[3].data.planRAM);
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
      //plan dynamic data (called a few times)
      if(type === "planDynamic" || type === "all"){
        axios.all(planDynamic.map(type => axios.get(APIRoutes.planURL + planID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setserverStatus(response[0].data.serverStatus);
          setChatroomPing(response[1].data.chatroomPing);
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
    })

    //server stats
    if(type === "serverStatsFast" || type === "all"){
      axios.all(serverStatsFast.map(url => axios.get(url)), {
        headers: {
          Authorization: `sessionID ${sessionID}`,
        },
      })
      .then(axios.spread((...response) => {
        CPUDataRaw = parseFloat(response[0].data.CPUDataRaw.toFixed(0));
        RAMDataRaw = parseFloat(response[1].data.RAMDataRaw.toFixed(2));
        UpdateStatsDisplay("fast");
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
    if(type === "serverStatsSlow" || type === "all"){
      axios.all(serverStatsSlow.map(url => axios.get(url)), {
        headers: {
          Authorization: `sessionID ${sessionID}`,
        },
      })
      .then(axios.spread((...response) => {
        setStorageDataRaw(parseFloat(response[0].data.StorageDataRaw.toFixed(2)));
        setPlanUptime(parseFloat(response[1].data.planUptime.toFixed(0)));
        UpdateStatsDisplay("slow");
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


  }

  function sendAPI(type, data){
    if(type === "startServer"){
      setServerControlsDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          serverStatus: 1,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planDynamic");
          snackbarNotification(1, "Server Starting");
        }else{
          snackbarNotification(3, "Server Already Running");
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
        setServerControlsDisabled(false);
      });
    }else if(type === "restartServer"){
      setServerControlsDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          serverStatus: 2,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planDynamic");
          snackbarNotification(1, "Server Restarting");
        }else{
          snackbarNotification(3, "Server Already Restarting");
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
        setServerControlsDisabled(false);
      });
    }else if(type === "stopServer"){
      setServerControlsDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          serverStatus: 0,
        }
      )
      .then(response => {
        if(response.data.success === true){
          APIRequest("planDynamic");
          snackbarNotification(1, "Server Stopping");
        }else{
          snackbarNotification(3, "Server Already Stopped");
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
        setServerControlsDisabled(false);
      });
    }else if(type === "editPlan"){
      SetEditPlanSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          planName: document.getElementById("editplan-input").value,
          planPhoto: 0, //img here
        }
      )
      .then(response => {
        if(response.data.success === true){
          APIRequest("planStatic");
          editPlan();
          snackbarNotification(1, "Plan Saved");
        }else{
          snackbarNotification(3, "Error Saving Plan");
          SetEditPlanSubmitDisabled(false);
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
        SetEditPlanSubmitDisabled(false);
      })
    }else{
      return;
    }
  }

  var [serverControlsDisabled, setServerControlsDisabled] = useState(false);


  function StatsAPItest(){
    CPUDataRaw = Math.random() * (100 - 0) + 0;
    RAMDataRaw = Math.random() * (planRAM - 0) + 0;
    UpdateStatsDisplay("fast");
    setStorageDataRaw(parseFloat((Math.random() * (planStorage - 0) + 0).toFixed(2)));
    setPlanUptime(parseFloat((Math.random() * (1000 - 0) + 0).toFixed(0)));
  }

  useEffect(() => {
    // UpdateStatsDisplay("slow");
  }, [StorageDataRaw, planUptime]);

  function UpdateStatsDisplay(type){
    if(type === "fast"){
    //cpu
      //desktop
      document.getElementById("circle-progress-cpu").style.strokeDasharray = Math.abs(Math.round(CPUDataRaw - circleSyntaxCorrectionPercent)) + " 100";
      document.getElementById("number-progress-cpu").innerHTML = Math.round(CPUDataRaw) + "%";
      //mobile
      document.getElementById("Dashboard-tracking-progress-bar-cpu").style.width = Math.round(CPUDataRaw) + "%";
      document.getElementById("Dashboard-tracking-progress-info-p-cpu").innerHTML = Math.round(CPUDataRaw) + "%";
    //ram
      //desktop
      document.getElementById("circle-progress-ram").style.strokeDasharray = Math.abs(Math.round(Number((RAMDataRaw / planRAM) * (100 - circleSyntaxCorrectionPercent)))) + " 100";
      document.getElementById("number-progress-ram").innerHTML = Math.round(Number((RAMDataRaw / planRAM) * 100)) + "%";
      //mobile
      document.getElementById("Dashboard-tracking-progress-bar-ram").style.width = Math.round(Number((RAMDataRaw / planRAM) * 100)) + "%";
      document.getElementById("Dashboard-tracking-progress-info-p-ram").innerHTML = Math.round(Number((RAMDataRaw / planRAM) * 100)) + "%";
    }else if(type === "slow"){
      //storage
      setStoragePercent(Number((StorageDataRaw / planStorage) * 100).toFixed(0));
      //duration
      setDurationPercent(Number(planUptime / 10).toFixed(0));
    }
  }

  var circleSyntaxCorrectionPercent = 6;

  var [StoragePercent, setStoragePercent] = useState(0);
  var [DurationPercent, setDurationPercent] = useState(0);


  // var editplanbox = document.getElementById("editplan-box");
  // var editplan = document.getElementById("editplan");

  var [copyPlanSubmitDisabled, SetCopyPlanSubmitDisabled] = useState(false);

  function copyID() {
    SetCopyPlanSubmitDisabled(true);
    navigator.clipboard.writeText(planID);
    snackbarNotification(1, "Plan ID Copied!");
    document.getElementById("copyid-button").classList.replace(css["copyid-button-off"], css["copyid-button-on"]);
    setTimeout(() => {
      SetCopyPlanSubmitDisabled(false);
      document.getElementById("copyid-button").classList.replace(css["copyid-button-on"], css["copyid-button-off"]);
    }, 3000);
  }


  window.onclick = function (closeModal) {
  };

  function editPlan() {
    var editplanbox = document.getElementById("editplan-box");
    var editplan = document.getElementById("editplan");
    if (editplan.style.transform === "scale(1)") {
      editplanbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        editplan.style.transform = "Scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      editplanbox.scrollTop = 0;
      editplan.style.transform = "scale(1)";
      editplanbox.style.transform = "scale(1)";
      resetName();
      document.body.style.overflow = 'hidden';
    }
  }

  function resetName() {
    SetEditPlanSubmitDisabled(true);
    document.getElementById("editplan-icon").style.display = "none";
    document.getElementById("editplan-messages").innerHTML = "";
    document.getElementById("editplan-input").value = "";
    document.getElementById("editplan-input-full").style.border =
      "1px solid var(--theme2)";
  }

  var NameLength = '<p><i class="' + css["fas"] + ' fas fa-exclamation-circle"></i>Plan name must be between 3-16 characters</p>';
  var NameSame = '<p><i class="' + css["fas"] + ' fas fa-exclamation-circle"></i>Please enter a new name</p>';
  var NameCorrect = "";
  // var FilterWord = '<p><i class="' + css["fas"] + ' fas fa-exclamation-circle"></i>Plan name contains a filtered word</p>';

  var [editPlanSubmitDisabled, SetEditPlanSubmitDisabled] = useState(true);


  function planNameCheck() {
    var editPlanInput = document.getElementById("editplan-input").value;
    //also need code for checking if there is a change in profile picture of plan!! - not coded yet cause idk

    if (editPlanInput !== "") {
      // input filled check
      if (editPlanInput !== planName) {
        /* same name check */
        if(editPlanInput.length <= 16 && editPlanInput.length > 3){
          /* name length check */
          //if(!blacklistWords.find((list) => editPlanInput.match(list))) {
          /* filtered word check */
            SetEditPlanSubmitDisabled(false);
            document.getElementById("editplan-icon").style.display = "block";
            document.getElementById("editplan-messages").innerHTML = NameCorrect;
            document.getElementById("editplan-input-full").style.border = "1px solid var(--theme2)";
          /*
          }else{
            document.getElementById("editplan-submit").classList.add(css["editplan-submit-disable"]);
            document.getElementById("editplan-submit").classList.remove(css["editplan-submit"]);
            document.getElementById("editplan-submit-button").setAttribute("disabled", "");
            document.getElementById("editplan-icon").style.display = "none";
            document.getElementById("editplan-messages").innerHTML = FilterWord;
            document.getElementById("editplan-input-full").style.border = "1px solid var(--red)";
          }*/
        }else{
          SetEditPlanSubmitDisabled(true);
          document.getElementById("editplan-icon").style.display = "none";
          document.getElementById("editplan-messages").innerHTML = NameLength;
          document.getElementById("editplan-input-full").style.border = "1px solid var(--red)";
        }
      }else{
        SetEditPlanSubmitDisabled(true);
        document.getElementById("editplan-submit-button").setAttribute("disabled", "");
        document.getElementById("editplan-icon").style.display = "none";
        document.getElementById("editplan-messages").innerHTML = NameSame;
        document.getElementById("editplan-input-full").style.border = "1px solid var(--red)";
      }
    }else{
      SetEditPlanSubmitDisabled(true);
      document.getElementById("editplan-icon").style.display = "none";
      document.getElementById("editplan-messages").innerHTML = NameCorrect;
      document.getElementById("editplan-input-full").style.border = "1px solid var(--theme2)";
    }
  }

  window.onkeyup = function (KeyHere) {
    if (KeyHere.keyCode === 27) {
      var editplan = document.getElementById("editplan");
      if (editplan && editplan.style.transform === "scale(1)") {
        editPlan();
      }
    }
  };

  // const serverUptime = document.getElementById('server-uptime').getContext('2d');
  // var Chart;
  // Chart.defaults.color = '#A9A9A9';
  // Chart.defaults.fontFamily = 'Poppins';

  // const serverUptimeChart = new Chart(serverUptime, {
  //     type: 'bar',
  //     data: {
  //         labels: ['Thu', 'Fri','Sat','Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
  //         datasets: [{
  //             tension: 0.3,
  //             label: 'Uptime',
  //             data: [12, 19, 31, 5, 15, 26, 9, 15],
  //             borderRadius: 10,
  //             fillOpacity: 0.6,
  //             borderSkipped: false,
  //             backgroundColor: [
  //                 '#00C79A',
  //             ],
  //         },
  //         {
  //             tension: 0.3,
  //             label: 'Downtime',
  //             data: [8, 11, 23, 24, 6, 41, 18, 5],
  //             borderRadius: 10,
  //             fill: true,
  //             borderSkipped: false,
  //             backgroundColor: [
  //                 '#ED4337',
  //             ],
  //         }],
  //     },
  //     options: {
  //         responsive: true,
  //         maintainAspectRatio: false,
  //         animation: {
  //             duration: 1000,
  //             easing: 'easeInOut',
  //         },
  //         scales: {
  //             x: {
  //                 grid: {
  //                 display: false,
  //                 borderColor: '#A9A9A9',
  //                 },
  //                 ticks: {
  //                     font: {
  //                         family: 'Poppins',
  //                         size: 11,
  //                     },
  //                 },
  //             },
  //             y: {
  //                 grid: {
  //                 display: true,
  //                 lineWidth: 1,
  //                 borderColor: '#A9A9A9',
  //                 color: '#a9a9a9',
  //                 },
  //                 title: {
  //                     text: 'Percentage (%)',
  //                     display: false,
  //                     font: {
  //                         family: 'Poppins',
  //                         size: 12,
  //                     },
  //                 },
  //                 ticks: {
  //                     font: {
  //                         family: 'Poppins',
  //                         size: 11,
  //                     },
  //                 },
  //             },
  //         },
  //         plugins: {
  //             legend: {
  //                 display: false,
  //                 labels: {
  //                     font: {
  //                         family: 'Poppins',
  //                         size: 12,
  //                         fontColor: 'white',
  //                     },
  //                 },
  //             },
  //             tooltip: {
  //                 enabled: false,
  //             }
  //         },
  //     }
  // });

  return (
    <div className={cssGlobal["dashboard-full"]}>
      <Navdash number="1" type="nav" />
      <Addons />
      {/* modal window start */}
      <div id="editplan" className={css["editplan"]}>
        <div id="editplan-box" className={css["editplan-box"]}>
          <h1>Edit Plan</h1>
          <div className={css["plan-profile-photo"]}></div>
          {/* plan profile photo here above div style tag */}
          <button className={css["editplan-button"]}>
            <p>Change Photo</p>
          </button>
          <p>Plan Name</p>
          <div className={css["editplan-input"]} id="editplan-input-full">
            <div className={css["editplan-input-text"]}>
              <input id="editplan-input"
                type="text"
                onKeyUp={() => planNameCheck()}
                placeholder="Plan Name"
              />
            </div>
            <div className={css["editplan-icon"]} id="editplan-icon">
              <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
            </div>
            <span id="editplan-messages" className={css["editplan-messages"]}></span>
          </div>
          <div className={css["editplan-buttons"]}>
            <div className={css["editplan-cancel"]}>
              <button onClick={() => editPlan()}>Cancel</button>
            </div>
            <div className={editPlanSubmitDisabled === true ? css["editplan-submit-disable"]: css["editplan-submit"]} id="editplan-submit"
            >
              <button onClick={() => sendAPI("editPlan")} id="editplan-submit-button" disabled={editPlanSubmitDisabled}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal window end */}

      <div className={cssGlobal["dashboard-section"]}>
        <Navdash number="1" type="top" />

        <div className={`${css["dashboard"]} ${cssGlobal["flex-stretch-left"]}`}>
          {planUptime === null || planUptime === undefined ?
            <React.Fragment>
              <div className={`${css["tracking-board"]} ${cssGlobal["flex-flex-start-left"]}`}>
                {[...Array(4)].map((number, index) => (
                  <div key={index} className={css["tracking-board-box"]}>
                    <svg className={css["tracking-circle"]} viewBox="0 0 40 40">
                      <circle className={css["tracking-circle-outside"]}
                        cx="20"
                        cy="20"
                        r="15"
                      />
                      <circle style={{stroke: "var(--theme2)"}} className={css["tracking-circle-inside" + (index + 1).toString()]}
                        cx="20"
                        cy="20"
                        r="15"
                        strokeDasharray="0 100"
                      />
                      <text className={css["tracking-circle-info-inside"]}
                        alignmentBaseline="central"
                        dominantBaseline="central"
                        x="20"
                        y="20"
                      >
                      </text>
                    </svg>
                    <p>
                      <span style={{margin: "0% auto 5px"}} className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span>
                      <span style={{margin: "auto"}} className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span>
                    </p>
                  </div>
                ))}
              </div>
              <div className={`${css["tracking-progress"]} ${cssGlobal["flex-center-left"]}`}>
                {[...Array(4)].map((number, index) => (
                  <div key={index} className={`${css["tracking-progress-box"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["tracking-progress-title"]}>
                      <p>
                        <span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span>
                        <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span>
                      </p>
                    </div>
                    <div className={css["tracking-progress-info"]}>
                      <p><span style={{marginLeft: "auto"}} className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                    </div>
                    <div style={{height: "15px"}} className={css["tracking-progress-bar"]}>
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>:
            <React.Fragment>
              <div className={`${css["tracking-board"]} ${cssGlobal["flex-flex-start-left"]}`}>
                <div className={css["tracking-board-box"]}>
                  <svg className={css["tracking-circle"]} viewBox="0 0 40 40">
                    <circle className={css["tracking-circle-outside"]}
                      cx="20"
                      cy="20"
                      r="15"
                    />
                    <circle id="circle-progress-cpu" className={css["tracking-circle-inside1"]}
                      cx="20"
                      cy="20"
                      r="15"
                      strokeDasharray="0 100"
                    />
                    <text id="number-progress-cpu" className={css["tracking-circle-info-inside"]}
                      alignmentBaseline="central"
                      dominantBaseline="central"
                      x="20"
                      y="20"
                    >
                    0%
                    </text>
                  </svg>
                  <p>
                    <b>CPU Usage</b>
                    <br/>
                    Central Unit</p>
                </div>
                <div className={css["tracking-board-box"]}>
                  <svg className={css["tracking-circle"]} viewBox="0 0 40 40">
                    <circle className={css["tracking-circle-outside"]}
                      cx="20"
                      cy="20"
                      r="15"
                    />
                    <circle id="circle-progress-ram" className={css["tracking-circle-inside2"]}
                      cx="20"
                      cy="20"
                      r="15"
                      strokeDasharray="0 100"
                    />
                    <text id="number-progress-ram" className={css["tracking-circle-info-inside"]}
                      alignmentBaseline="central"
                      dominantBaseline="central"
                      x="20"
                      y="20"
                    >
                    0%
                    </text>
                  </svg>
                  <p>
                    <b>RAM Usage</b>
                    <br />
                    {planRAM}GB Total
                  </p>
                </div>
                <div className={css["tracking-board-box"]}>
                  <svg className={css["tracking-circle"]} viewBox="0 0 40 40">
                    <circle className={css["tracking-circle-outside"]}
                      cx="20"
                      cy="20"
                      r="15"
                    />
                    <circle id="circle-progress-storage" className={css["tracking-circle-inside3"]}
                      cx="20"
                      cy="20"
                      r="15"
                      strokeDasharray={Math.abs(Number(StoragePercent - circleSyntaxCorrectionPercent)) + " 100"}
                    />
                    <text id="number-progress-storage" className={css["tracking-circle-info-inside"]}
                      alignmentBaseline="central"
                      dominantBaseline="central"
                      x="20"
                      y="20"
                    >
                    {StoragePercent}%
                    </text>
                  </svg>
                  <p>
                    <b>Block Storage</b>
                    <br />
                    {StorageDataRaw}GB Used
                  </p>
                </div>
                <div className={css["tracking-board-box"]}>
                  <svg className={css["tracking-circle"]} viewBox="0 0 40 40">
                    <circle className={css["tracking-circle-outside"]}
                      cx="20"
                      cy="20"
                      r="15"
                    />
                    <circle id="circle-progress-duration" className={css["tracking-circle-inside4"]}
                      cx="20"
                      cy="20"
                      r="15"
                      strokeDasharray={Math.abs(Number(DurationPercent - circleSyntaxCorrectionPercent)) + " 100"}
                    />
                    <text id="number-progress-duration" className={css["tracking-circle-info-inside"]}
                      alignmentBaseline="central"
                      dominantBaseline="central"
                      x="20"
                      y="20"
                    >
                    {DurationPercent}%
                    </text>
                  </svg>
                  <p>
                    <b>Plan Duration</b>
                    <br />
                    <span id="Dashboard-progress-duration">{planUptime}</span> hours left</p>
                </div>
              </div>
              <div className={`${css["tracking-progress"]} ${cssGlobal["flex-center-left"]}`}>
                <div className={`${css["tracking-progress-box"]} ${cssGlobal["flex-center-left"]}`}>
                  <div className={css["tracking-progress-title"]}>
                    <p>
                      <b>CPU Usage</b>
                      <br />
                      Central Unit</p>
                  </div>
                  <div className={css["tracking-progress-info"]}>
                    <p id="Dashboard-tracking-progress-info-p-cpu">0%</p>
                  </div>
                  <div className={css["tracking-progress-bar"]}>
                    <div id="Dashboard-tracking-progress-bar-cpu" className={css["tracking-progress-bar-inside1"]}></div>
                  </div>
                </div>
                <div className={`${css["tracking-progress-box"]} ${cssGlobal["flex-center-left"]}`}>
                  <div className={css["tracking-progress-title"]}>
                    <p>
                      <b>RAM Usage</b>
                      <br />
                      {planRAM}GB Total
                    </p>
                  </div>
                  <div className={css["tracking-progress-info"]}>
                    <p id="Dashboard-tracking-progress-info-p-ram">0%</p>
                  </div>
                  <div className={css["tracking-progress-bar"]}>
                    <div id="Dashboard-tracking-progress-bar-ram" className={css["tracking-progress-bar-inside2"]}></div>
                  </div>
                </div>
                <div className={`${css["tracking-progress-box"]} ${cssGlobal["flex-center-left"]}`}>
                  <div className={css["tracking-progress-title"]}>
                    <p>
                      <b>Block Storage</b>
                      <br/>
                      {StorageDataRaw}GB Used
                    </p>
                  </div>
                  <div className={css["tracking-progress-info"]}>
                    <p id="Dashboard-tracking-progress-info-p-storage">{StoragePercent}%</p>
                  </div>
                  <div className={css["tracking-progress-bar"]}>
                    <div style={{ width: StoragePercent + "%" }} id="Dashboard-tracking-progress-bar-storage" className={css["tracking-progress-bar-inside3"]}></div>
                  </div>
                </div>
                <div className={`${css["tracking-progress-box"]} ${cssGlobal["flex-center-left"]}`}>
                  <div className={css["tracking-progress-title"]}>
                    <p>
                      <b>Plan Duration</b>
                      <br/>
                      {planUptime} hours left</p>
                  </div>
                  <div className={css["tracking-progress-info"]}>
                    <p id="Dashboard-tracking-progress-info-p-duration">{DurationPercent}%</p>
                  </div>
                  <div className={css["tracking-progress-bar"]}>
                    <div style={{ width: DurationPercent + "%", transition: "all 0.2s ease-in-out" }} id="Dashboard-tracking-progress-bar-duration" className={css["tracking-progress-bar-inside4"]}></div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          }

          {serverStatus === null || serverStatus === undefined ?
            <div className={css["dashboard-control"]}>
              <div className={css["dashboard-control-box"]}>
                <div className={css["plan-status-offline"]}>
                  <div style={{height: "30px", width: "50%", backgroundColor: "var(--theme2)"}} className={css["offline-tag"]}>
                  </div>
                  <h1>
                    <span style={{margin: "10px auto 5px", height: "25px"}} className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour2"]}`}></span>
                    <span style={{margin: "auto", height: "25px"}} className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span>
                  </h1>
                  <div className={` ${css["dashboard-control-buttons"]} ${cssGlobal["flex-center-center"]}`}>
                    <button
                      style={{pointerEvents: "none", backgroundColor: "var(--theme2)"}}
                      disabled
                      className={`${css["server-on"]} ${cssGlobal["flex-center-center"]}`}
                    >
                    </button>
                  </div>
                </div>
              </div>
            </div>:
            <div className={css["dashboard-control"]}>
              <div className={css["dashboard-control-box"]}>
                <div className={css["plan-status-online"]}>
                  <div className={css["online-tag"]}>
                    <i className={`${css["fas"]} ${css["fa-circle"]} ${"fas fa-circle"}`}></i>
                    Online
                  </div>
                  <div className={css["offline-tag"]}>
                    <i className={`${css["fas"]} ${css["fa-circle"]} ${"fas fa-circle"}`}></i>
                    Offline
                  </div>
                  <h1>Control Panel</h1>
                  <div className={` ${css["dashboard-control-buttons"]} ${cssGlobal["flex-center-center"]}`}>
                    <button
                      style={serverControlsDisabled === true ? {opacity: "60%"}:{opacity:"100%"}}
                      disabled={serverControlsDisabled}
                      onClick={() => sendAPI("startServer")}
                      className={`${css["server-on"]} ${cssGlobal["flex-center-center"]}`}
                    >
                      <div className={css["dashboard-control-button-icon"]}>
                        <i className={`${css["fas"]} ${css["fa-power-off"]} ${"fas fa-power-off"}`}></i>
                      </div>
                      <div className={css["dashboard-control-button-text"]}>
                        <p>Start</p>
                      </div>
                    </button>
                    <button
                      style={serverControlsDisabled === true ? {opacity: "60%"}:{opacity:"100%"}}
                      disabled={serverControlsDisabled}
                      onClick={() => sendAPI("restartServer")}
                      className={`${css["server-restart"]} ${cssGlobal["flex-center-left"]}`}
                    >
                      <div className={css["dashboard-control-button-icon"]}>
                        <i className={`${css["fas"]} ${css["fa-undo-alt"]} ${"fas fa-undo-alt"}`}></i>
                      </div>
                      <div className={css["dashboard-control-button-text"]}>
                        <p>Restart</p>
                      </div>
                    </button>
                    <button
                      style={serverControlsDisabled === true ? {opacity: "60%"}:{opacity:"100%"}}
                      disabled={serverControlsDisabled}
                      onClick={() => sendAPI("stopServer")}
                      className={`${css["server-off"]} ${cssGlobal["flex-center-left"]}`}
                    >
                      <div className={css["dashboard-control-button-icon"]}>
                        <i className={`${css["fas"]} ${css["fa-stop"]} ${"fas fa-stop"}`}></i>
                      </div>
                      <div className={css["dashboard-control-button-text"]}>
                        <p>Stop</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }

          {!planName || !bannerID ?
            <div className={css["plan-profile"]}>
              <div className={css["plan-profile-box"]}>
                <div className={css["plan-profile-photo"]}></div>
                <h1><span style={{margin: "auto"}} className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span></h1>
                <button disabled style={{pointerEvents: "none", height: "50px"}} className={css["plan-profile-button"]}>
                </button>
              </div>
            </div>:
            <div className={css["plan-profile"]}
              style={{
                background: bannerColoursList.find(colour => colour.name === bannerID).background,
                color: bannerColoursList.find(colour => colour.name === bannerID).text
              }}>
              <div className={css["plan-profile-box"]}>
                <div className={css["plan-profile-photo"]}></div>
                {/* profile photo on div above style tag */}
                <h1>{planName}</h1>
                <button className={css["plan-profile-button"]}
                  onClick={() => editPlan()}>
                  <p>Edit Plan</p>
                </button>
              </div>
            </div>
          }

          {!planID || !planRAM || !planUptime || !planStorage || !planCreated || !userJoin ?
            <div className={`${css["plan-info"]} ${cssGlobal["flex-center-left"]}`}>
              <div className={css["plan-info-title"]}>
                <h2><span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour2"]}`}></span></h2>
              </div>
              {[...Array(6)].map((number, index) => (
                <div key={index} className={css["plan-info-box"]}>
                  <p>
                    <b><span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour2"]}`}></span></b>
                    <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span>
                  </p>
                </div>
              ))}
            </div>:
            <div className={`${css["plan-info"]} ${cssGlobal["flex-flex-start-left"]}`}>
              <div className={css["plan-info-title"]}>
                <h2>Plan Information</h2>
              </div>
              <div className={css["plan-info-planid"]}>
                <div className={css["plan-info-planid-text"]}>
                  <p>
                    <b>Plan ID:</b>
                    <br />
                    <span style={{fontSize: "90%"}}>{planID}</span>
                  </p>
                </div>
                <div className={css["plan-info-planid-button"]}>
                  <button
                    disabled={copyPlanSubmitDisabled}
                    title="Copy Plan ID"
                    onClick={() => copyID()}
                    id="copyid-button"
                    className={css["copyid-button-off"]}
                    style={copyPlanSubmitDisabled === true ? {pointerEvents: "none"}:{opacity: "100%"}}
                  >
                    <i className={`${css["fas"]} ${css["fa-copy"]} ${"fas fa-copy"}`}></i>
                    <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                  </button>
                </div>
              </div>
              <div className={css["plan-info-box"]}>
                <p>
                  <b>Uptime Duration:</b>
                  <br />
                  624 hours left</p>
              </div>
              <div className={css["plan-info-box"]}>
                <p>
                  <b>RAM:</b>
                  <br/>
                  {planRAM}GB
                </p>
              </div>
              <div className={css["plan-info-box"]}>
                <p>
                  <b>Block Storage:</b>
                  <br/>
                  {planStorage}GB
                </p>
              </div>
              <div className={css["plan-info-box"]}>
                <p>
                  <b>Created On:</b>
                  <br />
                  {planCreated}
                </p>
              </div>
              <div className={css["plan-info-box"]}>
                <p>
                  <b>Join Date:</b>
                  <br />
                  {userJoin}
                </p>
              </div>
            </div>
          }

          {/* <div className={css["analytics-box"]}>
            <h1>Plan Uptime</h1>
            <div className={css["dashboard-chart"]}>
              <canvas id="server-uptime" height="150"></canvas>
            </div>
          </div>
          <div className={css["history-box"]}>
            <h1>History</h1>
            <p>Latest Changes:</p>

            <div className={css["history-log"]}>
              <div className={css["history-log-side"]}></div>
              <div className={css["history-log-info"]}>
                <p>
                  John12
                  <br />
                  Add User
                </p>
              </div>
              <div className={css["history-log-time"]}>
                <p>
                  13th March 2021
                  <br />
                  9:04pm
                </p>
              </div>
            </div>

            <div className={css["history-log"]}>
              <div className={css["history-log-side"]}></div>
              <div className={css["history-log-info"]}>
                <p>
                  John12
                  <br />
                  Add User
                </p>
              </div>
              <div className={css["history-log-time"]}>
                <p>
                  13th March 2021
                  <br />
                  9:04pm
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
