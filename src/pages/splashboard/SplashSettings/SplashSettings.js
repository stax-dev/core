//React
import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
//import Button from "../../../components/button/Button";
import axios from "axios";
import DOMPurify from 'dompurify';

//External
import {
  Addons,
  timeFormatter,
  LazyLoad,
  snackbarNotification,
  /*scrollReveal,
  snackbarNotification,
  newNotification,
  viewNotification,
  closeNotification,*/
} from "../../../components/addons/Addons";

import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";
import Navsplash from "../../../components/navsplash/Navsplash";

//Main
import css from "./SplashSettings.module.css";

//Extra
import bannerColoursList from "../../../components/data/bannerColours.json";
import blacklistWords from "../../../components/data/blacklistWords.json";
import { APIRoutes } from "../../../components/data/APIRoutes";

export default function SplashSettings() {

  //user static
  var [bannerID, setBannerID] = useState();
  var [username, setUsername] = useState();
  var [userRank, setUserRank] = useState();
  var [joinDate, setJoindate] = useState();
  var [userID, setUserID] = useState();
  var [firstName, setFirstName] = useState();
  var [lastName, setLastName] = useState();

  //user dynamic
  var [accountStatus, setAccountStatus] = useState();
  var [passwordLastChanged, setPasswordLastChanged] = useState();
  var [appTheme, setAppTheme] = useState();
  var [emailList, setEmailList] = useState();
  var [loginActivityList, setLoginActivityList] = useState();

  /* dummy data
  var [bannerID, setBannerID] = useState("purple");
  var [username, setUsername] = useState("Dasho");
  var [userRank, setUserRank] = useState("Member");
  var [firstName, setFirstName] = useState("Dasho");
  var [lastName, setLastName] = useState("Dashos");
  var [joinDate, setJoindate] = useState("2021-03-04");
  var [userID, setUserID] = useState("12345678-1234-1234-1234-123456789012");
  var [accountStatus, setAccountStatus] = useState("Open");
  var [passwordLastChanged, setPasswordLastChanged] = useState("2021-03-04");
  var [appTheme, setAppTheme] = useState("dark");
  var [emailList, setEmailList] = useState([
    {
      ID: 1,
      email: "yoyo@gmail.com",
      default: true,
    },
    {
      ID: 2,
      email: "testing@gmail.com",
      default: false,
    }
  ]);
  var [loginActivityList, setLoginActivityList] = useState([
    {
      ID: 1,
      deviceType: "Mobile",
      location: "London, UK",
      lastLogin: "4th March 2021",
      current: true,
    },
    {
      ID: 2,
      deviceType: "Desktop",
      location: "London, UK",
      lastLogin: "4th March 2021",
      current: false,
    },
    {
      ID: 3,
      deviceType: "Mobile",
      location: "London, UK",
      lastLogin: "4th March 2021",
      current: false,
    },
  ]);
  //*/


  //external data
  var sessionID = localStorage.getItem("sessionID");

  document.documentElement.setAttribute("data-apptheme", appTheme);
  document.body.style.overflow = 'auto';

  //if you try run it before page is loaded there will be errors since page isnt rendered
  //due to classList and other css elements

  useEffect(() => {
    APIRequest("all");
  })

  var userStatic = [
    APIRoutes.bannerID,
    APIRoutes.username,
    APIRoutes.userRank,
    APIRoutes.joinDate,
    APIRoutes.firstName,
    APIRoutes.lastName,
  ];

  var userDynamic = [
    APIRoutes.accountStatus,
    APIRoutes.passwordLastChanged,
    APIRoutes.appTheme,
    APIRoutes.emailList,
    APIRoutes.loginActivityList,
  ];

  function APIRequest(type) {
    //verify session
    axios.get(APIRoutes.meURL, {
      header:{
        Authorization: `sesionID ${sessionID}`,
      }
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
          setBannerID(response[0].data);
          setUsername(response[1].data);
          setUserRank(response[2].data);
          setJoindate(response[3].data);
          setFirstName(response[4].data);
          setLastName(response[5].data);
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
        axios.all(userDynamic.map(type => axios.get(APIRoutes.userURL + responseMe.data.userID + type)), {
          headers: {
            Authorization: `sessionID ${sessionID}`,
          },
        })
        .then(axios.spread((...response) => {
          setAccountStatus(response[0].data);
          setPasswordLastChanged(response[1].data);
          setAppTheme(response[2].data);
          setEmailList(response[3].data);
          setLoginActivityList(response[4].data);
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
    if(type === "changeBanner"){
      setChangeBannerSubmitDisabled(true);
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
        setChangeBannerSubmitDisabled(false);
      });
    }else if(type === "changeName"){
      setProfileSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          firstName: DOMPurify.sanitize(data),
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planStatic");
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
        profileCheck();
      })
    }else if(type === "changeUsername"){
      setProfileSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          username: DOMPurify.sanitize(data),
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planStatic");
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
        profileCheck();
      })
    }else if(type === "changePassword"){
      setPasswordSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          password: DOMPurify.sanitize(data),
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
        PasswordSubmit();
      });
    }else if(type === "avatar"){
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          avatar: data,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planStatic");
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
    }else if(type === "appTheme"){
      setAppThemeSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          appTheme: data,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planDynamic");
          document.documentElement.setAttribute("data-apptheme", response.data.appTheme);
        }else{
          snackbarNotification(3, "Error Changing App Theme");
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
        setAppThemeSubmitDisabled(false);
      });
    }else if(type === "addEmail"){
      SetEmailSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          password: data,
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
        checkEmail();
      });
    }else if(type === "setEmailDefault"){
      setEmailDefaultSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          password: data,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planDynamic");
          snackbarNotification(1, "Default Email Set");
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
        setEmailDefaultSubmitDisabled(false);
      });
    }else if(type === "removeEmail"){
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
          APIRequest("userDynamic");
          snackbarNotification(1, "Email Deleted");
        }else{
          snackbarNotification(2, "Error Deleting Email");
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
      })
    }else if(type === "removeLoginActivity"){
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
          APIRequest("planDynamic");
          snackbarNotification(1, "Login Session Removed");
        }else{
          snackbarNotification(2, "Error Removing Login Session");
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
      })
    }else if(type === "lockAccount"){
      SetLockAccountSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          accountStatus: data,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planDynamic");
          snackbarNotification(1, "Account Locked");
        }else{
          snackbarNotification(3, "Error Locking Account");
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
        SetLockAccountSubmitDisabled(false);
      });
    }else if(type === "disableAccount"){
      console.log('disableAccount');
      SetDisableAccountSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          accountStatus: data,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planDynamic");
          snackbarNotification(1, "Account Disabled");
        }else{
          snackbarNotification(3, "Error Locking Account");
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
        SetDisableAccountSubmitDisabled(false);
      });
    }else if(type === "deleteAccount"){
      SetDeleteAccountSubmitDisabled(true);
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
          APIRequest("userDynamic");
          snackbarNotification(1, "Account Deleted");
        }else{
          snackbarNotification(2, "Error Deleting Account");
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
        SetDeleteAccountSubmitDisabled(false);
      })
    }else if(type === "unlockAccount"){
      SetUnlockAccountSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },
        {
          accountStatus: data,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planDynamic");
          snackbarNotification(1, "Account Unlocked");
        }else{
          snackbarNotification(3, "Error Unlocking Account");
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
        SetUnlockAccountSubmitDisabled(false);
      });
    }else{
      return;
    }
  }


  var [emailDefaultSubmitDisabled, setEmailDefaultSubmitDisabled] = useState(false);

  var [appThemeSubmitDisabled, setAppThemeSubmitDisabled] = useState(false);
  var [changeBannerSubmitDisabled, setChangeBannerSubmitDisabled] = useState(false);


  /*
  //change avatar modal
  var profilemenubox = document.getElementById("profilemenu-box");
  var profilemenu = document.getElementById("profilemenu");

  //profile photo crop modal
  var profilecropbox = document.getElementById("profilecrop-box");
  var profilecrop = document.getElementById("profilecrop");

  //edit profile modal
  var profilebox = document.getElementById("profilebox");
  var profilefull = document.getElementById("profilefull");

  //change password modal
  var passwordbox = document.getElementById("passwordbox");
  var passwordfull = document.getElementById("passwordfull");

  //lock account modal
  var lockbox = document.getElementById("lockbox");
  var lockfull = document.getElementById("lockfull");

  //disable account modal
  var disablebox = document.getElementById("disablebox");
  var disablefull = document.getElementById("disablefull");

  // delete account modal
  var deletebox = document.getElementById("deletebox");
  var deletefull = document.getElementById("deletefull");
  */

  function profile() {
    var profilebox = document.getElementById("profilebox");
    var profilefull = document.getElementById("profilefull");
    if(profilebox.style.transform === "scale(1)") {
      profilebox.style.transform = "scale(0.4)";
      setTimeout(() => {
        profilefull.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      profilebox.scrollTop = 0;
      document.body.style.overflow = 'hidden';
      profilefull.style.transform = "scale(1)";
      profilebox.style.transform = "scale(1)";

      //js to reset UI
      document.getElementById("change-username").style.border = "1px solid var(--theme2)";
      document.getElementById("changeprofile-box-tick").style.display = "none";
      document.getElementById("username-type").style.color = "var(--text1)";
      document.getElementById("username-taken").innerHTML = usernameCorrect;
      setProfileSubmitDisabled(true);
      document.getElementById("firstname-type").value = firstName;
      document.getElementById("lastname-type").value = lastName;
    }
  }

  function profileMenu() {
    var profilemenu = document.getElementById("profilemenu");
    var profilemenubox = document.getElementById("profilemenu-box");
    if(profilemenu.style.transform === "scale(1)") {
      profilemenubox.style.transform = "scale(0.4)";
      setTimeout(() => {
        profilemenu.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      profilemenubox.scrollTop = 0;
      profilemenu.style.transform = "scale(1)";
      profilemenubox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
    }
  }

  function password() {
    var passwordbox = document.getElementById("passwordbox");
    var passwordfull = document.getElementById("passwordfull");
    if(passwordbox.style.transform === "scale(1)") {
      passwordbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        passwordfull.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      passwordbox.scrollTop = 0;
      passwordfull.style.transform = "scale(1)";
      passwordbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';

      //js to reset UI
      document.getElementById("password-taken").innerHTML = passwordCorrect;
      document.getElementById("password-box1").style.border = "1px solid var(--theme2)";
      document.getElementById("password-box2").style.border = "1px solid var(--theme2)";
      document.getElementById("change-password").value = "";
      document.getElementById("confirm-password").value = "";
      document.getElementById("current-password").value = "";
      document.getElementById("changepassword-tick-box").style.display = "none";
      setPasswordSubmitDisabled(true);
    }
  }

  function profileCrop() {
    var profilecrop = document.getElementById("profilecrop");
    var profilecropbox = document.getElementById("profilecrop-box");
    if(profilecrop.style.transform === "scale(1)") {
      profilecropbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        profilecrop.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      profilecropbox.scrollTop = 0;
      profilecrop.style.transform = "scale(1)";
      profilecropbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
    }
  }

  function addEmail() {
    var addemailbox = document.getElementById("addemailbox");
    var addemailfull = document.getElementById("addemailfull");
    if(addemailbox.style.transform === "scale(1)") {
      addemailbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        addemailfull.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      addemailbox.scrollTop = 0;
      addemailfull.style.transform = "scale(1)";
      addemailbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';

      //reset modal
      document.getElementById("SplashSettings-addemail-text-input-input").value = "";
      SetEmailSubmitDisabled(true);
      document.getElementById("SplashSettings-addemail-input").classList = "";
      document.getElementById("SplashSettings-addemail-input").classList.add(css["addemail-input-grey"]);
    }
  }

  window.onclick = function (closeModal) {
    var profilemenu = document.getElementById("profilemenu");
    var profilecrop = document.getElementById("profilecrop");
    var profilefull = document.getElementById("profilefull");
    var passwordfull = document.getElementById("passwordfull");
    var lockfull = document.getElementById("lockfull");
    var unlockfull = document.getElementById("unlockfull");
    var disablefull = document.getElementById("disablefull");
    var deletefull = document.getElementById("deletefull");
    var addemailfull = document.getElementById("addemailfull");

    if(closeModal.target === deletefull) {
      deleteacc();
    } else if(closeModal.target === disablefull) {
      disableacc();
    } else if(closeModal.target === lockfull) {
      lockacc();
    }else if(closeModal.target === unlockfull) {
      unlockacc();
    }else if(closeModal.target === profilefull) {
      profile();
    } else if(closeModal.target === profilecrop) {
      profileCrop();
    } else if(closeModal.target === passwordfull) {
      password();
    } else if(closeModal.target === profilemenu) {
      profileMenu();
    } else if(closeModal.target === addemailfull) {
      addEmail();
    }
  };

  window.onKeyUp = function (closeEscape) {
    var profilemenu = document.getElementById("profilemenu");
    var profilecrop = document.getElementById("profilecrop");
    var profilefull = document.getElementById("profilefull");
    var passwordfull = document.getElementById("passwordfull");
    var lockfull = document.getElementById("lockfull");
    var unlockfull = document.getElementById("unlockfull");
    var disablefull = document.getElementById("disablefull");
    var deletefull = document.getElementById("deletefull");

    if(closeEscape.keyCode === 27) {
      if(profilefull.style.transform === "scale(1)") {
        profile();
      } else if(deletefull.style.transform === "scale(1)") {
        deleteacc();
      } else if(disablefull.style.transform === "scale(1)") {
        disableacc();
      } else if(lockfull.style.transform === "scale(1)") {
        lockacc();
      }else if(unlockfull.style.transform === "scale(1)") {
        unlockacc();
      }else if(passwordfull.style.transform === "scale(1)") {
        password();
      } else if(profilecrop.style.transform === "scale(1)") {
        profileCrop();
      } else if(profilemenu.style.transform === "scale(1)") {
        profileMenu();
      }
    }
  };

  function lockacc() {
    var lockbox = document.getElementById("lockbox");
    var lockfull = document.getElementById("lockfull");
    if(lockbox.style.transform === "scale(1)") {
      lockbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        lockfull.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      lockbox.scrollTop = 0;
      lockfull.style.transform = "scale(1)";
      lockbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
      SetLockAccountSubmitDisabled(true);
    }
  }

  function unlockacc(){
    var unlockbox = document.getElementById("unlockbox");
    var unlockfull = document.getElementById("unlockfull");
    if(unlockbox.style.transform === "scale(1)") {
      unlockbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        unlockfull.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      unlockbox.scrollTop = 0;
      unlockfull.style.transform = "scale(1)";
      unlockbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
    }
  }

  function disableacc() {
    var disablebox = document.getElementById("disablebox");
    var disablefull = document.getElementById("disablefull");
    if(disablebox.style.transform === "scale(1)") {
      disablebox.style.transform = "scale(0.4)";
      setTimeout(() => {
        disablefull.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      disablebox.scrollTop = 0;
      disablefull.style.transform = "scale(1)";
      disablebox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
      SetDisableAccountSubmitDisabled(true);
    }
  }

  function deleteacc() {
    var deletebox = document.getElementById("deletebox");
    var deletefull = document.getElementById("deletefull");
    if(deletebox.style.transform === "scale(1)") {
      deletebox.style.transform = "scale(0.4)";
      setTimeout(() => {
        deletefull.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      deletebox.scrollTop = 0;
      deletefull.style.transform = "scale(1)";
      deletebox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
      SetDeleteAccountSubmitDisabled(true);
    }
  }

  var [unlockAccountSubmitDisabled, SetUnlockAccountSubmitDisabled] = useState(false);
  var [lockAccountSubmitDisabled, SetLockAccountSubmitDisabled] = useState(true);
  var [disableAccountSubmitDisabled, SetDisableAccountSubmitDisabled] = useState(true);
  var [deleteAccountSubmitDisabled, SetDeleteAccountSubmitDisabled] = useState(true);

  function showPasswordsettings() {
    var password = document.getElementById("profile-password");
    if(password.type === "password") {
      password.type = "text";
      document.getElementById(css["show-password-button-off"]).style.display = "inline-block";
      document.getElementById(css["show-password-button-on"]).style.display = "none";
    }else{
      password.type = "password";
      document.getElementById(css["show-password-button-off"]).style.display = "none";
      document.getElementById(css["show-password-button-on"]).style.display = "inline-block";
    }
  }

  // var usernameStatus = "no";
  // var emailStatus = "no";
  var usernameError = '<p><i class="' + css["fas"] + ' fas fa-exclamation-circle"></i>Username taken</p>';
  var usernameLength = '<p><i class="' + css["fas"] + ' fas fa-exclamation-circle"></i>Username must be between 3-12 characters</p>';
  var usernameSymbol = '<p><i class="' + css["fas"] + ' fas fa-exclamation-circle"></i>Can contain only alphanumerics, underscores, dashes and dots</p>';
  var usernameLowercase = '<p><i class="' + css["fas"] + ' fas fa-exclamation-circle"></i>Username can only be lowercase</p>';
  var usernameStart = '<p><i class="' + css["fas"] + ' fas fa-exclamation-circle"></i>Usernames can only begin with alphabets</p>';
  var usernameCorrect = "";
  var usernameBroken = '<p><i class="' + css["fas"] + ' fas fa-exclamation-circle"></i>Error occured. Reloading page...</p>';
  var usernameFilter = '<p><i class="' + css["fas"] + ' fas fa-exclamation-circle"></i>Username contains a filtered word</p>';
  var Symbols = /^[0-9a-zA-Z_.-]+$/;
  var SymbolsUppercase = /^[0-9A-Za-z_.-]+$/;
  var FinalUsername = /^[a-zA-Z][0-9a-zA-Z_.-]{2,11}$/;

  var usernameCheck = "this is elias from august 2022 hows the future";

  var numberList = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "-", ".", "_"];

  function checkUsername() {
    var username = document.getElementById("username-type").value;

    if(username !== "") {
      /* username input check */
      if(username.match(Symbols)) {
        /* username symbol check */
        if(!numberList.find((list) => username.startsWith(list))){
          /* username number check */
          if(username.match(SymbolsUppercase)) {
            /* uppercase check */
            if(username.length <= 12 && username.length >= 3) {
              /* username length check */
              if(username.match(FinalUsername)) {
                /* final username check */
                if(!blacklistWords.find((list) => username.toLowerCase().match(list.toLowerCase()))) {
                  // filter word check
                  if(username !== "test") {
                    /* username availability check */
                    document.getElementById("change-username").style.border = "1px solid var(--theme2)";
                    document.getElementById("changeprofile-box-tick").style.display = "block";
                    document.getElementById("username-type").style.color = "var(--text1)";
                    document.getElementById("username-taken").innerHTML = usernameCorrect;
                    usernameCheck = "";
                  }else{
                    document.getElementById("username-taken").innerHTML =
                      usernameError;
                    document.getElementById("change-username").style.border = "1px solid red";
                    document.getElementById("changeprofile-box-tick").style.display = "none";
                    document.getElementById("username-type").style.color = "var(--text1)";
                    usernameCheck = "alex";
                  }
                }else{
                  document.getElementById("username-taken").innerHTML = usernameFilter;
                  document.getElementById("change-username").style.border = "1px solid red";
                  document.getElementById("changeprofile-box-tick").style.display = "none";
                  document.getElementById("username-type").style.color = "var(--text1)";
                  usernameCheck = "29th may 2023 hows things?";
                }
              }else{
                document.getElementById("username-taken").innerHTML = usernameBroken;
                document.getElementById("change-username").style.border = "1px solid red";
                document.getElementById("changeprofile-box-tick").style.display = "none";
                document.getElementById("username-type").style.color = "var(--text1)";
                usernameCheck = "elias";
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              }
            }else{
              document.getElementById("username-taken").innerHTML = usernameLength;
              document.getElementById("change-username").style.border = "1px solid red";
              document.getElementById("changeprofile-box-tick").style.display = "none";
              document.getElementById("username-type").style.color = "var(--text1)";
              usernameCheck = "stax";
            }
          }else{
            document.getElementById("username-taken").innerHTML = usernameLowercase;
            document.getElementById("change-username").style.border = "1px solid red";
            document.getElementById("changeprofile-box-tick").style.display = "none";
            document.getElementById("username-type").style.color = "var(--text1)";
            usernameCheck = "host";
          }
        }else{
          document.getElementById("username-taken").innerHTML = usernameStart;
          document.getElementById("change-username").style.border = "1px solid red";
          //document.getElementById('username-tick-box').style.display = "none";
          document.getElementById("username-type").style.color = "var(--text1)";
          usernameCheck = "hey there my name is alex";
        }
      }else{
        document.getElementById("username-taken").innerHTML = usernameSymbol;
        document.getElementById("username-box").style.border = "1px solid red";
        //document.getElementById('username-tick-box').style.display = "none";
        document.getElementById("username-type").style.color = "var(--text1)";
        usernameCheck = "it is nice to meet someone who is artifical haha";
      }
    }else{
      document.getElementById("change-username").style.border = "1px solid var(--theme2)";
      document.getElementById("changeprofile-box-tick").style.display = "none";
      document.getElementById("username-type").style.color = "var(--text1)";
      document.getElementById("username-taken").innerHTML = usernameCorrect;
      usernameCheck = "hey so the world is just like that just me and you";
    }
  }

  var [profileSubmitDisabled, setProfileSubmitDisabled] = useState(true);

  function profileCheck() {
    if(
      document.getElementById("username-type").value ||
      document.getElementById("firstname-type").value !== firstName ||
      document.getElementById("lastname-type").value !== lastName
    ){
      document.getElementById("profile-submit").style.display = "block";
      if((
        document.getElementById("username-taken").innerHTML === "" &&
        document.getElementById("profile-password").value
      )||((
        document.getElementById("firstname-type").value !== firstName &&
        document.getElementById("firstname-type").value
      )||(
        document.getElementById("lastname-type").value !== lastName &&
        document.getElementById("lastname-type").value
      ))){
        setProfileSubmitDisabled(false);
      }else{
        setProfileSubmitDisabled(true);
      }
    }else{
      document.getElementById("profile-submit").style.display = "none";
    }
  }

  function showPasswordtype() {
    var passwordsee = document.getElementById("change-password");
    var passwordConfirmsee = document.getElementById("confirm-password");
    if(passwordsee.type === "password") {
      passwordsee.type = "text";
      passwordConfirmsee.type = "text";
      document.getElementById(css["show-password-button-off1"]).style.display = "inline-block";
      document.getElementById(css["show-password-button-on1"]).style.display = "none";
    }else{
      passwordsee.type = "password";
      passwordConfirmsee.type = "password";
      document.getElementById(css["show-password-button-off1"]).style.display = "none";
      document.getElementById(css["show-password-button-on1"]).style.display = "inline-block";
    }
  }

  function showPasswordcurrent() {
    var passwordcurrentsee = document.getElementById("current-password");
    if(passwordcurrentsee.type === "password") {
      passwordcurrentsee.type = "text";
      document.getElementById(css["show-password-button-off2"]).style.display = "inline-block";
      document.getElementById(css["show-password-button-on2"]).style.display = "none";
    }else{
      passwordcurrentsee.type = "password";
      document.getElementById(css["show-password-button-off2"]).style.display = "none";
      document.getElementById(css["show-password-button-on2"]).style.display = "inline-block";
    }
  }

  var passwordError = '<p><i class="' + css["fas"] + ' fas fa-exclamation-circle"></i>Passwords do not match</p>';
  var passwordLength = '<p style="color: #FFA500"><i style="color: #FFA500;" class="' + css["fas"] + ' fas fa-exclamation-circle"></i>Password length is not recommended</p>';
  var passwordShort = '<p><i class="' + css["fas"] + ' fas fa-exclamation-circle"></i>Password is too short</p>';
  var passwordCorrect = "";

  var passwordCheck = "if it is not empty it is not CLEARED!!! yoyo";

  function checkPassword() {
    var passwordSame = document.getElementById("change-password").value;
    var passwordConfirmSame = document.getElementById("confirm-password").value;

    if(passwordSame !== passwordConfirmSame) {
      //if they are not the same
      document.getElementById("password-taken").innerHTML = passwordError;
      document.getElementById("password-box1").style.border = "1px solid red";
      document.getElementById("password-box2").style.border = "1px solid red";
      document.getElementById("changepassword-tick-box").style.display = "none";
      passwordCheck = "WRONG WRONG FALSE!!!";
    }else{
      if(passwordSame !== "") {
        if(passwordSame.length >= 3) {
          if(passwordSame.length >= 6) {
            document.getElementById("password-taken").innerHTML = passwordCorrect;
            document.getElementById("password-box1").style.border = "1px solid var(--theme2)";
            document.getElementById("password-box2").style.border = "1px solid var(--theme2)";
            document.getElementById("changepassword-tick-box").style.display = "block";
            passwordCheck = "";
          }else{
            document.getElementById("password-taken").innerHTML = passwordLength;
            document.getElementById("password-box1").style.border = "1px solid var(--theme2)";
            document.getElementById("password-box2").style.border = "1px solid var(--theme2)";
            document.getElementById("changepassword-tick-box").style.display = "block";
            passwordCheck = "";
          }
        }else{
          document.getElementById("password-taken").innerHTML = passwordShort;
          document.getElementById("password-box1").style.border = "1px solid var(--red)";
          document.getElementById("password-box2").style.border = "1px solid var(--red)";
          document.getElementById("changepassword-tick-box").style.display = "none";
          passwordCheck = "Invalid length lol too short";
        }
      }else{
        document.getElementById("password-taken").innerHTML = passwordCorrect;
        document.getElementById("password-box1").style.border = "1px solid var(--theme2)";
        document.getElementById("password-box2").style.border = "1px solid var(--theme2)";
        document.getElementById("changepassword-tick-box").style.display = "none";
        passwordCheck = "Invalid";
      }
    }
  }

  var [passwordSubmitDisabled, setPasswordSubmitDisabled] = useState(true);

  //if ready it is blank ''
  function PasswordSubmit() {
    if(document.getElementById("changepassword-tick-box").style.display === "block" && document.getElementById("current-password").value) {
      setPasswordSubmitDisabled(false);
    }else{
      setPasswordSubmitDisabled(true);
    }
  }

  var SymbolsEmail = /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;


  var [emailSubmitDisabled, SetEmailSubmitDisabled] = useState(true);

  function checkEmail() {
    var email = document.getElementById("SplashSettings-addemail-text-input-input").value;
    //empy check
    if(email){
      //format check
      if(email.match(SymbolsEmail)){
        //same email check
        if(email !== "test@test.com"){
          SetEmailSubmitDisabled(false);
          document.getElementById("SplashSettings-addemail-input").classList = "";
          document.getElementById("SplashSettings-addemail-input").classList.add(css["addemail-input"]);
        }else{
          SetEmailSubmitDisabled(true);
          document.getElementById("SplashSettings-addemail-input").classList = "";
          document.getElementById("SplashSettings-addemail-input").classList.add(css["addemail-input-taken"]);
        };
      }else{
        SetEmailSubmitDisabled(true);
        document.getElementById("SplashSettings-addemail-input").classList = "";
        document.getElementById("SplashSettings-addemail-input").classList.add(css["addemail-input-invalid"]);
      };
    }else{
      SetEmailSubmitDisabled(true);
      document.getElementById("SplashSettings-addemail-input").classList = "";
      document.getElementById("SplashSettings-addemail-input").classList.add(css["addemail-input-grey"]);
    };
  }

  return (
    <div className={cssGlobal["splashboard-full"]}>
      <Navsplash type="nav" number="3" />
      <Addons />

      {/* profile crop start */}
      <div id="profilecrop" className={`${css["profilecrop"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="profilecrop-box" className={css["profilecrop-box"]}>
          <h1>Edit Profile Picutre</h1>
          <div className={css["profilecrop-name"]}>
            <div className={css["profilecrop-inside"]}>
              <br />
            </div>
          </div>
          <div className={css["profilecrop-slider"]}>
            <input type="range" />
          </div>
          <div className={`${css["profilecrop-buttons"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["profilecrop-button1"]}>
              <input type="button"
                onClick={() => profileCrop()}
                value="Cancel"
              />
            </div>
            <div className={css["profilecrop-button2"]}>
              <input type="submit" id="profilecrop-submit"
                value="Set Profile"
              />
            </div>
          </div>
        </div>
      </div>
      {/* avatarise(); */}

      {/* profile choose image  */}
      <div id="profilemenu" className={`${css["profilemenu"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="profilemenu-box" className={css["profilemenu-box"]}>
          <h1>Edit Avatar</h1>
          <div className={`${css["profilemenu-drop"]} ${cssGlobal["flex-center-center"]}`}>
            <div className={css["profilemenu-center"]}>
              <div className={css["profilemenu-icon"]}>
                <p>
                  <i className={`${css["fas"]} ${css["fa-download"]} ${"fas fa-download"}`}></i>
                </p>
              </div>
              <p>
                <b>Drop Image</b>
              </p>
              <p>or</p>
              <div className={css["profilemenu-select"]}>
                <p>Select Image</p>
              </div>
            </div>
            <div className={`${css["profilemenu-buttons"]} ${cssGlobal["flex-center-center"]}`}>
              <div className={css["profilemenu-button-cancel"]}
                onClick={() => profileMenu()}>
                <p>Cancel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* profile choose image end */}

      {/* profile windows start */}
      <div id="profilefull" className={`${css["changeprofile"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="profilebox" className={css["changeprofile-box"]}>
          <div className={`${css["changeprofile-split"]} ${cssGlobal["flex-stretch-left"]}`}>
            {/* <div id="changeprofile-banner" className={css["changeprofile-banner"]} style="background-color:echo banner('background',$colour).color:echo banner('text',$colour).'"></div> */}
            <div className={`${css["changeprofile-section"]} ${cssGlobal["flex-stretch-left"]}`}>
              <div className={css["changeprofile-section-box"]}>
                <h1>Edit Profile</h1>
                <div className={css["changeprofile-info"]}>
                  <p>Password only required for changing username</p>
                </div>
                {/* <div className={css["profile-photo-edit"]}>
                                      <div className={css["profile-photo"]} style={{background: "url(\'/assets/images/icon1.png\')"}}></div>
                                      <div className={css["profile-photo-options"]}>
                                          <form action=""><input type="submit" value="Edit Picture"/></form>
                                          <form action=""><input type="submit" value="Reset Picture"/></form>
                                      </div>
                                  </div> */}
                <div style={{ display: "none" }} id="profile-card"></div>

                <b>Account Colour</b>
                <div className={css["changeprofile-banner-box"]}>
                  {bannerColoursList.map((list) => (
                    <i
                      disabled={changeBannerSubmitDisabled}
                      onClick={() => sendAPI("changeBanner", list.id)}
                      key={list.name}
                      className={bannerID === list.id ? (
                        `${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`
                      ):(
                        `${css["fas"]} ${css["fa-circle"]} ${"fas fa-circle"}`
                      )}
                      style={{ color: list.background }}
                    ></i>
                  ))}
                </div>
              </div>

              <div className={css["changeprofile-section-box"]}>
                <div className={css["changeprofile-section-subtitle"]}>
                  <p><b>Username</b></p>
                </div>
                <div id="change-username" className={`${css["changeprofile-type"]} ${cssGlobal["flex-center-left"]}`}>
                  <div className={css["changeprofile-input"]}>
                    <input type="text"
                      onKeyUp={() => {
                        checkUsername();
                        profileCheck();
                      }} id="username-type"
                      placeholder={username}
                    />
                  </div>
                  <div id="changeprofile-box-tick" className={css["changeprofile-box-tick"]}>
                    <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                  </div>
                  <span className={css["error-text"]}id="username-taken"></span>
                </div>
                <span className={css["error-text"]} id="username-taken"></span>
                <div className={css["changeprofile-section-subtitle"]}>
                  <p><b>Password</b></p>
                </div>
                <div className={`${css["changeprofile-type-password"]} ${cssGlobal["flex-center-left"]}`}>
                  <div className={css["changeprofile-type-box"]}>
                    <input id="profile-password"
                      onInput={(e) => e.target.setCustomValidity("")}
                      onInvalid={(e) => e.target.setCustomValidity("Please enter your password")}
                      onKeyUp={() => profileCheck()}
                      type="password"
                      placeholder="Current Password"
                      required
                    />
                  </div>
                  <div className={css["show-password"]}
                    onClick={() => showPasswordsettings()}>
                    <p>
                      <span id={css["show-password-button-on"]}>
                        <i className={`${css["fas"]} ${css["fa-eye-slash"]} ${"fas fa-eye-slash"}`}></i>
                      </span>
                      <span id={css["show-password-button-off"]}>
                        <i className={`${css["fas"]} ${css["fa-eye"]} ${"fas fa-eye"}`}></i>
                      </span>
                    </p>
                  </div>
                </div>
                <div className={css["changeprofile-section-subtitle"]}>
                  <p><b>First Name</b></p>
                </div>
                <div className={`${css["changeprofile-type"]} ${cssGlobal["flex-center-left"]}`}>
                  <div className={css["changeprofile-input"]}>
                    <input type="text"
                      onKeyUp={() => {profileCheck()}} id="firstname-type"
                      placeholder={firstName}
                    />
                  </div>
                </div>
                <div className={css["changeprofile-section-subtitle"]}>
                  <p><b>Last Name</b></p>
                </div>
                <div className={css["changeprofile-type"]}>
                  <div className={css["changeprofile-input"]}>
                    <input type="text"
                      onKeyUp={() => {profileCheck()}} id="lastname-type"
                      placeholder={lastName}
                    />
                  </div>
                </div>
              </div>

              <div className={`${css["changeprofile-buttons"]} ${cssGlobal["flex-center-left"]}`}>
                <div className={css["changeprofile-button1"]}>
                  <button onClick={() => profile()}>Close</button>
                </div>
                <div id="profile-submit-box" className={profileSubmitDisabled === true ? (css["changeprofile-button2-disabled"]):(css["changeprofile-button2"])}>
                  <button style={{display: "none"}} id="profile-submit" onClick={() => sendAPI("changeUsername")} disabled={profileSubmitDisabled}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* profile windows end */}

      {/* change password windows start */}
      <div id="passwordfull" className={`${css["changepassword"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="passwordbox" className={css["changepassword-box"]}>
          <h1>Change Password</h1>
          <p>Please enter your password to confirm the change</p>
          <p><b>New Password</b></p>
          <div id="password-box1" className={`${css["changepassword-type-password"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["changepassword-type-box"]}>
              <input id="change-password" onKeyUp={() => {checkPassword();PasswordSubmit();}}
                type="password"
                placeholder="New Password"
                required
              />
            </div>
            <div className={css["show-password"]} onClick={() => showPasswordtype()}>
              <p><span id={css["show-password-button-on1"]}>
                  <i className={`${css["fas"]} ${css["fa-eye-slash"]} ${"fas fa-eye-slash"}`}></i>
                </span>
                <span id={css["show-password-button-off1"]}>
                  <i className={`${css["fas"]} ${css["fa-eye"]} ${"fas fa-eye"}`}></i>
                </span>
              </p>
            </div>
          </div>

          <div className={css["spacing-break3"]}></div>

          <div id="password-box2" className={`${css["changepassword-type-password"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["changepassword-type-box"]}>
              <input id="confirm-password"
                onKeyUp={() => {
                  checkPassword();
                  PasswordSubmit();
                }}
                type="password"
                placeholder="Confirm Password"
                required
              />
            </div>
            <div id="changepassword-tick-box" className={css["changepassword-tick-box"]}>
              <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
            </div>
            <span className={css["error-text"]} id="password-taken"></span>
          </div>

          <p><b>Current Password</b></p>
          <div className={`${css["changepassword-type-password"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["changepassword-type-box"]}>
              <input id="current-password"
                onKeyUp={() => PasswordSubmit()}
                onInput={(e) => e.target.setCustomValidity("")}
                onInvalid={(e) => e.target.setCustomValidity("Please enter your password")}
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className={css["show-password"]}onClick={() => showPasswordcurrent()}>
              <p><span id={css["show-password-button-on2"]}>
                  <i className={`${css["fas"]} ${css["fa-eye-slash"]} ${"fas fa-eye-slash"}`}></i>
                </span>
                <span id={css["show-password-button-off2"]}>
                  <i className={`${css["fas"]} ${css["fa-eye"]} ${"fas fa-eye"}`}></i>
                </span>
              </p>
            </div>
          </div>

          <div className={css["spacing-break2"]}></div>
          <div className={`${css["changepassword-buttons"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["changepassword-button1"]}>
              <button onClick={() => password()}>Cancel</button>
            </div>
            <div id="password-submit-box" className={passwordSubmitDisabled === true ? (css["changepassword-button2-hidden"]):(css["changepassword-button2"])}>
              <button id="password-submit" onClick={() => sendAPI("changePassword")} disabled={passwordSubmitDisabled}>Change Now</button>
            </div>
          </div>
        </div>
      </div>
      {/* change password windows end */}

      {/* add email modal start */}
      <div id="addemailfull" className={`${css["addemail-full"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="addemailbox" className={css["addemail-box"]}>
          <h1>Add Email</h1>
          <div className={css["add-email-info"]}>
            <p>
              A verfication email will be sent to confirm the email address. The
              confirmation will expiry after 1 hour.
            </p>
          </div>
          <div id="SplashSettings-addemail-input" className={css["addemail-input-grey"]}>
            <div className={`${css["addemail-text"]} ${cssGlobal["flex-center-left"]}`}>
              <div className={css["addemail-text-input"]}>
                <input type="text"
                  onKeyUp={() => checkEmail()}
                  id="SplashSettings-addemail-text-input-input"
                  placeholder="Email Address"
                />
              </div>
              <div className={css["addemail-text-icon"]}>
                <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
              </div>
              <div className={css["addemail-text-message"]}>
                <span className={css["addemail-text-invalid"]}>
                  <i className={`${css["fas"]} ${css["fa-info-circle"]} ${"fas fa-info-circle"}`}></i>
                  Invalid Email
                </span>
                <span className={css["addemail-text-taken"]}>
                  <i className={`${css["fas"]} ${css["fa-info-circle"]} ${"fas fa-info-circle"}`}></i>
                  Email already added
                </span>
              </div>
            </div>
          </div>
          <div className={emailSubmitDisabled === true ? (css["add-email-submit-disabled"]):(css["add-email-submit"])}>
            <button onClick={() => sendAPI("addEmail")} value="Add Email" disabled={emailSubmitDisabled}>
              Add Email
            </button>
          </div>
          <div className={css["addemail-buttons"]}>
            <button onClick={() => addEmail()}>Cancel</button>
          </div>
        </div>
      </div>
      {/* add email modal end */}

      <div className={cssGlobal["splashboard-section"]}>
        <div className={cssGlobal["splashboard"]}>
          <div className={cssGlobal["splashboard-bottom"]}>
            <Navsplash type="top" number="3" />
            {!username || !userID || !userRank || !accountStatus || !joinDate || !passwordLastChanged || !bannerID ?
              <div className={`${css["settings-section"]} ${cssGlobal["flex-stretch-left"]}`}>
                <div className={`${css["settings-section-profile"]} ${cssGlobal["flex-center-center"]}`}>
                  <div className={css["profile"]}>
                    <div className={`${css["profile-photo"]} ${css["avatar-upload"]}`}id="profile-photo" style={{backgroundImage: "url(https://cdn.onionz.dev/global/images/favicon.png)"}}>
                    </div>
                    <p>
                      <b><span style={{margin: "auto"}} className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></b>
                      <span style={{margin: "auto", marginTop: "5px"}} className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour2"]}`}></span>
                    </p>
                    <button disabled style={{pointerEvents: "none", height: "50px"}} className={css["profile-edit"]}>
                    </button>
                  </div>
                </div>
                <div className={`${css["account-info-section"]} ${cssGlobal["flex-flex-start-left"]}`}>
                  <div className={`${css["account-info"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["account-info-title"]}>
                      <h2><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span></h2>
                    </div>
                    {[...Array(6)].map((number, index) => (
                      <div key={index} className={css["account-info-box"]}>
                        <p>
                          <b><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span></b>
                          <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>:
              <div className={`${css["settings-section"]} ${cssGlobal["flex-stretch-left"]}`}>
                <div className={`${css["settings-section-profile"]} ${cssGlobal["flex-center-center"]}`} id="profile-card"
                  style={{
                    background: bannerColoursList.find(colour => colour.name === bannerID).background,
                    color: bannerColoursList.find(colour => colour.name === bannerID).text
                  }}>
                  <div className={css["profile"]}>
                    <div className={`${css["profile-photo"]} ${css["avatar-upload"]}`}id="profile-photo" style={{backgroundImage: "url(https://cdn.onionz.dev/global/images/favicon.png)"}}>
                    </div>
                    <p><b>@{username}</b><br/>{userRank}</p>
                    <button onClick={() => profile()} className={css["profile-edit"]}>
                      <p>Edit Profile</p>
                    </button>
                  </div>
                </div>
                <div className={`${css["account-info-section"]} ${cssGlobal["flex-flex-start-left"]}`}>
                  <div className={`${css["account-info"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["account-info-title"]}>
                      <h2>Account Information</h2>
                    </div>
                    <div className={css["account-info-box"]}>
                      <p><b>Name:</b><br/>{firstName} {lastName}</p>
                    </div>
                    <div className={css["account-info-box"]}>
                      <p><b>Account ID:</b><br /><span style={{fontSize: "95%"}}>{userID}</span></p>
                    </div>
                    <div className={css["account-info-box"]}>
                      <p><b>Rank:</b><br />{userRank}</p>
                    </div>
                    <div className={css["account-info-box"]}>
                      <p><b>Account Status:</b><br />{accountStatus}</p>
                    </div>
                    <div className={css["account-info-box"]}>
                      <p><b>Join Date:</b><br />{timeFormatter("short", joinDate)}</p>
                    </div>
                    <div className={css["account-info-box"]}>
                      <p><b>Password:</b><br />From {timeFormatter("short", passwordLastChanged)}</p>
                    </div>
                  </div>
                </div>
              </div>
            }

            {/* delete in final product */}
            <button onClick={() => profileCrop()}>profile crop</button>
            <button onClick={() => profileMenu()}>change profile menu</button>

            <div className={cssGlobal["splashboard-subtitle"]}>
              <p>
                <b>Account Tools</b>
              </p>
            </div>
            {!username ?
              <div className={`${css["account-tools"]} ${cssGlobal["flex-center-left"]}`}>
                <button disabled style={{pointerEvents: "none", backgroundColor: "var(--theme2)", height: "50px", width: "100px"}} className={css["account-tools-box1"]}>
                </button>
                <button disabled style={{pointerEvents: "none", backgroundColor: "var(--theme2)", height: "50px"}} className={css["apptheme-dark"]}>
                </button>
                <button disabled style={{pointerEvents: "none", backgroundColor: "var(--theme2)", height: "50px", width: "150px"}} className={css["account-tools-box2"]}>
                </button>
              </div>:
              <div className={`${css["account-tools"]} ${cssGlobal["flex-center-left"]}`}>
                <button onClick={() => (window.location = "/logout")} className={css["account-tools-box1"]}>
                  <p>Logout</p>
                </button>
                <button className={
                    appTheme === "light"
                      ? css["apptheme-light"]
                      : css["apptheme-dark"]
                  } id="SplashSettings-apptheme"
                  onClick={() => {
                    (
                      appTheme === "light"
                      ? sendAPI("appTheme", 0)
                      : sendAPI("appTheme", 1)
                    );
                    sendAPI('appTheme')
                  }}
                  style={appThemeSubmitDisabled === true ? {opacity: "60%", cursor: "default"}:{opacity: "100%"}}
                  >
                  <div className={`${css["apptheme-button"]} ${cssGlobal["flex-center-center"]}`}>
                    <i className={`${css["apptheme-dark-icon"]} ${css["fas"]} ${css["fa-moon"]} ${"fas fa-moon"}`}></i>
                    <i className={`${css["apptheme-light-icon"]} ${css["fas"]} ${css["fa-sun"]} ${"fas fa-sun"}`}></i>
                  </div>
                </button>
                <button onClick={() => password()} className={css["account-tools-box2"]}>
                  <p>Change Password</p>
                </button>
              </div>
            }

            <div className={cssGlobal["splashboard-subtitle"]}>
              <p>
                <b>Emails</b>
                {!emailList ?
                  <span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span>:
                  <React.Fragment>
                    <br/>SDS will communicate with you through your default email, for reminders, alerts and more.
                  </React.Fragment>
                }
              </p>
            </div>
            {!emailList ?
              <div className={`${css["email"]} ${cssGlobal["flex-flex-start-left"]}`}>
                {[...Array(2)].map((number, index) => (
                  <div key={index} className={`${css["email-box-normal"]} ${cssGlobal["flex-center-left"]}`}>
                    {/* can be email-box-main or email-box-normal */}
                    <div className={css["email-icon"]}>
                      <span style={{height: "45px", borderRadius: "10px"}} className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span>
                    </div>
                    <div className={css["email-info"]}>
                      <p><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                      <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span>
                    </div>
                    <div style={{height: "45px", borderRadius: "10px", backgroundColor: "var(--theme1)"}} className={css["email-delete"]}>
                    </div>
                  </div>
                ))}
                <button disabled style={{pointerEvents: "none", height:"50px", backgroundColor: "var(--theme2)"}} className={css["add-email"]}>
                </button>
              </div>:
              <div className={`${css["email"]} ${cssGlobal["flex-flex-start-left"]}`}>
                {emailList.map((list) => (
                  <div key={list.ID} className={`${list.default === true ? (css["email-box-main"]):(css["email-box-normal"])} ${cssGlobal["flex-center-left"]}`}>
                    {/* can be email-box-main or email-box-normal */}
                    <div className={css["email-icon"]}>
                      <p>
                        {list.default === true ?
                          (<i className={`${css["fas"]} ${css["fa-envelope-open"]} ${"fas fa-envelope-open"}`}></i>):
                          (<i className={`${css["fas"]} ${css["fa-envelope"]} ${"fas fa-envelope"}`}></i>)
                        }
                      </p>
                    </div>
                    <div className={css["email-info"]}>
                      <p>{list.email}</p>
                      {list.default === true ?
                        (<div className={css["active-email"]}><p>Default Email</p></div>):
                        (<div className={css["notactive-email"]}><p><button disabled={emailDefaultSubmitDisabled} onClick={() => sendAPI("setEmailDefault", list.id)}>Make default</button></p></div>)
                      }
                    </div>
                    <div className={css["email-delete"]}>
                      {list.default === true ?
                        (
                          <span className={css["active-email"]}>
                            <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                          </span>
                        ):(
                          <button onClick={() => sendAPI("removeEmail", list.ID)}>
                            <i className={`${css["fas"]} ${css["fa-trash"]} ${"fas fa-trash"}`}></i>
                          </button>
                        )
                      }
                    </div>
                  </div>
                ))}
                <button className={css["add-email"]} onClick={() => addEmail()}>
                  <p>Add Email</p>
                </button>
              </div>
            }

            <div className={cssGlobal["splashboard-subtitle"]}>
              <p>
                <b>Login Activity</b>
              </p>
            </div>
            {!loginActivityList ?
              <div className={`${css["login-activity"]} ${cssGlobal["flex-stretch-center"]}`}>
                <div className={`${css["login-activity-box-title"]} ${cssGlobal["flex-center-left"]}`}>
                  <div className={css["login-activity-device"]}>
                    <span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span>
                  </div>
                  <div className={css["login-activity-location"]}>
                    <span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span>
                  </div>
                  <div className={css["login-activity-date"]}>
                    <span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span>
                  </div>
                </div>

                {[...Array(3)].map((number, index) => (
                  <div key={index} className={`${css["login-activity-box"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["login-activity-device"]}>
                      <p>
                        <span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span>
                      </p>
                    </div>
                    <div className={css["login-activity-location"]}>
                      <p><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                    </div>
                    <div className={css["login-activity-date"]}>
                      <p><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                    </div>
                    <div className={css["login-activity-button"]}>
                      <button disabled style={{pointerEvents: "none", height: "40px"}} className={css["login-activity-status2"]}></button>
                    </div>
                  </div>
                ))}
              </div>:
              <div className={`${css["login-activity"]} ${cssGlobal["flex-stretch-center"]}`}>
                <div className={`${css["login-activity-box-title"]} ${cssGlobal["flex-center-left"]}`}>
                  <div className={css["login-activity-device"]}>
                    <p>Device</p>
                  </div>
                  <div className={css["login-activity-location"]}>
                    <p>Location</p>
                  </div>
                  <div className={css["login-activity-date"]}>
                    <p>Login Date</p>
                  </div>
                </div>

                {loginActivityList.map((list) => (
                  <div key={list.ID} className={`${css["login-activity-box"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["login-activity-device"]}>
                      <p>
                        {list.deviceType === "Desktop" &&
                          <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-desktop"}`}></i>
                        }
                        {list.deviceType === "Mobile" &&
                          <i className={`${css["fas"]} ${css["fa-1x"]} ${"fas fa-mobile"}`}></i>
                        }
                        {list.deviceType}
                      </p>
                    </div>
                    <div className={css["login-activity-location"]}>
                      <p>{list.location}</p>
                    </div>
                    <div className={css["login-activity-date"]}>
                      <p>{list.lastLogin}</p>
                    </div>
                    <div className={css["login-activity-button"]}>
                      {list.current === true ?
                        <button className={css["login-activity-status1"]}>Active</button>:
                        <button onClick={() => sendAPI("removeLoginActivity", list.ID)} className={css["login-activity-status2"]}>Remove</button>
                      }
                    </div>
                  </div>
                ))}
              </div>
            }

            <div className={cssGlobal["splashboard-subtitle"]}>
              <p>
                <b>Security Zone</b>
              </p>
            </div>
            {!accountStatus ?
              <div className={`${css["security-zone"]} ${cssGlobal["flex-stretch-left"]}`}>
                {[...Array(3)].map((number, index) => (
                  <div key={index} className={`${css["security-zone-box"]} ${cssGlobal["flex-flex-start-left"]}`}>
                    <div className={css["security-zone-text"]}>
                      <b><span style={{height: "30px", marginBottom: "10px"}}className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span></b>
                      <p>
                        <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour2"]}`}></span>
                        <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span>
                      </p>
                    </div>
                    <div className={css["security-zone-button"]}>
                      <button disabled style={{pointerEvents: "none", height: "50px"}}>
                      </button>
                    </div>
                  </div>
                ))}
              </div>:
              <div className={`${css["security-zone"]} ${cssGlobal["flex-stretch-left"]}`}>
                {accountStatus === "Open" &&
                  <div className={`${css["security-zone-box"]} ${cssGlobal["flex-flex-start-left"]}`}>
                    <div className={css["security-zone-text"]}>
                      <b>Lockdown Account</b>
                      <p>
                        Locking down will prevent new login sessions from other
                        devices
                      </p>
                    </div>
                    <div className={css["security-zone-button"]}>
                      <button onClick={() => lockacc()}>
                        <p>Learn more</p>
                      </button>
                    </div>
                  </div>
                }{accountStatus === "Locked" &&
                  <div className={`${css["security-zone-box"]} ${cssGlobal["flex-flex-start-left"]}`}>
                    <div className={css["security-zone-text"]}>
                      <b>Open Account</b>
                      <p>
                        Opening your account will allow new login sessions
                      </p>
                    </div>
                    <div className={css["security-zone-button"]}>
                      <button onClick={() => unlockacc()}>
                        <p>Learn more</p>
                      </button>
                    </div>
                  </div>
                }

                <div className={`${css["security-zone-box"]} ${cssGlobal["flex-flex-start-left"]}`}>
                  <div className={css["security-zone-text"]}>
                    <b>Disable Account</b>
                    <p>
                      Disabling your account will shut down your account as if it
                      were deleted
                    </p>
                  </div>
                  <div className={css["security-zone-button"]}>
                    <button onClick={() => disableacc()}>
                      <p>Learn more</p>
                    </button>
                  </div>
                </div>
                <div className={`${css["security-zone-box"]} ${cssGlobal["flex-flex-start-left"]}`}>
                  <div className={css["security-zone-text"]}>
                    <b>Delete Account</b>
                    <p>
                      Deleting your account will remove it permanently from
                      existence.
                    </p>
                  </div>
                  <div className={css["security-zone-button"]}>
                    <button onClick={() => deleteacc()}>
                      <p>Learn more</p>
                    </button>
                  </div>
                </div>
              </div>
            }
            <div id="unlockfull" className={css["changedelete"]}>
              <div id="unlockbox" className={css["changedelete-box"]}>
                <h1>Unlock Account</h1>
                <p>
                  If you wish to unlock your account, please read the following:
                </p>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  You can choose to lock your account at any moment again
                </li>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  Your account can be accessed by any new login sessions once opened
                </li>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  You can now delete your account, delete a server or make any billing transaction.
                </li>
                <p>
                  Want to know more about account status? Read more about account security <a href="/help/account-security">here</a>
                </p>
                <div className={`${css["changedelete-buttons"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["changedelete-button-cancel"]}>
                      <button onClick={() => unlockacc()}>Cancel</button>
                    </div>
                    <div className={css["changedelete-button-confirm"]}>
                      <button disabled={unlockAccountSubmitDisabled} onClick={() => sendAPI("unlockAccount")} className={css["changedeletebutton-on"]}>Unlock Now</button>
                    </div>
                  </div>
              </div>
            </div>

            {/* lock account windows start */}
            <div id="lockfull" className={css["changedelete"]}>
              <div id="lockbox" className={css["changedelete-box"]}>
                <h1>Lock Account</h1>
                <p>
                  If you wish to lock your account, please read the following:
                </p>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  You can choose to unlock your account at any moment
                </li>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  Your account can only be accessed by the current list of
                  existing sessions (under Login Activity)
                </li>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  You cannot login from any other devices anymore
                </li>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  You are unable to delete your account, delete a server or make
                  any billing transactions while locked
                </li>
                <p style={{ color: "var(--red)" }}>
                  <i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${css["fa-1x"]} ${"fas fa-exclamation-circle fa-1x"}`}></i>
                  If you are locked out of your account completely, contact
                  support for assistance
                </p>
                <div className={css["changedelete-confirm"]}>
                  <p>
                    {lockAccountSubmitDisabled === true ?
                      <i onClick={() => SetLockAccountSubmitDisabled(false)} className={`${css["far"]} ${css["fa-square"]} ${"far fa-square"}`}></i>:
                      <i onClick={() => SetLockAccountSubmitDisabled(true)} className={`${css["fas"]} ${css["fa-check-square"]} ${"fas fa-check-square"}`}></i>
                    }
                    I have read everything and want to lock my account now
                  </p>
                  <div className={css["changedelete-buttons"]}>
                    <div className={css["changedelete-button-cancel"]}>
                      <button onClick={() => lockacc()}>Cancel</button>
                    </div>
                    <div className={css["changedelete-button-confirm"]}>
                      <button onClick={() => sendAPI("lockAccount")} id="changelock-confirm" className={lockAccountSubmitDisabled === true ? (css["changedelete-button-off"]):(css["changedelete-button-on"])} disabled={lockAccountSubmitDisabled}>Lock Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* disable account windows start */}
            <div id="disablefull" className={css["changedelete"]}>
              <div id="disablebox" className={css["changedelete-box"]}>
                <h1>Disable Account</h1>
                <p>
                  If you wish to disable your Stax Developer Suite account,
                  please read the following:
                </p>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  The account will be disabled until you choose to reactivate it
                </li>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  You cannot disable your account if you currently own an active
                  plan
                </li>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  You cannot login to the account anymore
                </li>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  Your account will be invisible and viewed as deleted to other
                  users
                </li>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  All billing transactions will be frozen
                </li>
                <p style={{ color: "var(--red)" }}>
                  <i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${css["fa-1x"]} ${"fas fa-exclamation-circle fa-1x"}`}></i>
                  If you want to reactivate your account, contact support for
                  assistance
                </p>
                <div className={css["changedelete-confirm"]}>
                  <p>
                    {disableAccountSubmitDisabled === true ?
                      <i onClick={() => SetDisableAccountSubmitDisabled(false)} className={`${css["far"]} ${css["fa-square"]} ${"far fa-square"}`}></i>:
                      <i onClick={() => SetDisableAccountSubmitDisabled(true)} className={`${css["fas"]} ${css["fa-check-square"]} ${"fas fa-check-square"}`}></i>
                    }
                    I have read everything and want to disable my account now
                  </p>
                  <div className={css["changedelete-buttons"]}>
                    <div className={css["changedelete-button-cancel"]}>
                      <button onClick={() => disableacc()}>Cancel</button>
                    </div>
                    <div className={css["changedelete-button-confirm"]}>
                      <button onClick={() => sendAPI("disableAccount")} id="changedisable-confirm" className={disableAccountSubmitDisabled === true ? (css["changedelete-button-off"]):(css["changedelete-button-on"])} disabled={disableAccountSubmitDisabled}>Disable Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* delete account windows start */}
            <div id="deletefull" className={css["changedelete"]}>
              <div id="deletebox" className={css["changedelete-box"]}>
                <h1>Account Deletion</h1>
                <p>
                  If you wish to delete your Stax Developer Suite account,
                  please read the following:
                </p>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  The account will be deleted permanently and cannot be reversed
                </li>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  Anything related to your account will be deleted, including
                  purchases, integrations..etc
                </li>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  You will no longer be able to retrieve anything or login to
                  the account
                </li>
                <li>
                  <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  The account deletion process will take place after 10 days. If
                  you attempt to login to your account within those 10 days, the
                  account deletion will be stopped.
                </li>
                <p style={{ color: "var(--red)" }}>
                  <i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${css["fa-1x"]} ${"fas fa-exclamation-circle fa-1x"}`}></i>
                  If you are unsure about deleting your account, please contact
                  support for guidance
                </p>
                <div className={css["changedelete-confirm"]}>
                  <p>
                    {deleteAccountSubmitDisabled === true ?
                      <i onClick={() => SetDeleteAccountSubmitDisabled(false)} className={`${css["far"]} ${css["fa-square"]} ${"far fa-square"}`}></i>:
                      <i onClick={() => SetDeleteAccountSubmitDisabled(true)} className={`${css["fas"]} ${css["fa-check-square"]} ${"fas fa-check-square"}`}></i>
                    }
                    I have read everything and want to delete my account now
                  </p>
                  <div className={css["changedelete-buttons"]}>
                    <div className={css["changedelete-button-cancel"]}>
                      <button onClick={() => deleteacc()}>Cancel</button>
                    </div>
                    <div className={css["changedelete-button-confirm"]}>
                      <button onClick={() => sendAPI("deleteAccount")} id="changedelete-confirm" className={deleteAccountSubmitDisabled === true ? (css["changedelete-button-off"]):(css["changedelete-button-on"])} disabled={deleteAccountSubmitDisabled}>Delete Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
