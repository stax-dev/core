import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import Button from "../../../components/button/Button";
import axios from "axios";

//External
import {
  Addons,
  timeFormatter,
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
import css from "./DashBilling.module.css";

//Extra
import bannerColoursList from "../../../components/data/bannerColours";
import { APIRoutes } from "../../../components/data/APIRoutes";

export default function DashBilling() {

  //user static
  var [appTheme, setAppTheme] = useState();
  var [username, setUsername] =  useState();
  var [userID, setUserID] =  useState();
  var [bannerID, SetBannerID] =  useState();
  var [userBalance, SetuserBalance] = useState();
  var [userJoin, SetUserJoin] = useState();

  //static plan data
  var [planName, setPlanName] = useState();
  var [planCreated, setPlanCreated] = useState();
  var [planRenewal, setPlanRenewal] = useState();
  var [planExpiry, setPlanExpiry] = useState();
  var [planDeletion, setPlanDeletion] = useState();
  var [planStorage, SetPlanStorage] = useState();
  var [planRAM, setPlanRAM] = useState();
  var [planOwnerID, SetPlanOwnerID] = useState();
  var [autoRenew, SetAutoRenew] = useState();

   //dynamic plan data
  var [planStatus, setPlanStatus] = useState(); //0 expired, 1 active
  var [chatroomPing, setChatroomPing] = useState(); //0 for no new message, 1 for unread message(s).onst appTheme = 0
  var [planUptime, setPlanUptime] = useState() //hours

  //external data
  var sessionID = localStorage.getItem("sessionID");
  var planID = window.location.pathname.split("/")[1];

   //dummy data
   
   var [appTheme, setAppTheme] = useState();
    var [username, setUsername] = useState("Dasho");
    var [userID, setUserID] = useState("1234567890");
    var [bannerID, SetBannerID] = useState("red");
    var [userBalance, SetuserBalance] = useState(10.45);
    var [userJoin, SetUserJoin] = useState("2020-06-10");
    var [planName, setPlanName] = useState("1234567890123456");
    var planID = "1234567890123456";
    var [planCreated, setPlanCreated] = useState("2020-06-08");
    var [planRenewal, setPlanRenewal] = useState("2021-06-08");
    var [planExpiry, setPlanExpiry] = useState("2022-06-08");
    var [planDeletion, setPlanDeletion] = useState("2023-06-08");
    var [planStorage, SetPlanStorage] = useState(150);
    var [planRAM, setPlanRAM] = useState(5);
    var [planOwnerID, SetPlanOwnerID] = useState("1234567890");
    var [autoRenew, SetAutoRenew] = useState(true);
    var [planStatus, setPlanStatus] = useState(0); //0 expired, 1 active
    var [chatroomPing, setChatroomPing] = useState(0); //0 for no new message, 1 for unread message(s).onst appTheme = 0
    var [planUptime, setPlanUptime] = useState(825) //hours
   //*/

  document.documentElement.setAttribute("data-apptheme", appTheme);
  document.body.style.overflow = 'auto';

  //url is url/{planID}/[page] so 2nd slash

  // var planExpiry = new Date(new Date(planRenewal).setFullYear(new Date(planRenewal).getFullYear() + 1)).toISOString().split("T")[0];
  // var planDeletion = new Date(new Date(planRenewal).setFullYear(new Date(planRenewal).getFullYear() + 2)).toISOString().split("T")[0];

  useEffect(() => {
    APIRequest("all");
  });

  var userStatic = [
    APIRoutes.appTheme,
    APIRoutes.username,
    APIRoutes.bannerID,
    APIRoutes.userBalance,
    APIRoutes.userJoin,
  ];

  var planStatic = [
    APIRoutes.planName,
    APIRoutes.planID,
    APIRoutes.planCreated,
    APIRoutes.planRenewal,
    APIRoutes.planExpiry,
    APIRoutes.planDeletion,
    APIRoutes.planStorage,
    APIRoutes.planRAM,
    APIRoutes.autoRenew,
  ];

  var planDynamic = [
    APIRoutes.planStatus,
    APIRoutes.chatroomPing,
    APIRoutes.planUptime,
  ];

  function APIRequest(type){
    //verify session
    axios.get(APIRoutes.meURL, {
      headers: {
        Authorization: `sessionID ${sessionID}`,
      },
    })
    .then(responseMe => {
      setUserID(responseMe.data.userID);
      //user data
      if(type === "userStatic" || type === "all"){
        axios.all(userStatic.map(type => axios.get(APIRoutes.userURL + responseMe.data.userID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setAppTheme(response[0].data);
          setUsername(response[1].data);
          SetBannerID(response[2].data);
          SetuserBalance(response[3].data);
          SetUserJoin(response[4].data);
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
      //plan static
      if(type === "planStatic" || type === "all"){
        axios.all(planStatic.map(type => axios.get(APIRoutes.planURL + planID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setPlanName(response[0].data);
          setPlanCreated(response[1].data);
          setPlanRenewal(response[2].data);
          setPlanExpiry(response[3].data);
          setPlanDeletion(response[4].data);
          SetPlanStorage(response[5].data);
          setPlanRAM(response[6].data);
          SetAutoRenew(response[7].data);
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
      //plan dynamic
      if(type === "planDynamic" || type === "all"){
        axios.all(planDynamic.map(type => axios.get(APIRoutes.planURL + planID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setPlanStatus(response[0].data);
          setChatroomPing(response[1].data);
          setPlanUptime(response[2].data);
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
  }

  function sendAPI(type, data){
    if(type === "renewPlan"){
      SetRenewPlanSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          planStatus: 1,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planDynamic");
          snackbarNotification(1, "Plan Renewed");
        }else{
          snackbarNotification(3, "Plan is already renewed");
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
        SetRenewPlanSubmitDisabled(false);
      });
    }else if(type === "autoRenew"){
      SetAutoRenewSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          autoRenew: data,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planDynamic");
          snackbarNotification(1, "Auto Renewal Updated");
          SetAutoRenew(response.data.autoRenew);
        }else{
          snackbarNotification(3, "Error Updating Auto Renewal");
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
        SetAutoRenewSubmitDisabled(false);
      });
    }else if(type === "changePlan"){
      console.log("changePlan");
    }else if(type === "deletePlan"){
      SetDeletePlanSubmitDisabled(true);
      axios.delete('link HERE/' + data,
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planDynamic");
          snackbarNotification(1, "Plan Deleted");
          deletePlan();
        }else{
          snackbarNotification(3, "Error deleting plan");
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
        SetDeletePlanSubmitDisabled(false);
      });
    }else{
      return;
    }
  }

  var [autoRenewSubmitDisabled, SetAutoRenewSubmitDisabled] = useState(false);

  var planTypeID = "s1";
  if (planTypeID === "s1") {
    var planOption1 = "s1";
    var planOption2 = "s3";
  } else if (planTypeID === "s2") {
    var planOption1 = "s1";
    var planOption2 = "s3";
  } else if (planTypeID === "s3") {
    var planOption1 = "s1";
    var planOption2 = "s2";
  } else if (planTypeID === "v1") {
    var planOption1 = "v2";
    var planOption2 = "v3";
  } else if (planTypeID === "v2") {
    var planOption1 = "v1";
    var planOption2 = "v3";
  } else if (planTypeID === "v3") {
    var planOption1 = "v1";
    var planOption2 = "v2";
  }

  var newPlanChoice = planTypeID;
  var hostingPlan = 'fix later';
  var hostingInfo = 'fix later';
  var extraAmount1 = 'fix later';
  var extraAmount2 = 'fix later';
  var extraAmount = 'fix later';
  var refundAmount = 'fix later';


  var renewplanbox = document.getElementById("renewplan-box");
  var renewplan = document.getElementById("renewplan");

  var changeplanbox = document.getElementById("changeplan-box");
  var changeplan = document.getElementById("changeplan");

  var deleteplanbox = document.getElementById("deleteplan-box");
  var deleteplan = document.getElementById("deleteplan");

  function renewPlan() {
    var renewplanbox = document.getElementById("renewplan-box");
    var renewplan = document.getElementById("renewplan");
    if (renewplan.style.transform === "scale(1)") {
      renewplanbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        renewplan.style.transform = "scale(0)";
        SetRenewPlanSubmitDisabled(true);
      }, 150);
      document.body.style.overflow = 'auto';
    } else {
      renewplanbox.scrollTop = 0;
      renewplan.style.transform = "scale(1)";
      renewplanbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
    }
  }

  function changePlan() {
    var changeplanbox = document.getElementById("changeplan-box");
    var changeplan = document.getElementById("changeplan");
    if (changeplan.style.transform === "scale(1)") {
      changeplanbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        changeplan.style.transform = "scale(0)";
      }, 150);
      changePlanOff();
      setTimeout(() => {
        changePlanChoose();
      }, 150);
      document.body.style.overflow = 'auto';
    } else {
      changeplanbox.scrollTop = 0;
      changeplan.style.transform = "scale(1)";
      changeplanbox.style.transform = "scale(1)";
      document.getElementById("changeplan-plans-box1").style.border =
        "1px solid var(--theme3)";
      document.getElementById("changeplan-plans-box2").style.border =
        "1px solid var(--theme3)";
      document.getElementById("changeplan-plans-option1").innerHTML = "";
      document.getElementById("changeplan-plans-option2").innerHTML = "";
      //note: button trouble - start
      document
        .getElementById("changeplan-button-submit")
        .classList.replace(
          css["changeplan-button-submit"],
          css["changeplan-button-submit-off"]
        );
      newPlanChoice = planTypeID;
      //note: button trouble - end
      document.body.style.overflow = 'hidden';
    }
  }

  function deletePlan() {
    var deleteplanbox = document.getElementById("deleteplan-box");
    var deleteplan = document.getElementById("deleteplan");
    if (deleteplan.style.transform === "scale(1)") {
      deleteplanbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        deleteplan.style.transform = "scale(0)";
        SetDeletePlanSubmitDisabled(true);
      }, 150);
      document.body.style.overflow = 'auto';
    } else {
      deleteplanbox.scrollTop = 0;
      deleteplan.style.transform = "scale(1)";
      deleteplanbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
    }
  }

  window.onclick = function (closeModal) {
    if (closeModal.target === renewplan) {
      renewPlan();
    } else if (closeModal.target === changeplan) {
      changePlan();
    } else if (closeModal.target === deleteplan) {
      deletePlan();
    }
  };

  window.onkeyup = function (closeEscape) {
    if (closeEscape.keyCode === 27) {
      if (renewplan.style.transform === "scale(1)") {
        renewPlan();
      } else if (changeplan.style.transform === "scale(1)") {
        changePlan();
      } else if (deleteplan.style.transform === "scale(1)") {
        deletePlan();
      }
    }
  };

  var [renewPlanSubmitDisabled, SetRenewPlanSubmitDisabled] = useState(true);

  function changePlanOn() {
    document
      .getElementById("changeplan-button-final")
      .classList.add(css["changeplan-button-submit"]);
    document
      .getElementById("changeplan-button-final")
      .classList.remove(css["changeplan-button-submit-off"]);
    document.getElementById("changeplan-button-final").disabled = false;
    document
      .getElementById("changeplan-checkbox")
      .classList.add(css["changeplan-checkbox-on"]);
    document
      .getElementById("changeplan-checkbox")
      .classList.remove(css["changeplan-checkbox-off"]);
  }

  function changePlanOff() {
    document
      .getElementById("changeplan-button-final")
      .classList.add(css["changeplan-button-submit-off"]);
    document
      .getElementById("changeplan-button-final")
      .classList.remove(css["changeplan-button-submit"]);
    document.getElementById("changeplan-button-final").disabled = true;
    document
      .getElementById("changeplan-checkbox")
      .classList.add(css["changeplan-checkbox-off"]);
    document
      .getElementById("changeplan-checkbox")
      .classList.remove(css["changeplan-checkbox-on"]);
  }

  function planChoice1() {
    document.getElementById("changeplan-plans-option1").innerHTML =
      '<i class="' + css["fas"] + ' fas fa-check-circle"></i>';
    document.getElementById("changeplan-plans-option2").innerHTML = "";
    document.getElementById("changeplan-plans-box1").style.border =
      "1px solid var(--accent)";
    document.getElementById("changeplan-plans-box2").style.border =
      "1px solid var(--theme3)";
    document.getElementById("changeplan-button-submit").disabled = false;
    document
      .getElementById("changeplan-button-submit")
      .classList.add(css["changeplan-button-submit"]);
    document
      .getElementById("changeplan-button-submit")
      .classList.remove(css["changeplan-button-submit-off"]);
    newPlanChoice = planOption1;
    //note: var trouble - start
    document.getElementById("changeplan-option1").style.display =
      "inline-block";
    document.getElementById("changeplan-option2").style.display = "none";
    document.getElementById("changeplan-option1-cost").style.display = "block";
    document.getElementById("changeplan-option2-cost").style.display = "none";
    //note: var trouble - end
  }

  function planChoice2() {
    document.getElementById("changeplan-plans-option2").innerHTML =
      '<i class="' + css["fas"] + ' fas fa-check-circle"></i>';
    document.getElementById("changeplan-plans-option1").innerHTML = "";
    document.getElementById("changeplan-plans-box2").style.border =
      "1px solid var(--accent)";
    document.getElementById("changeplan-plans-box1").style.border =
      "1px solid var(--theme3)";
    document.getElementById("changeplan-button-submit").disabled = false;
    document
      .getElementById("changeplan-button-submit")
      .classList.add(css["changeplan-button-submit"]);
    document
      .getElementById("changeplan-button-submit")
      .classList.remove(css["changeplan-button-submit-off"]);
    newPlanChoice = planOption2;
    // note: var trouble - start
    document.getElementById("changeplan-option2").style.display =
      "inline-block";
    document.getElementById("changeplan-option1").style.display = "none";
    document.getElementById("changeplan-option2-cost").style.display = "block";
    document.getElementById("changeplan-option1-cost").style.display = "none";
    // note: var trouble - end
  }

  var [deletePlanSubmitDisabled, SetDeletePlanSubmitDisabled] = useState(true);

  function changePlanCheckout() {
    //note: button trouble - start
    if (newPlanChoice === planTypeID) {
      return;
    } else {
      document
        .getElementById("changeplan-box")
        .classList.replace(css["changeplan-box"], css["changeplan-box-final"]);
    }
    // note: button trouble - end
  }

  function changePlanChoose() {
    document
      .getElementById("changeplan-box")
      .classList.replace(css["changeplan-box-final"], css["changeplan-box"]);
    changePlanOff();
  }

  return (
    <div className={cssGlobal["dashboard-full"]}>
      <Navdash number="8" type="nav" />
      <Addons />
      <div id="renewplan" className={css["renewplan"]}>
        <div id="renewplan-box" className={css["renewplan-box"]}>
          <h1>Renew Plan</h1>
          <p>
            This plan has expired. Please renew the plan to continue using it.
            The amount will be deducted from your account wallet.
          </p>
          <div className={css["renewplan-info"]}>
            <p>
              <b>Hosting Type:</b> <br />
            </p>
            <p>
              <b>Plan Type:</b> <br />
            </p>
            <p>
              <b>Plan Cost:</b> <br />
            </p>
          </div>
            <p>
              <span className={css["red-text"]}>
                <i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${"fas fa-exclamation-circle"}`}></i>
              </span>
              Not enough account balance! Please topup your account wallet and
              try again
            </p>
            <div className={css["renewplan-confirm"]}>
              <p>
                <span id="renewplan-checkbox" className={renewPlanSubmitDisabled === true ? (css["renewplan-checkbox-off"]):(css["renewplan-checkbox-on"])}>
                  {renewPlanSubmitDisabled === true ?
                    <i className={`${css["far"]} ${css["fa-square"]} ${"far fa-square"}`} onClick={() => SetRenewPlanSubmitDisabled(false)}></i>:
                    <i className={`${css["fas"]} ${css["fa-check-square"]} ${"fas fa-check-square"}`} onClick={() => SetRenewPlanSubmitDisabled(true)}></i>
                  }
                </span>
                I want to renew this plan
              </p>
            </div>
          <div className={css["renewplan-buttons"]}>
              <div className={css["renewplan-buttons-box"]}>
                <button onClick={() => sendAPI("renewPlan")} className={renewPlanSubmitDisabled === true ? (css["renewplan-button-submit-off"]):(css["renewplan-button-submit"])} disabled={renewPlanSubmitDisabled}>
                  <p>Renew Plan Now</p>
                </button>
              </div>
            <div className={css["renewplan-buttons-box"]}>
              <button className={css["renewplan-button-cancel"]}
                onClick={() => renewPlan()}>
                <p>Cancel</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="changeplan" className={css["changeplan"]}>
        <div id="changeplan-box" className={css["changeplan-box"]}>
          <div className={css["changeplan-choosepage"]}>
            <h1>Change Plan</h1>
            <p>
              Changing plan is only avaliable within the plans of{" "} You are not able to
              change hosting type.
            </p>
            <div className={css["changeplan-split"]}>
              <div className={css["changeplan-info-section"]}>
                <div className={css["changeplan-info"]}>
                  <p>
                    <b>Hosting Type:</b>
                    <br />
                  </p>
                  <p>
                    <b>Current Plan Type:</b>
                    <br />
                  </p>
                  <p>
                    <b>Current Plan Duration:</b>
                    <br />
                    {planUptime} hours
                  </p>
                </div>
                <p>
                  <span className={css["changeplan-info-info"]}>
                    <span className={css["main-colour-text"]}>
                      <i className={css["fas fa-info-circle"]}></i>
                    </span>
                    Once changed, your new plan will
                    <span className={css["main-colour-text"]}>
                      {" "}
                      continue from the remaining hours{" "}
                    </span>
                    you previously had. The new plan will return to its
                    <span className={css["red-text"]}>
                      {" "}
                      full cost in the next renewal.
                    </span>
                  </span>
                </p>
              </div>
              <div className={css["changeplan-plans"]}>
                <span className={css["changeplan-plans-text"]}>
                  <p>
                    Please select the new plan. Pricing calculations will be
                    done at checkout.
                  </p>
                </span>
                <div className={css["changeplan-plans-list"]}>
                  <div id="changeplan-plans-box1" className={css["changeplan-plans-box"]}
                    onClick={() => planChoice1()}>
                    <div className={css["changeplan-plans-title"]}>
                      <h1></h1>
                    </div>
                    <div className={css["changeplan-plans-price"]}>
                      <h1>
                      </h1>
                    </div>
                    <div className={css["changeplan-plans-info"]}>
                      <p> RAM
                        <br /> Storage
                      </p>
                    </div>
                    <div className={css["changeplan-plans-choice"]}>
                      <span id="changeplan-plans-option1"></span>
                    </div>
                  </div>

                  <div id="changeplan-plans-box2" className={css["changeplan-plans-box"]}
                    onClick={() => planChoice2()}>
                    <div className={css["changeplan-plans-title"]}>
                      <h1></h1>
                    </div>
                    <div className={css["changeplan-plans-price"]}>
                      <h1>
                      </h1>
                    </div>
                    <div className={css["changeplan-plans-info"]}>
                      <p> RAM
                        <br /> Storage
                      </p>
                    </div>
                    <div className={css["changeplan-plans-choice"]}>
                      <span id="changeplan-plans-option2"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className={css["changeplan-moreinfo"]}>
              <p>
                Want more info? View all{" "}features{" "}
                <span className={css["underline-text"]}>
                  <a>
                    here
                  </a>
                </span>
              </p>
            </span>
            <div className={css["changeplan-buttons"]}>
              <div className={css["changeplan-buttons-box"]}>
                <button className={css["changeplan-button-cancel"]}
                  onClick={() => changePlan()}>
                  <p>Cancel</p>
                </button>
              </div>
              <div className={css["changeplan-buttons-box"]}>
                <button id="changeplan-button-submit"
                  onClick={() => changePlanCheckout()} className={css["changeplan-button-submit-off"]}>
                  <p>
                    Checkout<i className={css["fas fa-arrow-right"]}></i>
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div className={css["changeplan-finalpage"]}>
            <h1>Change Plan</h1>
            <p>Please read the changes before confirming your new plan</p>
            <div className={css["changeplan-info"]}>
              <p>
                <b>Hosting Type:</b>
                <br />
              </p>
              <p>
                <b>Plan Changes:</b>
                <br />
                <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                {/* note: var trouble - start */}
                <span id="changeplan-option1">
                </span>
                <span id="changeplan-option2">
                </span>
                {/* note: var trouble - end */}
              </p>
              {/* note: var trouble - start */}
              <span id="changeplan-option1-cost">
                {extraAmount1 >= 0 ? (
                  <p>
                    <b>Refund Amount:</b>
                    <br />
                    {extraAmount1.toFixed(2)}
                  </p>
                ) : (
                  <p>
                    <b>Topup Amount:</b>
                    <br />
                    {(extraAmount1 * -1).toFixed(2)}
                  </p>
                )}
              </span>
              <span id="changeplan-option2-cost">
                {extraAmount2 >= 0 ? (
                  <p>
                    <b>Refund Amount:</b>
                    <br />
                    {extraAmount2.toFixed(2)}
                  </p>
                ) : (
                  <p>
                    <b>Topup Amount:</b>
                    <br />
                    {(extraAmount2 * -1).toFixed(2)}
                  </p>
                )}
              </span>
              {/* note: var trouble - end */}
            </div>
            <p>
              <span className={css["changeplan-info-info"]}>
                Your new plan will start with{" "}
                <span className={css["main-colour-text"]}>
                  {planUptime} hours.
                </span>
                {extraAmount > 0 ? (
                  <span>
                    {" "}
                    Since you are downgrading plans, you will be{" "}
                    <span className={css["main-colour-text"]}>
                      refunded the remaining balance
                    </span>{" "}
                    from the plan change
                  </span>
                ) : (
                  <span>
                    {" "}
                    Since you are upgrading plans,{" "}
                    <span className={css["red-text"]}>
                      additional cost will be required
                    </span>{" "}
                    from your account wallet to complete the plan change
                  </span>
                )}
              </span>
            </p>
            <div className={css["changeplan-confirm"]}>
              <p>
                <span id="changeplan-checkbox" className={css["changeplan-checkbox-off"]}>
                  <i className={`${css["far"]} ${css["fa-square"]} ${"far fa-square"}`}
                    onClick={() => changePlanOn()}></i>
                  <i className={`${css["fas"]} ${css["fa-check-square"]} ${"fas fa-check-square"}`}
                    onClick={() => changePlanOff()}></i>
                </span>
                I want to change my plan
              </p>
            </div>
            <div className={css["changeplan-buttons2"]}>
              <div className={css["changeplan-buttons-box"]}>
                <button className={css["changeplan-button-cancel"]}
                  onClick={() => changePlanChoose()}>
                  <p>Return</p>
                </button>
              </div>
              <div className={css["changeplan-buttons-box"]}>
                <button id="changeplan-button-final" className={css["changeplan-button-submit-off"]}
                  disabled
                >
                  <p>Change Now</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="deleteplan" className={css["deleteplan"]}>
        <div id="deleteplan-box" className={css["deleteplan-box"]}>
          <h1>Delete Plan</h1>
          <p>
            <span className={css["red-text"]}>
              <i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${"fas fa-exclamation-circle"}`}></i>
              This action cannot be reversed!
            </span><br/>
            Beware! Once confirmed, all plan data including server files and snapshots will be deleted forever!
          </p>
          <div className={css["deleteplan-info"]}>
            <p>
              <b>Plan Name:</b> <br />
              {planName}
            </p>
            <p>
              <b>Plan Duration:</b> <br />
              {planUptime} hours
            </p>
            <p>
              <b>Refund Amount:</b> <br />
            </p>
          </div>
          <p>
            You will be refunded the remaining hours left of the plan. The
            amount will be refunded to your account wallet.
          </p>
          <div className={css["deleteplan-confirm"]}>
            <p>
              <span id="deleteplan-checkbox" className={deletePlanSubmitDisabled === true ? (css["deleteplan-checkbox-off"]):(css["deleteplan-checkbox-on"])}>
                {deletePlanSubmitDisabled === true ?
                  <i className={`${css["far"]} ${css["fa-square"]} ${"far fa-square"}`} onClick={() => SetDeletePlanSubmitDisabled(false)}></i>:
                  <i className={`${css["fas"]} ${css["fa-check-square"]} ${"fas fa-check-square"}`} onClick={() => SetDeletePlanSubmitDisabled(true)}></i>
                }
              </span>
              I want to delete this plan permanently
            </p>
          </div>

          <div className={css["deleteplan-buttons"]}>
            <div className={css["deleteplan-buttons-box"]}>
              <button className={css["deleteplan-button-cancel"]}
                onClick={() => deletePlan()}>
                <p>Cancel</p>
              </button>
            </div>
            <div className={css["deleteplan-buttons-box"]}>
              <button onClick={() => sendAPI("deletePlan")} className={deletePlanSubmitDisabled === true? (css["deleteplan-button-submit-off"]):(css["deleteplan-button-submit"])} disabled={deletePlanSubmitDisabled}>
                <p>Delete Plan Now</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={cssGlobal["dashboard-section"]}>
        <div className={css["dashboard"]}>
          <Navdash number="8" type="top" />
          <div className={css["dashboard-stretch"]}>
            <div className={css["billing-split"]}>
              <div className={css["billing-info"]}>
                {userBalance === null || userBalance === undefined ?
                  <div className={`${css["billing-card"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["billing-card-line1"]}>
                      <div className={css["billing-card-line1-box1"]}>
                        <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                      </div>
                      <div className={css["billing-card-line1-box2"]}>
                      </div>
                    </div>
                    <div className={css["billing-card-line2"]}>
                      <p><span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                    </div>
                    <div className={css["billing-card-line3"]}>
                      <p><span style={{height: "50px"}} className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                    </div>
                    <div className={css["billing-card-line4"]}>
                      <p>
                        <span style={{marginLeft: "auto"}} className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour1"]}`}></span>
                      </p>
                    </div>
                  </div>:
                  <div className={`${css["billing-card"]} ${cssGlobal["flex-center-left"]}`}
                    style={{
                      // background: bannerColoursList.find(colour => colour.id === bannerID).background,
                      background: "repeating-linear-gradient(45deg," +
                        bannerColoursList.find(colour => colour.name === bannerID).background + "," +
                        bannerColoursList.find(colour => colour.name === bannerID).background + " 100px," +
                        bannerColoursList.find(colour => colour.name === bannerID).backgroundHover + " 100px," +
                        bannerColoursList.find(colour => colour.name === bannerID).backgroundHover +  " 200px)",
                      color: bannerColoursList.find(colour => colour.name === bannerID).text
                    }}>
                    {/* <div className={css["billing-card-backdrop"]}><div className={css["billing-card-backdrop-box1"]}></div><div> */}
                    <div className={css["billing-card-line1"]}>
                      <div className={css["billing-card-line1-box1"]}>
                        <p>Stax Dev Suite</p>
                      </div>
                      <div className={css["billing-card-line1-box2"]}>
                        <img
                          alt="logo-wallet"
                          src="https://cdn.st.ax/v2/logo.svg"
                        />
                      </div>
                    </div>
                    <div className={css["billing-card-line2"]}>
                      <p>Account Balance</p>
                    </div>
                    <div className={css["billing-card-line3"]}>
                      <p>€{userBalance.toFixed(2)}</p>
                    </div>
                    <div className={css["billing-card-line4"]}>
                      <p>
                        <i className={`${css["fas"]} ${css["fa-wallet"]} ${"fas fa-wallet"}`}></i>
                        Wallet | {username}
                      </p>
                    </div>
                  </div>
                }
                {/* <div className={css["account-wallet"]}>
                  <div className={css["account-wallet-title"]}>
                      <p><b>Account Wallet</b></p>
                  </div>
                  <div className={css["account-wallet-icon"]}>

                  </div>
                  <div className={css["account-wallet-balance"]}>
                      <h1><i className={`${css["fas"]} ${css["fa-wallet"]}  ${"fas fa-wallet"}`}></i> {hostingInfo('currency','short')} {userBalance.toFixed(2)}</h1>
                      <p>{hostingInfo('currency','long')} Currency</p>
                  </div>
                  <div className={css["account-wallet-name"]}>
                      <p>{username}</p>
                  </div>
                </div> */}
                {planStatus === null || planStatus === undefined || !planID || !planRAM || !planStorage || !planOwnerID || !planRenewal ?
                  <div className={`${css["billing-info-plan"]} ${cssGlobal["flex-flex-start-left"]}`}>
                    <div className={css["billing-info-plan-title"]}>
                      <h1><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></h1>
                    </div>
                    {[...Array(8)].map((number, index) => (
                      <div key={index} className={css["billing-info-plan-box"]}>
                        <p>
                        <span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span>
                        <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span>
                        </p>
                      </div>
                    ))}
                    <div className={css["billing-info-plan-footer"]}>
                      <p>
                        <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour2"]}`}></span>
                        <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour2"]}`}></span>
                        <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour2"]}`}></span>
                        <span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span>
                      </p>
                    </div>
                  </div>:
                  <div className={`${css["billing-info-plan"]} ${cssGlobal["flex-flex-start-left"]}`}>
                    <div className={css["billing-info-plan-title"]}>
                      <h1>{planName}</h1>
                    </div>
                    <div className={css["billing-info-plan-box"]}>
                      <p>
                        <b>Plan Status:</b>
                        <br />
                        {planStatus === 0 ? (
                          <span className={css["red-text"]}>
                            Expired<i className={`${css["fas"]} ${css["fa-times-circle"]}  ${"fas fa-times-circle"}`}></i>
                          </span>
                        ):(
                          <span className={css["main-colour-text"]}>
                            Active<i className={`${css["fas"]} ${css["fa-check-circle"]}  ${"fas fa-check-circle"}`}></i>
                          </span>
                        )}
                      </p>
                    </div>
                    <div className={css["billing-info-plan-box"]}>
                      <p><b>Plan ID:</b><br />{planID}</p>
                    </div>
                    <div className={css["billing-info-plan-box"]}>
                      <p><b>Droplet RAM:</b><br />5GB</p>
                    </div>
                    <div className={css["billing-info-plan-box"]}>
                      <p><b>Block Storage:</b><br />120GB</p>
                    </div>
                    <div className={css["billing-info-plan-box"]}>
                      <p><b>Time Left:</b><br />
                        {planUptime === 0 ? (
                          <span className={css["red-text"]}>
                            {planUptime} hours left
                          </span>
                        ):(
                          <span className={css["main-colour-text"]}>
                            {planUptime} hours left
                          </span>
                        )}
                      </p>
                    </div>
                    <div className={css["billing-info-plan-box"]}>
                      <p><b>Plan Owner:</b><br />Hudson101</p>
                    </div>
                    <div className={css["billing-info-plan-box"]}>
                      <p><b>Last Renewal:</b><br />{timeFormatter("short", planRenewal)}</p>
                    </div>
                    <div className={css["billing-info-plan-box"]}>
                      <p><b>Expiration Date:</b><br />
                        <span className={planStatus === 0 ? (css["red-text"]):(css["main-colour-text"])}>{timeFormatter("short", planExpiry)}</span>
                      </p>
                    </div>
                    <div className={css["billing-info-plan-footer"]}>
                      <p><i className={`${css["fas"]} ${css["fa-info-circle"]}  ${"fas fa-info-circle"}`}></i>
                        All plans have an expiration date{" "}
                        <span className={css["red-text"]}>exactly 1 year after </span>
                        their latest renewal or purchase date. However, the expiry
                        date changes when the plan duration is completed
                      </p>
                    </div>
                  </div>
                }
              </div>
              <div className={css["billing-settings"]}>
                {planStatus !== null && planStatus !== undefined && planStatus === 0 &&  (
                  <div className={css["renew-plan"]}>
                    <h1>Plan Expired</h1>
                    <p>
                      This plan has expired. Please renew the plan to continue
                      using it. Please note the plan will be deleted exactly 1
                      year after the expiration date
                    </p>
                    <p>Expired On:{" "}
                      <span className={css["red-text"]}>{timeFormatter("short", planExpiry)}</span>
                      <br />
                      Deleted On:{" "}
                      <span className={css["red-text"]}>{timeFormatter("short", planDeletion)}</span>
                    </p>
                    <button className={css["renew-plan-button"]} onClick={() => renewPlan()}>
                      <p>Renew Plan</p>
                    </button>
                  </div>
                )}
                {autoRenew === null || autoRenew === undefined || planStatus === null || planStatus === undefined ?
                  <div className={css["billing-settings-box"]}>
                    <h1><span style={{height: "25px", marginBottom: "15px"}} className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span></h1>
                    {[...Array(3)].map((number, index) => (
                      <React.Fragment key={index}>
                        <p>
                          <span style={{marginBottom: "10px"}} className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span>
                          <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour2"]}`}></span>
                          <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour2"]}`}></span>
                          <span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span>
                        </p>
                        <button disabled style={{pointerEvents: "none", backgroundColor: "var(--theme2)", height: "50px"}} className={css["change-plan-button"]}>
                        </button>
                      </React.Fragment>
                    ))}
                  </div>:
                  <div className={css["billing-settings-box"]}>
                    <h1>Billing Settings</h1>
                    <p><b>Autorenew</b><br />
                      When enabled, the plan will be automatically renewed after
                      it has expired. The cost will be deducted from your account
                      wallet.
                    </p>
                    <button className={
                        autoRenew === true
                          ? css["autorenew-on"]
                          : css["autorenew-off"]
                      } id="autorenew"
                      onClick={() => {
                        autoRenew === true
                          ? sendAPI("autoRenew", false)
                          : sendAPI("autoRenew", true);
                      }}
                      style={autoRenewSubmitDisabled === true ? {opacity: "60%", cursor: "default"}:{opacity: "100%"}}
                      disabled={autoRenewSubmitDisabled}
                      >
                      <div className={css["autorenew-button"]}>
                        <p>
                          <span className={css["autorenew-value-on"]}>On</span>
                          <span className={css["autorenew-value-off"]}>Off</span>
                        </p>
                      </div>
                    </button>
                    <p>
                      <b>Change Plan</b>
                      <br />
                      Changing plan is only avaliable within the plans of{" "}
                      You are not able to
                      change hosting type.
                    </p>
                    <button className={css["change-plan-button"]} onClick={() => changePlan()}>
                      <p>Change Plan</p>
                    </button>
                    <p>
                      <b>Delete Plan</b>
                      <br />
                      This action cannot be reversed. All files, backups and data
                      from the plan will be permanently deleted!
                    </p>
                    <button className={css["delete-plan-button"]} onClick={() => deletePlan()}>
                      <p><b>Delete Plan</b></p>
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
