//React
import React, { useEffect } from "react";
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
import css from "./Chats.module.css";

//Extra
import bannerColoursList from "../../../components/data/bannerColours";

export default function Chats() {
  //used const cause to make it look different from normal functions
  //this function is basically window.onscroll but div version of it not document body
  document.addEventListener("scroll", function () {
    scrollReveal();
  });



  return (
    <div className={cssGlobal["react-div"]}>
      {/* style={{ backgroundImage: `url('${background}')`}} */}
      <div className={cssGlobal["page-full"]}>
        <Nav />
        <div className={cssGlobal["content-100"]}>
            <div className={css["chats-title"]}>
                <h1>Chats</h1>
                <p>Stax Developer Studio</p>
            </div>
        </div>
        <div className={cssGlobal["content-100"]}>
            <div className={css["chats-explain"]}>
                <p>Introducing super encrypted messaging, with top level security and privacy</p>
            </div>
        </div>
        <div className={cssGlobal["content-875"]}>
            <div className={`${css["chats-feature"]} ${cssGlobal["flex-center-center"]}`}>
                <div className={css["chats-feature-info"]}>
                    <h2>Encryption</h2>
                    <p>Secure Messaging that is immune to tunneling or hacking</p>
                </div>
                <div className={css["chats-feature-art"]}>
                    <section className={"rs-element"}>
                        {/* <img src={whitelabel} /> */}
                    </section>
                </div>
            </div>
        </div>
        <div className={cssGlobal["content-875"]}>
            <div className={`${css["chats-feature2"]} ${cssGlobal["flex-center-center"]}`}>
                <div className={css["chats-feature-info"]}>
                    <h2>Security Features</h2>
                    <p>Exploding Messages that can only be viewed once, timed messages that delete themselves and much more</p>
                </div>
                <div className={css["chats-feature-art"]}>
                    <section className={"rs-element"}>
                        {/* <img src={whitelabel} /> */}
                    </section>
                </div>
            </div>
        </div>
        <div className={cssGlobal["content-875"]}>
            <div className={`${css["chats-feature"]} ${cssGlobal["flex-center-center"]}`}>
                <div className={css["chats-feature-info"]}>
                    <h2>Device Security</h2>
                    <p>SDS Chats supports multiple devices with cross-platform capability. Secure and restrict your specific devices and limits</p>
                </div>
                <div className={css["chats-feature-art"]}>
                    <section className={"rs-element"}>
                        {/* <img src={whitelabel} /> */}
                    </section>
                </div>
            </div>
        </div>
        <div className={cssGlobal["content-875"]}>
            <div className={`${css["chats-feature2"]} ${cssGlobal["flex-center-center"]}`}>
                <div className={css["chats-feature-info"]}>
                    <h2>Integrated with SDS</h2>
                    <p>Apart from being its standalone application, SDS Chats are integrated into all Stax Developer Studio services, keeping the entire ecosystem fully secure.</p>
                </div>
                <div className={css["chats-feature-art"]}>
                    <section className={"rs-element"}>
                        {/* <img src={whitelabel} /> */}
                    </section>
                </div>
            </div>
        </div>
        <div className={cssGlobal["content-100"]}>
            <div className={css["chats-start"]}>
                <h2>Get Started</h2>
                <button className={css["chats-start-button"]}>Use Stax Chats</button>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
