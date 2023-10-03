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

//import Chart from "https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js";

import "chart.js/auto";
import { defaults } from "chart.js";
import { Chart } from "react-chartjs-2";

import Navdash from "../../../components/navdash/Navdash";
import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";

//Main
import css from "./DashAnalytics.module.css";

//Extra
import { APIRoutes } from "../../../components/data/APIRoutes";

export default function DashAnalytics() {

  //user static
  var [appTheme, setAppTheme] = useState();

  //external data
  var sessionID = localStorage.getItem("sessionID");
  var planID = window.location.pathname.split("/")[1];
  //url is url/{planID}/[page] so 2nd slash

  if(appTheme === 1){
    document.documentElement.setAttribute("data-apptheme", "light");
    defaults.color = "#14191f";
  }else{
    defaults.color = "#A9A9A9";
  }
  document.body.style.overflow = 'auto';

  useEffect(() => {
    APIRequest("all");
  })

  var serverUptimeData = [
    "URL" //server uptime
  ];

  var cpuUsageData = [
    "URL" //cpu usage
  ];

  var networkTrafficData = [
    "URL" //network traffic
  ];

  function APIRequest(type, data){
    //verify session
    axios.get(APIRoutes.meURL, {
      header: {
        Authorization: `sessionID ${sessionID}`,
      }
    })
    .then(responseMe => {
      if(type === "serverUptime" || type === "all"){
        axios.all(serverUptimeData.map(url => axios.get(url)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          // Handle response
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
      if(type === "cpuUsage" || type === "all"){
        axios.all(cpuUsageData.map(url => axios.get(url)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          //handle data
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
      if(type === "networkTraffic" || type === "all"){
        axios.all(networkTrafficData.map(url => axios.get(url)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          //handle data
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
      //logout?
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

  var [analyticsDisplay, setAnalyticsDisplay] = useState(false);

  function sendAPI(type, data){
    if(type === "1day"){
      console.log("1day");
    }else if(type === "3days"){
      console.log("3days");
    }else if(type === "1week"){
      console.log("1week");
    }else if(type === "1month"){
      console.log("1month");
    }else{
      return;
    }
  }



  defaults.fontFamily = "Poppins";

  var serverUptimeGraph = (
    <Chart
      type="bar"
      data={{
        labels: ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"],
        datasets: [
          {
            tension: 0.3,
            label: "Uptime",
            font: {
              size: 14,
              famiy: "Poppins",
            },
            data: [12, 19, 31, 5, 15, 26, 9, 15],
            borderRadius: 10,
            fillOpacity: 0.6,
            borderSkipped: false,
            backgroundColor: ["#00C79A"],
          },
          {
            tension: 0.3,
            label: "Downtime",
            data: [8, 11, 23, 24, 6, 41, 18, 5],
            borderRadius: 10,
            fill: true,
            borderSkipped: false,
            backgroundColor: ["#ED4337"],
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: "easeInOut",
        },
        scales: {
          x: {
            grid: {
              display: false,
              borderColor: "#A9A9A9",
            },
            ticks: {
              font: {
                family: "Poppins",
                size: 12,
              },
            },
          },
          y: {
            grid: {
              display: true,
              lineWidth: 1,
              borderColor: "#A9A9A9",
              color: "#a9a9a9",
            },
            title: {
              text: "Percentage (%)",
              display: true,
              font: {
                family: "Poppins",
                size: 12,
              },
            },
            ticks: {
              fontColor: "#A9A9A9",
              font: {
                family: "Poppins",
                size: 12,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                family: "Poppins",
                size: 12,
                fontColor: "white",
              },
            },
          },
          tooltip: {
            enabled: false,
          },
        },
      }}
      redraw
    />
  );

  var cpuUsageGraph = (
    <Chart
      type="line"
      data={{
        labels: ["9s", "8s", "7s", "6s", "5s", "4s", "3s", "2s", "1s"],
        datasets: [
          {
            //tension: 0.3,
            label: "CPU Utilization",
            data: [12, 19, 3, 5, 15, 26, 9, 15, 20],
            borderRadius: 10,
            borderColor: "#00c79a",
            fill: true,
            showTooltips: false,
            pointRadius: 4,
            pointStyle: "circle",
            pointBackgroundColor: "#00c79a",
            pointBorderColor: "#00c79a",
            fillOpacity: 0.6,
            borderSkipped: false,
            borderWidth: 1,
            backgroundColor: [
              "rgb(0, 199, 154, 0.6)", // pri-dark3 into rgb
            ],
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 2000,
          easing: "easeInOutBounce",
        },
        scales: {
          x: {
            grid: {
              display: true,
              lineWidth: 1,
              borderColor: "#a9a9a9",
              color: "#a9a9a9",
            },
            ticks: {
              font: {
                family: "Poppins",
                size: 12,
              },
            },
          },
          y: {
            grid: {
              display: true,
              lineWidth: 1,
              borderColor: "#a9a9a9",
              color: "#a9a9a9",
            },
            title: {
              text: "Usage (%)",
              display: true,
              font: {
                family: "Poppins",
                size: 12,
              },
            },
            ticks: {
              font: {
                family: "Poppins",
                size: 12,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                family: "Poppins",
                size: 12,
                fontColor: "white",
              },
            },
          },
          tooltip: {
            enabled: false,
          },
        },
      }}
    />
  );

  var networkTrafficGraph = (
    <Chart
      type="line"
      data={{
        labels: ["9s", "8s", "7s", "6s", "5s", "4s", "3s", "2s", "1s"],
        datasets: [
          {
            //tension: 0.3,
            label: "Network Traffic",
            data: [14, 16, 13, 8, 23, 16, 19, 9, 20],
            borderRadius: 10,
            borderColor: "#00c79a",
            fill: true,
            showTooltips: false,
            pointRadius: 4,
            pointStyle: "circle",
            pointBackgroundColor: "#00c79a",
            pointBorderColor: "#00c79a",
            fillOpacity: 0.6,
            borderSkipped: false,
            borderWidth: 1,
            backgroundColor: [
              "rgb(0, 199, 154, 0.6)", // pri-dark3 into rgb
            ],
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 2000,
          easing: "easeInOutBounce",
        },
        scales: {
          x: {
            grid: {
              display: true,
              lineWidth: 1,
              borderColor: "#a9a9a9",
              color: "#a9a9a9",
            },
            ticks: {
              font: {
                family: "Poppins",
                size: 12,
              },
            },
          },
          y: {
            grid: {
              display: true,
              lineWidth: 1,
              borderColor: "#a9a9a9",
              color: "#a9a9a9",
            },
            title: {
              text: "Usage (%)",
              display: true,
              font: {
                family: "Poppins",
                size: 12,
              },
            },
            ticks: {
              font: {
                family: "Poppins",
                size: 12,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                family: "Poppins",
                size: 12,
                fontColor: "white",
              },
            },
          },
          tooltip: {
            enabled: false,
          },
        },
      }}
    />
  );

  //this isnt automation just for reduction of code
  var analyticsList = [
    {
      title: "Server Uptime",
      graph: serverUptimeGraph,
      divType: "analytics-box1",
    },
    {
      title: "CPU Usage",
      graph: cpuUsageGraph,
      divType: "analytics-box2",
    },
    {
      title: "Network Traffic",
      graph: networkTrafficGraph,
      divType: "analytics-box3",
    }
  ]
  return (
    <div className={cssGlobal["dashboard-full"]}>
      <Navdash number="4" type="nav" />
      <Addons />
      <div className={cssGlobal["dashboard-section"]}>
        <div className={css["dashboard"]}>
          <Navdash number="4" type="top" />
          <div className={css["dashboard-stretch"]}>
            <div className={`${css["analytics"]} ${cssGlobal["flex-center-left"]}`}>
              {analyticsDisplay === true ?
                ([...Array(1)].map((number) => (
                  analyticsList.map((list) => (
                  <div key={list.title} className={css[list.divType]}>
                    <h1>{list.title}</h1>
                    <div className={css["dashboard-chart"]}>
                      <div className={css["dashboard-chart-box"]}>
                        {list.graph}
                      </div>
                    </div>
                    <div className={`${css["analytics-view"]} ${cssGlobal["flex-center-left"]}`}>
                      <button onClick={() => sendAPI("1day")} className={css["analytics-view-box-active"]}>
                        <p>1 day</p>
                      </button>
                      <button onClick={() => sendAPI("3days")} className={css["analytics-view-box"]}>
                        <p>3 days</p>
                      </button>
                      <button onClick={() => sendAPI("1week")} className={css["analytics-view-box"]}>
                        <p>1 week</p>
                      </button>
                      <button onClick={() => sendAPI("1month")} className={css["analytics-view-box"]}>
                        <p>1 month</p>
                      </button>
                    </div>
                  </div>
                  ))
                ))):
                ([...Array(3)].map((number, index) => (
                  <div key={index} className={css[`analytics-box${index + 1}`]}>
                    <h1><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></h1>
                    <div className={css["dashboard-chart"]}>
                      <div className={css["dashboard-chart-box"]}>
                      </div>
                    </div>
                    <div className={`${css["analytics-view"]} ${cssGlobal["flex-center-left"]}`}>
                      {[...Array(4)].map((number, index) => (
                        <button key={index} disabled style={{pointerEvents: "none", height: "25px"}} className={css["analytics-view-box"]}>
                          {number}
                        </button>
                      ))}
                    </div>
                  </div>
                )))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
