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
import css from "./LegalPrivacy.module.css";

export default function LegalPrivacy() {

  document.documentElement.setAttribute("data-apptheme", "dark");
  document.body.style.overflow = 'auto';


  return (
    <div id="LegalPrivacy-react-div" className={cssGlobal["react-div"]}>
      <div id="LegalPrivacy-page-full" className={cssGlobal["page-full"]}>
        <Nav />
        <Addons />
        <div id="LegalPrivacy-content-100" className={cssGlobal["content-100"]}>
          <Link id="LegalPrivacy-legal-link" className={css["legal-link"]}
            to="/legal"
          >
            <div id="LegalPrivacy-legal-button" className={css["legal-button"]}>
              <p id="LegalPrivacy-legal-button-p">
                <i id="LegalPrivacy-legal-button-icon" className={`${css["fas"]} ${css["fa-arrow-left"]} ${"fas fa-arrow-left"}`}></i>
                Back to Legal
              </p>
            </div>
          </Link>

          <div id="LegalPrivacy-document-split" className={css["document-split"]}>
            <div id="LegalPrivacy-document-nav" className={css["document-nav"]}>
              <h1 id="LegalPrivacy-document-nav-h1">Document Legend</h1>
              <hr id="LegalPrivacy-document-nav-line" className={css["document-nav-line"]}
              />
              <div id="LegalPrivacy-document-nav-section" className={css["document-nav-section"]}>
                <div className={css["document-nav-box"]}>
                  <h2>
                    <i className={`${css["fas"]} ${css["fa-info-circle"]}  ${css["fa-1x"]} ${"fas fa-info-circle fa-1x"}`}></i>
                    General
                  </h2>
                  <a href="#">- Test section regarding this section</a>
                  <a href="#">
                    - Test 2 general describing the forking of life
                  </a>
                  <a href="#">
                    - Test 3 general describing the forking of life
                  </a>
                </div>
                <div className={css["document-nav-box"]}>
                  <h2>
                    <i className={`${css["fas"]} ${css["fa-info-circle"]}  ${css["fa-1x"]} ${"fas fa-info-circle fa-1x"}`}></i>
                    General
                  </h2>
                  <a href="#">- Test section regarding this section</a>
                  <a href="#">
                    - Test 2 general describing the forking of life
                  </a>
                </div>
                <div className={css["document-nav-box"]}>
                  <h2>
                    <i className={`${css["fas"]} ${css["fa-info-circle"]}  ${css["fa-1x"]} ${"fas fa-info-circle fa-1x"}`}></i>
                    General
                  </h2>
                  <a href="#">- section regarding this section</a>
                  <a href="#">
                    - underline general describing the forking of life
                  </a>
                </div>
              </div>
            </div>
            <div id="LegalPrivacy-document" className={css["document"]}>
              <div id="LegalPrivacy-legal-document-title" className={css["legal-document-title"]}>
                <h1>Privacy Policy</h1>
              </div>
              <div id="LegalPrivacy-legal-document" className={css["legal-document"]}>
                <h1>heading 1</h1>
                <p>
                  text here long test test text hello how are you doing this is
                  informational test regarding the privacy policy of user
                  agreement'; that are are using terms and conditions to the
                  center of the universe and we can find polarity in our central
                  individual component of react and php.'; Today we can see what
                  we are talking baout slowly and then begin to find more
                  important stuff.
                </p>
                <p>
                  <b>heading 2</b>
                </p>
                <p>
                  text here long test test text hello how are you doing this is
                  informational test regarding the privacy policy of user
                  agreement'; that are are using terms and conditions to the
                  center of the universe and we can find polarity in our central
                  individual component of react and php.'; Today we can see what
                  we are talking baout slowly and then begin to find more
                  important stuff.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}