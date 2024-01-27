//React
import React, { useEffect /* useState */ } from "react";
import { Link } from "react-router-dom";
//import Button from "../../../components/button/Button";

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
import css from "./Hosting.module.css";

//Images
import background from "../../../images/backgrounds/background1.svg";
import dashboardArt from "../../../images/main/dashboard.svg";
import IntegrationArt from "../../../images/main/integrations.svg";

export default function Hosting() {

  document.documentElement.setAttribute("data-apptheme", "dark");
  document.body.style.overflow = 'auto';


  //this is the page scroll reveal function
  document.addEventListener("scroll", function () {
    scrollReveal();
  });

  var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  useEffect(() => {
    var elements = document.getElementsByClassName("typewrite");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("data-type");
      var period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML =
      ".typewrite > .wrap { border-right: 3px solid var(--accent); line-height: 90%;}";
    document.body.appendChild(css);
  });

  return (
    <div id="Hosting-react-div" className={cssGlobal["react-div"]}>
      <div id="Hosting-react-background" className={cssGlobal["react-background"]}
        style={{ backgroundImage: `url(${background})` }}>
        <div id="Hosting-page-full" className={cssGlobal["page-full"]}>
          <Nav />
          <Addons />
          <Bubbles />
          <div id="Hosting-content-100" className={cssGlobal["content-100"]}>
            <div id="Hosting-hostingoptions-title" className={css["hostingoptions-title"]}>
              <h1 id="Hosting-hostingoptions-title-h1">Hosting</h1>
              <p>Stax Developer Studio</p>
              {/* <a href="#hostingoptions">
                                <div className={css["hostingoptions-title-button"]}>
                                    <a href="#hostingoptions">
                                        <div className={css["hostingoptions-title-button-inside"]}>
                                            <p>View Options</p>
                                        </div>
                                    <a/>
                                </div>
                            </a> */}
            </div>
          </div>

          <div id="features"></div>

          {/* why explain */}
          <div id="Hosting-content-100--2" className={cssGlobal["content-100"]}>
            <div id="Hosting-index-internal-split" className={`${css["index-internal-split"]} ${cssGlobal["flex-center-center"]}`}>
              <section id="Hosting-rselement-active" className={cssGlobal["rs-element"]}>
                <div id="Hosting-why" className={css["why"]}>
                  <div id="Hosting-why-title" className={css["why-title"]}>
                    <h1 id="Hosting-why-title-h1">Enhance your experience.</h1>
                  </div>
                  <div id="Hosting-why-section" className={`${css["why-section"]} ${cssGlobal["flex-flex-start-center"]}`}>
                    <div id="Hosting-why-box" className={css["why-box"]}>
                      <i id="Hosting-why-box-icon" className={`${css["far"]} ${css["fa-calendar-check"]} ${css["fa-1x"]} ${"far fa-calendar-check fa-1x"}`}></i>
                      <h1 id="Hosting-why-box-h1">Unique Payment Scheme</h1>
                      <p id="Hosting-why-box-p">
                        Our payment scheme is like no other. Control your
                        droplet's uptime, and maximise your plan efficiency.
                      </p>
                    </div>
                    <div id="Hosting-why-box--2" className={css["why-box"]}>
                      <i id="Hosting-why-box-icon--2" className={`${css["fas"]} ${css["fa-sliders"]} ${css["fa-1x"]} ${"fas fa-sliders fa-1x"}`}></i>
                      <h1 id="Hosting-why-box-h1--2">
                        Incredible Pricing Plans
                      </h1>
                      <p id="Hosting-why-box-p--2">
                        Fully customisable server specifications, with amazing
                        and affordable pricing that fits your budget.
                      </p>
                    </div>
                    <div id="Hosting-why-box--3" className={css["why-box"]}>
                      <i id="Hosting-why-box-icon--3" className={`${css["fas"]} ${css["fa-tools"]} ${css["fa-1x"]} ${"fas fa-tools fa-1x"}`}></i>
                      <h1 id="Hosting-why-box-h1--3">Coding Ecosystem</h1>
                      <p id="Hosting-why-box-p--3">
                        Integrated with the full Stax Developer Studios products
                        and services to provide you easy workflow.
                      </p>
                    </div>
                    <div id="Hosting-why-box--4" className={css["why-box"]}>
                      <i id="Hosting-why-box-icon--4" className={`${css["fas"]} ${css["fa-users"]} ${css["fa-1x"]} ${"fas fa-users fa-1x"}`}></i>
                      <h1 id="Hosting-why-box-icon-h1--4">
                        Trusted and Reliable
                      </h1>
                      <p id="Hosting-why-box-icon-p--4">
                        Don't worry, our services always aim to support you and
                        your projects. Made by coders, for coders.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* payscheme */}
          <div id="Hosting-content-100--3" className={cssGlobal["content-100"]}>
            <div id="Hosting-payscheme" className={`${css["payscheme"]} ${cssGlobal["flex-stretch-center"]}`}>
              <div id="Hosting-payscheme-explain" className={css["payscheme-explain"]}>
                <h1 id="Hosting-payscheme-explain-h1">
                  Understanding our Unique Payment Scheme
                </h1>
                <p id="Hosting-payscheme-explain-p">
                  <b>SDS plans provides 1000 hours of server uptime.</b> No
                  monthly plans.
                </p>
                <p id="Hosting-payscheme-explain-p--2">
                  These hours do not include when the server is offline,
                  therefore the plan duration is flexible.
                </p>
                <p id="Hosting-payscheme-explain-p--3">
                  Each plan has a minimum duration of around 41 days, and a
                  maximum of 1 year. Whether that means leaving the server
                  online 24/7, or turning it on once a week, that's up to you.
                </p>
                <span id="Hosting-payscheme-text" className={css["payscheme-text"]}>
                  Plans have a limit of 1 year. This is to prevent long
                  inactivity and to free up space for other users.
                </span>
              </div>
              <div id="Hosting-payscheme-numbers" className={css["payscheme-numbers"]}>
                <h1 id="Hosting-payscheme-numbers-h1">
                  That's
                  <a id="Hosting-payscheme-numbers-a"
                    onClick={(e) => {
                      e.preventDefault();
                    }} className={`${css["typewrite"]} ${"typewrite"}`}
                    data-period="3500"
                    data-type='["1000 Hours", "41 Days", "6 weeks", "1.4 Months"]'
                  >
                    {/*}
                                    Calculation of 1000 hours
                                    ----------------------------------
                                    1000 hours
                                    41.6667 days
                                    5.95238 weeks
                                    1.36986 months
                                    0.114155 years
                                    ---------------------------------
                                */}
                    <p id="Hosting-payscheme-numbers-p"
                      style={{ display: "none" }}></p>
                    {/* this p style is so that the <a> tag is not empty */}6
                    weeks
                  </a>
                  <noscript>
                    <a id="Hosting-payscheme-numbers-a--2"
                      onClick={(e) => {
                        e.preventDefault();
                      }} className={`${css["typewrite"]} ${"typewrite"}`}>
                      6 weeks
                    </a>
                  </noscript>
                  Of Server Uptime
                </h1>
                <h2 id="Hosting-payscheme-numbers-h2">
                  <span id="Hosting-firstline" className={css["firstline"]}>
                    Use it up in one year, whenever you want.
                  </span>{" "}
                  Goodbye monthly plans, it's time you decide.
                </h2>
              </div>
            </div>
          </div>

          {/* dashboard */}
          <div id="Hosting-content-875" className={cssGlobal["content-875"]}>
            <div id="Hosting-hosting-feature2" className={`${css["hosting-feature2"]} ${cssGlobal["flex-center-center"]}`}>
              <div id="Hosting-hosting-feature2-art--2" className={css["hosting-feature2-art"]}>
                <section id="Hosting-rs-element" className={cssGlobal["rs-element"]}>
                  <img id="Hosting-hosting-feature2-art-img"
                    src={dashboardArt}
                  />
                </section>
              </div>
              <div id="Hosting-hosting-feature2-box" className={css["hosting-feature2-box"]}>
                <h1 id="Hosting-hosting-feature2-box">Hosting Dashboard</h1>
                <p id="Hosting-hosting-feature2-box-p">
                  Operate your server with a user friendly
                  interface for maximum productivity. Featuring built-in Copilot and GPT4, serverless functions and the SDS scripting language.
                </p>
                <p id="Hosting-hosting-feature2-box-p--2">
                  Create snapshots, custom plan members permissions and server
                  analytics for all your plans.
                </p>
                <p id="Hosting-hosting-feature2-box-p--3">
                  Psst... you know there's more right?
                </p>
              </div>
            </div>
          </div>

          {/* integrations */}
          <div id="Hosting-content-875--2" className={cssGlobal["content-875"]}>
            <div id="Hosting-hosting-feature" className={`${css["hosting-feature"]} ${cssGlobal["flex-center-center"]}`}>
              <div id="Hosting-hosting-feature-box" className={css["hosting-feature-box"]}>
                <h1 id="Hosting-hosting-feature-box-h1">Account Integration</h1>
                <p id="Hosting-hosting-feature-box-p">
                  Connect popular work platforms and apps to your Stax Developer
                  Suite account, giving you cool features for productivity! Ease
                  your workflow with quick shortcuts, faster logins, git
                  hosting-features, , and more!
                </p>
                <p id="Hosting-hosting-feature-box-p--2">
                  All inside your Stax Developer Studios account, integrated right
                  into your living room. Find out more in your splashboard
                  integrations page.
                </p>
                {/* <form action="/splashboard/hosting-features">
                                    <input type="submit" className={css["hosting-feature-button"]} value="Learn More"/>
                                </form> */}
              </div>
              <div id="Hosting-hosting-feature-art" className={css["hosting-feature-art"]}>
                <section id="Hosting-rs-element--2" className={cssGlobal["rs-element"]}>
                  <img id="Hosting-hosting-feature-art-img"
                    src={IntegrationArt}
                  />
                </section>
              </div>
            </div>
          </div>

          {/* <div id="Hosting-content-875" className={cssGlobal["content-875"]}>
                        <div id="Hosting-hosting-feature" className={css["hosting-feature"]}>
                            <div id="Hosting-hosting-feature-box" className={css["hosting-feature-box"]}>
                                <h1 id="Hosting-hosting-feature-box-h1">Scalable Plans</h1>
                                <p id="Hosting-hosting-feature-box-p">
                                    Stax Developer Studios offers prices and scalibility like no other. View our killer pricing plan deals and customise it just right to your needs.
                                </p>
                                <p id="Hosting-hosting-feature-box-p--2">
                                    Why buy 12gb of RAM when you only need technically 10? But what if I need more in the future? No worries! Our flexible plans allow you to upgrade and downgrade your server specs at any time.
                                </p>
                            </div>
                            <div id="Hosting-hosting-feature-art" className={css["hosting-feature-art"]}>
                                <section className={cssGlobal["rs-element"]}>

                                </section>
                            </div>
                        </div>
                    </div> */}

          {/* <div id="Hosting-content-875--2" className={cssGlobal["content-875"]}>
                        <div id="Hosting-control-panel" className={`${css["control-panel"]} ${cssGlobal["flex-center-center"]}`}>
                            <div id="Hosting-control-panel-art" className={css["control-panel-art"]}>
                                <section className={cssGlobal["rs-element"]}>
                                    <img src={dashboardArt}/>
                                </section>
                            </div>
                            <div id="Hosting-control-panel-box" className={css["control-panel-box"]}>
                                <h1 id="Hosting-control-panel-box-h1">Hosting Dashboard</h1>
                                <h2 id="Hosting-control-panel-box-h2">
                                    Control your plans efficiently with a stunning dashboard.&nbsp;
                                    Operate your server with ease with a user friendly interface for maximum productivity.
                                </h2>
                            </div>
                        </div>
                    </div> */}

          <div id="Hosting-content-875--3" className={cssGlobal["content-875"]}>
            <div id="Hosting-hostingoptions-features-title" className={css["hostingoptions-features-title"]}>
              <h1 id="Hosting-hostingoptions-features-title-h1">
                Bundled with these, and much more...
              </h1>
            </div>
          </div>

          <div id="Hosting-content-875--5" className={cssGlobal["content-875"]}>
            <section id="Hosting-rs-element--3" className={cssGlobal["rs-element"]}>
              <div id="Hosting-hostingoptions-list" className={`${css["hostingoptions-list"]} ${cssGlobal["flex-flex-start-center"]}`}>
                <div id="Hosting-hostingoptions-list-title" className={css["hostingoptions-list-title"]}>
                  <h1 id="Hosting-hostingoptions-list-title-h1">
                    Now, what's your type?
                  </h1>
                </div>

                <div id="Hosting-hostingoptions-list-box" className={`${css["hostingoptions-list-box"]} ${cssGlobal["flex-center-left"]}`}>
                  <div id="Hosting-hostingoptions-list-box-image" className={css["hostingoptions-list-box-image"]}>
                    <i id="Hosting-hostingoptions-list-box-image-icon" className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>
                  </div>
                  <div id="Hosting-hostingoptions-list-box-title" className={css["hostingoptions-list-box-title"]}>
                    <h1 id="Hosting-hostingoptions-list-box-title-h1">
                      Droplet Hosting
                    </h1>
                    {/* <span className={css["hostingoptions-tag3"]}>Unique</span> */}
                  </div>
                  <div id="Hosting-hostingoptions-list-box-card" className={css["hostingoptions-list-box-card"]}>
                    <div id="Hosting-hostingoptions-list-box-features" className={css["hostingoptions-list-box-features"]}>
                      <p id="Hosting-hostingoptions-list-box-features-p">
                        This is the new VPS hosting. Energy efficient and low
                        priced droplet hosting spaces, built for a wide ranges
                        of projects and developments.
                      </p>
                    </div>
                  </div>
                  <div id="Hosting-hostingoptionslist-button" className={css["hostingoptions-list-button"]}>
                    <Link id="Hosting-hostingoptions-list-link" className={css["hostingoptions-list-link"]}
                      to="/products/hosting/droplet"
                    >
                      <div id="Hosting-hostingoptions-list-box-button-inside" className={css["hostingoptions-list-box-button-inside"]}>
                        <p id="Hosting-hostingoptions-list-box-button-inside-p">
                          Learn More
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
