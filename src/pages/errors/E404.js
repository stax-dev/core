import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Button from "../../../components/button/Button";

//External
import {
  Addons,
  scrollReveal,
  snackbarNotification,
  newNotification,
  viewNotification,
  closeNotification,
} from "../../components/addons/Addons";
import cssNavbar from "../../components/nav/Nav.module.css";
import cssGlobal from "../../components/globalcss/GlobalCSS.module.css";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";

//Main
import css from "./E404.module.css";

//Images
import errorArt from "../../images/main/error404.svg";

export default function E404() {

  document.documentElement.setAttribute("data-apptheme", "dark");
  document.body.style.overflow = 'auto';

  const navigate = useNavigate();


  return (
    <div id="E404-react-div" className={cssGlobal["react-div"]}>
      <Addons />
      <div id="E404-error-full" className={`${css["error-full"]} ${cssGlobal["flex-center-center"]}`}>
        <div id="E404-error-page" className={`${css["error-page"]} ${cssGlobal["flex-center-center"]}`}>
          <div id="E404-error-page-info" className={css["error-page-info"]}>
            {/* <div className={`${css["red"]} ${cssGlobal["blue"]}`}>
                            test
                        </div> */}
            <h1 id="E404-h1">404</h1>
            <h2 id="E404-h2">Page Not Found</h2>
            <p id="E404-p">
              Unfortunately, there is nothing here but an empty void. It looks
              like the page you are looking for only exists in another alternate
              universe!
            </p>
            <p id="E404-p--">Shall we take you back?</p>
            <button onClick={() => navigate(-1)} className={css["error-page-link"]}>
              <div id="E404-error-page-button" className={css["error-page-button"]}>
                <p id="E404-error-page-button-p">
                  <i className={`${css["fas"]} ${css["fa-arrow-left"]} ${"fas fa-arrow-left"}`}></i>
                  Back to Page
                </p>
              </div>
            </button>
          </div>
          <div id="E404-error-page-art" className={css["error-page-art"]}>
            <img id="E404-error-page-art-img" src={errorArt} />
          </div>
        </div>
      </div>
    </div>
  );
}
