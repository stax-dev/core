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
import css from "./Index.module.css";

//Images
import background from "../../../images/backgrounds/background.svg";
import smallbackground from "../../../images/backgrounds/background-short2.svg";
import secureArt from "../../../images/main/secure.svg";
import whitelabel from "../../../images/main/whitelabel.svg";
import indexArt from "../../../images/main/index.svg";

export default function Index() {
  document.addEventListener("scroll", function () {
    scrollReveal();
  });

  document.documentElement.setAttribute("data-apptheme", "dark");
  document.body.style.overflow = 'auto';

  // const [buttonIsPressed, setButtonIsPressed] = useState(false);
  // let orig = "Howdy there...";
  // let orig_alt = "Hello World<br />How are you?<br />Cool huh?<br />";

  // function pressHandler() {
  //   buttonIsPressed ? pressedHandler(orig) : pressedHandler(orig_alt);
  // }

  // function pressedHandler(parm) {
  //   document.getElementById("code").innerHTML = parm;
  //   buttonIsPressed ? setButtonIsPressed(false) : setButtonIsPressed(true);
  // }

  return (
    <div id="Index-react-div" className={cssGlobal["react-div"]}>
      <div id="Index-react-background" className={cssGlobal["react-background"]}
        style={{ backgroundImage: `url(${background})` }}>
        <div className={css["backdrop"]}>
          <div className={css["backdrop-box1"]}>1</div>
          <div className={css["backdrop-box2"]}>1</div>
          <div className={css["backdrop-box3"]}>1</div>
          <div className={css["backdrop-box4"]}>1</div>
        </div>

        {/* style={{backgroundImage: `url(${background}})`}} */}
        <div id="Index-page-full" className={cssGlobal["page-full"]}>
          <Nav number="1" />
          <Addons />
          <Bubbles />
          {/*
            <header className={css.header}>
              <img
                src="https://cdn.st.ax/v2/logo.svg" className={css.logo}
                alt="logo"
              />
              <br />
              <br />
              <p id="isPressed">
                Button is {buttonIsPressed ? "pressed" : "not pressed"}
              </p>
              <pre id="code"></pre>
              <Button text={buttonIsPressed ? "Depress" : "Press"} onClick={pressHandler} />
            </header>
            */}

          <div id="Index-content-100" className={cssGlobal["content-100"]}>
            <div id="Index-title-split" className={css["title-split"]}>
              <div id="Index-index-title" className={`${css["index-title"]} ${cssGlobal["flex-center-left"]}`}>
                <div id="Index-title-text" className={css["title-text"]}>
                  <h1 id="Index-title-text-h1">Stax Developer Suite</h1>
                  <p id="Index-title-text-p">
                    <span id="Index-title-text-span">
                      The Developer's Ecosystem
                    </span>
                  </p>
                  <div id="Index-title-buttons" className={`${css["title-buttons"]} ${cssGlobal["flex-center-left"]}`}>
                    <button id="Index-title-button" className={css["title-button"]}
                      onClick={() => (window.location.href = "#more")}>
                      Learn More
                    </button>
                    {/* <div id="Index-title-button2" className={css["title-button2"]} onClick={() => window.location.href = "#news"}>
                        View News
                      </div> */}
                  </div>
                </div>
                <div id="Index-index-art" className={css["index-art"]}>
                  {/* <img src={indexArt}/> */}
                </div>
                <div id="Index-index-banner" className={css["index-banner"]}></div>
              </div>
            </div>
          </div>

          <div style={{ display: "hidden" }} id="more"></div>

          <div id="features"></div>

          <div id="Index-content-100--2" className={cssGlobal["content-100"]}>
            <div id="Index-index-intro" className={`${css["index-intro"]} ${cssGlobal["flex-flex-start-left"]}`}>
              <div id="Index-index-intro-box" className={css["index-intro-box"]}>
                {/* <h1 id="Index-index-feature-box-h1">The Developer Ecosystem</h1> */}
                <p id="Index-index-intro-box-p">
                  Welcome to the Developer Suite.
                </p>
                <p id="Index-index-intro-box-p--2">
                  A suite of products and services, integrating with one another
                  to create a seamless experience for developers.
                </p>
              </div>
              <div id="Index-index-intro-box2" className={css["index-intro-box2"]}>
                {/* <h1 id="Index-index-feature-box-h1">The Developer Ecosystem</h1> */}
                <p id="Index-index-intro-box2-p">
                  Designed to be beginner friendly, SDS accomodates for
                  developers of all skill levels.&nbsp; Whether you're a
                  beginner or a seasoned professional, you'll find something
                  here for you.
                </p>
              </div>
              <div id="Index-index-intro-button" className={css["index-intro-button"]}>
                <button id="Index-index-feature-button" className={css["index-feature-button"]}>
                  <Link id="Index-index-feature-button-a" to="/products">
                    View Products
                    <i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <div id="Index-content-875" className={cssGlobal["content-875"]}>
            <div id="Index-index-feature2" className={`${css["index-feature"]} ${cssGlobal["flex-center-left"]}`}>
              <div id="Index-index-feature-box2" className={css["index-feature-box"]}>
                <h1 id="Index-index-feature-box2-h1">Whitelabel Suite</h1>
                <p id="Index-index-feature-box-p">
                  Welcome to a completely whitelabeled ecosystem. That's just
                  how we do things. Our services do not require you to pay extra
                  for whitelabel access.
                </p>
              </div>
              <div id="Index-index-feature-art" className={css["index-feature-art"]}>
                <section id="Index-rs-element" className={cssGlobal["rs-element"]}>
                  <img id="Index-index-feature-art-img" src={whitelabel} />
                </section>
              </div>
            </div>
          </div>

          {/* secure servers */}
          <div id="Index-content-875--2" className={cssGlobal["content-875"]}>
            <div id="Index-index-feature" className={`${css["index-feature2"]} ${cssGlobal["flex-center-left"]}`}>
              <div id="Index-index-feature-box" className={css["index-feature2-box"]}>
                <h1 id="Index-index-feature-box-h1">Secure Ecosystem</h1>
                <p id="Index-index-feature-box-p">
                  Our products and services are equipped with AES-256
                  encryption. Feauturing symmetric key encryption algorithm that
                  is virtually impenetrable
                </p>
              </div>
              <div id="Index-index-feature-art" className={css["index-feature2-art"]}>
                <section className={cssGlobal["rs-element"]}>
                  <img src={secureArt} />
                </section>
              </div>
            </div>
          </div>

          {/* <div id="Index-content-875--2"  className={cssGlobal["content-875"]}>
              <div id="Index-index-feature" className={`${css["index-feature"]} ${cssGlobal["flex-center-left"]}`}>
                <div id="Index-index-feature-box" className={css["index-feature-box"]}>
                  <h1 id="Index-index-feature-box-h1">A Droplet of ...Hosting?</h1>
                  <p id="Index-index-feature-box-p">Welcome to the new and improved VPS Hosting.<br/>Droplet Hosting features droplet spaces that are more energy and space efficient towards a server.</p>
                  <p>Launch your websites and projects from droplet spaces, with customisable server specifications and several pre-installed templates</p>
                  <button className={css["index-feature-button"]}>
                    <Link to="/products/hosting">View Hosting<i className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i></Link>
                  </button>
                </div>
                <div id="Index-index-feature-art" className={css["index-feature-art"]}>
                  <section className={cssGlobal["rs-element"]}>

                  </section>
                </div>
              </div>
            </div> */}

          {/* <div id="news"></div>
            <div className={cssGlobal["content-100"]}>
              <div className={css["news"]}>
                <h1>News and Updates</h1>
                <div className={`${css["news-section"]} ${cssGlobal["flex-stretch-center"]}`}>
                  <a href="/splashboard" className={css["news-top-link"]}>
                    <section className={cssGlobal["rs-element"]}>
                      <div className={`${css["news-top"]} ${cssGlobal["flex-stretch-center"]}`}>
                          <div className={css["news-top-box"]}>
                            <h2><span className={css["news-date"]}>17th June 2021</span></h2>
                            <h1>Test Headline<i className={`${css["fas"]} ${css["fa-arrow-right"]} ${css["fa-1x"]} ${"fas fa-right fa-1x"}`}></i></h1>
                            <p>Test news about testing headline test hello how are you doing thanks for using Stax Developer Suite</p>
                          </div>
                          <div className={css["news-top-image"]} style="background: url('/assets/images/computer.png')"></div>
                      </div>
                    </section>
                  </a>
                  <div className={`${css["news-other"]} ${cssGlobal["flex-flex-start-center"]}`}>
                      <a href="/splashboard" className={css["news-other-box-link"]}>
                        <div className={css["news-other-box"]}>
                          <p><span className={css["news-date"]}>10th July 2021</span></p>
                          <h1>News Headline<i className={`${css["fas"]} ${css["fa-arrow-right"]} ${css["fa-1x"]} ${"fas fa-arrow-right fa-1x"}`}></i></h1>
                          <p>Test news testing about Stax Developer Suite of the upcoming stuff and maximum limit of how much you can write headline!!</p>
                        </div>
                      </a>
                      <a href="/splashboard" className={css["news-other-box-link"]}>
                        <div className={css["news-other-box"]}>
                          <p><span className={css["news-date"]}>9th July 2021</span></p>
                          <h1>News Headline<i className={`${css["fas"]} ${css["fa-arrow-right"]} ${css["fa-1x"]} ${"fas fa-arrow-right fa-1x"}`}></i></h1>
                          <p>test news headline! testing also how far of the upcoming stuf that ew need tolook atmaxium of how much you canrwite in one pargrpha</p>
                        </div>
                      </a>
                  </div>
                </div>
                <div className={css["news-more"]}>
                  <a href="/link" className={css["news-more-link"]}>
                    <div className={css["news-more-button"]}>
                      <p>More News</p>
                    </div>
                  </a>
                </div>
              </div>
            </div> */}

          <div id="Index-content-875--3" className={cssGlobal["content-875"]}>
            <section id="Index-rs-element-both" className={cssGlobal["rs-element-both"]}>
              <div id="Index-register-now" className={css["register-now"]}>
                <h1 id="Index-register-now-h1">
                  Welcome to the
                  <br />
                  Stax Developer Suite
                </h1>
                <p id="Index-register-now-p">
                  Explore The Stax Developer Suite and register your account
                  with a few simple steps.
                  <br />
                  Welcome to the World of Stax.
                  {/*loggedIn ? ", Alex." : "."*/}
                </p>
                <div id="Index-register-now-section" className={css["register-now-section"]}>
                  <Link id="Index-register-now-link" to="/splashboard" className={css["register-now-link"]}>
                    <div id="Index-register-now-button" className={css["register-now-button"]}>
                      <p id="Index-register-now-button-p">
                        Join now
                        {/*loggedIn ? "Splashboard." : "Join Now"*/}
                      </p>
                    </div>
                  </Link>
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
