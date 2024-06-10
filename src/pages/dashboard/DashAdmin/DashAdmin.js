//React
import React, { useEffect, useState } from "react";
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
import css from "./DashAdmin.module.css";

//Extra
import permissionsList from "../../../components/data/userActions.json";
import { APIRoutes } from "../../../components/data/APIRoutes";

export default function DashAdmin() {

    //external data
    var sessionID = localStorage.getItem("sessionID");


    if(appTheme === 1){
      document.documentElement.setAttribute("data-apptheme", "light");
    }
    document.body.style.overflow = 'auto';

  //user data
  var [username, setUsername] = useState();
  var [userID, setuserID] = useState();
  var [permission, setPermission] = useState();
  var [appTheme, setAppTheme] = useState();

  //plan dynamic data
  var [serverStatus, setServerStatus] = useState(); //1 online, 2 restart and 0 offline
  var [chatroomPing, SetChatroomPing] = useState(); //0 for no new message, 1 for unread message(s)
  var [planSnapshot, SetPlanSnapshot] = useState();
  var [snapshotList, setSnapshotList] = useState();
  var [memberList, setMemberList] = useState();

  //dummy data

  var [username, setUsername] = useState("Dasho");
  var [userID, setuserID] = useState("4324");
  var [permission, setPermission] = useState(2);
  var [appTheme, setAppTheme] = useState();
  var [serverStatus, setServerStatus] = useState(1); //1 online, 2 restart and 0 offline
  var [chatroomPing, SetChatroomPing] = useState(0); //0 for no new message, 1 for unread message(s)
  var [planSnapshot, SetPlanSnapshot] = useState(2);
  var [snapshotList, setSnapshotList] = useState([
    { id: 1,
      title: "Special snapshot",
      user: "Dasho",
      date: "10th June 2020",
    },
    { id: 2,
      title: "Snapshot 2",
      user: "Photon",
      date: "23rd May 2021",
    },
  ]);
  var [memberList, setMemberList] = useState([
    {
      userID: "4324",
      username: "Dasho",
      joinDate: "10th March 2021",
    },
    {
      userID: "432424",
      username: "Photon",
      joinDate: "23rd June 2021",
    },
  ]);
  //*/

  useEffect(() => {
    APIRequest("all");
  });

  var userStatic = [
    APIRoutes.username,
    APIRoutes.appTheme,
  ]

  var planDynamic = [
    APIRoutes.serverStatus,
    APIRoutes.chatroomPing,
    APIRoutes.planSnapshot,
    APIRoutes.snapshotList,
    APIRoutes.memberList,
  ]

  function APIRequest(type){
    //verify session
    axios.get(APIRoutes.meURL, {
      header: {
        Authorization: `session ${sessionID}`,
      }
    })
    .then(responseMe => {
      setuserID(responseMe.data.userID)
      //user data
      if(type === "userStatic" || type === "all"){
        axios.all(userStatic.map(type => axios.get(APIRoutes.userURL + responseMe.data.userID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setUsername(response[0].data.username);
          setAppTheme(response[1].data.appTheme);
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
        axios.all(userStatic.map(url => axios.get(url)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setServerStatus(response[0].data.serverStatus);
          SetChatroomPing(response[1].data.chatroomPing);
          SetPlanSnapshot(response[2].data.planSnapshot);
          setSnapshotList(response[3].data.snapshotList);
          setMemberList(response[4].data.memberList);
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
    })
  };

  function sendAPI(type, data){
    if(type === "addUser"){
      setAddUserSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          addUser: 0,
        }
      )
      .then(response => {
        APIRequest("planDynamic");
        if(response.data.success === true){
          snackbarNotification(1, "Username Added");
          document.getElementById("DashAdmin-edit-member-box-input").value = "";
        }else{
          snackbarNotification(2, "Invalid Username");
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
        checkAddUser();
      })
    }else if(type === "editUser"){
      setEditUserSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          addUser: 0,
        }
      )
      .then(response => {
        APIRequest("planDynamic");
        if(response.data.success === true){
          snackbarNotification(1, "User Edited");
        }else{
          snackbarNotification(2, "Error Editing User");
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
        setEditUserSubmitDisabled(false);
      })
    }else if(type === "removeUser"){
      setRemoveUserSubmitDisabled(true);
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
        APIRequest("planDynamic");
        if(response.data.success === true){
          snackbarNotification(1, "User Removed");
          removeUser();
        }else{
          snackbarNotification(2, "Error Removing User");
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
        setRemoveUserSubmitDisabled(false);
      })
    }else if(type === "createSnapshot"){
      SetCreateSnapshotSubmitDisabled(true);
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
        APIRequest("planDynamic");
        if(response.data.success === true){
          snackbarNotification(1, "Snapshot Created");
          document.getElementById("DashAdmin-snapshots-create-inputs-text-input").value = "";
        }else{
          snackbarNotification(2, "Error Creating Snapshot");
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
        createSnapshotCheck();
      })
    }else if(type === "restoreSnapshot"){
      SetRestoreSnapshotSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          restoreDroplet: 1,
        }
      )
      .then(response => {
        APIRequest("planDynamic");
        if(response.data.success === true){
          restoreSnapshot();
          snackbarNotification(1, "Snapshot Restored");
        }else{
          snackbarNotification(2, "Error Restoring Snapshot");
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
        SetRestoreSnapshotSubmitDisabled(false);
      })
    }else if(type === "deleteSnapshot"){
      SetDeleteSnapshotSubmitDisabled(true);
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
        APIRequest("planDynamic");
        if(response.data.success === true){
          deleteSnapshot();
          snackbarNotification(1, "Snapshot Deleted");
        }else{
          snackbarNotification(2, "Error Creating Snapshot");
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
        SetDeleteSnapshotSubmitDisabled(false);
      })
    }else{
      return;
    }
  };


  //placeholders end

  var [addUserSubmitDisabled, setAddUserSubmitDisabled] = useState(true);
  var [editUserSubmitDisabled, setEditUserSubmitDisabled] = useState(true);
  var [removeUserSubmitDisabled, setRemoveUserSubmitDisabled] = useState(false);
  var [restoreSnapshotSubmitDisabled, SetRestoreSnapshotSubmitDisabled] = useState(false);
  var [deleteSnapshotSubmitDisabled, SetDeleteSnapshotSubmitDisabled] = useState(false);

  var restoresnapshotbox = document.getElementById("restoresnapshot-box");
  var restoresnapshot = document.getElementById("restoresnapshot");

  var deletesnapshotbox = document.getElementById("deletesnapshot-box");
  var deletesnapshot = document.getElementById("deletesnapshot");

  var edituserbox = document.getElementById("edituser-box");
  var edituser = document.getElementById("edituser");

  var removeuserbox = document.getElementById("removeuser-box");
  var removeuser = document.getElementById("removeuser");

  function SnapshotLock() {
    document.getElementById("snapshot-buttons-toggle").classList.add(css["snapshot-list-lock"]);
    document.getElementById("snapshot-buttons-toggle").classList.remove(css["snapshot-list-unlock"]);
  }

  function SnapshotUnlock() {
    document.getElementById("snapshot-buttons-toggle").classList.add(css["snapshot-list-unlock"]);
    document.getElementById("snapshot-buttons-toggle").classList.remove(css["snapshot-list-lock"]);
  }

  function restoreSnapshot() {
    var restoresnapshotbox = document.getElementById("restoresnapshot-box");
    var restoresnapshot = document.getElementById("restoresnapshot");
    if (restoresnapshot.style.transform === "scale(1)") {
      restoresnapshotbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        restoresnapshot.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = "auto";
    } else {
      restoresnapshotbox.scrollTop = 0;
      restoresnapshot.style.transform = "scale(1)";
      restoresnapshotbox.style.transform = "scale(1)";
      document.body.style.overflow = "hidden";
    }
  }

  function deleteSnapshot() {
    var deletesnapshotbox = document.getElementById("deletesnapshot-box");
    var deletesnapshot = document.getElementById("deletesnapshot");
    if (deletesnapshot.style.transform === "scale(1)") {
      deletesnapshotbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        deletesnapshot.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    } else {
      deletesnapshotbox.scrollTop = 0;
      deletesnapshot.style.transform = "scale(1)";
      deletesnapshotbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
    }
  }

  function editUser(id) {
    var edituserbox = document.getElementById("edituser-box");
    var edituser = document.getElementById("edituser");
    if (id){
      setPermissionEdit(id);
    }
    if (edituser.style.transform === "scale(1)") {
      edituserbox.style.transform = "translateY(80%)";
      setTimeout(() => {
        edituser.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    } else {
      edituserbox.scrollTop = 0;
      edituser.style.transform = "scale(1)";
      edituserbox.style.transform = "translateY(0%)";
      document.body.style.overflow = 'hidden';
    }
  }

  var [permissionEdit, setPermissionEdit] = useState(userID);

  function removeUser(id) {
    var removeuserbox = document.getElementById("removeuser-box");
    var removeuser = document.getElementById("removeuser");
    if (id){
      setPermissionEdit(id);
    }
    if (removeuser.style.transform === "scale(1)") {
      removeuserbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        removeuser.style.transform = "scale(0)";
      }, 150);
      //setTimeout(() => {removeuserOff()},150);
      document.body.style.overflow = 'auto';
    } else {
      removeuserbox.scrollTop = 0;
      removeuser.style.transform = "scale(1)";
      removeuserbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
    }
  }

  window.onkeyup = function (closeEscape) {
    var restoresnapshot = document.getElementById("restoresnapshot");
    var deletesnapshot = document.getElementById("deletesnapshot");
    var removeuser = document.getElementById("removeuser");
    if (closeEscape.keyCode === 27) {
      if (restoresnapshot.style.transform === "scale(1)") {
        restoreSnapshot();
      } else if (removeuser.style.transform === "scale(1)") {
        removeUser();
      } else if (deletesnapshot.style.transform === "scale(1)") {
        deleteSnapshot();
      }
    }
  };

  window.onclick = function (closeModal) {
    var restoresnapshot = document.getElementById("restoresnapshot");
    var deletesnapshot = document.getElementById("deletesnapshot");
    var removeuser = document.getElementById("removeuser");
    if (closeModal.target === restoresnapshot) {
      restoreSnapshot();
    } else if (closeModal.target === deletesnapshot) {
      deleteSnapshot();
    } else if (closeModal.target === removeuser) {
      removeUser();
    }
  };

  var [createSnapshotSubmitDisabled, SetCreateSnapshotSubmitDisabled] = useState(true);

  function createSnapshotCheck(){
    if(planSnapshot !== 0){
      if(document.getElementById("DashAdmin-snapshots-create-inputs-text-input").value){
        SetCreateSnapshotSubmitDisabled(false);
      }else{
        SetCreateSnapshotSubmitDisabled(true);
      }
    }else{
      SetCreateSnapshotSubmitDisabled(true);
    }
  }


  function checkAddUser(){
    if(document.getElementById("DashAdmin-edit-member-box-input").value){
      setAddUserSubmitDisabled(false);
    }else{
      setAddUserSubmitDisabled(true);
    }
  }


  return (
    <div className={cssGlobal["dashboard-full"]}>
      <Navdash number="7" type="nav" />
      <Addons />
      {/* modal windows */}
      <div id="restoresnapshot" className={`${css["restoresnapshot"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="restoresnapshot-box" className={css["restoresnapshot-box"]}>
          <h1>Restore Snapshot</h1>
          <p>
            Once confirmed, the snapshot will override all current files of this
            plan. All current files will be permanently deleted and replaced.
          </p>
          <div className={css["restoresnapshot-info"]}>
            <p>
              <b>Snapshot Name:</b> <br />
              Personal Snapshot
            </p>
            <p>
              <b>Created By:</b> <br />
              Hudson101
            </p>
            <p>
              <b>Creation Date:</b> <br />
              12th June 2020 8:43am
            </p>
          </div>
          <span className={css["red-text"]}>
            <p>
              <i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${"fas fa-exclamation-circle"}`}></i>
              Warning! This action cannot be reversed!
            </p>
          </span>
          <div className={`${css["restoresnapshot-buttons"]} ${cssGlobal["flex-center-center"]}`}>
            <div className={css["restoresnapshot-buttons-box"]}>
              <button className={css["restoresnapshot-button-cancel"]}
                onClick={() => restoreSnapshot()}>
                <p>Cancel</p>
              </button>
            </div>
            <div className={css["restoresnapshot-buttons-box"]}>
              <button disabled={restoreSnapshotSubmitDisabled} onClick={() => sendAPI("restoreSnapshot")} className={css["restoresnapshot-button-submit"]}>
                <p>Restore Now</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="deletesnapshot" className={`${css["deletesnapshot"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="deletesnapshot-box" className={css["deletesnapshot-box"]}>
          <h1>Delete Snapshot</h1>
          <p>
            This will permanenetly delete the snapshot, which includes all of
            the files saved inside.
          </p>
          <div className={css["deletesnapshot-info"]}>
            <p>
              <b>Snapshot Name:</b> <br />
              Personal Snapshot
            </p>
            <p>
              <b>Created By:</b> <br />
              Hudson101
            </p>
            <p>
              <b>Creation Date:</b> <br />
              12th June 2020 8:43am
            </p>
          </div>
          <span className={css["red-text"]}>
            <p>
              <i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${"fas fa-exclamation-circle"}`}></i>
              This action cannot be reversed!
            </p>
          </span>
          <div className={`${css["deletesnapshot-buttons"]} ${cssGlobal["flex-center-center"]}`}>
            <div className={css["deletesnapshot-buttons-box"]}>
              <button className={css["deletesnapshot-button-cancel"]} onClick={() => deleteSnapshot()}>
                <p>Cancel</p>
              </button>
            </div>
            <div className={css["deletesnapshot-buttons-box"]}>
              <button disabled={deleteSnapshotSubmitDisabled} onClick={() => sendAPI("deleteSnapshot")} className={css["deletesnapshot-button-submit"]}>
                <p>Delete Snapshot Now</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="edituser" className={`${css["edituser"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="edituser-box" className={css["edituser-box"]}>
          <h1>Permission Settings</h1>
          <div className={`${css["edituser-split"]} ${cssGlobal["flex-flex-start-center"]}`}>
            <div className={css["edituser-presets"]}>
              <p>Editing permissions for:</p>
              <div className={`${css["edituser-user"]} ${cssGlobal["flex-center-center"]}`}>
                <div className={css["edituser-user-icon"]}>
                  <div className={css["edituser-icon-photo"]}></div>
                  {/* profile picture in style tag in above div */}
                </div>
                <div className={css["edituser-user-name"]}>
                  <p>
                    {memberList &&
                      (memberList.find(memberList => memberList.userID === permissionEdit).username)
                    }
                  </p>
                </div>
              </div>
              <p>
                <b>Permission Presets</b>
                <br />
                <span className={css["permission-presets-text"]}>
                  Sample permission settings to select. These will override all your current settings.
                </span>
              </p>
              <div className={`${css["edituser-presets-list"]} ${cssGlobal["flex-center-left"]}`}>
                <button className={css["edituser-presets-box"]}>
                  <p>Admin</p>
                </button>
                <button className={css["edituser-presets-box"]}>
                  <p>Writer</p>
                </button>
                <button className={css["edituser-presets-box"]}>
                  <p>Reader</p>
                </button>
              </div>
            </div>
            <div className={css["edituser-section"]}>
              <div className={`${css["edituser-settings"]} ${cssGlobal["flex-flex-start-left"]}`}>

              {permissionsList.map((list, index) => (
                <div key={index} className={`${css["edituser-settings-box"]} ${cssGlobal["flex-center-left"]}`}>
                  <div className={css["edituser-settings-title"]}>
                    <p><b>{list.categoryDisplay}</b></p>
                  </div>
                  <div className={css["edituser-settings-switch"]}>
                    <button className={css["edituser-switch-outer"]}>
                      <div className={`${list.status === true ? (css["edituser-switch-inner-on"]):(css["edituser-switch-inner-off"])} ${cssGlobal["flex-center-center"]}`}>
                        <span className={css["edituser-switch-text-on"]}>
                          <p><i className={`${css["fas"]} ${css["fa-check"]} ${"fas fa-check"}`}></i></p>
                        </span>
                        <span className={css["edituser-switch-text-off"]}>
                          <p><i className={`${css["fas"]} ${css["fa-times"]} ${"fas fa-times"}`}></i></p>
                        </span>
                      </div>
                    </button>
                  </div>
                  <div className={css["edituser-settings-info"]}>
                    <p>{list.categoryInfo}</p>
                  </div>
                </div>
              ))}

              </div>
            </div>
          </div>
          <div className={`${css["edituser-buttons"]} ${cssGlobal["flex-center-center"]}`}>
            <div className={css["edituser-buttons-box"]}>
              <button className={css["edituser-button-cancel"]}
                onClick={() => editUser()}>
                <p>Cancel</p>
              </button>
            </div>
            <div className={css["edituser-buttons-box"]}>
              <button disabled={editUserSubmitDisabled} onClick={() => sendAPI("editUser")} id="edituser-button-submit" className={css["edituser-button-submit-off"]}>
                <p>Save Changes</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="removeuser" className={`${css["removeuser"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="removeuser-box" className={css["removeuser-box"]}>
          <h1>Remove Member</h1>
          <div className={`${css["removeuser-info"]} ${cssGlobal["flex-center-center"]}`}>
            <div className={css["removeuser-icon"]}>
              <div className={css["removeuser-icon-photo"]}></div>
              {/* profile photo style tag on above div */}
            </div>
            <div className={css["removeuser-name"]}>
              <p><b>
                {memberList &&
                  (memberList.find(memberList => memberList.userID === permissionEdit).username)
                }
              </b></p>
            </div>
            <div className={css["removeuser-joindate"]}>
              <p>
                <b>Join Date:</b>
                <br />10th June 2020
              </p>
            </div>
          </div>
          <p>
            The user will no longer have access to this plan once removed. You
            can always add them back later.
          </p>
          <div className={`${css["removeuser-buttons"]} ${cssGlobal["flex-center-center"]}`}>
            <div className={css["removeuser-buttons-box"]}>
              <button className={css["removeuser-button-cancel"]}
                onClick={() => removeUser()}>
                <p>Cancel</p>
              </button>
            </div>
            <div className={css["removeuser-buttons-box"]}>
              <button disabled={removeUserSubmitDisabled} onClick={() => sendAPI("removeUser")} id="removeuser-button-submit" className={css["removeuser-button-submit"]}>
                <p>Remove Now</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={cssGlobal["dashboard-section"]}>
        <div className={css["dashboard"]}>
          <div className={css["dashboard-top"]}>
            <Navdash number="7" type="top" />
          </div>
          {!memberList || !username ?
            <React.Fragment>
              <div className={css["dashboard-side"]}>
                <div className={css["edit-member"]}>
                  {/* <h1>Edit Members</h1> */}

                  <div className={css["add-member"]}>
                    <h1><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span></h1>
                    <p>
                      <b><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></b>
                    </p>
                    <div className={css["edit-member-box"]}>
                      <input id="DashAdmin-edit-member-box-input" type="text" disabled/>
                    </div>
                    <div style={addUserSubmitDisabled === true ? {opacity: "60%", cursor: "default"}:{opacity: "100%", cursor: "default"}} className={css["edit-member-submit"]}>
                      <button disabled style={{pointerEvents: "none", backgroundColor: "var(--theme2)", height: "50px"}}></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={css["dashboard-main"]}>
                <h1><span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour1"]}`}></span></h1>
                <div className={css["member-list"]}>
                  <div className={`${css["member-list-box-title"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["member-list-profile"]}>
                      <div className={css["member-list-profile-title"]}>
                        <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                      </div>
                    </div>
                    <div className={css["member-list-date"]}>
                      <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                    </div>
                  </div>
                  {[...Array(3)].map((number, index) => (
                    <div key={index} className={`${css["member-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                      <div className={`${css["member-list-profile"]} ${cssGlobal["flex-center-left"]}`}>
                        <div className={css["member-list-profile-photo"]}>
                          <div className={css["profile-photo-user"]}></div>
                        </div>
                        <div className={css["member-list-profile-info"]}>
                          <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                        </div>
                      </div>
                      <div className={css["member-list-date"]}>
                        <p><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </React.Fragment>:
            <React.Fragment>
              <div className={css["dashboard-side"]}>
                <div className={css["edit-member"]}>
                  {/* <h1>Edit Members</h1> */}

                  <div className={css["add-member"]}>
                    <h1>Add New Member</h1>
                    <p>
                      <b>Enter Username</b>
                    </p>
                    <div className={css["edit-member-box"]}>
                      <input id="DashAdmin-edit-member-box-input" onKeyUp={() => checkAddUser()} type="text" placeholder="Username" />
                    </div>
                    <div style={addUserSubmitDisabled === true ? {opacity: "60%", cursor: "default"}:{opacity: "100%", cursor: "default"}} className={css["edit-member-submit"]}>
                      <button disabled={addUserSubmitDisabled} onClick={() => sendAPI("addUser")}><i className={`${css["fas"]} ${css["fa-plus-circle"]} ${"fas fa-plus-circle"}`}></i>Add User</button>
                    </div>
                  </div>

                  {/*
                                <div className={css["change-member"]}>
                                    <h1>Edit Rank</h1>
                                    <p><b>Enter Existing Member</b></p>
                                    <form action="">
                                        <div className={css["edit-member-box"]}>
                                            <p><input type="text" placeholder="Username"/></p>
                                        </div>
                                        <div className={css["edit-member-box"]}>
                                            <p><select value="Option">
                                                <option value="" selected disabled hidden>Rank</option>
                                                <div className={css["option-filter-AlexK"]}>
                                                    <p>Hey! Stax Developer Studios!</p>
                                                </div>
                                                <option value="member">Member</option>
                                                <option value="manager">Manager</option>
                                                <option value="admin">Admin</option>
                                            </select></p>
                                        </div>
                                        <div className={css["edit-member-submit"]}>
                                            <p><input type="submit" value="Edit Rank"/></p>
                                        </div>
                                    </form>
                                </div>
                                */}
                </div>
              </div>
              <div className={css["dashboard-main"]}>
                <h1>Users</h1>
                <div className={css["member-list"]}>
                  <div className={`${css["member-list-box-title"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["member-list-profile"]}>
                      <div className={css["member-list-profile-title"]}>
                        <p>User</p>
                      </div>
                    </div>
                    <div className={css["member-list-date"]}>
                      <p>Join Date:</p>
                    </div>
                    {/* <div className={css["member-list-rank"]}>
                                        <p>Permissions</p>
                                    </div> */}
                  </div>

                  {/* <div className={css["member-list-rank"]}>
                                        <div className={css["member-list-rank-box"]}>
                                            <p><select>
                                                <option value="" selected>Owner</option>
                                                <option value="first">Admin</option>
                                                <option value="includes">Manager</option>
                                                <option value="ends">Member</option>
                                            </select></p>
                                        </div>
                                    </div> */}

                  {memberList.map((list) => (
                    <div key={list.userID + "-key"} className={`${css["member-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                      <div className={`${css["member-list-profile"]} ${cssGlobal["flex-center-left"]}`}>
                        <div className={css["member-list-profile-photo"]}>
                          <div className={css["profile-photo-user"]}></div>
                          {/* style tag profile photo in above div */}
                        </div>
                        <div className={css["member-list-profile-info"]}>
                          <p>{list.username}</p>
                        </div>
                      </div>
                      <div className={css["member-list-date"]}>
                        <p>{list.joinDate}</p>
                      </div>
                      {(permission % 2 === 0 && list.userID !== userID) && (
                        <div className={`${css["member-list-button"]} ${cssGlobal["flex-center-center"]}`}>
                          <button className={css["member-list-edit"]} onClick={() => editUser(list.userID)}>
                            <i className={`${css["fas"]} ${css["fa-pencil-alt"]} ${"fas fa-pencil-alt"}`}></i>
                          </button>
                          <button className={css["member-list-remove"]} onClick={() => removeUser(list.userID)}>
                            <i className={`${css["fas"]} ${css["fa-trash"]} ${"fas fa-trash"}`}></i>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </React.Fragment>
          }

          {/* <div className={css["dashboard-stretch"]}></div> */}

          <div className={css["dashboard-stretch"]}>
            <h1>Snapshots</h1>
            {snapshotList ?
              <React.Fragment>
                <div className={css["snapshots-create"]}>
                  <h2>Create Snapshot</h2>
                  <p>
                    You have{" "}
                    <span className={css["white-text"]}>{planSnapshot} </span>
                    {
                      planSnapshot === 1 ? (
                        <span>snapshot </span>
                      ) : (
                        <span>snapshots </span>
                      )
                      // span is there for the sake of reactjs html tag stuff
                    }
                    left. Maximum 5 snapshots allowed. Remove snapshots to create
                    space when slots are full.
                  </p>
                  <div className={`${css["snapshots-create-inputs"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["snapshots-create-inputs-text"]}>
                      <input onKeyUp={() => createSnapshotCheck()} id="DashAdmin-snapshots-create-inputs-text-input" type="text" placeholder="Snapshot Name"/>
                    </div>
                    <div id="DashAdmin-snapshots-create-inputs-submit" className={createSnapshotSubmitDisabled === true ? css["snapshots-create-inputs-submit-off"]: css["snapshots-create-inputs-submit"]}>
                      <button onClick={() => sendAPI("createSnapshot")} disabled={createSnapshotSubmitDisabled}><i className={`${css["fas"]} ${css["fa-plus-circle"]} ${"fas fa-plus-circle"}`}></i>Create</button>
                    </div>
                  </div>
                </div>
                <div className={`${css["snapshot-list"]} ${cssGlobal["flex-center-center"]}`}>
                  <div className={`${css["snapshot-list-box-title"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["snapshot-list-title"]}>
                      <p>Name</p>
                    </div>
                    <div className={css["snapshot-list-user"]}>
                      <p>User</p>
                    </div>
                    <div className={css["snapshot-list-date"]}>
                      <p>Creation Date:</p>
                    </div>
                  </div>

                  {snapshotList.map((list) => (
                    <div key={list.id + "-key"} className={`${css["snapshot-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                      <div className={css["snapshot-list-title"]}>
                        <p>{list.title}</p>
                      </div>
                      <div className={css["snapshot-list-user"]}>
                        <p>{list.user}</p>
                      </div>
                      <div className={css["snapshot-list-date"]}>
                        <p>{list.date}</p>
                      </div>
                      <div className={css["snapshot-list-buttons"]}>
                        <p>
                          <span id="snapshot-buttons-toggle" className={css["snapshot-list-unlock"]}>
                            {permission % 2 === 0 && (
                              <button className={css["snapshot-list-button-restore"]}
                                onClick={() => restoreSnapshot()}>
                                <i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${"fas fa-rotate-left"}`}></i>
                              </button>
                            )}
                            {(permission % 2 === 0 || username === list.user) && (
                              <button className={css["snapshot-list-button-delete"]}
                                onClick={() => deleteSnapshot()}>
                                <i className={`${css["fas"]} ${css["fa-trash"]} ${"fas fa-trash"}`}></i>
                              </button>
                            )}
                          </span>
                        </p>
                      </div>
                      {/* <div className={css["snapshot-list-buttons"]}>
                                <p>
                                    <span id="snapshot-buttons-toggle" className={css["snapshot-list-unlock"]}>
                                        <span onClick={() =>restoreSnapshot()} className={css["snapshot-list-button-restore"]}>Restore</span>
                                        <span onClick={() =>deleteSnapshot()} className={css["snapshot-list-button-delete"]}>Delete</span>
                                        <i onClick={() =>SnapshotUnlock()} className={`var {css["fas"]} var {css["fa-lock"]} var {"fas fa-lock"}`}></i>
                                        <i onClick={() =>SnapshotLock()} className={`var {css["fas"]} var {css["fa-unlock"]} var {"fas fa-unlock"}`}></i>
                                    </span>
                                </p>
                            </div> */}
                    </div>
                  ))}
                </div>
              </React.Fragment>:
              <React.Fragment>
                <div className={css["snapshots-create"]}>
                  <h2><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></h2>
                  <p>
                    <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour2"]}`}></span>
                    <span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span>
                  </p>
                  <div className={`${css["snapshots-create-inputs"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["snapshots-create-inputs-text"]}>
                      <input disabled id="DashAdmin-snapshots-create-inputs-text-input" type="text"/>
                    </div>
                    <div id="DashAdmin-snapshots-create-inputs-submit" className={css["snapshots-create-inputs-submit-off"]}>
                      <button disabled style={{pointerEvents: "none", backgroundColor: "var(--theme2)", height: "47px"}}>Create</button>
                    </div>
                  </div>
                </div>:
                <div className={`${css["snapshot-list"]} ${cssGlobal["flex-center-center"]}`}>
                  <div className={`${css["snapshot-list-box-title"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["snapshot-list-title"]}>
                      <p><span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                    </div>
                    <div className={css["snapshot-list-user"]}>
                      <p><span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                    </div>
                    <div className={css["snapshot-list-date"]}>
                      <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                    </div>
                  </div>

                  {[...Array(3)].map((number, index) => (
                    <div key={index} className={`${css["snapshot-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                      <div className={css["snapshot-list-title"]}>
                        <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                      </div>
                      <div className={css["snapshot-list-user"]}>
                        <p><span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                      </div>
                      <div className={css["snapshot-list-date"]}>
                        <p><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                      </div>
                      <div className={css["snapshot-list-buttons"]}>
                        <p>

                        </p>
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
