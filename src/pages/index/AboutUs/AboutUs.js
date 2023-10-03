//React
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Button from "../../../components/button/Button";
import axios from "axios";

//External
import {
  Addons,
  Bubbles,
  Dynamic,
  scrollReveal,
  snackbarNotification,
  newNotification,
  viewNotification,
  closeNotification,
} from "../../../components/addons/Addons";

import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";
import cssNavbar from "../../../components/nav/Nav.module.css";
import Nav from "../../../components/nav/Nav";
import Footer from "../../../components/footer/Footer";

//Main
import css from "./AboutUs.module.css";

//Extra
import bannerColoursList from "../../../components/data/bannerColours";

export default function AboutUs() {

  document.documentElement.setAttribute("data-apptheme", "dark");
  document.body.style.overflow = 'auto';


  //used const cause to make it look different from normal functions
  //this function is basically window.onscroll but div version of it not document body
  document.addEventListener("scroll", function () {
    scrollReveal();
  });

  function Test() {
    Dynamic("https://jsonplaceholder.typicode.com/users");
    console.log("test");
  }

  var [lat, setlat] = useState("");
  var [long, setlong] = useState("");

  function Test(){
    navigator.geolocation.getCurrentPosition(position => {
      console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
    });
    console.log('button');
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080'); // Replace with your API endpoint
      console.log('success');
      setData(response.data);
    } catch (error) {
      if(error.response){
        console.log(error.response.status);
        console.log(error.response.data);
      }else if(error.request){
        console.log(error.request);
      }else{
        console.log(error.message);
      }
    }
  };

  function sendData() {
    axios.post('http://localhost:8080',
      {
        ID: 5,
        Name: 'test',
        Age: 20,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
    .then(function (response) {
      console.log(response);
      fetchData();
    })
    .catch(function (error) {
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

  function deleteData() {
    axios.delete('http://localhost:8080/7',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
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




  return (
    <div id="AboutUs-react-div" className={cssGlobal["react-div"]}>
      {/* style={{ backgroundImage: `url('${background}')`}} */}
      <div id="AboutUs-page-full" className={cssGlobal["page-full"]}>
        <Nav />
        <Addons />
        <Bubbles />
        <div id="AboutUs-content-100" className={cssGlobal["content-100"]}>
          <div id="AboutUs-about-title" className={css["about-title"]}>
            <h1 id="AboutUs-about-title-h1">About Us</h1>
            <p id="AboutUs-about-title-p">Stax Developer Suite</p>

            {data.map((list) => (
              <p key={list.ID}>Hi the id is {list.ID} and the name is {list.Name} and age is {list.Age}</p>
            ))}
            <button onClick={() => sendData()}>send the data</button>
            <button onClick={() => deleteData()}>delete the data</button>

            {/* {data.map((item, index) => (
              <li key={index}>Column 1: {item.column1}, Column 2: {item.column2}</li>
            ))} */}

            {/* {bannerColoursList.find((bannerColoursList) => bannerColoursList.id === 2).text} */}
            {/* {
              bannerColoursList.filter(
                (bannerColoursList) => bannerColoursList.id === 2
              ).text
            }
             <Dynamic link="https://jsonplaceholder.typicode.com/users" />
            <Link to="/" referrerPolicy="no-referrer-when-downgrade">
              sign in with google
            </Link> */}

            <button onClick={() => Test()}>refresh coords</button>
            BROWSER: {navigator.userAgent.toLowerCase()}
            USER AGENT: {navigator.userAgent}<br/><br/>
            PLATFORM: {navigator.platform}<br/><br/>
            APP VERSION: {navigator.appVersion}<br/><br/>
            LANGUAGE: {navigator.language}<br/><br/>
            COOKIES ENABLED?: {navigator.cookieEnabled}<br/><br/>
            SCREEN WIDTH X HEIGHT: {window.screen.width} x {window.screen.height}<br/><br/>
            LATITUDE: {lat}<br/><br/>
            LONGITUDE: {long}<br/><br/>

          </div>
        </div>

        <div id="AboutUs-content-750" className={cssGlobal["content-750"]}>
          <section className={"rs-element-both"}>
            <div id="AboutUs-statement" className={css["statement"]}>
              <p className="mb-10" id="AboutUs-statement-p">
                Our mission is to create a comprehensive programming ecosystem
                for developers worldwide.
              </p>
              <p id="AboutUs-statement-p--2">
                To build an efficient and easy infrastructure, with tools and
                resources for all skill levels.
              </p>
            </div>
          </section>
        </div>

        {/* timeline section */}

        {/* news section */}

        <div id="AboutUs-content-100" className={cssGlobal["content-100"]}>
          <div id="AboutUs-quick-links" className={`${css["quick-links"]} ${cssGlobal["flex-stretch-center"]}`}>
            <div id="AboutUs-quick-links-title" className={css["quick-links-title"]}>
              <h1 id="AboutUs-quick-links-title-h1">Quick Links</h1>
            </div>
            <div id="AboutUs-quick-links-box" className={`${css["quick-links-box"]} ${cssGlobal["flex-flex-start-left"]}`}>
              <div id="AboutUs-quick-links-text" className={css["quick-links-text"]}>
                <h1 id="AboutUs-quick-links-text-h1">Products</h1>
                <p id="AboutUs-quick-links-text-p">
                  View the full list of different products and services we
                  provide
                </p>
              </div>
              <Link id="AboutUs-quick-links-link" className={css["quick-links-link"]}
                to="/products"
              >
                <div id="AboutUs-quick-links-button" className={css["quick-links-button"]}>
                  <p id="AboutUs-quick-links-button-p">
                    View Page
                    <i id="AboutUs-quick-link-button-icon" className={`${css["fas"]} ${css["fa-arrow-right"]} ${css["fa-1x"]} ${"fas fa-arrow-right"}`}></i>
                  </p>
                </div>
              </Link>
            </div>
            <div id="AboutUs-quick-links-box--2" className={`${css["quick-links-box"]} ${cssGlobal["flex-flex-start-left"]}`}>
              <div id="AboutUs-quick-links-text--2" className={css["quick-links-text"]}>
                <h1 id="AboutUs-quick-links-text-h1--2">Support</h1>
                <p id="AboutUs-quick-links-text-h1--p">
                  Get help from our support channels, including The SDS Wiki
                </p>
              </div>
              <Link id="AboutUs-quick-links-link--2" className={css["quick-links-link"]}
                to="/support"
              >
                <div id="AboutUs-quick-links-button--2" className={css["quick-links-button"]}>
                  <p id="AboutUs-quick-links-button-p--2">
                    View Page
                    <i id="AboutUs-quick-link-butotn-icon--2" className={`${css["fas"]} ${css["fa-arrow-right"]} ${css["fa-1x"]} ${"fas fa-arrow-right"}`}></i>
                  </p>
                </div>
              </Link>
            </div>
            <div id="AboutUs-quick-links-box--3" className={`${css["quick-links-box"]} ${cssGlobal["flex-flex-start-left"]}`}>
              <div id="AboutUs-quick-links-text--3" className={css["quick-links-text"]}>
                <h1 id="AboutUs-quick-links-text-h1--3">Status</h1>
                <p id="AboutUs-quick-links-text-p--3">
                  Check the status of our services for any outages or
                  disruptions
                </p>
              </div>
              <Link id="AboutUs-quick-links-link--3" className={css["quick-links-link"]}
                to="/status"
              >
                <div id="AboutUs-quick-links-button--3" className={css["quick-links-button"]}>
                  <p id="AboutUs-quick-links-button-p--3">
                    View Page
                    <i id="AboutUs-quick-links-button-icon--3" className={`${css["fas"]} ${css["fa-arrow-right"]} ${css["fa-1x"]} ${"fas fa-arrow-right"}`}></i>
                  </p>
                </div>
              </Link>
            </div>
            <div id="AboutUs-quick-links-box--4" className={`${css["quick-links-box"]} ${cssGlobal["flex-flex-start-left"]}`}>
              <div id="AboutUs-quick-links-text--4" className={css["quick-links-text"]}>
                <h1 id="AboutUs-quick-links-text-h1--4">Legal</h1>
                <p id="AboutUs-quick-links-text-p--4">
                  Get familiar with our company policies and legal documents
                </p>
              </div>
              <Link id="AboutUs-quick-links-link-a--4" className={css["quick-links-link"]}
                to="/legal"
              >
                <div id="AboutUs-quick-links-button--4" className={css["quick-links-button"]}>
                  <p id="AboutUs-quick-links-button--4">
                    View Page
                    <i id="aboutUs-quick-links-button-icon--4" className={`${css["fas"]} ${css["fa-arrow-right"]} ${css["fa-1x"]} ${"fas fa-arrow-right"}`}></i>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
