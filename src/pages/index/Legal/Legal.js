//React
import React /* useState */ from "react";
import { Link } from "react-router-dom";
// import Button from "../../../components/button/Button";

//External
import {
  Addons,
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
import css from "./Legal.module.css";

export default function Legal() {

  document.documentElement.setAttribute("data-apptheme", "dark");
  document.body.style.overflow = 'auto';

  return (
    <div id="Legal-react-div" className={cssGlobal["react-div"]}>
      <div id="Legal-page-full" className={cssGlobal["page-full"]}>
        <Nav />
        <Addons />
        <div id="Legal-content-100" className={cssGlobal["content-100"]}>
          <div id="Legal-legal-title" className={css["legal-title"]}>
            <h1 id="Legal-legal-title-h1">Legal</h1>
            <p id="Legal-legal-title-p">Legal Resources and Policies</p>
          </div>
        </div>

        <div id="Legal-content-875" className={cssGlobal["content-875"]}>
          <div id="Legal-legal" className={css["legal"]}>
            <div id="Legal-legal-list" className={css["legal-list"]}>
              <div id="Legal-legal-box" className={css["legal-box"]}>
                <div id="Legal-legal-box-info" className={css["legal-box-info"]}>
                  <h1 id="Legal-legal-box-info-h1">Terms of Service</h1>
                  <p id="Legal-legal-box-info-p">
                    This policy document outlines the terms and conditions for
                    using The Stax Developer Suite.
                  </p>
                </div>
                <div id="Legal-legal-box-view" className={css["legal-box-view"]}>
                  <Link id="Legal-legal-box-link" className={css["legal-box-link"]}
                    to="/legal/terms-of-service"
                  >
                    <div id="Legal-legal-box-button" className={css["legal-box-button"]}>
                      <p id="Legal-legal-box-button-p">
                        View
                        <i id="Legal-legal-box-button-icon" className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              <div id="Legal-legal-box--2" className={css["legal-box"]}>
                <div id="Legal-legal-box-info--2" className={css["legal-box-info"]}>
                  <h1 id="Legal-legal-box-info-h1--2">Privacy Policy</h1>
                  <p id="Legal-legal-box-info-p--2">
                    This policy document describes what personal information we
                    collect from you and how we manage them.
                  </p>
                </div>
                <div id="Legal-legal-box-view--2" className={css["legal-box-view"]}>
                  <Link id="Legal-legal-box-link--2" className={css["legal-box-link"]}
                    to="/legal/privacy-policy"
                  >
                    <div id="Legal-legal-box-button--2" className={css["legal-box-button"]}>
                      <p id="Legal-legal-box-button-p--2">
                        View
                        <i id="Legal--legal-box-button-icon--2" className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
