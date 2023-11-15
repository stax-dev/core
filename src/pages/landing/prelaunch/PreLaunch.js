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

//Extra
import devUpdatesList from "./devUpdatesList";

export default function Index() {
  document.addEventListener("scroll", function () {
    scrollReveal();
  });

  document.documentElement.setAttribute("data-apptheme", "dark");
  document.body.style.overflow = 'initial';

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
    // if (scrollPosition >= 30) {
    //   document.getElementById("logo-display").style.height = "70dvh";
    //   document.getElementById("logo-display").style.marginBottom = "40dvh";
    // }
    if (scrollPosition >= 50) {
      document.getElementById("logo-display").style.height = "20dvh";
      document.getElementById("logo-display").style.marginBottom = "0dvh";
    }

  });

  function appTheme(){
    /*
    if(document.documentElement.getAttribute("data-apptheme") === "dark") {
      document.documentElement.setAttribute("data-apptheme", "light");
    }else {
      document.documentElement.setAttribute("data-apptheme", "dark");
    }
    */
  }



  return (
    <div id="Index-react-div" className={cssGlobal["react-div"]}>
      <div id="Index-react-background" className={cssGlobal["react-background"]}>
         {/* style={{ backgroundImage: `url(${background})` }}> */}
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
              <section className={cssGlobal["rs-element-both"]}>
                <button onClick={() => appTheme()} className={css["landing-finish-date"]}>
                  <p>{releaseDate}</p>
                </button>
              </section>
            </div>
          </div>
          <div className={cssGlobal["content-100"]}>
            <div className={`${css["landing-title"]} ${cssGlobal["flex-center-left"]}`}>
              <div className={css["landing-title-text"]}>
                <h1>
                  A <span className={css["landing-title-text-white"]}>Centralised Suite of Tools</span> for developers to <span className={css["landing-title-text-white"]}>streamline</span> the DevOps workflow.
                </h1>
              </div>
              {/* <div className={css["landing-title-text"]}>
                <section className={cssGlobal["rs-element-both-left"]}>
                  <h1>
                    <span className={css["landing-title-text-white"]}>Collaboration and Development Made Easy.</span>
                  </h1>
                </section>
              </div> */}
              <div id="PreLaunch-landing-title-art"className={css["landing-title-art"]}>
                <section style={{perspective: "1500px"}} className={cssGlobal["rs-element-both"]}>
                  <img id="PreLaunch-landing-title-art-image" src={splashboardArt} />
                </section>
              </div>
            </div>
            <div className={`${css["landing-features"]} ${cssGlobal["flex-center-center"]}`}>
              <div className={css["landing-features-box"]}>
                <h1>An Ecosystem Integrating Seamlessly</h1>
              </div>
              <div className={css["landing-features-box"]}>
                <h1>Enhancing Teamwork and Collaboration</h1>
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
              <section className={cssGlobal["rs-element-both"]}>
                <div className={`${css["landing-project-title"]} ${cssGlobal["flex-center-left"]}`}>
                  <div className={css["landing-project-title-icon"]}>
                    <section className={cssGlobal["rs-element-both"]}>
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
              </section>
              <div className={`${css["landing-project-list"]} ${cssGlobal["flex-flex-start-left"]}`}>
                <div className={css["landing-project-list-box"]}>
                  <section className={cssGlobal["rs-element-both"]}>
                    <div className={`${css["landing-project-list-box-icon"]} ${cssGlobal["flex-center-center"]}`}>
                      <i className={`${css["fas"]} ${css["fa-server"]} ${"fas fa-server"}`}></i>
                    </div>
                    <p>
                      Scalable Droplet Hosting allows you to change your budget and resources <span>on the fly.</span>
                    </p>
                  </section>
                </div>
                <div className={css["landing-project-list-box"]}>
                  <section className={cssGlobal["rs-element-both"]}>
                    <div style={{animationDelay: "1s"}} className={`${css["landing-project-list-box-icon"]} ${cssGlobal["flex-center-center"]}`}>
                      <i className={`${css["fas"]} ${css["fa-gauge=high"]} ${"fas fa-gauge-high"}`}></i>
                    </div>
                    <p>
                      <span>Built-in Dashboard</span> with an AI Chatbot, team permissions, server analytics and more...
                    </p>
                  </section>
                </div>
                <div className={css["landing-project-list-box"]}>
                  <section className={cssGlobal["rs-element-both"]}>
                    <div style={{animationDelay: "1.5s"}} className={`${css["landing-project-list-box-icon"]} ${cssGlobal["flex-center-center"]}`}>
                      <i className={`${css["fas"]} ${css["fa-rocket"]} ${"fas fa-rocket"}`}></i>
                    </div>
                    <p>
                      Launch your droplet easily with several <span>pre-built templates</span> to choose from.
                    </p>
                  </section>
                </div>
                <div className={css["landing-project-list-box"]}>
                  <section className={cssGlobal["rs-element-both"]}>
                    <div style={{animationDelay: "2s"}} className={`${css["landing-project-list-box-icon"]} ${cssGlobal["flex-center-center"]}`}>
                      <i className={`${css["fas"]} ${css["fa-wand-magic-sparkles"]} ${"fas fa-wand-magic-sparkles"}`}></i>
                    </div>
                    <p>
                      Load balancers, snapshots, custom domains and tons more <span>with every server.</span>
                    </p>
                    </section>
                </div>
                <div className={css["landing-project-list-box"]}>
                  <section className={cssGlobal["rs-element-both"]}>
                    <div style={{animationDelay: "2.5s"}} className={`${css["landing-project-list-box-icon"]} ${cssGlobal["flex-center-center"]}`}>
                      <i className={`${css["fas"]} ${css["fa-shapes"]} ${"fas fa-shapes"}`}></i>
                    </div>
                    <p>
                      We aim to accomodate <span>all skill levels.</span> Our services are designed to be <span>simple and easy to use.</span>
                    </p>
                  </section>
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
              {/* <section className={cssGlobal["rs-element-both"]}> */}
                <img src={codingclockArt}/>
              {/* </section> */}
            </div>
            <div className={css["landing-updates-title"]}>
              <h1>Development Updates</h1>
            </div>
            <div className={css["landing-updates"]}>
              {[...Array(1)].map((number, index) => (
                devUpdatesList.reverse().map((list, index) => (
                  <div key={index} className={`${css["landing-updates-box"]} ${cssGlobal["flex-center-left"]}`}>
                    <div className={css["landing-updates-box-line"]}></div>
                    <div className={css["landing-updates-box-circle"]}></div>
                    <div className={css["landing-updates-box-info"]}>
                      <h1>{list.title} • {list.date}</h1>
                      {list.info}
                    </div>
                  </div>
                ))
              ))}
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
              <button onClick={() => appTheme()} className={css["landing-finish-date"]}>
                <p>{releaseDate}</p>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
