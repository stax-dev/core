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
import css from "./DashFiles.module.css";
import { APIRoutes } from "../../../components/data/APIRoutes";

export default function DashFiles() {

  //user static
  var[appTheme, setAppTheme] = useState(0);
  var[userPermission, setUserPermission] = useState();

  //plan dynamic data
  var [fileList, setFileList] = useState();

  //external data
  var sessionID = localStorage.getItem("sessionID");
  var planID = window.location.pathname.split("/")[1];

  //dummy data

  var [fileList, setFileList] = useState([
    {
      id: 1,
      name: "Potatos.dir",
      size: "10KB",
      created: "15/03/2022 12:30PM",
      createdBy: "Photon",
      lastModify: "19/03/2022 12:40PM",
      lastModifyBy: "Photon",
    },
    {
      id: 2,
      name: "Jump testing long line break break testing qwet of space this.txt",
      size: "4KB",
      created: "15/03/2022 9:30PM",
      createdBy: "Dasho",
      lastModify: "19/03/2022 12:40PM",
      lastModifyBy: "Photon",
    },
    {
      id: 3,
      name: "Index of long message heyyyyyyyyyyyyyyyyyyewqrqwetewrqewrqewryy.html",
      size: "2KB",
      created: "15/03/2022 11:40PM",
      createdBy: "Frank",
      lastModify: "19/03/2022 2:40PM",
      lastModifyBy: "Dasho",
    },
    {
      id: 4,
      name: "DashFiles.js",
      size: "94KB",
      created: "20/06/2023 4:22PM",
      createdBy: "Elias",
      lastModify: "20/06/2023 4:22PM",
      lastModifyBy: "Elias",
    }
  ]);
  //*/

  //external data
  var sessionID = localStorage.getItem("sessionID");

  document.documentElement.setAttribute("data-apptheme", appTheme);
  document.body.style.overflow = 'auto';

  useEffect(() => {
    APIRequest("all")
  })

  var userStatic = [
    APIRoutes.appTheme,
    APIRoutes.userPermission,
  ];

  var planDynamic = [
    APIRoutes.fileList,
  ]

  function APIRequest(type){
    //verify session
    axios.get(APIRoutes.meURL, {
      headers: {
        Authorization: `sessionID ${sessionID}`,
      },
    })
    .then(responseMe => {
      //user data
      if(type === "userStatic" || type === "all"){
        axios.all(userStatic.map(type => axios.get(APIRoutes.userURL + responseMe.data.userID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setAppTheme(response[0].data.appTheme);
          setUserPermission(response[1].data.userPermission);
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
      //plan dynamic data
      if(type === "planDynamic" || type === "all"){
        axios.all(planDynamic.map(type => axios.get(APIRoutes.planURL + planID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setFileList(response[0].data.fileList);
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
    if(type === "createFile"){
      setCreateFileSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          fileName: "Unknown.txt",
        }
      )
      .then(response => {
        if(response.data.success === true){
          APIRequest("planDynamic");
          snackbarNotification(1, "File Created");
        }else{
          snackbarNotification(3, "Error Adding File");
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
        setCreateFileSubmitDisabled(false);
      });
    }else if(type === "createFolder"){
      setCreateFolderSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          fileName: "Unknown.dir",
        }
      )
      .then(response => {
        if(response.data.success === true){
          APIRequest("planDynamic");
          snackbarNotification(1, "Folder Created");
        }else{
          snackbarNotification(3, "Error Adding Folder");
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
        setCreateFolderSubmitDisabled(false);
      })
    }else if(type === "uploadFile"){
      console.log("uploadFile");
    }else if(type === "openFile"){
      console.log("openFile");
    }else if(type === "renameFile"){
      console.log("renameFile");
    }else if(type === "moveFile"){
      console.log("moveFile");
    }else if(type === "downloadFile"){
      console.log("downloadFile");
    }else if(type === "duplicateFile"){
      console.log("duplicateFile");
    }else if(type === "deleteFile"){
      console.log("deleteFile");
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
        APIRequest("planDyanmic");
      })
      .catch(function (error) {
      });
      */
    }else{
      return;
    }
  }

  var [createFileSubmitDisabled, setCreateFileSubmitDisabled] = useState(false);
  var [createFolderSubmitDisabled, setCreateFolderSubmitDisabled] = useState(false);


  window.onkeyup = function(KeyHere){
    if (KeyHere.keyCode === 27) {
      var searchfiles = document.getElementById("searchfiles");
      var filetools = document.getElementById("filetools");
      var filedelete = document.getElementById("filedelete");
      var filemove = document.getElementById("filemove");
      var filerename = document.getElementById("filerename");
      if (searchfiles && searchfiles.style.transform === "scale(1)") {
        searchFiles();
      }else if(filedelete && filedelete.style.transform === "scale(1)") {
        fileDelete();
      }else if(filemove && filemove.style.transform === "scale(1)") {
        fileMove();
      }else if(filerename && filerename.style.transform === "scale(1)") {
        fileRename();
      }else if(filetools && filetools.style.transform === "scale(1)") {
        fileTools();
        // fileTools is at the bottom so its the last to be exited out
      }
    }
  };

  window.onclick = function(closeModal){
    if (closeModal.target === document.getElementById('searchfiles')) {
      searchFiles();
    }else if(closeModal.target === document.getElementById('filetools')) {
      fileTools();
    }else if(closeModal.target === document.getElementById('filedelete')) {
      fileDelete();
    }else if(closeModal.target === document.getElementById('filemove')) {
      fileMove();
    }else if(closeModal.target === document.getElementById('filerename')) {
      fileRename();
    }
  };

  function searchFiles() {
    var searchfilesbox = document.getElementById("searchfiles-box");
    var searchfiles = document.getElementById("searchfiles");
    if (searchfiles.style.transform === "scale(1)") {
      searchfilesbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        searchfiles.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      searchfilesbox.scrollTop = 0;
      searchfiles.style.transform = "scale(1)";
      searchfilesbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
    }
  }

  function uploadFiles() {
    var uploadfilesbox = document.getElementById("uploadfiles-box");
    var uploadfiles = document.getElementById("uploadfiles");
    if (uploadfiles.style.transform === "scale(1)") {
      uploadfilesbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        uploadfiles.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      uploadfilesbox.scrollTop = 0;
      uploadfiles.style.transform = "scale(1)";
      uploadfilesbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';

      //reset
      resetUploadFile();
    }
  }

  // File Tools

  var [currentViewFileID, setCurrentViewFileID] = useState(1);

  function fileTools(id) {
    var filetoolsbox = document.getElementById("filetools-box");
    var filetools = document.getElementById("filetools");
    if (filetools.style.transform === "scale(1)") {
      filetoolsbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        filetools.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      setCurrentViewFileID(id)
      filetoolsbox.scrollTop = 0;
      filetools.style.transform = "scale(1)";
      filetoolsbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
    }
  }

  function fileDelete(id) {
    var filedeletebox = document.getElementById("filedelete-box");
    var filedelete = document.getElementById("filedelete");
    if (filedelete.style.transform === "scale(1)") {
      filedeletebox.style.transform = "scale(0.4)";
      setTimeout(() => {
        filedelete.style.transform = "scale(0)";
      }, 150);
      // document.body.style.overflow = 'auto';
    }else{
      filedeletebox.scrollTop = 0;
      filedelete.style.transform = "scale(1)";
      filedeletebox.style.transform = "scale(1)";
      // document.body.style.overflow = 'hidden';
    }
  }

  function fileMove(id){
    var filemovebox = document.getElementById("filemove-box");
    var filemove = document.getElementById("filemove");
    if (filemove.style.transform === "scale(1)") {
      filemovebox.style.transform = "scale(0.4)";
      setTimeout(() => {
        filemove.style.transform = "scale(0)";
      }, 150);
      // document.body.style.overflow = 'auto';
    }else{
      filemovebox.scrollTop = 0;
      filemove.style.transform = "scale(1)";
      filemovebox.style.transform = "scale(1)";
      // document.body.style.overflow = 'hidden';
    }
  }


  function fileRename(id) {
    var filerenamebox = document.getElementById("filerename-box");
    var filerename = document.getElementById("filerename");
    if (filerename.style.transform === "scale(1)") {
      filerenamebox.style.transform = "scale(0.4)";
      setTimeout(() => {
        filerename.style.transform = "scale(0)";
      }, 150);
      // document.body.style.overflow = 'auto';
    } else {
      filerenamebox.scrollTop = 0;
      filerename.style.transform = "scale(1)";
      filerenamebox.style.transform = "scale(1)";
      // document.body.style.overflow = 'hidden';

      if(fileList.find(id => id.id === selectedListID[0]).name.toLowerCase().endsWith(".dir")){
        document.getElementById("DashFiles-filerename-input-type-input").value = fileList.find(id => id.id === selectedListID[0]).name.replace(".dir", "");
      }else{
        document.getElementById("DashFiles-filerename-input-type-input").value = fileList.find(id => id.id === selectedListID[0]).name;
      }
      document.getElementById("DashFiles-filerename-status").className = "";
      document.getElementById("DashFiles-filerename-status").classList.add(css["filerename-status-grey"]);
    }
  }

  var filePattern = /\w\.[a-zA-Z0-9]+$/;

  function renameCheck(){
    // if its not folder
    if(!fileList.find(id => id.id === selectedListID[0]).name.toLowerCase().endsWith(".dir")){
      //same file name check
      if(document.getElementById("DashFiles-filerename-input-type-input").value.toLowerCase() !== fileList.find(id => id.id === selectedListID[0]).name.toLowerCase()){
        //file name identical check
        if(document.getElementById("DashFiles-filerename-input-type-input").value !== "test.test"){
          //correct format check
          if(document.getElementById("DashFiles-filerename-input-type-input").value.match(filePattern)){
            //change file warning
            if(document.getElementById("DashFiles-filerename-input-type-input").value.toLowerCase().split(".")[1] !== fileList.find(id => id.id === selectedListID[0]).name.toLowerCase().split(".")[1]){

              document.getElementById("DashFiles-filerename-status").className = "";
              document.getElementById("DashFiles-filerename-status").classList.add(css["filerename-status"]);
              // check successful
            }else{
              document.getElementById("DashFiles-filerename-status").className = "";
              document.getElementById("DashFiles-filerename-status").classList.add(css["filerename-status-warning"]);
            }
          }else{
            document.getElementById("DashFiles-filerename-status").className = "";
            document.getElementById("DashFiles-filerename-status").classList.add(css["filerename-status-empty"]);
          }
        }else{
          document.getElementById("DashFiles-filerename-status").className = "";
            document.getElementById("DashFiles-filerename-status").classList.add(css["filerename-status-same"]);
        }
      }else{
        document.getElementById("DashFiles-filerename-status").className = "";
        document.getElementById("DashFiles-filerename-status").classList.add(css["filerename-status-grey"]);
      }
    }else{
      //same file name check
      if(document.getElementById("DashFiles-filerename-input-type-input").value.toLowerCase() !== fileList.find(id => id.id === selectedListID[0]).name.toLowerCase().replace(".dir", "")){
        //file already exist check
        if(document.getElementById("DashFiles-filerename-input-type-input").value !== "test"){
          //correct format check
          if(document.getElementById("DashFiles-filerename-input-type-input").value.match(/^[^.]*$/)){
              document.getElementById("DashFiles-filerename-status").className = "";
              document.getElementById("DashFiles-filerename-status").classList.add(css["filerename-status"]);
              // check successful
          }else{
            document.getElementById("DashFiles-filerename-status").className = "";
            document.getElementById("DashFiles-filerename-status").classList.add(css["filerename-status-empty"]);
          }
        }else{
          document.getElementById("DashFiles-filerename-status").className = "";
            document.getElementById("DashFiles-filerename-status").classList.add(css["filerename-status-same"]);
        }
      }else{
        document.getElementById("DashFiles-filerename-status").className = "";
        document.getElementById("DashFiles-filerename-status").classList.add(css["filerename-status-grey"]);
      }
    }
  }

  function fileEditor(id) {
      var fileeditorbox = document.getElementById("fileeditor-box");
      var fileeditor = document.getElementById("fileeditor");
      if (fileeditor.style.transform === "scale(1)") {
        fileeditorbox.style.transform = "translateY(80%)";
        setTimeout(() => {
          fileeditor.style.transform = "scale(0)";
        }, 150);
        document.body.style.overflow = 'auto';
      } else {
        fileeditorbox.scrollTop = 0;
        fileeditor.style.transform = "scale(1)";
        fileeditorbox.style.transform = "translateY(0%)";
        document.body.style.overflow = 'hidden';
      }
  }

  var [selectedListID, setSelectedListID] = useState([]);

  function chooseSelected(action, id){
    if(action === "add"){
      if(!selectedListID.includes(id)){
        selectedListID.push(id);
      }
    }else if(action === "remove"){
      if(selectedListID.includes(id)){
        selectedListID.splice(selectedListID.indexOf(id), 1);
      }
    }else if(action === "clear"){
      selectedListID.length = 0;
    }else if(action === "all"){
      selectedListID.length = 0;
      selectedListID.push(...fileList.map((list) => (list.id)));
    }
    setLiveSelectedCount(selectedListID.length);
    console.log(selectedListID);
  }

  var [liveSelectedCount, setLiveSelectedCount] = useState(selectedListID.length);

  function selectAll(){
    if(selectedListID.length === fileList.length){
      chooseSelected("clear");

    }else{
      chooseSelected("clear");
      fileList.map((list) => (
        chooseSelected("add", list.id)
      ))
    }
  }

  // SingleSelect is whether this action can be performed only with 1 file selected

  var toolList = [
    {
      id: 1,
      name: "Open",
      icon: "fas fa-angles-right",
      SingleSelect: true,
    },
    {
      id: 2,
      name: "Rename",
      icon: "fas fa-pencil",
      SingleSelect: true,
    },
    {
      id: 3,
      name: "Move",
      icon: "fas fa-folder-tree",
      SingleSelect: false,
    },
    {
      id: 4,
      name: "Download",
      icon: "fas fa-download",
      SingleSelect: false,
    },
    {
      id: 5,
      name: "Duplicate",
      icon: "fas fa-clone",
      SingleSelect: false,
    },
    {
      id: 6,
      name: "Delete",
      icon: "fas fa-trash",
      SingleSelect: false,
    },
  ];

  function toolHandler(type){
    if(type === "Open"){
      //check if its folder
      if(fileList.find(id => id.id === selectedListID[0]).name.toLowerCase().endsWith(".dir")){
        console.log('go to file page');
      }else{
        fileEditor();
      }
    }else if(type === "Rename"){
      fileRename();
    }else if(type === "Move"){
      fileMove();
    }else if(type === "Download"){
      sendAPI("downloadFile");
    }else if(type === "Duplicate"){
      sendAPI("duplicateFile");
    }else if(type === "Delete"){
      fileDelete();
    }
  }

  /*
  Note for fileX() Modals

  These modals are submodals (modals inside modals) so i disabled overflow codes on those
  so the filetools controls the main modal beaviour
  */

  useEffect(() => {
    document.getElementById("DashFiles-file-upload-drop-status").addEventListener('dragenter', function(event) {
      document.getElementById("DashFiles-file-upload-drop-status").classList.replace(css["uploadfiles-drop-empty"], css["uploadfiles-drop-hover"]);
    });
    document.getElementById("DashFiles-file-upload-drop-status").addEventListener('dragleave', function(event) {
      document.getElementById("DashFiles-file-upload-drop-status").classList.replace(css["uploadfiles-drop-hover"], css["uploadfiles-drop-empty"]);
    });
  })

  /*
    uploadHandler is for drag and drop (fake file upload)
    fileUpload is using HTML file input (real file upload)

    has to be one or the other cant combine both cause HTML file input prevents cause of security reasons
  */

  var fakeChosenList = [];

  function uploadHandler(type, event) {

    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();

    if(type === "drop"){
      if(event.dataTransfer.files){
        document.getElementById("DashFiles-file-upload").classList.replace(css["uploadfiles-upload-empty"], css["uploadfiles-upload-list"]);
        document.getElementById("DashFiles-file-upload-drop-status").classList.replace(css["uploadfiles-drop-hover"], css["uploadfiles-drop-empty"]);

        fakeChosenList = event.dataTransfer.files;
        reloadChosenFiles("dragdrop");
        // console.log(event.dataTransfer.files);
      }
    }
  }

  function fileUpload() {
    if (document.getElementById("DashFiles-file-upload-info-input").files.length > 0) {
      document.getElementById("DashFiles-file-upload").classList.replace(css["uploadfiles-upload-empty"], css["uploadfiles-upload-list"]);
      document.getElementById("DashFiles-file-upload-drop-status").classList.replace(css["uploadfiles-drop-hover"], css["uploadfiles-drop-empty"]);
    }
    // console.log(document.getElementById("DashFiles-file-upload-info-input").files);
    reloadChosenFiles("HTML");
  }


 var [ChosenFiles, setChosenFiles] = useState();

  function reloadChosenFiles(type){
    if(type === "HTML"){
      setChosenFiles(
        Array.from(document.getElementById("DashFiles-file-upload-info-input").files).map((list, index) => (
          <div key={index} className={`${css["uploadfiles-list-box"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["uploadfiles-list-box-icon"]}>
              <i className={`${css["fas"]} ${css["fa-file"]} ${"fas fa-file"}`}></i>
            </div>
            <div className={css["uploadfiles-list-box-title"]}>
              <p>{list.name}</p>
            </div>
            {/* <div className={css["uploadfiles-list-box-delete"]}>
              <button onClick={() => fileChosenDelete(index)}className={css["flex-center-center"]}>
                <i className={`${css["fas"]} ${css["fa-times"]} ${"fas fa-times"}`}></i>
              </button>
            </div> */}
          </div>
        ))
      );
    }else if(type === "dragdrop"){
      setChosenFiles(
        Array.from(fakeChosenList).map((list, index) => (
          <div key={index} className={`${css["uploadfiles-list-box"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["uploadfiles-list-box-icon"]}>
              <i className={`${css["fas"]} ${css["fa-file"]} ${"fas fa-file"}`}></i>
            </div>
            <div className={css["uploadfiles-list-box-title"]}>
              <p>{list.name}</p>
            </div>
          </div>
        ))
      )
    }
  }

  function resetUploadFile(){
    document.getElementById("DashFiles-file-upload").classList.replace(css["uploadfiles-upload-list"], css["uploadfiles-upload-empty"]);
    document.getElementById("DashFiles-file-upload-drop-status").classList.replace(css["uploadfiles-drop-hover"], css["uploadfiles-drop-empty"]);
    document.getElementById("DashFiles-file-upload-info-input").value = "";
  }


  return (
    <div className={cssGlobal["dashboard-full"]}>
      <Navdash number="2" type="nav" />
      <Addons />
      {/* modal window start */}
      <div id="searchfiles" className={css["searchfiles"]}>
        <div id="searchfiles-box" className={css["searchfiles-box"]}>
          <h1>Search Files</h1>
          <div className={`${css["file-search"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["file-search-icon"]}>
              <p><i className={`${css["fas"]} ${css["fa-search"]} ${"fas fa-search"}`}></i></p>
            </div>
            <div className={css["file-search-input"]}>
              <input type="text" placeholder="Search Files..." />
            </div>
          </div>
          <div className={`${css["searchfiles-range"]} ${cssGlobal["flex-center-left"]}`}>
            <button className={css["searchfiles-range-button-active"]}>All Files</button>
            <button className={css["searchfiles-range-button"]}>Current Folder</button>
          </div>
          <div className={css["searchfiles-results-title"]}>
            <p>4 Results:</p>
          </div>
          <div className={`${css["searchfiles-results"]} ${cssGlobal["flex-center-left"]}`}>
            <button>
              <div className={`${css["searchfiles-results-box"]} ${cssGlobal["flex-center-center"]}`}>
                <div className={css["searchfiles-results-icon"]}>
                  <p><i className={`${css["fas"]} ${css["fa-file"]} ${"fas fa-file"}`}></i></p>
                </div>
                <div className={css["searchfiles-results-info"]}>
                  <p>Test.txt</p>
                </div>
                <div className={css["searchfiles-results-view"]}>
                  <p><i className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i></p>
                </div>
              </div>
            </button>
            <div className={css["searchfiles-results-load"]}>
                <div className={css["loader-circle"]}></div>
            </div>
          </div>

          <div className={`${css["searchfiles-buttons"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["searchfiles-cancel"]}>
              <button onClick={() => searchFiles()}>Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <div id="uploadfiles" className={css["uploadfiles"]}>
        <div id="uploadfiles-box" className={css["uploadfiles-box"]}>
          <h1>Upload Files</h1>
          <div
            id="DashFiles-file-upload"
            className={`${css["uploadfiles-upload-empty"]} ${cssGlobal["flex-center-center"]}`}
          >
            <div className={css["uploadfiles-drop"]}>
              <div
                id="DashFiles-file-upload-drop-status"
                className={`${css["uploadfiles-drop-empty"]} ${cssGlobal["flex-center-center"]}`}
                onDrop={(event) => uploadHandler("drop", event)}
                onDragOver={(event) => uploadHandler("drag", event)}
              >
                <div className={css["uploadfiles-info"]}>
                  <i className={`${css["fas"]} ${css["fa-upload"]} ${"fas fa-upload"}`}></i>
                  <p>Drag File or Select</p>
                  <label className={css["uploadfiles-label"]} for="DashFiles-file-upload-info-input">
                    Select Files
                  </label>
                  <input onChange={() => fileUpload()} id="DashFiles-file-upload-info-input" multiple={true} type="file"/>
                </div>
              </div>
            </div>
            <div className={`${css["uploadfiles-list"]} ${cssGlobal["flex-center-left"]}`}>
              {ChosenFiles}
            </div>
          </div>
          <div className={`${css["uploadfiles-buttons"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["uploadfiles-cancel"]}>
              <button onClick={() => uploadFiles()}>Cancel</button>
            </div>
            <div className={css["uploadfiles-submit"]}>
              <button onClick={() => sendAPI("uploadFile")}>Upload</button>
            </div>
          </div>
        </div>
      </div>

      <div id="filetools" className={`${css["filetools"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="filetools-box" className={css["filetools-box"]}>
          <div className={`${css["filetools-box-title"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["filetools-box-title-text"]}>
              <h1>File Tools</h1>
            </div>
            <div className={css["filetools-box-title-icon"]}>
              <button title="Close Window" className={css["filetools-box-title-cancel"]} onClick={() => fileTools()}>
                <i className={`${css["fas"]} ${css["fa-times"]} ${"fas fa-times"}`}></i>
              </button>
            </div>
          </div>
          {/* manual code in case map doesnt work for tool list */}
          {/* <div className={`${css["filetools-tools"]} ${cssGlobal["flex-center-left"]}`}>

            {liveSelectedCount === 1 &&
              <div className={css["filetools-tools-box"]}>
                <button onClick={() => fileEditor()} className={`${css["filetools-tools-button"]} ${cssGlobal["flex-center-center"]}`}>
                  <div className={css["filetools-tools-icon"]}>
                  <i className={`${css["fas"]} ${css["fa-angles-right"]} ${"fas fa-angles-right"}`}></i>
                  </div>
                  <div className={css["filetools-tools-info"]}>
                      <p>Open</p>
                  </div>
                </button>
              </div>
            }

            {liveSelectedCount === 1 &&
              <div className={css["filetools-tools-box"]}>
                <button onClick={() => {fileRename()}} className={`${css["filetools-tools-button"]} ${cssGlobal["flex-center-center"]}`}>
                  <div className={css["filetools-tools-icon"]}>
                  <i className={`${css["fas"]} ${css["fa-edit"]} ${"fas fa-edit"}`}></i>
                  </div>
                  <div className={css["filetools-tools-info"]}>
                      <p>Rename</p>
                  </div>
                </button>
              </div>
            }
            <div className={css["filetools-tools-box"]}>
              <button className={`${css["filetools-tools-button"]} ${cssGlobal["flex-center-center"]}`}>
                <div className={css["filetools-tools-icon"]}>
                <i className={`${css["fas"]} ${css["fa-folder"]} ${"fas fa-folder"}`}></i>
                </div>
                <div className={css["filetools-tools-info"]}>
                    <p>Move</p>
                </div>
              </button>
            </div>
            <div className={css["filetools-tools-box"]}>
              <button onClick={() => fileEditor()} className={`${css["filetools-tools-button"]} ${cssGlobal["flex-center-center"]}`}>
                <div className={css["filetools-tools-icon"]}>
                <i className={`${css["fas"]} ${css["fa-download"]} ${"fas fa-download"}`}></i>
                </div>
                <div className={css["filetools-tools-info"]}>
                    <p>Download</p>
                </div>
              </button>
            </div>
            <div className={css["filetools-tools-box"]}>
              <button onClick={() => fileDelete()} className={`${css["filetools-tools-button"]} ${cssGlobal["flex-center-center"]}`}>
                <div className={css["filetools-tools-icon"]}>
                <i className={`${css["fas"]} ${css["fa-trash"]} ${"fas fa-trash"}`}></i>
                </div>
                <div className={css["filetools-tools-info"]}>
                    <p>Delete</p>
                </div>
              </button>
            </div>

          </div> */}

          <div className={`${css["filetools-tools"]} ${cssGlobal["flex-center-left"]}`}>
            {liveSelectedCount > 1 ?
              (toolList.filter(id => id.SingleSelect === false).map((list) => (
                <div key={list.name} className={css["filetools-tools-box"]}>
                  <button onClick={() => toolHandler(list.name)} className={`${css["filetools-tools-button"]} ${cssGlobal["flex-center-center"]}`}>
                    <div className={css["filetools-tools-icon"]}>
                      <i className={list.icon}></i>
                    </div>
                    <div className={css["filetools-tools-info"]}>
                        <p>{list.name}</p>
                    </div>
                  </button>
                </div>
              ))):
              (toolList.map((list) => (
                <div key={list.name} className={css["filetools-tools-box"]}>
                  <button onClick={() => toolHandler(list.name)} className={`${css["filetools-tools-button"]} ${cssGlobal["flex-center-center"]}`}>
                    <div className={css["filetools-tools-icon"]}>
                      <i className={list.icon}></i>
                    </div>
                    <div className={css["filetools-tools-info"]}>
                        <p>{list.name}</p>
                    </div>
                  </button>
                </div>
              )))
            }
          </div>


          <div className={css["filetools-info"]}>
            {liveSelectedCount === 1 ?
              <p>{liveSelectedCount} Item Selected</p>:
              <p>{liveSelectedCount} Items Selected</p>
            }
          </div>

          {liveSelectedCount === 1 ?
            <div className={`${css["filetools-details"]} ${cssGlobal["flex-flex-start-left"]}`}>
              <div className={css["filetools-details-title"]}>
                <h1>{fileList.find(id => id.id === selectedListID[0]).name.toLowerCase().endsWith(".dir") ?
                  (fileList.find(id => id.id === selectedListID[0]).name.replace(".dir", "")):
                  (fileList.find(id => id.id === selectedListID[0]).name)
                }</h1>
              </div>
              <div className={css["filetools-details-box"]}>
                <p>Type:<br/>
                  {fileList.find(id => id.id === selectedListID[0]).name.endsWith(".dir") &&
                    <b>Folder</b>
                  }
                  {fileList.find(id => id.id === selectedListID[0]).name.endsWith(".txt") &&
                    <b>Text File</b>
                  }
                  {fileList.find(id => id.id === selectedListID[0]).name.endsWith(".html") &&
                    <b>HTML File</b>
                  }
                  {fileList.find(id => id.id === selectedListID[0]).name.endsWith(".js") ||
                    fileList.find(id => id.id === selectedListID[0]).name.endsWith(".jsx") &&
                    <b>JS File</b>
                  }
                  {fileList.find(id => id.id === selectedListID[0]).name.endsWith(".css") &&
                    <b>CSS File</b>
                  }
                </p>
              </div>
              <div className={css["filetools-details-box"]}>
                <p>Size:<br/><b>{fileList.find(id => id.id === selectedListID[0]).size}</b></p>
              </div>
              <div className={css["filetools-details-box"]}>
                <p>Created By:<br/><b>{fileList.find(id => id.id === selectedListID[0]).createdBy}</b></p>
              </div>
              <div className={css["filetools-details-box"]}>
                <p>Created On:<br/><b>{fileList.find(id => id.id === selectedListID[0]).created}</b></p>
              </div>
              <div className={css["filetools-details-box"]}>
                <p>Last Modified By:<br/><b>{fileList.find(id => id.id === selectedListID[0]).lastModifyBy}</b></p>
              </div>
              <div className={css["filetools-details-box"]}>
                <p>Last Modified:<br/><b>{fileList.find(id => id.id === selectedListID[0]).lastModify}</b></p>
              </div>
            </div>:
            <div className={`${css["filetools-details"]} ${cssGlobal["flex-flex-start-left"]}`}>
              {selectedListID.map((list) => (
                <div key={list} className={css["filetools-details-list"]}>
                  <p>
                    {fileList.find(id => id.id === list).name.toLowerCase().endsWith(".dir") ?
                      (fileList.find(id => id.id === list).name.replace(".dir", "")):
                      (fileList.find(id => id.id === list).name)
                    }
                  </p>
                </div>
              ))}
            </div>
          }
        </div>
      </div>

      <div id="filemove" className={`${css["filemove"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="filemove-box" className={css["filemove-box"]}>
          <div className={`${css["filemove-box-title"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["filemove-box-title-text"]}>
              <h1>Move Items</h1>
            </div>
            <div className={css["filemove-box-title-icon"]}>
              <button title="Close Window" className={css["filemove-box-title-cancel"]} onClick={() => fileMove()}>
                <i className={`${css["fas"]} ${css["fa-times"]} ${"fas fa-times"}`}></i>
              </button>
            </div>
          </div>
          <div className={css["filemove-files"]}>
            <div className={`${css["filemove-tools"]} ${cssGlobal["flex-center-left"]}`}>
              <button>
                <i className={`${css["fas"]} ${css["fa-chevron-left"]} ${"fas fa-chevron-left"}`}></i>
              </button>
              <button>
                <i className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
              </button>
            </div>
            <div className={`${css["filemove-path"]} ${cssGlobal["flex-center-left"]}`}>
              <p>Test4324324</p>
              <i className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
              <p>Test 2</p>
              <i className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
              <p>Test 2</p>
            </div>
            <div className={`${css["filemove-list"]} ${cssGlobal["flex-center-left"]}`}>
              {fileList && (fileList.filter(id => id.name.endsWith(".dir")).map((list) => (
                <button key={list.id} className={css["filemove-list-button"]}>
                  <div className={`${css["filemove-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["filemove-list-icon"]}>
                      <i className={`${css["fas"]} ${css["fa-folder"]} ${"fas fa-folder"}`}></i>
                    </div>
                    <div className={css["filemove-list-title"]}>
                      <p>{list.name.replace(".dir", "")}</p>
                    </div>
                  </div>
                </button>
              )))}
            </div>
          </div>
          <div className={css["filemove-buttons"]}>
            <div className={css["filemove-button-submit"]}>
              <button onClick={() => sendAPI("moveFile")} >Move Here</button>
            </div>
          </div>
        </div>
      </div>

      <div id="filerename" className={`${css["filerename"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="filerename-box" className={css["filerename-box"]}>
          <div className={`${css["filerename-box-title"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["filerename-box-title-text"]}>
              <h1>Rename Item</h1>
            </div>
            <div className={css["filerename-box-title-icon"]}>
              <button title="Close Window" className={css["filerename-box-title-cancel"]} onClick={() => fileRename()}>
                <i className={`${css["fas"]} ${css["fa-times"]} ${"fas fa-times"}`}></i>
              </button>
            </div>
          </div>
          <div id="DashFiles-filerename-status" className={css["filerename-status"]}>
            <div className={`${css["filerename-input"]} ${cssGlobal["flex-center-left"]}`}>
              <div className={css["filerename-input-type"]}>
                <input onKeyUp={() => renameCheck()} id="DashFiles-filerename-input-type-input" type="text" placeholder="Rename File..." />
              </div>
              <div className={css["filerename-input-icon"]}>
                <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
              </div>
              <span className={css["filerename-text-empty"]}>
                <i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${"fas fa-exclamation-circle"}`}></i>Name Format is incorrect
              </span>
              <span className={css["filerename-text-warning"]}>
                <i className={`${css["fas"]} ${css["fa-info-circle"]} ${"fas fa-info-circle"}`}></i>You are changing file type
              </span>
              <span className={css["filerename-text-same"]}>
                <i className={`${css["fas"]} ${css["fa-info-circle"]} ${"fas fa-exclamation-circle"}`}></i>File name already exists
              </span>
            </div>
            <div className={`${css["filerename-buttons"]} ${cssGlobal["flex-center-left"]}`}>
              <div className={css["filerename-submit"]}>
                <button id="DashFiles-filerename-submit-button" onClick={() => sendAPI("renameFile")}>Rename Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="filedelete" className={`${css["filedelete"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="filedelete-box" className={css["filedelete-box"]}>
          <div className={`${css["filedelete-box-title"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["filedelete-box-title-text"]}>
              <h1>Delete Items</h1>
            </div>
            <div className={css["filedelete-box-title-icon"]}>
              <button title="Close Window" className={css["filedelete-box-title-cancel"]} onClick={() => fileDelete()}>
                <i className={`${css["fas"]} ${css["fa-times"]} ${"fas fa-times"}`}></i>
              </button>
            </div>
          </div>
          <div className={css["filedelete-box-info"]}>
            <p>You have selected
              {liveSelectedCount === 1 ?
                <span><b> {liveSelectedCount} item </b></span>:
                <span><b> {liveSelectedCount} items </b></span>
              }
              to be deleted. This action cannot be reversed.
            </p>
          </div>
          <div className={`${css["filedelete-list"]} ${cssGlobal["flex-flex-start-left"]}`}>
            {/* <div className={css["filetools-details-title"]}>
              <div className={css["filetools-info"]}>
                {liveSelectedCount === 1 ?
                  <p>{liveSelectedCount} Item Selected</p>:
                  <p>{liveSelectedCount} Items Selected</p>
                }
              </div>
            </div> */}

            {selectedListID.map((list) => (
              <div key={list} className={css["filedelete-list-box"]}>
                <p>
                  {fileList.find(id => id.id === list).name.toLowerCase().endsWith(".dir") ?
                    (fileList.find(id => id.id === list).name.replace(".dir", "")):
                    (fileList.find(id => id.id === list).name)
                  }
                </p>
              </div>
            ))}
          </div>
          <div className={`${css["filedelete-buttons"]} ${cssGlobal["flex-center-center"]}`}>
            <div className={css["filedelete-delete"]}>
              <button onClick={() => sendAPI("deleteFile")}>Delete Now</button>
            </div>
          </div>
        </div>
      </div>

      <div id="fileeditor" className={css["fileeditor"]}>
        <div id="fileeditor-box" className={css["fileeditor-box"]}>
          <div className={`${css["fileeditor-title"]} ${cssGlobal["flex-center-center"]}`}>
            {selectedListID.length === 1 &&
              <div className={css["fileeditor-title-text"]}>
                <h1>{fileList.find(id => id.id === selectedListID[0]).name}
                  {/*
                    this code is in case the selectedListID array is more than 1, it will show the first file details and not break code
                    cause by right its not supposed to be able to open file editor if array has more than 1 id
                  */}
                </h1>
              </div>
            }
            <div className={`${css["fileeditor-title-icon"]} ${cssGlobal["flex-center-left"]}`}>
              <button title="Save Changes" onClick={() => sendAPI("saveFile")} className={css["fileeditor-title-save"]}><i className={`${css["fas"]} ${css["fa-save"]} ${"fas fa-save"}`}></i></button>
              <button title="Search Code" className={css["fileeditor-title-search"]}><i className={`${css["fas"]} ${css["fa-search"]} ${"fas fa-search"}`}></i></button>
              <button title="Revert Changes" className={css["fileeditor-title-trash"]}><i className={`${css["fas"]} ${css["fa-undo"]} ${"fas fa-undo"}`}></i></button>
              <button title="Close Window" className={css["fileeditor-title-cancel"]} onClick={() => fileEditor()}><i className={`${css["fas"]} ${css["fa-times"]} ${"fas fa-times"}`}></i></button>
            </div>
          </div>
          {/* loading screen before code shows up */}
          {/* <div className={`${css["fileeditor-main"]} ${cssGlobal["flex-center-center"]}`}>
            <div className={css["loader-circle"]}></div>
          </div> */}
          <div className={css["fileeditor-main"]}>
            {[...Array(20)].map((number, index) => (
              <span key={index}>this is an array spam but - this is supposed to be a canvas/iframe embed that people can type commands in like the vscode terminal. this just shows the breaking points are working!<br/></span>
            ))}
          </div>
        </div>
      </div>
      {/* modal window end */}
      <div className={cssGlobal["dashboard-section"]}>
        <div className={css["dashboard"]}>
          <Navdash number="2" type="top" />
          <div className={css["dashboard-stretch"]}>
            {fileList ?
              <React.Fragment>
                <div className={`${css["file-menu"]} ${cssGlobal["flex-center-left"]}`}>
                  <button className={css["file-return-button"]}>
                    <i className={`${css["fas"]} ${css["fa-chevron-left"]} ${"fas fa-chevron-left"}`}></i>Back
                  </button>
                  <button onClick={() => searchFiles()} className={css["file-search-button"]}>
                    <i className={`${css["fas"]} ${css["fa-search"]} ${"fas fa-search"}`}></i>Search
                  </button>
                  <button disabled={createFileSubmitDisabled} onClick={() => sendAPI("createFile")} className={css["file-file-button"]}>
                    <i className={`${css["fas"]} ${css["fa-plus"]} ${"fas fa-plus-circle"}`}></i>New File
                  </button>
                  <button disabled={createFolderSubmitDisabled} onClick={() => sendAPI("createFolder")} className={css["file-folder-button"]}>
                    <i className={`${css["fas"]} ${css["fa-plus"]} ${"fas fa-plus-circle"}`}></i>New Folder
                  </button>
                  <button onClick={() => uploadFiles()} className={css["file-upload-button"]}>
                    <i className={`${css["fas"]} ${css["fa-upload"]} ${"fas fa-upload"}`}></i>Upload
                  </button>
                </div>

                <div className={`${liveSelectedCount !== 0 ? (css["file-selected"]):(css["file-selected-none"])} ${cssGlobal["flex-center-center"]}`}>
                  <div className={css["file-selected-info"]}>
                    {liveSelectedCount !== 0 ?
                      <p>{liveSelectedCount} Selected</p>:
                      <p>Select to begin</p>
                    }
                  </div>
                  {liveSelectedCount !== 0 ?
                    <div className={`${css["file-selected-button"]} ${cssGlobal["flex-center-left"]}`}>
                      <button className={css["file-selected-button-cancel"]} onClick={() => chooseSelected("clear", "elias")}>
                        <i className={`${css["fas"]} ${css["fa-times"]} ${"fas fa-times"}`}></i>
                      </button>
                      <button className={css["file-selected-button-submit"]} onClick={() => fileTools()}>
                        <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                      </button>
                    </div>:
                    <div className={`${css["file-selected-button"]} ${cssGlobal["flex-center-left"]}`}>
                      <button disabled className={css["file-selected-button-icon"]}>
                        <i className={`${css["fas"]} ${css["fa-check-square"]} ${"fas fa-check-square"}`}></i>
                      </button>
                    </div>
                  }
                </div>

                <div className={css["file-path"]}>
                  {/* <p><b>Path</b></p> */}
                  <div className={`${css["file-path-box"]} ${cssGlobal["flex-center-left"]}`}>
                    <Link to="/">filriu9ewiuroewuroiewuroiewre</Link>
                    <i className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
                    <Link to="/">filriu9ewiuroewuroiewuroiewre</Link>
                    <i className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
                    <Link to="/">heyrwrwrw</Link>
                    <i className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
                    <Link to="/">filrwrwrwrwrwrwriu9ewiuroewuroiewuroiewre</Link>
                    <i className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
                    <Link to="/">textee</Link>
                    <i className={`${css["fas"]} ${css["fa-chevron-right"]} ${"fas fa-chevron-right"}`}></i>
                    <Link to="/">texte51515151151515151515151515e</Link>
                  </div>
                </div>

                <div className={`${css["file-list"]} ${cssGlobal["flex-flex-start-left"]}`}>
                  <div className={`${css["file-list-title"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["file-list-name"]}>
                      <span className={css["file-list-name-desktop"]}>
                        <p>Name</p>
                      </span>
                      <span className={css["file-list-name-mobile"]}>
                        <p>Directory</p>
                      </span>
                    </div>
                    <div className={css["file-list-size"]}>
                      <p>Size</p>
                    </div>
                    <div className={css["file-list-modify"]}>
                      <p>Last Modified</p>
                    </div>
                    <div className={css["file-list-button"]}>
                      <button title="Select All" onClick={
                        selectedListID.length === fileList.length ?
                          (() => chooseSelected("clear")):
                          (() => chooseSelected("all"))

                      } className={`${css["file-list-button-all"]} ${cssGlobal["flex-center-center"]}`}>
                        {selectedListID.length === fileList.length ?
                          <i className={`${css["fas"]} ${css["fa-check-square"]} ${"fas fa-check-square"}`}></i>:
                          <i className={`${css["far"]} ${css["fa-square"]} ${"far fa-square"}`}></i>
                        }
                      </button>
                      {/* <button title="Select All" onClick={() => selectAll()} className={`${css["file-list-button-all"]} ${cssGlobal["flex-center-center"]}`}>
                        {selectedListID.length === fileList.length ?
                          <i className={`${css["fas"]} ${css["fa-check-square"]} ${"fas fa-check-square"}`}></i>:
                          <i className={`${css["far"]} ${css["fa-square"]} ${"far fa-square"}`}></i>
                        }
                      </button> */}
                    </div>
                  </div>

                  {fileList.map((list) => (
                    <button key={list.id + "-filekey"} onClick={
                      selectedListID.includes(list.id) ?
                        (() => chooseSelected("remove", list.id)):
                        (() => chooseSelected("add", list.id))
                      }
                      className={`${selectedListID.includes(list.id) ? (css["file-list-box-selected"]):(css["file-list-box"])} ${cssGlobal["flex-center-center"]}`}>
                      <div className={`${css["file-list-box-inside"]} ${cssGlobal["flex-center-left"]}`}>
                        <div className={css["file-list-name"]}>
                          <p>
                            {list.name.toLowerCase().endsWith(".dir") ? (
                              <i className={`${css["fas"]} ${css["fa-folder"]} ${"fas fa-folder"}`}></i>
                            ):(
                              <i className={`${css["fas"]} ${css["fa-file"]} ${"fas fa-file"}`}></i>
                            )}
                            {list.name.toLowerCase().endsWith(".dir") ? (list.name.replace(".dir", "")):(list.name)}
                          </p>
                        </div>
                        <div className={css["file-list-size"]}>
                          <p>{list.size}</p>
                        </div>
                        <div className={css["file-list-modify"]}>
                          <p><span className={css["file-mobile-text"]}>Last Modified:<br/></span>{list.lastModify}</p>
                        </div>
                        <div className={css["file-list-button"]}>
                          {selectedListID.includes(list.id) ?
                            <i className={`${css["fas"]} ${css["fa-check-square"]} ${"fas fa-check-square"}`}></i>:
                            <i className={`${css["far"]} ${css["fa-square"]} ${"far fa-square"}`}></i>
                          }
                        </div>
                      </div>
                    </button>
                  ))}

                </div>
              </React.Fragment>:
              <React.Fragment>
                <div className={`${css["file-menu"]} ${cssGlobal["flex-center-left"]}`}>
                  {[...Array(5)].map((number, index) => (
                    <button key={index} style={{pointerEvents: "none", width: "100px", height: "40px"}} className={css["file-return-button"]}>
                    </button>
                  ))}
                </div>
                <div style={{height: "30px", width: "180px"}} className={`${css["file-selected-none"]} ${cssGlobal["flex-center-center"]}`}>
                </div>
                <div className={css["file-path"]}>
                  <span style={{marginBottom: "10px"}} className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span>
                </div>
                <div className={`${css["file-list"]} ${cssGlobal["flex-flex-start-left"]}`}>
                  <div className={`${css["file-list-title"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["file-list-name"]}>
                      <span className={css["file-list-name-desktop"]}>
                        <p><span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                      </span>
                      <span className={css["file-list-name-mobile"]}>
                        <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                      </span>
                    </div>
                    <div className={css["file-list-size"]}>
                      <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                    </div>
                    <div className={css["file-list-modify"]}>
                      <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                    </div>
                    <div className={css["file-list-button"]}>
                      <button className={`${css["file-list-button-all"]} ${cssGlobal["flex-center-center"]}`}>
                      </button>
                    </div>
                  </div>
                  {[...Array(4)].map((number, index) => (
                    <button key={index} disabled style={{pointerEvents: "none"}} className={`${css["file-list-box"]} ${cssGlobal["flex-center-center"]}`}>
                      <div className={`${css["file-list-box-inside"]} ${cssGlobal["flex-center-left"]}`}>
                        <div className={css["file-list-name"]}>
                          <p>
                          <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span>
                          </p>
                        </div>
                        <div className={css["file-list-size"]}>
                          <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                        </div>
                        <div className={css["file-list-modify"]}>
                          <p><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                        </div>
                        <div className={css["file-list-button"]}>
                        </div>
                      </div>
                    </button>
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
