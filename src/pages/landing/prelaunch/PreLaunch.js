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
    if (scrollPosition >= 25) {
      document.getElementById("logo-display").style.height = "70dvh";
      document.getElementById("logo-display").style.marginBottom = "40dvh";
    }
    if (scrollPosition >= 50) {
      document.getElementById("logo-display").style.height = "40dvh";
      document.getElementById("logo-display").style.marginBottom = "20dvh";
    }

  });

  // Utility function
function Util () {};

Util.is = function(elem, selector) {
  if(selector.nodeType){
    return elem === selector;
  }

  var qa = (typeof(selector) === 'string' ? document.querySelectorAll(selector) : selector),
    length = qa.length,
    returnArr = [];

  while(length--){
    if(qa[length] === elem){
      return true;
    }
  }

  return false;
};

// Check if Reduced Motion is enabled
Util.osHasReducedMotion = function() {
  if(!window.matchMedia) return false;
  var matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(matchMediaObj) return matchMediaObj.matches;
  return false; // return false if not supported
};

// Tutorial - https://codyhouse.co/tutorials/how-stacking-cards

useEffect(() => {
  var StackCards = function(element) {
    this.element = element;
    this.items = this.element.getElementsByClassName(css["landing-updates-box"]);
    this.scrollingFn = false;
    this.scrolling = false;
    initStackCardsEffect(this);
    // initStackCardsResize(this);
  };

  function initStackCardsEffect(element) { // use Intersection Observer to trigger animation
    setStackCards(element); // store cards CSS properties
    var observer = new IntersectionObserver(stackCardsCallback.bind(element), { threshold: [0, 1] });
    observer.observe(element.element);
  };

  function stackCardsCallback(entries) { // Intersection Observer callback
    if(entries[0].isIntersecting) {
      if(this.scrollingFn) return; // listener for scroll event already added
      stackCardsInitEvent(this);
    } else {
      if(!this.scrollingFn) return; // listener for scroll event already removed
      window.removeEventListener('scroll', this.scrollingFn);
      this.scrollingFn = false;
    }
  };

  function stackCardsInitEvent(element) {
    element.scrollingFn = stackCardsScrolling.bind(element);
    window.addEventListener('scroll', element.scrollingFn);
  };

  function stackCardsScrolling() {
    if(this.scrolling) return;
    this.scrolling = true;
    window.requestAnimationFrame(animateStackCards.bind(this));
  };

  function setStackCards(element) {
    // store wrapper properties
    element.marginY = getComputedStyle(element.element).getPropertyValue('--stack-cards-gap');
    getIntegerFromProperty(element); // convert element.marginY to integer (px value)
    element.elementHeight = element.element.offsetHeight;

    // store card properties
    var cardStyle = getComputedStyle(element.items[0]);
    element.cardTop = Math.floor(parseFloat(cardStyle.getPropertyValue('top')));
    element.cardHeight = Math.floor(parseFloat(cardStyle.getPropertyValue('height')));

    // store window property
    element.windowHeight = window.innerHeight;

    // reset margin + translate values
    if(isNaN(element.marginY)) {
      element.element.style.paddingBottom = '0px';
    } else {
      element.element.style.paddingBottom = (element.marginY*(element.items.length - 1))+'px';
    }

    for(var i = 0; i < element.items.length; i++) {
      if(isNaN(element.marginY)) {
        element.items[i].style.transform = 'none;';
      } else {
        element.items[i].style.transform = 'translateY('+element.marginY*i+'px)';
      }
    }
  };

  function getIntegerFromProperty(element) {
    var node = document.createElement('div');
    node.setAttribute('style', 'opacity:0; visbility: hidden;position: absolute; height:'+element.marginY);
    element.element.appendChild(node);
    element.marginY = parseInt(getComputedStyle(node).getPropertyValue('height'));
    element.element.removeChild(node);
  };

  function animateStackCards() {
    if(isNaN(this.marginY)) { // --stack-cards-gap not defined - do not trigger the effect
      this.scrolling = false;
      return;
    }

    var top = this.element.getBoundingClientRect().top;

    if( this.cardTop - top + this.element.windowHeight - this.elementHeight - this.cardHeight + this.marginY + this.marginY*this.items.length > 0) {
      this.scrolling = false;
      return;
    }

    for(var i = 0; i < this.items.length; i++) { // use only scale
      var scrolling = this.cardTop - top - i*(this.cardHeight+this.marginY);
      if(scrolling > 0) {
        var scaling = i == this.items.length - 1 ? 1 : (this.cardHeight - scrolling*0.05)/this.cardHeight;
        this.items[i].style.transform = 'translateY('+this.marginY*i+'px) scale('+scaling+')';
      } else {
        this.items[i].style.transform = 'translateY('+this.marginY*i+'px)';
      }
    }

    this.scrolling = false;
  };

  // initialize StackCards object
  var stackCards = document.getElementsByClassName(css["landing-updates"]),
    intersectionObserverSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype),
    reducedMotion = Util.osHasReducedMotion();

  if(stackCards.length > 0 && intersectionObserverSupported && !reducedMotion) {
    var stackCardsArray = [];
    for(var i = 0; i < stackCards.length; i++) {
      (function(i){
        stackCardsArray.push(new StackCards(stackCards[i]));
      })(i);
    }

    var resizingId = false,
      customEvent = new CustomEvent('resize-stack-cards');

    window.addEventListener('resize', function() {
      clearTimeout(resizingId);
      resizingId = setTimeout(doneResizing, 500);
    });

    function doneResizing() {
      for( var i = 0; i < stackCardsArray.length; i++) {
        (function(i){stackCardsArray[i].element.dispatchEvent(customEvent)})(i);
      };
    };
  }
});



  return (
    <div id="Index-react-div" className={cssGlobal["react-div"]}>
      <div id="Index-react-background" className={cssGlobal["react-background"]}>
         {/* style={{ backgroundImage: `url(${background})` }}> */}
        <div className={cssGlobal["page-full"]}>
          <Addons />
          <Bubbles />
          <div className={css["test"]}>
            hi
          </div>
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
                <button className={css["landing-finish-date"]}>
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
              {/* add updates here */}

              <div className={`${css["landing-updates-box"]} ${cssGlobal["flex-center-left"]}`}>
                <div className={css["landing-updates-box-line"]}></div>
                <div className={css["landing-updates-box-circle"]}></div>
                <div className={css["landing-updates-box-info"]}>
                  <h1>Introduction • 6th October 2023</h1>
                  <p>
                    Hey there! Welcome to the SDS pre-launch page.{" "}
                    SDS is currently in the process of development and more news is yet to come!{" "}
                    Updates will be posted here as things progress.<br/><br/>
                    We look forward to having you at our release!
                  </p>
                </div>
              </div>
              <div className={`${css["landing-updates-box"]} ${cssGlobal["flex-center-left"]}`}>
                <div className={css["landing-updates-box-line"]}></div>
                <div className={css["landing-updates-box-circle"]}></div>
                <div className={css["landing-updates-box-info"]}>
                  <h1>Introduction • 6th October 2023</h1>
                  <p>
                    Hey there! Welcome to the SDS pre-launch page.{" "}
                    SDS is currently in the process of development and more news is yet to come!{" "}
                    Updates will be posted here as things progress.<br/><br/>
                    We look forward to having you at our release!
                  </p>
                </div>
              </div>
              <div className={`${css["landing-updates-box"]} ${cssGlobal["flex-center-left"]}`}>
                <div className={css["landing-updates-box-line"]}></div>
                <div className={css["landing-updates-box-circle"]}></div>
                <div className={css["landing-updates-box-info"]}>
                  <h1>Introduction • 6th October 2023</h1>
                  <p>
                    Hey there! Welcome to the SDS pre-launch page.{" "}
                    SDS is currently in the process of development and more news is yet to come!{" "}
                    Updates will be posted here as things progress.<br/><br/>
                    We look forward to having you at our release!
                  </p>
                </div>
              </div>
              <div className={`${css["landing-updates-box"]} ${cssGlobal["flex-center-left"]}`}>
                <div className={css["landing-updates-box-line"]}></div>
                <div className={css["landing-updates-box-circle"]}></div>
                <div className={css["landing-updates-box-info"]}>
                  <h1>Introduction • 6th October 2023</h1>
                  <p>
                    Hey there! Welcome to the SDS pre-launch page.{" "}
                    SDS is currently in the process of development and more news is yet to come!{" "}
                    Updates will be posted here as things progress.<br/><br/>
                    We look forward to having you at our release!
                  </p>
                </div>
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
