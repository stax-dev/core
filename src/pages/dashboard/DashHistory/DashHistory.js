//React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import Button from "../../../components/button/Button";
import axios from "axios";

//External
import {
  Addons,
  LazyLoad,
  scrollReveal,
  snackbarNotification,
  newNotification,
  viewNotification,
  closeNotification,
} from "../../../components/addons/Addons";

import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";
import Navdash from "../../../components/navdash/Navdash";

//Main
import css from "./DashHistory.module.css";

//Extra
import { APIRoutes }  from "../../../components/data/APIRoutes";

export default function DashHistory() {

  //external data
  var sessionID = localStorage.getItem("sessionID");
  var planID = window.location.pathname.split("/")[1];

  //user static
  var [appTheme, setAppTheme] = useState();
  var [username, setUsername] = useState();
  var [userID, setUserID] = useState();

  //plan dynamic
  var [historyList, setHistoryList] = useState();

  /*dummy data
   var [historyList, setHistoryList] = useState([
    {
      id: 1,
      action: "USER_ADD",
      date: "2024-02-14T14:32",
      user: "Dasho",
      actionInfo: "Added user @Photon",
    },
    {
      id: 2,
      action: "EDIT_USER",
      date: "2024-05-29T01:32",
      user: "Photon",
      actionInfo: "Edited permissions for @Dasho",
    }
  ]);
  */

  document.documentElement.setAttribute("data-apptheme", appTheme);
  document.body.style.overflow = 'auto';


  useEffect(() => {
    APIRequest("all");
  });

  var userStatic = [
    APIRoutes.appTheme,
    APIRoutes.username,
  ];

  var planDynamic = [
    APIRoutes.historyList
  ];

  function APIRequest(type){
    axios.get(APIRoutes.meURL, {
      headers: {
        Authorization: `sessionID ${sessionID}`,
      },
    })
    .then(responseMe => {
      setUserID(responseMe)
      //user static
      if(type === "userStatic" || type === "all"){
        axios.all(userStatic.map(type => axios.get(APIRoutes.userURL + responseMe.data.userID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setAppTheme(response[0].data);
          setUsername(response[1].data);
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
      if(type === "planDynamic" || type === "all"){
        axios.all(userStatic.map(type => axios.get(APIRoutes.planURL + planID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setHistoryList(response[0].data.historyList)
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

  }


  function searchHistory() {
    var searchhistorybox = document.getElementById("searchhistory-box");
    var searchhistory = document.getElementById("searchhistory");
    if (searchhistory.style.transform === "scale(1)") {
      searchhistorybox.style.transform = "scale(0.4)";
      setTimeout(() => {
        searchhistory.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    } else {
      searchhistorybox.scrollTop = 0;
      searchhistory.style.transform = "scale(1)";
      searchhistorybox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
    }
  }

  window.onClick = function(closeModal){
    var searchhistory = document.getElementById("searchhistory");
    if (closeModal.target === searchhistory) {
      searchHistory();
    }
  };

  window.onKeyUp = function(closeEscape){
    var searchhistory = document.getElementById("searchhistory");
    if (closeEscape.keyCode === 27) {
      if (searchhistory.style.transform === "scale(1)") {
        searchHistory();
      }
    }
  };

  function timeFormatter(dateTimeString) {
    var originalDate = new Date(dateTimeString);
    var formatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    var formatResult = originalDate.toLocaleString("en-GB", formatOptions).toUpperCase()
      .replace(",", "")
      .replace(" AM", "AM")
      .replace(" PM", "PM")
      .replace(" 0:", " 12:");

    return formatResult;
  }

  //how many are displayed on page load
  var [historyCurrentView, setHistoryCurrentView] = useState(5);
  var [filterAction, setFilterAction] = useState(".*");
  var [filterUser, setFilterUser] = useState(".*");
  var [filterStartDate, setFilterStartDate] = useState("2023-07-17");
  var [filterEndDate, setFilterEndDate] = useState("5000-01-01");

  // setTagType("^.*" + type + ".*$");

  if(historyList){
    var historyListDisplay = [...Array(1)].map((number) => (
      historyList
      //action filter
      .filter(id => id.action.match(filterAction))
      //user filter
      .filter(id => id.user.match(filterUser))
      //date filter
      .filter(id => new Date(id.date) >= new Date(filterStartDate) && new Date(id.date) <= new Date(filterEndDate))
      //show number of max results
      .slice(0, historyCurrentView)
      //display result
      .map((list) => (
        <div className={css["history-box"]}>
          {/* <div className={css["history-action"]}>
            <p>{list.action}</p>
          </div> */}
          <div className={css["history-date"]}>
            <p>{timeFormatter(list.date)}</p>
          </div>
          <div className={css["history-user"]}>
            <p><div className={css["history-user-mobile"]}>@</div>{list.user}</p>
          </div>
          <div className={css["history-details"]}>
            <p>{list.actionInfo}</p>
          </div>
        </div>
      ))
    ));
  };

  return (
    <div className={cssGlobal["dashboard-full"]}>
      <Navdash number="6" type="nav" />
      <Addons />
      <div id="searchhistory" className={css["searchhistory"]}>
        <div id="searchhistory-box" className={css["searchhistory-box"]}>
          <h1>Filter Search</h1>
          <div className={css["searchhistory-filter"]}>
            <p>Search Action</p>
            <input type="text" placeholder="Search" />
          </div>
          <div className={css["searchhistory-filter"]}>
            <p>Member</p>
            <div className={css["searchhistory-select"]}>
              <select>
                <option>Anyone</option>
                <option>Dasho</option>
              </select>
            </div>
          </div>

          <div className={css["searchhistory-button"]}>
            <button className={css["searchhistory-button-cancel"]}
              onClick={() => searchHistory()}>
              <p>View Results</p>
            </button>
          </div>
        </div>
      </div>
      <div className={cssGlobal["dashboard-section"]}>
        <div className={css["dashboard"]}>
          <Navdash number="6" type="top" />
          <div className={css["dashboard-stretch"]}>
            {historyList ?
              <React.Fragment>
                <div className={css["history-search"]}>
                  <button onClick={() => searchHistory()}>
                    <p><i className={`${css["fas"]} ${css["fa-search"]} ${"fas fa-search"}`}></i>
                      Filter Search
                    </p>
                  </button>
                </div>

                <div className={css["history"]}>
                  <div className={css["history-box-title"]}>
                    <div className={css["history-date"]}>
                      <p>Date</p>
                    </div>
                    <div className={css["history-user"]}>
                      <p>User</p>
                    </div>
                    <div className={css["history-details"]}>
                      <p>Details</p>
                    </div>
                  </div>

                  {historyListDisplay}

                </div>
              </React.Fragment>:
              <React.Fragment>
                <div className={css["history-search"]}>
                  <button disabled style={{height: "50px", pointerEvents: "none"}}>
                  </button>
                </div>
                <div className={css["history"]}>
                  <div className={css["history-box-title"]}>
                    {/* <div className={css["history-action"]}>
                      <p>Action</p>
                    </div> */}
                    <div className={css["history-date"]}>
                      <p><span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                    </div>
                    <div className={css["history-user"]}>
                      <p><span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                    </div>
                    <div className={css["history-details"]}>
                      <p><span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                    </div>
                  </div>

                  {[...Array(4)].map((number, index) => (
                    <div key={index} className={css["history-box"]}>
                    {/* <div className={css["history-action"]}>
                      <p>{list.action}</p>
                    </div> */}
                    <div className={css["history-date"]}>
                      <p><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                    </div>
                    <div className={css["history-user"]}>
                      <p><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                    </div>
                    <div className={css["history-details"]}>
                      <p><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
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
