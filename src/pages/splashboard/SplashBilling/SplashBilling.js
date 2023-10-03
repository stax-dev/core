//React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import Button from "../../../components/button/Button";
import axios from "axios";

//External

import {
  Test,
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
import Navsplash from "../../../components/navsplash/Navsplash";

//Main
import css from "./SplashBilling.module.css";

//Images
import payIcon_visa from "../../../images/payments/Visa.svg";
import payIcon_mastercard from "../../../images/payments/Mastercard.svg";
import payIcon_paypal from "../../../images/payments/Paypal.svg";
import payIcon_amex from "../../../images/payments/Amex.svg";
import payIcon_discover from "../../../images/payments/Discover.svg";
// import test from "../../../images/payments/WeChat.svg";

//Extra
import bannerColoursList from "../../../components/data/bannerColours";
import { APIRoutes } from "../../../components/data/APIRoutes";

export default function SplashBilling() {


  //user static
  var [bannerID, setBannerID] = useState(6);
  var [username, setUsername] = useState();
  var [appTheme, setAppTheme] = useState();

  //user dynamic
  var [userBalance, setuserBalance] = useState();
  var [addressList, setAddressList] = useState();
  var [paymentList, setPaymentList] = useState();
  var [transactionList, setTransactionList] = useState();

  //external data
  var sessionID = localStorage.getItem("sessionID");

  //dummy data
  /*
  var [bannerID, setBannerID] = useState(2);
  var [username, setUsername] = useState("Dasho");
  var [appTheme, setAppTheme] = useState();

  //user dynamic
  var [userBalance, setuserBalance] = useState(14.5234);
  var [addressList, setAddressList] = useState([
    {
      id: 1,
      nickname: "Home",
      default: true,
      fullName: "John Doe",
      country: "Ireland",
      address1: "1234 Main Street, Dublin, Ireland",
      postal: "D01 123",
    },
    {
      id: 2,
      nickname: "Work",
      default: false,
      fullName: "Frank Smith",
      country: "Ireland",
      address1: "1234 Main Street, Dublin, Ireland",
      address2: "Apartment 1",
      postal: "D01 123",
    },
    {
      id: 3,
      nickname: "Holiday Home",
      default: false,
      fullName: "John Doe",
      country: "Ireland",
      address1: "1234 Main Street, Dublin, Ireland",
      postal: "D01 123",
    }
  ]);
  var [paymentList, setPaymentList] = useState([
    {
      id: 1,
      type: "Visa",
      info: "1234123412347176",
      expiry: "12/24",
      cvv: "123",
      name: "John Doe",
      default: true,
      safeinfo: "Ending 9523",
      linkedAddressID: 1,
    },
    {
      id: 2,
      type: "Mastercard",
      info: "1234123412340092",
      expiry: "12/24",
      cvv: "123",
      name: "John Doe",
      default: false,
      safeinfo: "Ending 9523",
      linkedAddressID: 0,
    },
    {
      id: 3,
      type: "Paypal",
      info: "hudson101@gmail.com",
      default: false,
      safeinfo: "hud*@gmail.com",
      linkedAddressID: 2,
    }
  ]);
  var [transactionList, setTransactionList] = useState([
    {
      id: 1,
      typeID: 1,
      date: "2022-02-14T14:32",
      paymentUsed: "Visa Debit Ending 1942",
      amount: -9.3439510928509341,
    },
    {
      id: 2,
      typeID: 2,
      date: "2021-05-29T00:32",
      paymentUsed: "Mastercard Credit Ending 1942",
      amount: +9.5252345123421365
    },
    {
      id: 3,
      typeID: 3,
      date: "2023-01-26T12:32",
      paymentUsed: "Paypal",
      amount: -5,
    },
    {
      id: 4,
      typeID: 4,
      date: "2023-01-27T12:42",
      paymentUsed: "Paypal",
      amount: -1.42424,
    },
    {
      id: 5,
      typeID: 5,
      date: "2023-01-28T08:42",
      paymentUsed: "Paypal",
      amount: 1.42424,
    },
    {
      id: 6,
      typeID: 1,
      date: "2023-01-29T14:32",
      paymentUsed: "Paypal",
      amount: 892.32412344,
    },
    {
      id: 7,
      typeID: 2,
      date: "2023-01-30T08:32",
      paymentUsed: "MAstercard Credit Ending 1942",
      amount: 41.9323,
    }
  ]);
  */

  document.documentElement.setAttribute("data-apptheme", appTheme);
  document.body.style.overflow = 'auto';


  var userStatic = [
    APIRoutes.bannerID,
    APIRoutes.username,
    APIRoutes.appTheme,
  ]

  var userDynamic = [
    APIRoutes.userBalance,
    APIRoutes.addressList,
    APIRoutes.paymentList,
    APIRoutes.transactionList,
  ]

  useEffect(() => {
    APIRequest("all");
  })

  function APIRequest(type) {
    //verify session
    axios.get(APIRoutes.meURL, {
      header:{
        Authorization: `session ${sessionID}`,
      }
    })
    .then(responseMe => {
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
          setAppTheme(response[2].data);
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
          setuserBalance(response[0].data);
          setAddressList(response[1].data);
          setPaymentList(response[2].data);
          setTransactionList(response[3].data);
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
    if(type === "addBalance"){
      console.log("addBalance")
    }else if(type === "addPayment"){
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
        },
        {
          default: true,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planDynamic"); //refresh data
          snackbarNotification(1, "Default Payment Updated"); //show alert
        }else{
          snackbarNotification(2, "Error Updating Default Payment"); //show alert
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
    }else if(type === "setPaymentDefault"){
      setDefaultPaymentSubmitDisabled(true); //disable button
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
        },
        {
          default: true,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planDynamic"); //refresh data
          snackbarNotification(1, "Default Payment Updated"); //show alert
        }else{
          snackbarNotification(2, "Error Updating Default Payment"); //show alert
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
        setDefaultPaymentSubmitDisabled(false); //remove disable button
      })
    }else if(type === "deletePayment"){
      setDeletePaymentSubmitDisabled(true);
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
        if(response.data.success === true){
          APIRequest("userDynamic"); //refresh data
          editPayment(); //close modal
          snackbarNotification(1, "Payment Option Deleted"); //show alert
        }else{
          snackbarNotification(2, "Error Deleting Payment"); //show alert
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
        setDeletePaymentSubmitDisabled(false);
      })
    }else if(type === "editPayment"){
      setEditPaymentSubmitDisabled(true); //disable button
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
        },
        {
          default: true,
        }
      )
      .then(response => {
        if(response.status === 200){
          APIRequest("planDynamic"); //refresh data
          snackbarNotification(1, "Payment Saved"); //show alert
          editPayment()//close modal
        }else{
          snackbarNotification(2, "Error Saving Payment"); //show alert
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
        chooseNewLinkedAddress(-923);
      })
    }else if(type === "addAddress"){
      setAddAddressSubmitDisabled(true);
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `sessionID ${sessionID}`,
          },
        },
        {
          default: true,
        }
      )
      .then(response => {
        if(response.status === 200){
          addAddress(); //close modal
          APIRequest("planDynamic"); //refresh data
          snackbarNotification(1, "Address Added"); //show alert
        }else{
          snackbarNotification(2, "Error Adding Address"); //show alert
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
        setAddAddressSubmitDisabled(false);
      });
    }else if(type === "deleteAddress"){
      setDeleteAddressSubmitDisabled(true);
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
        if(response.data.success === true){
          APIRequest("userDynamic"); //refresh data
          deleteAddress(); //close modal
          snackbarNotification(1, "Address Deleted"); //show alert
        }else{
          snackbarNotification(2, "Error Deleting Address"); //show alert
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
        setDeleteAddressSubmitDisabled(false);
      })
    }else if(type === "editAddress"){
      console.log("editAddress")
    }else{
      return;
    }
  }

  var [defaultPaymentSubmitDisabled, setDefaultPaymentSubmitDisabled] = useState(false);
  var [linkAddressSubmitDisabled, setLinkAddressSubmitDisabled] = useState(false);
  var [editPaymentSubmitDisabled, setEditPaymentSubmitDisabled] = useState(false);
  var [deletePaymentSubmitDisabled, setDeletePaymentSubmitDisabled] = useState(false);
  var [deleteAddressSubmitDisabled, setDeleteAddressSubmitDisabled] = useState(false);
  var [addAddressSubmitDisabled, setAddAddressSubmitDisabled] = useState(false);








  /*
  //add balance modal
  var addbalancebox = document.getElementById("addbalance-box");
  var addbalance = document.getElementById("addbalance");

  //search transaction
  var searchtransactionbox = document.getElementById("searchtransaction-box");
  var searchtransaction = document.getElementById("searchtransaction");
  */

  function addBalance() {
    var addbalancebox = document.getElementById("addbalance-box");
    var addbalance = document.getElementById("addbalance");
    if (addbalance.style.transform === "scale(1)") {
      addbalancebox.style.transform = "scale(0.4)";
      setTimeout(() => {
        addbalance.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      addbalancebox.scrollTop = 0;
      addbalance.style.transform = "scale(1)";
      addbalancebox.style.transform = "scale(1)";
      document.getElementById("addbalance-button-submit").classList.remove(css["addbalance-button-submit"]);
      document.getElementById("addbalance-button-submit").classList.add(css["addbalance-button-submit-off"]);
      document.getElementById("addbalance-button-submit").disabled = false;
      document.getElementById("addbalance-input").value = "";
      document.getElementById("addbalance-message").innerHTML = amountCorrect;
      document.getElementById("addbalance-text").style.border = "1px solid var(--theme2)";
      document.getElementById("addbalance-tick").style.display = "none";
    }
  }

  function transactionFilter() {
    var transactionfilterbox = document.getElementById("transactionfilter-box");
    var transactionfilter = document.getElementById("transactionfilter");
    if (transactionfilter.style.transform === "scale(1)") {
      transactionfilterbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        transactionfilter.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
      }else{
        document.body.style.overflow = 'hidden';
        transactionfilterbox.scrollTop = 0;
        transactionfilter.style.transform = "scale(1)";
        transactionfilterbox.style.transform = "scale(1)";
    }
  }

  window.onclick = function(closeModal){
    var addbalance = document.getElementById("addbalance");
    var transactionfilter = document.getElementById("transactionfilter");
    if(closeModal.target === addbalance) {
      addBalance();
    }else if(closeModal.target === transactionfilter) {
      transactionFilter();
    }
  };

  window.onkeyup = function (closeEscape) {
    var addbalance = document.getElementById("addbalance");
    var transactionfilter = document.getElementById("transactionfilter");
    if (closeEscape.keyCode === 27) {
      if (addbalance.style.transform === "scale(1)") {
        addBalance();
      }else if(transactionfilter.style.transform === "scale(1)") {
        transactionFilter();
      }
    }
  };

  function addPayment(){
    var paymentbox = document.getElementById("addpayment-box");
    var paymentfull = document.getElementById("addpayment-full");
    if(paymentbox.style.transform === "scale(1)"){
      paymentbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        paymentfull.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      paymentbox.scrollTop = 0;
      paymentfull.style.transform = "scale(1)";
      paymentbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
      //reset input boxes
      document.getElementById("SplashBilling-saved-payments-details-number-input").value = "";
      document.getElementById("SplashBilling-saved-payments-details-expiry-input").value = "";
      document.getElementById("SplashBilling-saved-payments-details-cvv-input").value = "";
      document.getElementById("SplashBilling-saved-payments-details-name-input").value = "";

      document.getElementById("SplashBilling-address-linked-list").style.height = '0px';

    }
  };

  var amountCorrect = "";
  var amountMin = '<p><i class="' + css["fas"] + ' fas fa-exclamation-circle"></i>Minimum Topup of €1</p>';
  var amountMax = '<p><i class="' + css["fas"] + ' fas fa-exclamation-circle"></i>Maximum Topup of €1000</p>';

  var [balanceSubmit, setBalanceSubmit] = useState(true);

  function balanceCheck() {
    var balanceInput = document.getElementById("addbalance-input").value;

    if (balanceInput !== "") {
      //input check
      if (balanceInput >= 1) {
        //min topup amount check
        if(balanceInput <= 1000){
          //max topup amount check
          document.getElementById("addbalance-message").innerHTML = amountCorrect;
          document.getElementById("addbalance-text").style.border = "1px solid var(--accent)";
          document.getElementById("addbalance-tick").style.display = "block";
          document.getElementById("addbalance-button-submit").classList.replace(css["addbalance-button-submit-off"], css["addbalance-button-submit"]);
          document.getElementById("addbalance-button-submit").removeAttribute("disabled");
          setBalanceSubmit(false);
        }else{
          document.getElementById("addbalance-message").innerHTML = amountMax;
          document.getElementById("addbalance-text").style.border = "1px solid var(--red)";
          document.getElementById("addbalance-tick").style.display = "none";
          document.getElementById("addbalance-button-submit").classList.replace(css["addbalance-button-submit"], css["addbalance-button-submit-off"]);
          document.getElementById("addbalance-button-submit").setAttribute("disabled",  '');
          setBalanceSubmit(true);
        }
      }else{
        document.getElementById("addbalance-message").innerHTML = amountMin;
        document.getElementById("addbalance-text").style.border = "1px solid var(--red)";
        document.getElementById("addbalance-tick").style.display = "none";
        document.getElementById("addbalance-button-submit").classList.replace(css["addbalance-button-submit"], css["addbalance-button-submit-off"]);
        document.getElementById("addbalance-button-submit").setAttribute("disabled",  '');
        setBalanceSubmit(true);
      }
    }else{
      document.getElementById("addbalance-message").innerHTML = amountCorrect;
      document.getElementById("addbalance-text").style.border =  "1px solid var(--theme2)";
      document.getElementById("addbalance-tick").style.display = "none";
      document.getElementById("addbalance-button-submit").classList.replace(css["addbalance-button-submit"], css["addbalance-button-submit-off"]);
      document.getElementById("addbalance-button-submit").setAttribute("disabled",  '');
      setBalanceSubmit(true);
    }
  }

  var [payment, setPayment] = useState("creditcard");
  function payOption(type) {
    document.getElementById("SplashBilling-addpayment-payment-type").className = "";
    document.getElementById("SplashBilling-addpayment-payment-type").classList.add(css["addpayment-payment-" + type]);
    setPayment(type);
  }

  var [addressType, SetAddressType] = useState(1);

  function addAddress(id){
    var addressbox = document.getElementById("addaddress-box");
    var addressfull = document.getElementById("addaddress-full");

    if(addressbox.style.transform === "scale(1)"){
      addressbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        addressfull.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      SetAddressType(id);
      if(id !== 0){
        SetAddressType(id);
        document.getElementById("SplashBilling-billing-details-box1-input-nickname").value = addressList.find(addressList => addressList.id === id).nickname ? addressList.find(addressList => addressList.id === id).nickname : "";
        document.getElementById("SplashBilling-billing-details-box1-input-fullname").value = addressList.find(addressList => addressList.id === id).fullName ? addressList.find(addressList => addressList.id === id).fullName : "";
        document.getElementById("SplashBilling-billing-details-box1-input-address1").value = addressList.find(addressList => addressList.id === id).address1 ? addressList.find(addressList => addressList.id === id).address1 : "";
        document.getElementById("SplashBilling-billing-details-box1-input-address2").value = addressList.find(addressList => addressList.id === id).address2 ? addressList.find(addressList => addressList.id === id).address2 : "";
        document.getElementById("SplashBilling-billing-details-box2-input-country").value = addressList.find(addressList => addressList.id === id).country ? addressList.find(addressList => addressList.id === id).country : "";
        // document.getElementById("SplashBilling-billing-details-box3-input-city").value = addressList.find(addressList => addressList.id === id).city;
        // document.getElementById("SplashBilling-billing-details-box3-input-state").value = addressList.find(addressList => addressList.id === id).state;
        document.getElementById("SplashBilling-billing-details-box3-input-postal").value = addressList.find(addressList => addressList.id === id).postal ? addressList.find(addressList => addressList.id === id).postal : "";
      }else{
        addressbox.querySelectorAll('input[type="text"]').forEach(input => {
          input.value = '';
        });
      }
      document.getElementById("SplashBilling-nickname-status").className = "";
      document.getElementById("SplashBilling-nickname-status").classList.add(css["nickname-status-off"]);

      addressbox.scrollTop = 0;
      addressfull.style.transform = "scale(1)";
      addressbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
    }
  };

  // this function shows list of addresses in editPayment modal
  function showAddress(){
    //addpayment modal
    if(document.getElementById("SplashBilling-address-linked-list").style.height === document.getElementById("SplashBilling-address-linked-list").scrollHeight + "px"){
      document.getElementById("SplashBilling-address-linked-list").style.height = '0px';
    }else{
      document.getElementById("SplashBilling-address-linked-list").style.height = document.getElementById("SplashBilling-address-linked-list").scrollHeight + "px";
    }
    // editpayment modal
    if(document.getElementById("SplashBilling-address-linked-list--2").style.height === document.getElementById("SplashBilling-address-linked-list--2").scrollHeight + "px"){
      document.getElementById("SplashBilling-address-linked-list--2").style.height = '0px';
    }else{
      document.getElementById("SplashBilling-address-linked-list--2").style.height = document.getElementById("SplashBilling-address-linked-list--2").scrollHeight + "px";
    }
  }

  function editPayment(id) {
    var editpaymentbox = document.getElementById("editpayment-box");
    var editpayment = document.getElementById("editpayment");
    if (editpayment.style.transform === "scale(1)") {
      editpaymentbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        editpayment.style.transform = "scale(0)";
      }, 150);
      document.getElementById("SplashBilling-address-linked-list--2").style.height = '0px';
      document.body.style.overflow = 'auto';
    }else{
      setNewLinkedAddress(-1);
      setEditPaymentSubmitDisabled(true);
      SetChooseEditPayment(id);
      editpaymentbox.scrollTop = 0;
      editpayment.style.transform = "scale(1)";
      editpaymentbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
    }
  }



  var [chooseEditPayment, SetChooseEditPayment] = useState(1);
  var [chooseRemoveAddress, SetChooseRemoveAddress] = useState(1);

  var [newLinkedAddress, setNewLinkedAddress] = useState(-1);

  function chooseNewLinkedAddress(id){
    if(id !== -923){
      setNewLinkedAddress(id);
    }

    if(id === paymentList.find(id => id.id === chooseEditPayment).linkedAddressID){
      setEditPaymentSubmitDisabled(true);
    }else{
      setEditPaymentSubmitDisabled(false);
    }
  }


  function deleteAddress(id) {
    var deleteaddressbox = document.getElementById("deleteaddress-box");
    var deleteaddress = document.getElementById("deleteaddress");
    if(deleteaddress.style.transform === "scale(1)"){
      deleteaddressbox.style.transform = "scale(0.4)";
      setTimeout(() => {
        deleteaddress.style.transform = "scale(0)";
      }, 150);
      document.body.style.overflow = 'auto';
    }else{
      SetChooseRemoveAddress(id);
      deleteaddressbox.scrollTop = 0;
      deleteaddress.style.transform = "scale(1)";
      deleteaddressbox.style.transform = "scale(1)";
      document.body.style.overflow = 'hidden';
    }
  }

  function nicknameCheck(){
    //empty check
    if(document.getElementById("SplashBilling-billing-details-box1-input-nickname").value.toLowerCase()){
      //same name check
      if(!addressList.find(addressList => addressList.nickname.toLowerCase() === document.getElementById("SplashBilling-billing-details-box1-input-nickname").value.toLowerCase())){
        document.getElementById("SplashBilling-nickname-status").className = "";
        document.getElementById("SplashBilling-nickname-status").classList.add(css["nickname-status"]);
      }else{
        if(addressType === 0){
          document.getElementById("SplashBilling-nickname-status").className = "";
          document.getElementById("SplashBilling-nickname-status").classList.add(css["nickname-status-same"]);
        }else{
          //original name check
          if(document.getElementById("SplashBilling-billing-details-box1-input-nickname").value.toLowerCase()  === addressList.find(addressList => addressList.id === addressType).nickname.toLowerCase()){
            document.getElementById("SplashBilling-nickname-status").className = "";
            document.getElementById("SplashBilling-nickname-status").classList.add(css["nickname-status"]);
          }else{
            document.getElementById("SplashBilling-nickname-status").className = "";
            document.getElementById("SplashBilling-nickname-status").classList.add(css["nickname-status-same"]);
          }
        }
      }
    }else{
      document.getElementById("SplashBilling-nickname-status").className = "";
      document.getElementById("SplashBilling-nickname-status").classList.add(css["nickname-status-empty"]);
    }
  }

  var transactionMinView = 10;
  var transactionLoadAmount = 10;
  var [transactionCurrentView, SetTransactionCurrentView] = useState(transactionMinView);

  function transactionLoad(type){
    if(type === "add"){
      SetTransactionCurrentView(transactionCurrentView + transactionLoadAmount);
    }else if(type === "remove"){
      if(transactionCurrentView > transactionMinView){
        SetTransactionCurrentView(transactionCurrentView - transactionLoadAmount);
      }
    }
  }

  var transactionTypes = [
    {
      id: 1,
      type: "Wallet Topup",
    },
    {
      id: 2,
      type: "Plan Refund",
    },
    {
      id: 3,
      type: "Change Plan",
    },
    {
      id: 4,
      type: "Purchase Plan",
    },
    {
      id: 5,
      type: "Renew Plan",
    }
  ];

  var dateFormat = /^(0?[1-9]|[1-2][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;

  function filterCheck(type){
    if(type === "startdate"){
      //empty check
      if(document.getElementById("SplashBilling-transactionfilter-input-type-input-startdate").value){
        //format check
        if(document.getElementById("SplashBilling-transactionfilter-input-type-input-startdate").value.match(dateFormat)){
          document.getElementById("SplashBilling-transactionfilter-status-startdate").className = "";
          document.getElementById("SplashBilling-transactionfilter-status-startdate").classList.add(css["transactionfilter-status"]);
          // document.getElementById("SplashBilling-transactionfilter-buttons-submit").classList.replace(css["transactionfilter-buttons-submit-disable"], css["transactionfilter-buttons-submit"]);
        }else{
          document.getElementById("SplashBilling-transactionfilter-status-startdate").className = "";
        document.getElementById("SplashBilling-transactionfilter-status-startdate").classList.add(css["transactionfilter-status-format"]);
        // document.getElementById("SplashBilling-transactionfilter-buttons-submit").classList.replace(css["transactionfilter-buttons-submit"], css["transactionfilter-buttons-submit-disable"]);
        }
      }else{
        document.getElementById("SplashBilling-transactionfilter-status-startdate").className = "";
        document.getElementById("SplashBilling-transactionfilter-status-startdate").classList.add(css["transactonfilter-status-off"]);
        // document.getElementById("SplashBilling-transactionfilter-buttons-submit").classList.replace(css["transactionfilter-buttons-submit-disable"], css["transactionfilter-buttons-submit"]);
      }
    }else if(type === "enddate"){
      //empty check
      if(document.getElementById("SplashBilling-transactionfilter-input-type-input-enddate").value){
        //format check
        if(document.getElementById("SplashBilling-transactionfilter-input-type-input-enddate").value.match(dateFormat)){
          document.getElementById("SplashBilling-transactionfilter-status-enddate").className = "";
          document.getElementById("SplashBilling-transactionfilter-status-enddate").classList.add(css["transactionfilter-status"]);
          // document.getElementById("SplashBilling-transactionfilter-buttons-submit").classList.replace(css["transactionfilter-buttons-submit-disable"], css["transactionfilter-buttons-submit"]);
        }else{
          document.getElementById("SplashBilling-transactionfilter-status-enddate").className = "";
          document.getElementById("SplashBilling-transactionfilter-status-enddate").classList.add(css["transactionfilter-status-format"]);
          // document.getElementById("SplashBilling-transactionfilter-buttons-submit").classList.replace(css["transactionfilter-buttons-submit"], css["transactionfilter-buttons-submit-disable"]);
        }
      }else{
        document.getElementById("SplashBilling-transactionfilter-status-enddate").className = "";
        document.getElementById("SplashBilling-transactionfilter-status-enddate").classList.add(css["transactionfilter-status-off"]);
        // document.getElementById("SplashBilling-transactionfilter-buttons-submit").classList.replace(css["transactionfilter-buttons-submit-disable"], css["transactionfilter-buttons-submit"]);
      }
    }else if(type === "range"){
      //empty check
      if(document.getElementById("SplashBilling-transactionfilter-input-type-input-startrange").value){
        //range check
        if(
          parseInt(document.getElementById("SplashBilling-transactionfilter-input-type-input-endrange").value) -
          parseInt(document.getElementById("SplashBilling-transactionfilter-input-type-input-startrange").value) >= 0
        ){
          document.getElementById("SplashBilling-transactionfilter-status-startrange").className = "";
          document.getElementById("SplashBilling-transactionfilter-status-startrange").classList.add(css["transactionfilter-status"]);
          // document.getElementById("SplashBilling-transactionfilter-buttons-submit").classList.replace(css["transactionfilter-buttons-submit-disable"], css["transactionfilter-buttons-submit"]);
        }else{
          document.getElementById("SplashBilling-transactionfilter-status-startrange").className = "";
          document.getElementById("SplashBilling-transactionfilter-status-startrange").classList.add(css["transactionfilter-status-format"]);
          // document.getElementById("SplashBilling-transactionfilter-buttons-submit").classList.replace(css["transactionfilter-buttons-submit-disable"], css["transactionfilter-buttons-submit"]);
        }
      }else{
        document.getElementById("SplashBilling-transactionfilter-status-startrange").className = "";
        document.getElementById("SplashBilling-transactionfilter-status-startrange").classList.add(css["transactionfilter-status-off"]);
        // document.getElementById("SplashBilling-transactionfilter-buttons-submit").classList.replace(css["transactionfilter-buttons-submit-disable"], css["transactionfilter-buttons-submit"]);
      }

      //empty check
      if(document.getElementById("SplashBilling-transactionfilter-input-type-input-endrange").value){
        //range check
        if (
          parseInt(document.getElementById("SplashBilling-transactionfilter-input-type-input-endrange").value) -
          parseInt(document.getElementById("SplashBilling-transactionfilter-input-type-input-startrange").value) >= 0
        ) {
          document.getElementById("SplashBilling-transactionfilter-status-endrange").className = "";
          document.getElementById("SplashBilling-transactionfilter-status-endrange").classList.add(css["transactionfilter-status"]);
          // document.getElementById("SplashBilling-transactionfilter-buttons-submit").classList.replace(css["transactionfilter-buttons-submit-disable"], css["transactionfilter-buttons-submit"]);
        }else{
          document.getElementById("SplashBilling-transactionfilter-status-endrange").className = "";
          document.getElementById("SplashBilling-transactionfilter-status-endrange").classList.add(css["transactionfilter-status-format"]);
          // document.getElementById("SplashBilling-transactionfilter-buttons-submit").classList.replace(css["transactionfilter-buttons-submit"], css["transactionfilter-buttons-submit-disable"]);
        }
      }else{
        document.getElementById("SplashBilling-transactionfilter-status-endrange").className = "";
        document.getElementById("SplashBilling-transactionfilter-status-endrange").classList.add(css["transactionfilter-status-off"]);
        // document.getElementById("SplashBilling-transactionfilter-buttons-submit").classList.replace(css["transactionfilter-buttons-submit-disable"], css["transactionfilter-buttons-submit"]);
      }
    }
  }


  var [transactionTypeFilterList, SetTransactionTypeFilterList] = useState(transactionTypes.map((list) => (list.id)));

  function chooseTransactionTypeFilter(type, id){
    if(type === "add"){
      if(!transactionTypeFilterList.includes(id)){
        transactionTypeFilterList.push(id);
      }
    }else if(type === "remove"){
      if(transactionTypeFilterList.includes(id)){
        transactionTypeFilterList.splice(transactionTypeFilterList.indexOf(id), 1);
      }
    }else if(type === "clear"){
      transactionTypeFilterList.length = 0;
    }
    SetTransactionTypeFilterCount(transactionTypeFilterList.length);
    /*
      FK YOU REACT I FIRGURED IT OUT
      somehow the map() function doesnt update automatically

      so what the solution is create a useState variable (can be anything) and just update it with this function
      so the page rerenders and updates

      i have been trying this for literally 2 hours and i finally fixed it#
      trying to see why DashFiles worked and this didnt omg
    */
    document.body.overflow = "hidden";
  };

  var [transactionTypeFilterCount, SetTransactionTypeFilterCount] = useState(transactionTypeFilterList.length);
  var [filterPriceStartRange, SetFilterPriceStartRange] = useState(0);
  var [filterPriceEndRange, SetFilterPriceEndRange] = useState(1000);
  var [filterStartDate, SetFilterStartDate] = useState("2020-12-02");
  var [filterEndDate, SetFilterEndDate] = useState("5000-01-01");

  function submitFilter(type){
    if(type === "clear"){
      document.getElementById("SplashBilling-transactionfilter-input-type-input-startdate").value = "";
      filterCheck("startdate");
      document.getElementById("SplashBilling-transactionfilter-input-type-input-enddate").value = "";
      filterCheck("enddate");
      document.getElementById("SplashBilling-transactionfilter-input-type-input-startrange").value = "";
      document.getElementById("SplashBilling-transactionfilter-input-type-input-endrange").value = "";
      filterCheck("range");
      SetFilterStartDate("2000-07-05");
      SetFilterEndDate("5000-01-01");
    }else if(type === "search"){
      //Transaction Type Search ------------------------------------





      //Transaction Date Search ------------------------------------
      // if startdate is blank
      if(document.getElementById("SplashBilling-transactionfilter-status-startdate").classList.contains(css["transactionfilter-status"])){
        var startdateSplit = document.getElementById("SplashBilling-transactionfilter-input-type-input-startdate").value.split("/");
        SetFilterStartDate(`${startdateSplit[2]}-${startdateSplit[1]}-${startdateSplit[0]}`);
      // if enddate is blank
      }else{
        SetFilterStartDate("2000-05-07");
      }
      if(document.getElementById("SplashBilling-transactionfilter-status-enddate").classList.contains(css["transactionfilter-status"])){
        var enddateSplit = document.getElementById("SplashBilling-transactionfilter-input-type-input-enddate").value.split("/");
        SetFilterEndDate(`${enddateSplit[2]}-${enddateSplit[1]}-${enddateSplit[0]}T23:59`);
      }else{
        SetFilterEndDate("5000-01-01");
      }
      //Transaction Range Search ------------------------------------
      // if startrange is blank
      if(
        document.getElementById("SplashBilling-transactionfilter-status-startrange").classList.contains(css["transactionfilter-status"]) &&
        document.getElementById("SplashBilling-transactionfilter-status-endrange").classList.contains(css["transactionfilter-status"])
      ){
        SetFilterPriceStartRange(document.getElementById("SplashBilling-transactionfilter-input-type-input-startrange").value);
        SetFilterPriceEndRange(document.getElementById("SplashBilling-transactionfilter-input-type-input-endrange").value);
      }else{
        SetFilterPriceStartRange(0);
        SetFilterPriceEndRange(1000000);
      }
      transactionFilter();
    }
  }

  if(transactionList){
    var transactionDisplay = [...Array(1)].map((number) => ({
      key: number,
      value: transactionList
      //transaction type filter
      .filter(id => transactionTypeFilterList.includes(id.typeID))
      //transaction date filter
      .filter(id => new Date(id.date) >= new Date(filterStartDate) && new Date(id.date) <= new Date(filterEndDate))
      //transaction price range filter
      .filter(id => Math.abs(id.amount.toFixed(2)) >= filterPriceStartRange && Math.abs(id.amount.toFixed(2)) <= filterPriceEndRange)
      //show number of max results
      .slice(0, transactionCurrentView)
      //display result
      .map((list) => (
        <div key={list.id + "-key"} className={css["transaction-history-box"]}>
          <div className={css["transaction-history-type"]}>
            <p>{transactionTypes.find(id => id.id === list.typeID).type}</p>
          </div>
          <div className={css["transaction-history-date"]}>
            <p>{timeFormatter("long", list.date)}</p>
          </div>
          <div className={css["transaction-history-payment"]}>
            <p>{list.paymentUsed}</p>
          </div>
          <div className={list.amount >= 0 ? (css["transaction-history-amount-add"]):(css["transaction-history-amount-subtract"])}>
            <p>
              <span className={css["transaction-history-value-add"]}>
                <i className={`${css["fas"]} ${css["fa-arrow-up"]} ${"fas fa-arrow-up"}`}></i>
              </span>
              <span className={css["transaction-history-value-subtract"]}>
                <i className={`${css["fas"]} ${css["fa-arrow-down"]} ${"fas fa-arrow-down"}`}></i>
              </span>
              €{Math.abs(list.amount).toFixed(2)}
            </p>
          </div>
        </div>
      ))
    }));
  }
  return (
    <div className={cssGlobal["splashboard-full"]}>
      {/*modal window start*/}
      <div id="addbalance" className={css["addbalance"]}>
        <div id="addbalance-box" className={css["addbalance-box"]}>
          <h1>Add Balance</h1>
          <p>Please enter the amount you want to topup</p>
          <div className={css["addbalance-buttons"]}>
            <div className={css["addbalance-text"]} id="addbalance-text">
              <div className={css["addbalance-text-icon"]}>
                <p>€</p>
              </div>
              <div className={css["addbalance-text-input"]}>
                <input className={css["addbalance-button-input"]} id="addbalance-input"
                  type="number"
                  placeholder="Enter Amount"
                  onKeyUp={() => balanceCheck()}
                />
              </div>
              <div className={css["addbalance-text-tick"]}>
                <p>
                  <i id="addbalance-tick" className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                </p>
              </div>
              <div className={css["addbalance-text-message"]}>
                <span id="addbalance-message"></span>
              </div>
            </div>
            <div className={css["addbalance-info"]}>
              <p>
                The currency is euro. Any other currency added will be
                exchanged with live rates.
              </p>
            </div>
            <div className={css["addbalance-buttons-box"]}>
              <button id="addbalance-button-submit" onClick={() => sendAPI("addBalance")} className={css["addbalance-button-submit-off"]} disabled={balanceSubmit}>
                <p>Continue</p>
              </button>
            </div>
            <div className={css["addbalance-buttons-box"]}>
              <button className={css["addbalance-button-cancel"]}
                onClick={() => addBalance()}>
                <p>Cancel</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="addaddress-full" className={`${css["addaddress-full"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="addaddress-box" className={css["addaddress-box"]}>
          <h1>{addressType === 0 ? "Add New" : "Edit"}&nbsp;Address</h1>
          <p>Billing Addresses can be linked to saved payment options for faster checkout.</p>
          <div id="SplashBilling-billing-details" className={`${css["billing-details"]} ${cssGlobal["flex-center-left"]}`}>
            <div className={css["billing-details-subtitle"]}>
              <p>Nickname</p>
            </div>
            <div id="SplashBilling-nickname-status" className={css["nickname-status-off"]}>
              <div id="SplashBilling-billing-details-box1" className={`${css["billing-details-nickname"]} ${cssGlobal["flex-center-left"]}`}>
                <div className={css["billing-details-nickname-type"]}>
                  <input onKeyUp={() => nicknameCheck()} id="SplashBilling-billing-details-box1-input-nickname"
                    type="text"
                    placeholder="Nickname"
                  />
                </div>
                <div className={css["billing-details-nickname-icon"]}>
                  <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                </div>
                <span className={css["billing-details-text-empty"]}>
                  <p><i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${"fas fa-exclamation-circle"}`}></i>Please enter a nickname</p>
                </span>
                <span className={css["billing-details-text-same"]}>
                  <p><i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${"fas fa-exclamation-circle"}`}></i>This nickname already exists</p>
                </span>
              </div>
            </div>
            <div className={css["billing-details-subtitle"]}>
              <p>Details</p>
            </div>
            <div id="SplashBilling-billing-details-box1--2" className={css["billing-details-box1"]}>
              <input id="SplashBilling-billing-details-box1-input-fullname" type="text" placeholder="Full Name"/>
            </div>
            <div id="SplashBilling-billing-details-box1--2" className={css["billing-details-box1"]}>
              <input id="SplashBilling-billing-details-box1-input-address1" type="text" placeholder="Billing Address"/>
            </div>
            <div id="SplashBilling-billing-details-box1--3" className={css["billing-details-box1"]}>
              <input id="SplashBilling-billing-details-box1-input-address2" type="text" placeholder="Billing Address 2 (Optional)"/>
            </div>
            <div id="SplashBilling-billing-details-box2" className={css["billing-details-box2"]}>
              <input id="SplashBilling-billing-details-box2-input-country" type="text" placeholder="Country"/>
            </div>
            <div id="SplashBilling-billing-details-box3" className={css["billing-details-box3"]}>
              <input id="SplashBilling-billing-details-box3-input-city" type="text" placeholder="City"/>
            </div>
            <div id="SplashBilling-billing-details-box2--2" className={css["billing-details-box2"]}>
              <input id="SplashBilling-billing-details-box2-input-state" type="text" placeholder="State/Province/Region"/>
            </div>
            <div id="SplashBilling-billing-details-box3--2" className={css["billing-details-box3"]}>
              <input id="SplashBilling-billing-details-box3-input-postal" type="text" placeholder="Postal Code"/>
            </div>

            <div className={`${css["addaddress-buttons"]} ${cssGlobal["flex-center-left"]}`}>
              <button className={css["addaddress-button-cancel"]} onClick={() => addAddress(0)}>
                <p>Cancel</p>
              </button>
              <button disabled={addAddressSubmitDisabled} onClick={() => sendAPI("addAddress")} id="addaddress-button-submit" className={css["addaddress-button-submit-off"]}>
                <p>Save</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="addpayment-full" className={`${css["addpayment-full"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="addpayment-box" className={css["addpayment-box"]}>
          <h1>Add Payment Method</h1>
          <div id="SplashBilling-addpayment-payment" className={css["addpayment-payment"]}>

            <div id="SplashBilling-addpayment-payment-type" className={css["addpayment-payment-creditcard"]}>
              {/* payment option menu */}
              <div id="SplashBilling-payment-options" className={`${css["payment-options"]} ${cssGlobal["flex-center-center"]}`}>
                <button id="SplashBilling-payment-options-box-creditcard"
                  onClick={() => payOption("creditcard")} className={css["payment-options-box-creditcard"]}>
                  <p id="SplashBilling-payment-options-box-creditcard-p">
                    <span id="SplashBilling-payment-options-mobile" className={css["payment-options-mobile"]}>Credit&nbsp;</span>Card
                  </p>
                </button>
                <button id="SplashBilling-payment-options-box-paypal"
                  onClick={() => payOption("paypal")} className={css["payment-options-box-paypal"]}>
                  <p id="SplashBilling-payment-options-box-paypal-p">Paypal</p>
                </button>
                <button id="SplashBilling-payment-options-box-crypto"
                  onClick={() => payOption("crypto")} className={css["payment-options-box-crypto"]}>
                  <p id="SplashBilling-payment-options-box-crypto-p">Crypto</p>
                </button>
              </div>

              {/* credit card */}
              {payment === "creditcard" && (
                <div id="SplashBilling-payment-section-creditcard" className={css["payment-section-creditcard"]}>
                  <div id="SplashBilling-payment-section-types" className={`${css["payment-section-types"]} ${cssGlobal["flex-center-left"]}`}>
                    <div id="SplashBilling-payments-section-type-title" className={css["payment-section-types-title"]}>
                      <p id="SplashBilling-payments-section-types-title-p">
                        Card Payment Types
                      </p>
                    </div>
                    <img alt={"visa-icon"} id="SplashBilling-payments-section-types-title-img"
                      src={payIcon_visa}
                    />
                    <img alt={"mastercard-icon"} id="SplashBilling-payments-section-types-title-img--2"
                      src={payIcon_mastercard}
                    />
                    <img alt={"amex-icon"} id="SplashBilling-payment-section-types-title-img--3"
                      src={payIcon_amex}
                    />
                    <span id="SplashBilling-payment-section-types-last" className={css["payment-section-types-last"]}>
                      <img alt={"discover-icon"} id="SplashBilling-payment-section-types-last-img"
                        src={payIcon_discover}
                      />
                    </span>
                  </div>

                  <div id="SplashBilling-payment-section-title" className={css["payment-section-title"]}>
                    <p id="SplashBilling-payment-section-title-p">
                      Card Details
                    </p>
                  </div>
                  <div id="SplashBilling-saved-payments-details" className={`${css["saved-payments-details"]} ${cssGlobal["flex-center-left"]}`}>
                    <div id="SplashBilling-saved-payments-details-number" className={css["saved-payments-details-number"]}>
                      <div id="saved-payments-type"></div>
                      <input id="SplashBilling-saved-payments-details-number-input"
                        type="text"
                        placeholder="Card Number"
                      />
                    </div>

                    <div id="SplashBilling-saved-payments-details-expiry" className={css["saved-payments-details-expiry"]}>
                      <input id="SplashBilling-saved-payments-details-expiry-input"
                        type="text"
                        placeholder="Expiry Date"
                      />
                    </div>

                    <div id="SplashBilling-saved-payments-details-cvv" className={css["saved-payments-details-cvv"]}>
                      <input id="SplashBilling-saved-payments-details-cvv-input"
                        type="text"
                        placeholder="CVV"
                      />
                    </div>

                    <div id="SplashBilling-saved-payments-details-name" className={css["saved-payments-details-name"]}>
                      <input id="SplashBilling-saved-payments-details-name-input"
                        type="text"
                        placeholder="Cardholder Name"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* paypal */}
              {payment === "paypal" && (
                <div id="SplashBilling-payment-section-paypal" className={css["payment-section-paypal"]}>
                  <div id="SplashBilling-paypal-section" className={`${css["paypal-section"]} ${cssGlobal["flex-center-left"]}`}>
                    <div id="SplashBilling-paypal-section-box" className={css["paypal-section-box"]}>
                      <p id="SplashBilling-paypal-section-box-p">
                        <b>Paypal Payment Option</b>
                        <br />
                        You will be asked to login to Paypal to authenticate
                        later when you confirm your order.
                      </p>
                    </div>
                    <div id="SplashBilling-paypal-section-box2" className={css["paypal-section-box2"]}>
                      <img alt={"paypal-icon"} id="SplashBilling-paypal-section-box2-img"
                        src={payIcon_paypal}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* crypto */}
              {payment === "crypto" && (
                <div id="SplashBilling-payment-section-crypto" className={css["payment-section-crypto"]}></div>
              )}

              <button onClick={() => showAddress()} className={`${css["address-linked"]} ${cssGlobal["flex-center-center"]}`}>
                <div className={css["address-linked-icon"]}>
                  <i className={`${css["fas"]} ${css["fa-chevron-down"]} ${"fas fa-chevron-down"}`}></i>
                </div>
                <div className={css["address-linked-info"]}>
                  <p>Select Billing Address</p>
                </div>
              </button>
              <div id="SplashBilling-address-linked-list" className={`${css["address-linked-list"]} ${cssGlobal["flex-center-left"]}`}>
                <button className={`${css["address-linked-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                  <div className={css["address-linked-list-info"]}>
                    <b>None</b><br/>Leave Empty
                  </div>
                  <div className={css["address-linked-list-icon"]}>
                    <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                  </div>
                </button>
                {addressList &&
                  (addressList.map((list) => (
                    <button key={list.id + "-key"} className={`${css["address-linked-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                      <div className={css["address-linked-list-info"]}>
                        <b>{list.nickname}</b><br/>{list.fullName}
                      </div>
                      <div className={css["address-linked-list-icon"]}>
                        <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                      </div>
                    </button>
                  )))
                }
              </div>
              <div id="SplashBilling-addpayment-payment-submit" className={`${css["addpayment-buttons"]} ${cssGlobal["flex-center-left"]}`}>
                <button className={css["addpayment-button-cancel"]} onClick={() => addPayment()}>
                  Close
                </button>
                <button onClick={() => sendAPI("addPayment")} className={css["addpayment-button-submit-off"]} id="SplashBilling-addpayment-payment-submit-input">
                  Add Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="deleteaddress" className={`${css["deleteaddress"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="deleteaddress-box" className={css["deleteaddress-box"]}>
          <h1>Delete Address</h1>
          <div className={css["deleteaddress-info"]}>
            <div className={`${css["address-list"]} ${cssGlobal["flex-stretch-left"]}`}>
              {addressList &&
                (addressList.filter(id => id.id === chooseRemoveAddress).map((list) => (
                  <div
                    key={list.id + "-key"}
                    className={`${list.default === true ? (css["address-list-box-main"]):(css["address-list-box-normal"])} ${cssGlobal["flex-flex-start-center"]}`}
                  >
                    <div className={`${css["address-list-box-inside"]} ${cssGlobal["flex-center-left"]}`}>
                      <div className={css["address-list-box-title"]}>
                        <p>
                          <i className={`${css["fas"]} ${css["fa-map-marker-alt"]} ${"fas fa-map-marker-alt"}`}></i>
                          {list.nickname}
                        </p>
                      </div>
                      <div className={css["address-list-box-info"]}>
                        <p>
                          {list.fullName}<br/>
                          {list.address1}<br/>
                          {list.address2}
                        </p>
                      </div>
                    </div>
                  </div>
                )))
              }
            </div>
          </div>
          <p>
            Remember to update your saved payments if you have linked this address somewhere!
          </p>
          <div className={css["deleteaddress-buttons"]}>
            <div className={css["deleteaddress-buttons-box"]}>
              <button className={css["deleteaddress-button-cancel"]}
                onClick={() => deleteAddress()}>
                <p>Cancel</p>
              </button>
            </div>
            <div className={css["deleteaddress-buttons-box"]}>
              <button
                disabled={deleteAddressSubmitDisabled}
                onClick={() => sendAPI("deleteAddress")}
                id="deleteaddress-button-submit"
                className={css["deleteaddress-button-submit"]}
                style={deleteAddressSubmitDisabled === true ? {cursor: "default", opacity: "60%"}:{cursor: "pointer"}}
              >
                <p>Delete Now</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="editpayment" className={`${css["editpayment"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="editpayment-box" className={css["editpayment-box"]}>
          <h1>Edit Saved Payment</h1>
          <div className={css["editpayment-info"]}>
            {paymentList &&
              (paymentList.filter(id => id.id === chooseEditPayment).map((list) => (
                <div key={list.id + "-key"} className={`${list.default === true ? (css["saved-payments-box-main"]):(css["saved-payments-box"])} ${cssGlobal["flex-center-left"]}`}>
                  <div className={css["saved-payments-icon"]}>
                    {list.type === "Mastercard" &&
                      <img src={payIcon_mastercard} />
                    }
                    {list.type === "Visa" &&
                      <img src={payIcon_visa} />
                    }
                    {list.type === "Paypal" &&
                      <img src={payIcon_paypal} />
                    }
                  </div>
                  <div className={css["saved-payments-title"]}>
                    <p>
                      <span className={css["saved-payments-info-title"]}>
                        {list.type}
                      </span>
                    </p>
                  </div>
                  <div className={css["saved-payments-info"]}>
                    <p>{list.safeinfo}</p>
                    {list.linkedAddressID !== 0 &&
                      <p>
                        <i className={`${css["fas"]} ${css["fa-map-marker-alt"]} ${"fas fa-map-marker-alt"}`}></i>
                        {addressList.find(id => id.id === list.linkedAddressID).nickname}
                      </p>
                    }
                    {list.default === true &&
                      <div className={`${css["saved-payments-info-buttons"]} ${cssGlobal["flex-center-left"]}`}>
                        <button disabled className={css["saved-payments-info-default"]}><i className={`${css["far"]} ${css["fa-check-circle"]} ${"far fa-check-circle"}`}></i>Default</button>
                      </div>
                    }
                  </div>
                </div>
              )))
            }
          </div>
          <div className={css["saved-payments-security"]}>
            <p>For security, if you want to edit your payment details, please delete and add them back again.</p>
          </div>
          <p>
            <b>Linked Address</b>
            <br/>Have the option to link an address for a faster checkout process
          </p>
          <button onClick={() => showAddress()} className={`${css["address-linked"]} ${cssGlobal["flex-center-center"]}`}>
            <div className={css["address-linked-icon"]}>
              <i className={`${css["fas"]} ${css["fa-chevron-down"]} ${"fas fa-chevron-down"}`}></i>
            </div>
            <div className={css["address-linked-info"]}>
              <p>Select Billing Address</p>
            </div>
          </button>
          <div id="SplashBilling-address-linked-list--2" className={`${css["address-linked-list"]} ${cssGlobal["flex-center-left"]}`}>
            <button onClick={() => chooseNewLinkedAddress(0)} disabled={linkAddressSubmitDisabled} className={`${css["address-linked-list-box"]} ${cssGlobal["flex-center-left"]}`}>
              <div className={css["address-linked-list-info"]}>
                <b>None</b><br/>Leave Empty
              </div>
              {newLinkedAddress === -1 && paymentList ? (
                paymentList.filter(id => id.id === chooseEditPayment).map((list2) => (
                  <span key={list2.id + "-key"}>
                    {list2.linkedAddressID === 0 &&
                      <div className={css["address-linked-list-icon"]}>
                        <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                      </div>
                    }
                  </span>
                ))
              ):(
                newLinkedAddress === 0 &&
                <div className={css["address-linked-list-icon"]}>
                  <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                </div>
              )}
            </button>
            {addressList &&
              (addressList.map((list) => (
                <button
                  onClick={() => chooseNewLinkedAddress(list.id)}
                  disabled={linkAddressSubmitDisabled}
                  key={list.id + "-key"}
                  className={`${css["address-linked-list-box"]} ${cssGlobal["flex-center-left"]}`}
                >
                  <div className={css["address-linked-list-info"]}>
                    <b>{list.nickname}</b><br/>{list.fullName}
                  </div>
                  {newLinkedAddress === -1 ? (
                    paymentList.filter(id => id.id === chooseEditPayment).map((list2) => (
                      <span key={list2.id + "-key"}>
                        {list.id === list2.linkedAddressID &&
                          <div className={css["address-linked-list-icon"]}>
                            <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                          </div>
                        }
                      </span>
                    ))
                  ):(
                    newLinkedAddress === list.id &&
                    <div className={css["address-linked-list-icon"]}>
                      <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                    </div>
                  )}
                </button>
              )))
            }
          </div>
          <p>
            <b>Delete Payment</b><br/>
            You can always add it back later! If this is the default saved payment, a new one will be randomly assigned upon deletion.
          </p>
          <button
            disabled={deletePaymentSubmitDisabled}
            onClick={() => sendAPI("deletePayment")}
            className={css["editpayment-delete"]}
            style={deletePaymentSubmitDisabled === true ? {opacity: "60%", cursor: "default"}:{opacity: "100%"}}
          >
            <p>Delete Now</p>
          </button>
          <div className={css["editpayment-buttons"]}>
            <div className={css["editpayment-buttons-box"]}>
              <button className={css["editpayment-button-cancel"]}
                onClick={() => editPayment(0)}>
                <p>Cancel</p>
              </button>
            </div>
            <div className={css["editpayment-buttons-box"]}>
              <button
                disabled={editPaymentSubmitDisabled}
                onClick={() => sendAPI("editPayment", newLinkedAddress)}
                id="editpayment-button-submit"
                className={editPaymentSubmitDisabled === true ? (css["editpayment-button-submit-disabled"]):(css["editpayment-button-submit"])}
                // style={editPaymentSubmitDisabled === true ? {cursor: "default", opacity: "60%"}:{cursor: "pointer"}}
              >
                <p>Save</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="transactionfilter" className={`${css["transactionfilter"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="transactionfilter-box" className={css["transactionfilter-box"]}>
          <h1>Filter Transactions</h1>
          <p>Please note all inputs are optional! Leave blank to disable that filter.</p>
          <div className={`${css["transactionfilter-filters"]} ${cssGlobal["flex-center-center"]}`}>
            <div className={css["transactionfilter-filters-box"]}>
                <b>Transaction Date</b>
                <div className={`${css["transactionfilter-date"]} ${cssGlobal["flex-flex-start-left"]}`}>
                  <div className={css["transactionfilter-date-box"]}>
                    <p>Start Date:</p>
                    <div id="SplashBilling-transactionfilter-status-startdate" className={css["transactionfilter-status-off"]}>
                      <div className={`${css["transactionfilter-input"]} ${cssGlobal["flex-center-left"]}`}>
                        <div className={css["transactionfilter-input-type"]}>
                          <input onKeyUp={() => filterCheck("startdate")} id="SplashBilling-transactionfilter-input-type-input-startdate" placeholder="DD/MM/YYYY" type="text"/>
                        </div>
                        <div className={css["transactionfilter-input-icon"]}>
                          <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                        </div>
                        <div className={css["transactionfilter-input-text-format"]}>
                          <i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${"fas fa-exclamation-circle"}`}></i>Invalid Date Format
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={css["transactionfilter-date-box"]}>
                    <p>End Date:</p>
                    <div id="SplashBilling-transactionfilter-status-enddate" className={css["transactionfilter-status-off"]}>
                      <div className={`${css["transactionfilter-input"]} ${cssGlobal["flex-center-left"]}`}>
                        <div className={css["transactionfilter-input-type"]}>
                          <input onKeyUp={() => filterCheck("enddate")} id="SplashBilling-transactionfilter-input-type-input-enddate" placeholder="DD/MM/YYYY" type="text"/>
                        </div>
                        <div className={css["transactionfilter-input-icon"]}>
                          <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                        </div>
                        <div className={css["transactionfilter-input-text-format"]}>
                          <i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${"fas fa-exclamation-circle"}`}></i>Invalid Date Format
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className={css["transactionfilter-filters-box"]}>
                <b>Transaction Amount</b>
                <div className={`${css["transactionfilter-date"]} ${cssGlobal["flex-flex-start-left"]}`}>
                  <div className={css["transactionfilter-date-box"]}>
                    <p>Start Range:</p>
                    <div id="SplashBilling-transactionfilter-status-startrange" className={css["transactionfilter-status-off"]}>
                      <div className={`${css["transactionfilter-input-range"]} ${cssGlobal["flex-center-left"]}`}>
                        <div className={css["transactionfilter-input-currency"]}>
                          <p>€</p>
                        </div>
                        <div className={css["transactionfilter-input-type"]}>
                          <input onKeyUp={() => filterCheck("range")} id="SplashBilling-transactionfilter-input-type-input-startrange" type="number"/>
                        </div>
                        <div className={css["transactionfilter-input-icon"]}>
                          <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                        </div>
                        <div className={css["transactionfilter-input-text-format"]}>
                          <i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${"fas fa-exclamation-circle"}`}></i>Invalid start and end ranges
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={css["transactionfilter-date-box"]}>
                    <p>End Range:</p>
                    <div id="SplashBilling-transactionfilter-status-endrange" className={css["transactionfilter-status-off"]}>
                      <div className={`${css["transactionfilter-input-range"]} ${cssGlobal["flex-center-left"]}`}>
                        <div className={css["transactionfilter-input-currency"]}>
                          <p>€</p>
                        </div>
                        <div className={css["transactionfilter-input-type"]}>
                          <input onKeyUp={() => filterCheck("range")} id="SplashBilling-transactionfilter-input-type-input-endrange" type="number"/>
                        </div>
                        <div className={css["transactionfilter-input-icon"]}>
                          <i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                        </div>
                        <div className={css["transactionfilter-input-text-format"]}>
                          <i className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${"fas fa-exclamation-circle"}`}></i>Invalid start and end ranges
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

          </div>
          <div className={`${css["transactionfilter-buttons"]} ${cssGlobal["flex-center-center"]}`}>
            <div className={css["transactionfilter-buttons-cancel"]}>
              <button onClick={() => submitFilter("clear")}>Reset All</button>
            </div>
            <div id="SplashBilling-transactionfilter-buttons-submit" className={css["transactionfilter-buttons-submit"]}>
              <button className={css["transactionfilter-button-submit"]} onClick={() => submitFilter("search")}>View Results</button>
            </div>
          </div>
        </div>
      </div>

      {/*modal windows end*/}
      <Navsplash type="nav" number="5" />
      <div className={cssGlobal["splashboard-section"]}>
        <div className={cssGlobal["splashboard"]}>
          <div className={cssGlobal["splashboard-main"]}>
            <Navsplash type="top" number="5" />
            <Addons />
            <div className={css["billing-split"]}>
              {!userBalance ?
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
                    <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`} style={{height: "50px"}}></span></p>
                  </div>
                  <div className={css["billing-card-line4"]}>
                    <p>
                      <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`} style={{marginLeft: "auto"}}></span>
                    </p>
                  </div>
                </div>:
                <div className={`${css["billing-card"]} ${cssGlobal["flex-center-left"]}`}
                  style={{
                    // background: bannerColoursList.find(colour => colour.id === bannerID).background,
                    background: "repeating-linear-gradient(45deg," +
                      bannerColoursList.find(colour => colour.id === bannerID).background + "," +
                      bannerColoursList.find(colour => colour.id === bannerID).background + " 100px," +
                      bannerColoursList.find(colour => colour.id === bannerID).backgroundHover + " 100px," +
                      bannerColoursList.find(colour => colour.id === bannerID).backgroundHover +  " 200px)",
                    color: bannerColoursList.find(colour => colour.id === bannerID).text
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
            </div>

            <div className={cssGlobal["splashboard-subtitle"]}>
              <p>
                <b>Billing Tools</b>
              </p>
            </div>
            {!paymentList || !userBalance ?
              <div className={css["billing-tools"]}>
                {[...Array(2)].map((number, index) => (
                  <button
                    key={index}
                    disabled
                    style={{pointerEvents: "none", height: "50px", width: "100%", maxWidth: "150px"}}
                    className={css["billing-tools-box2"]}
                  >
                  </button>
                ))}
              </div>:
              <div className={css["billing-tools"]}>
                <button className={css["billing-tools-box1"]} onClick={() => addBalance()}>
                  <p>Add Balance</p>
                </button>
                <button onClick={() => addPayment()} className={css["billing-tools-box2"]}>
                  <p>Add Payment Option</p>
                </button>
              </div>
            }

            <div className={cssGlobal["splashboard-subtitle"]}>
              <b>Saved Payments</b>
            </div>
            {!paymentList ?
              <div className={`${css["saved-payments"]} ${cssGlobal["flex-stretch-left"]}`}>
                {[...Array(2)].map((number, index) => (
                  <div key={index} className={`${css["saved-payments-box"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["saved-payments-icon"]} style={{height: "30px"}}>
                    </div>
                    <div className={css["saved-payments-title"]}>
                      <p>
                          <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span>
                      </p>
                    </div>
                    <div className={css["saved-payments-edit"]}>
                      <button disabled style={{pointerEvents: "none"}} className={`${css["address-list-box-edit"]} ${cssGlobal["flex-center-center"]}`}>
                      </button>
                    </div>
                    <div className={css["saved-payments-info"]}>
                      <p><span className={`${cssGlobal["lazy-text-30"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                      <p>
                        <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span>
                      </p>
                      <div className={`${css["saved-payments-info-buttons"]} ${cssGlobal["flex-center-left"]}`}>
                        <span className={`${cssGlobal["lazy-text-20"]} ${cssGlobal["lazy-colour1"]}`}></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>:
              <div className={`${css["saved-payments"]} ${cssGlobal["flex-stretch-left"]}`}>
                {paymentList.map((list) => (
                  <div key={list.id + "-key"} className={`${list.default === true ? (css["saved-payments-box-main"]):(css["saved-payments-box"])} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["saved-payments-icon"]}>
                      {list.type === "Mastercard" &&
                        <img src={payIcon_mastercard} />
                      }
                      {list.type === "Visa" &&
                        <img src={payIcon_visa} />
                      }
                      {list.type === "Paypal" &&
                        <img src={payIcon_paypal} />
                      }
                    </div>
                    <div className={css["saved-payments-title"]}>
                      <p>
                        <span className={css["saved-payments-info-title"]}>
                          {list.type}
                        </span>
                      </p>
                    </div>
                    <div className={css["saved-payments-edit"]}>
                      <button onClick={() => {editPayment(list.id)}} className={`${css["address-list-box-edit"]} ${cssGlobal["flex-center-center"]}`}>
                        <i className={`${css["fas"]} ${css["fa-pencil"]} ${"fas fa-pencil"}`}></i>
                      </button>
                    </div>
                    <div className={css["saved-payments-info"]}>
                      <p>{list.safeinfo}</p>
                      <p>
                        <i className={`${css["fas"]} ${css["fa-map-marker-alt"]} ${"fas fa-map-marker-alt"}`}></i>
                        {list.linkedAddressID !== 0 ?
                          <span className={css["saved-payments-info-linked"]}>{addressList.find(id => id.id === list.linkedAddressID).nickname}</span>:
                          <span className={css["saved-payments-info-notlinked"]}>No Linked Address</span>
                        }
                      </p>
                      <div className={`${css["saved-payments-info-buttons"]} ${cssGlobal["flex-center-left"]}`}>
                        {list.default === true ?
                          <button disabled className={css["saved-payments-info-default"]}><i className={`${css["far"]} ${css["fa-check-circle"]} ${"far fa-check-circle"}`}></i>Default</button>:
                          <button
                            disabled={defaultPaymentSubmitDisabled}
                            onClick={() => sendAPI("setPaymentDefault")}
                            className={css["saved-payments-info-setdefault"]}
                            style={defaultPaymentSubmitDisabled === true ? {opacity: "60%", cursor: "default"}:{opacity: "100%"}}
                          >Set Default</button>
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }

          </div>

          <div className={cssGlobal["splashboard-side"]}>
            {!addressList ?
              <React.Fragment>
                <div className={cssGlobal["splashboard-subtitle"]}>
                  <b>Address Book</b>
                  <p>
                    <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour1"]}`}></span>
                    <span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span>
                  </p>
                </div>
                <div className={`${css["address-list"]} ${cssGlobal["flex-stretch-left"]}`}>
                  {[...Array(3)].map((number, index) => (
                    <div
                      key={index}
                      className={`${css["address-list-box-normal"]} ${cssGlobal["flex-flex-start-center"]}`}
                    >
                      <div className={`${css["address-list-box-inside"]} ${cssGlobal["flex-center-left"]}`}>
                        <div className={css["address-list-box-title"]}>
                          <p>
                            <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span>
                          </p>
                        </div>
                        <div className={css["address-list-box-icon"]}>
                          <button disabled className={`${css["address-list-box-edit"]} ${cssGlobal["flex-center-center"]}`}>
                          </button>
                        </div>
                        <div className={css["address-list-box-info"]}>
                          <p>
                            <span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span>
                            <span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour1"]}`}></span>
                            <span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span>
                          </p>
                        </div>
                      </div>
                      <div className={`${css["address-list-box-buttons"]} ${cssGlobal["flex-center-left"]}`}>
                        <button style={{pointerEvents: "none", height: "20px", width: "50%"}} disabled className={css["address-list-box-delete"]}></button>
                      </div>
                    </div>
                  ))}

                  <button  style={{pointerEvents: "none", height: "55px", width: "60%"}} disabled className={css["address-list-add"]}></button>
                </div>
              </React.Fragment>:
              <React.Fragment>
                <div className={cssGlobal["splashboard-subtitle"]}>
                  <b>Address Book</b>
                  <p>Your default address is linked to your default saved payment.</p>
                </div>
                <div className={`${css["address-list"]} ${cssGlobal["flex-stretch-left"]}`}>
                  {addressList.map((list) => (
                    <div
                      key={list.id + "-key"}
                      className={`${list.default === true ? (css["address-list-box-main"]):(css["address-list-box-normal"])} ${cssGlobal["flex-flex-start-center"]}`}
                    >
                      <div className={`${css["address-list-box-inside"]} ${cssGlobal["flex-center-left"]}`}>
                        <div className={css["address-list-box-title"]}>
                          <p>
                            <i className={`${css["fas"]} ${css["fa-map-marker-alt"]} ${"fas fa-map-marker-alt"}`}></i>
                            {list.nickname}
                          </p>
                        </div>
                        <div className={css["address-list-box-icon"]}>
                          <button onClick={() => addAddress(list.id)} className={`${css["address-list-box-edit"]} ${cssGlobal["flex-center-center"]}`}>
                            <i className={`${css["fas"]} ${css["fa-pencil"]} ${"fas fa-pencil"}`}></i>
                          </button>
                        </div>
                        <div className={css["address-list-box-info"]}>
                          <p>
                            {list.fullName}<br/>
                            {list.address1}<br/>
                            {list.address2}
                          </p>
                        </div>
                      </div>
                      <div className={`${css["address-list-box-buttons"]} ${cssGlobal["flex-center-left"]}`}>
                        {list.default === true &&
                          <button disabled className={css["address-list-box-default"]}><i className={`${css["far"]} ${css["fa-check-circle"]} ${"far fa-check-circle"}`}></i>Default</button>
                        }
                        <button onClick={() => {deleteAddress(list.id)}} className={css["address-list-box-delete"]}>Delete</button>
                      </div>
                    </div>
                  ))}

                  <button className={css["address-list-add"]} onClick={() => addAddress(0)}>Add New Address</button>
                </div>
              </React.Fragment>
            }
          </div>

          <div className={cssGlobal["splashboard-bottom"]}>
            <div className={css["transactions"]}></div>
            <div className={css["transactions-title"]}>
              <div className={css["transactions-title-text"]}>
                <p>
                  <b>Transaction History</b>
                </p>
              </div>
              {!transactionList ?
                <div className={css["transactions-search"]}>
                  <button className={css["transactions-search-button"]}
                    disabled style={{pointerEvents: "none", backgroundColor: "var(--theme2)", height: "50px"}}>
                  </button>
                </div>:
                <div className={css["transactions-search"]}>
                  <button className={css["transactions-search-button"]}
                    onClick={() => transactionFilter()}>
                    <p>
                      <i className={`${css["fas"]} ${css["fa-sliders"]} ${"fas fa-sliders"}`}></i>
                      Filters
                    </p>
                  </button>
                </div>
              }
            </div>
            {!transactionList ?
            <React.Fragment>
              <div className={`${css["transaction-type"]} ${cssGlobal["flex-center-left"]}`}>
                {[...Array(5)].map((number, index) => (
                  <div key={index} className={css["transaction-type-box"]}>
                    <button disabled style={{pointerEvents: "none", width: "100px", height: "30px"}} className={css["transaction-type-button-active"]}>
                    </button>
                  </div>
                ))}
              </div>
              <div className={css["transaction-history"]}>
                <div className={css["transaction-history-box-title"]}>
                  <div className={css["transaction-history-type"]}>
                    <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                  </div>
                  <div className={css["transaction-history-date"]}>
                    <p><span className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                  </div>
                  <div className={css["transaction-history-payment"]}>
                    <p><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                  </div>
                  <div className={css["transaction-history-amount"]}>
                    <p><span style={{margin: "auto"}} className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour2"]}`}></span></p>
                  </div>
                </div>

                {[...Array(4)].map((number, index) => (
                  <div key={index} className={css["transaction-history-box"]}>
                    <div className={css["transaction-history-type"]}>
                      <p><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                    </div>
                    <div className={css["transaction-history-date"]}>
                      <p><span className={`${cssGlobal["lazy-text-75"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                    </div>
                    <div className={css["transaction-history-payment"]}>
                      <p><span className={`${cssGlobal["lazy-text-100"]} ${cssGlobal["lazy-colour1"]}`}></span></p>
                    </div>
                    <div className={css["transaction-history-amount-add"]}>
                      <p>
                        <span style={{margin: "auto"}} className={`${cssGlobal["lazy-text-50"]} ${cssGlobal["lazy-colour1"]}`}></span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>:
            <React.Fragment>
              <div className={`${css["transaction-type"]} ${cssGlobal["flex-center-left"]}`}>
                {transactionTypes.map((list) => (
                  <div key={list.id + "-key"} className={css["transaction-type-box"]}>
                    <button onClick={
                      transactionTypeFilterList.includes(list.id) ?
                      (() => chooseTransactionTypeFilter("remove", list.id)):
                      (() => chooseTransactionTypeFilter("add", list.id))
                    } className={
                      transactionTypeFilterList.includes(list.id) ?
                      (css["transaction-type-button-active"]):
                      (css["transaction-type-button"])
                    }>
                      <p>{list.type}</p>

                    </button>
                  </div>
                ))}
              </div>
              <div className={css["transaction-history"]}>
                <div className={css["transaction-history-box-title"]}>
                  <div className={css["transaction-history-type"]}>
                    <p>Transaction</p>
                  </div>
                  <div className={css["transaction-history-date"]}>
                    <p>Date</p>
                  </div>
                  <div className={css["transaction-history-payment"]}>
                    <p>Payment Type</p>
                  </div>
                  <div className={css["transaction-history-amount"]}>
                    <p>Amount</p>
                  </div>
                </div>

                {transactionDisplay}

                <div className={`${css["transaction-history-more"]} ${cssGlobal["flex-center-left"]}`}>
                  {transactionCurrentView < transactionDisplay.size &&
                    <button onClick={() => transactionLoad("add")}><p>Load 10 more</p></button>
                  }
                  {transactionCurrentView > transactionMinView &&
                    <button onClick={() => transactionLoad("remove")}><p>Hide 10</p></button>
                  }
                </div>

                {transactionCurrentView > transactionMinView &&
                  <div className={css["transaction-history-end"]}>
                    <p>You've reached the end!</p>
                  </div>
                }

              </div>
            </React.Fragment>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
