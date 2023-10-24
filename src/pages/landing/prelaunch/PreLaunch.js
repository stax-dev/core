//React
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import Config from "../../../init/Config";
// import Button from "../../../components/button/Button";

//External
import {
  Addons,
  Bubbles,
  scrollReveal,
  snackbarNotification,
  newNotification,
  viewNotification,
  closeNotification,
} from "../../../components/addons/Addons";

import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";
import Nav from "../../../components/nav/Nav";
import Footer from "../../../components/footer/Footer";

//Main
import css from "./PreLaunch.module.css";

//Images
import background from "../../../images/backgrounds/background.svg";
import iconHosting from "../../../images/icons/hosting.svg";
import iconWiki from "../../../images/icons/wiki.svg";
import iconOffices from "../../../images/icons/offices.svg";
import iconChat from "../../../images/icons/chat.svg";
import splashboardArt from "../../../images/main/splashboard.svg";
import codingclockArt from "../../../images/main/codingclock.svg";

export default function Index() {
  document.addEventListener("scroll", function () {
    scrollReveal();
  });

  document.documentElement.setAttribute("data-apptheme", "dark");
  document.body.style.overflow = 'auto';

  var logo = "https://cdn.st.ax/v2/logo.svg";

  var releaseDate = "April 2024";


  window.addEventListener('scroll', function() {
    // Get the current scroll position
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    // Check if the scroll position is at or beyond 25px
    if (scrollPosition >= 0) {
      document.getElementById("logo-display").style.height = "100dvh";
      document.getElementById("logo-display").style.marginBottom = "60dvh";
    }
    if (scrollPosition >= 25) {
      document.getElementById("logo-display").style.height = "70dvh";
      document.getElementById("logo-display").style.marginBottom = "40dvh";
    }
    if (scrollPosition >= 50) {
      document.getElementById("logo-display").style.height = "40dvh";
      document.getElementById("logo-display").style.marginBottom = "20dvh";
    }

  });

  // Get references to the div elements
  var div1 = document.getElementById("logo-display");
  var div2 = document.getElementById("logo-");

  // Add scroll event listener to the window
  window.addEventListener("scroll", function() {
    // Get the current scroll position
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Check if div1 is in view
    if (scrollPosition > div1.offsetTop && scrollPosition < div1.offsetTop + div1.offsetHeight) {
      // Scroll to div2
      window.scrollTo({
        top: div2.offsetTop,
        behavior: "smooth"
      });
    }
  });



  return (
    <div id="Index-react-div" className={cssGlobal["react-div"]}>
      <div id="Index-react-background" className={cssGlobal["react-background"]} style={{ backgroundImage: `url(${background})` }}>
        <div className={cssGlobal["page-full"]}>
          <Addons />
          <Bubbles />
          <div id="logo-display" className={`${css["logo-display"]} ${cssGlobal["flex-center-center"]}`}>
            <div className={css["logo-display-box"]}>
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div id="logo-title" className={`${css["logo-title"]} ${cssGlobal["flex-center-center"]}`}>
            <div className={`${css["landing-nav"]} ${cssGlobal["flex-center-center"]}`}>
              <div className={css["landing-nav-title"]}>
                <p>Stax Developer Studios</p>
              </div>
              <div className={css["landing-nav-text"]}>
                <p>The Ultimate DevOps Ecosystem</p>
              </div>
              <div className={css["landing-finish-date"]}>
                  <p>{releaseDate}</p>
                </div>
            </div>
          </div>
          <div className={cssGlobal["content-100"]}>
            <div className={`${css["landing-title"]} ${cssGlobal["flex-center-left"]}`}>
              <div className={css["landing-title-art"]}>
                <section className={"rs-element-both"}>
                  <img src={splashboardArt} />
                </section>
              </div>
              <div className={css["landing-title-text"]}>
              <h1>
                A <span className={css["landing-title-text-white"]}>Centralised Suite of Tools</span> for developers to <span className={css["landing-title-text-white"]}>seamlessly</span> build, deploy and manage projects.
              </h1>
              </div>
              <div className={css["landing-title-text"]}>
              <h1>
                <span className={css["landing-title-text-white"]}>Collaboration and Development Made Easy.</span>
              </h1>
              </div>
            </div>
          </div>
          {/* <div className={cssGlobal["content-100"]}>
            <div className={css["landing-subtitle"]}>
              <h1>Upcoming Project Timelines</h1>
            </div>
          </div> */}
          <div className={cssGlobal["content-100"]}>
            <div className={css["landing-project"]}>
              <div className={`${css["landing-project-title"]} ${cssGlobal["flex-center-left"]}`}>
                <div className={css["landing-project-title-icon"]}>
                  <section className={"rs-element-both"}>
                    <img src={iconHosting} alt="logo" />
                  </section>
                </div>
                <div className={css["landing-project-title-text"]}>
                  <h1>SDS Hosting</h1>
                </div>
                <div className={css["landing-project-title-info"]}>
                  <p>Hosting for anything. Literally.</p>
                </div>
              </div>
              <div className={css["landing-project-progress"]}>
                <div style={{width: "64%"}} className={css["landing-project-progress-bar"]}></div>
              </div>
              <div className={`${css["landing-project-list"]} ${cssGlobal["flex-flex-start-left"]}`}>
                <div className={css["landing-project-list-box"]}>
                  <div className={`${css["landing-project-list-box-icon"]} ${cssGlobal["flex-center-center"]}`}>
                    <i className={`${css["fas"]} ${css["fa-server"]} ${"fas fa-server"}`}></i>
                  </div>
                  <p>
                    Scalable Droplet Hosting allows you to change your budget and resources <span>on the fly.</span>
                  </p>
                </div>
                <div className={css["landing-project-list-box"]}>
                  <div style={{animationDelay: "1s"}} className={`${css["landing-project-list-box-icon"]} ${cssGlobal["flex-center-center"]}`}>
                    <i className={`${css["fas"]} ${css["fa-gauge=high"]} ${"fas fa-gauge-high"}`}></i>
                  </div>
                  <p>
                    <span>Built-in Dashboard</span> with an AI Chatbot, team permissions, server analytics and more...
                  </p>
                </div>
                <div className={css["landing-project-list-box"]}>
                  <div style={{animationDelay: "1.5s"}} className={`${css["landing-project-list-box-icon"]} ${cssGlobal["flex-center-center"]}`}>
                    <i className={`${css["fas"]} ${css["fa-rocket"]} ${"fas fa-rocket"}`}></i>
                  </div>
                  <p>
                    Launch your droplet easily with several <span>pre-built templates</span> to choose from.
                  </p>
                </div>
                <div className={css["landing-project-list-box"]}>
                  <div style={{animationDelay: "2s"}} className={`${css["landing-project-list-box-icon"]} ${cssGlobal["flex-center-center"]}`}>
                    <i className={`${css["fas"]} ${css["fa-wand-magic-sparkles"]} ${"fas fa-wand-magic-sparkles"}`}></i>
                  </div>
                  <p>
                    Load balancers, snapshots, custom domains and tons more <span>with every server.</span>
                  </p>
                </div>
                <div className={css["landing-project-list-box"]}>
                  <div style={{animationDelay: "2.5s"}} className={`${css["landing-project-list-box-icon"]} ${cssGlobal["flex-center-center"]}`}>
                    <i className={`${css["fas"]} ${css["fa-shapes"]} ${"fas fa-shapes"}`}></i>
                  </div>
                  <p>
                    We aim to accomodate <span>all skill levels.</span> Our services are designed to be <span>simple and easy to use.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={cssGlobal["content-100"]}>
            <div className={css["landing-project"]}>
              <div className={`${css["landing-project-title"]} ${cssGlobal["flex-center-left"]}`}>
                <div className={css["landing-project-title-icon"]}>
                  <img src={iconWiki} alt="logo" />
                </div>
                <div className={css["landing-project-title-text"]}>
                  <h1>SDS Wiki</h1>
                </div>
              </div>
              <div className={css["landing-project-progress"]}>
                <div style={{backgroundColor: "var(--accent4)", width: "23%"}} className={css["landing-project-progress-bar"]}></div>
              </div>
              <div className={`${css["landing-project-list"]} ${cssGlobal["flex-flex-start-left"]}`}>
              </div>
            </div>
          </div> */}
          <div className={cssGlobal["content-100"]}>
            <div className={css["landing-updates-art"]}>
              <section className={"rs-element-both"}>
                <img src={codingclockArt}/>
              </section>
            </div>
            <div className={css["landing-updates-title"]}>
              <h1>Development Updates</h1>
            </div>
            <div className={css["landing-updates"]}>
              {/* add updates here */}

              <div className={css["landing-updates-box"]}>
                <section className={"rs-element"}>
                  <h1>Introduction • 6th October 2023</h1>
                  <p>
                    Hey there! Welcome to the SDS pre-launch page.{" "}
                    SDS is currently in the process of development and more news is yet to come!{" "}
                    Updates will be posted here as things progress.<br/><br/>
                    We look forward to having you at our release!
                  </p>
                </section>
              </div>

              <div className={css["landing-updates-box"]}>
                <section className={"rs-element"}>
                  <h1>Introduction • 6th October 2023</h1>
                  <p>
                    Hey there! Welcome to the SDS pre-launch page.{" "}
                    SDS is currently in the process of development and more news is yet to come!{" "}
                    Updates will be posted here as things progress.<br/><br/>
                    We look forward to having you at our release!
                  </p>
                </section>
              </div>
            </div>
          </div>
          <div className={cssGlobal["content-100"]}>
            <div className={css["landing-contact"]}>
              <h1>Contact Us</h1>
              <div className={`${css["landing-contact-list"]} ${cssGlobal["flex-flex-start-left"]}`}>
                <div className={css["landing-contact-list-box"]}>
                  <div className={`${css["landing-contact-list-box-icon"]} ${cssGlobal["flex-center-center"]}`}>
                    <i className={`${css["fas"]} ${css["fa-envelope"]} ${"fas fa-envelope"}`}></i>
                  </div>
                  <p>Contact Us at </p>
                </div>
                <div className={css["landing-contact-list-box"]}>
                  <div className={`${css["landing-contact-list-box-icon"]} ${cssGlobal["flex-center-center"]}`}>
                    <i className={`${css["fas"]} ${css["fa-envelope"]} ${"fas fa-envelope"}`}></i>
                  </div>
                  <p>Follow us on twitter for announcements and updates</p>
                </div>
              </div>
            </div>
            <div className={css["landing-finish"]}>
              <div className={css["landing-finish-date"]}>
                <p>{releaseDate}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
