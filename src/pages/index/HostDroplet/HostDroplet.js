//React
import { useState } from "react";
import { Link } from "react-router-dom";
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
import cssNavbar from "../../../components/nav/Nav.module.css";
import Nav from "../../../components/nav/Nav";
import Footer from "../../../components/footer/Footer";

//Main
import css from "./HostDroplet.module.css";

//Images
import background1 from "../../../images/backgrounds/background1.svg";
import scalableArt from "../../../images/main/scalable.svg";
import locationArt from "../../../images/main/location.svg";

//Other
import templateList from "../../../components/data/templateList.json";

export default function HostDroplet() {


  document.documentElement.setAttribute("data-apptheme", "dark");
  document.body.style.overflow = 'auto';

  var [StaxTemplateCount, setStaxTemplateCount] = useState(0);
  var [CommunityTemplateCount, setCommunityTemplateCount] = useState(0);

  //this is the page scroll reveal function
  document.addEventListener("scroll", function () {
    scrollReveal();
  });

  var dropletFeatureList = [
    { id: 1,
      title: "Monitoring & Alerts",
      icon:  <i className={`${css["fas"]} ${css["fa-bell"]} ${css["fa-1x"]} ${"fas fa-bell fa-1x"}`}></i>,
      info: "Monitor your droplets with alerts and graphs.  Receive alerts when your droplet is down.",
    },
    { id: 2,
      title: "Default Installations",
      icon:  <i className={`${css["fas"]} ${css["fa-seedling"]} ${css["fa-1x"]} ${"fas fa-seedling fa-1x"}`}></i>,
      info: "Python3, pip, Golang, Nginx, PHP and NodeJS installed.  Comes with Git and SSH server with root access.",
    },
    { id: 3,
      title: "Custom Domain",
      icon:  <i className={`${css["fas"]} ${css["fa-signature"]} ${css["fa-1x"]} ${"fas fa-signature fa-1x"}`}></i>,
      info: "Custom domain names and SSL certificates provided",
    },
    { id: 4,
      title: "Custom Ports",
      icon:  <i className={`${css["fas"]} ${css["fa-plug"]} ${css["fa-1x"]} ${"fas fa-plug fa-1x"}`}></i>,
      info: "Unlimited ports provided with your private IP address.",
    },
    { id: 5,
      title: "IPv6 support",
      icon:  <i className={`${css["fas"]} ${css["fa-diagram-project"]} ${css["fa-1x"]} ${"fas fa-diagram-project fa-1x"}`}></i>,
      info: "IPv6 support with private networking for all servers.",
    },
    { id: 6,
      title: "Cloud Firewalls",
      icon:  <i className={`${css["fas"]} ${css["fa-shields"]} ${css["fa-1x"]} ${"fas fa-shield fa-1x"}`}></i>,
      info: "Our servers hardware consist of AMD 64 processing chips and 8 cores of intel u7 CPU chips.",
    },
    { id: 7,
      title: "Load Balancers",
      icon:  <i className={`${css["fas"]} ${css["fa-car-sie"]} ${css["fa-1x"]} ${"fas fa-car-side fa-1x"}`}></i>,
      info: "Built-in load balancers to effciently distribute traffic during heavy traffic.",
    },
    { id: 8,
      title: "Snapshots",
      icon:  <i className={`${css["fas"]} ${css["fa-image"]} ${css["fa-1x"]} ${"fas fa-image fa-1x"}`}></i>,
      info: "Create up to 5 snapshots and restore them easily anytime.",
    },
    { id: 9,
      title: "Encrypted Droplets",
      icon:  <i className={`${css["fas"]} ${css["fa-lock"]} ${css["fa-1x"]} ${"fas fa-lock fa-1x"}`}></i>,
      info: "AES-256 (Advanced Encryption Standard) encryption equipped in all servers.",
    },
    { id: 10,
      title: "Kubernetes Support",
      icon:  <i className={`${css["fas"]} ${css["fa-circle-info"]} ${css["fa-1x"]} ${"fas fa-circle-info fa-1x"}`}></i>,
      info: "Support for Kubernetes to manage containerized applications across multiple hosts.",
    },
    { id: 11,
      title: "Object Storage Spaces",
      icon:  <i className={`${css["fas"]} ${css["fa-cube"]} ${css["fa-1x"]} ${"fas fa-cube fa-1x"}`}></i>,
      info: "An architecture built for large amounts of data, by storing data as objects and not files.",
    },
  ]

  return (
    <div id="HostDroplet-react-div" className={cssGlobal["react-div"]}>
      <div className={cssGlobal["react-background"]}>
        <div id="HostDroplet-page-full" className={cssGlobal["page-full"]}>
          <Nav />
          <Addons />
          <Bubbles />
          <div id="HostDroplet-content-100" className={cssGlobal["content-100"]}>
            <div id="HostDroplet-plan-title" className={css["plan-title"]}>
              <h1 id="HostDroplet-plan-title-h1">Droplet Hosting</h1>
              {/* <p id="HostDroplet-plan-title-p">text</p> */}
            </div>
          </div>

          <div id="plans"></div>

          <div id="HostDroplet-content-875" className={cssGlobal["content-875"]}>
            <div id="HostDroplet-droplet-feature" className={`${css["droplet-feature"]} ${cssGlobal["flex-center-center"]}`}>
              <div id="HostDroplet-droplet-info" className={css["droplet-info"]}>
                <h1 id="HostDroplet-droplet-info-h1">Scalable Droplets</h1>
                <p id="HostDroplet-droplet-info-p">
                  With incredible pricing specs, droplets are also easily
                  scalable and customisable to your needs.
                </p>
                <p>
                  Change your pre-installed template choices anytime you want.
                  Edit your server's RAM and storage specs with just a few
                  clicks.&nbsp;
                </p>
              </div>
              <div id="HostDroplet-droplet-art" className={css["droplet-art"]}>
                <section id="HostDroplet-rs-element" className={"rs-element"}>
                  <img id="HostDroplet-droplet-art-img" src={scalableArt} />
                </section>
              </div>
            </div>
          </div>

          <div id="HostDroplet-content-875--2" className={cssGlobal["content-875"]}>
            <div id="HostDroplet-droplet-feature2" className={`${css["droplet-feature2"]} ${cssGlobal["flex-center-center"]}`}>
              <div id="HostDroplet-droplet-art--2" className={css["droplet-art"]}>
                <section id="HostDroplet-rs-element--2" className={"rs-element"}>
                  <img id="HostDroplet-droplet-art-img--2" src={locationArt} />
                </section>
              </div>
              <div id="HostDroplet-droplet-info--2" className={css["droplet-info"]}>
                <h1 id="HostDroplet-droplet-info-h1--2">Locations</h1>
                <p id="HostDroplet-droplet-info-p--2">
                  Our droplets are currently hosted in New York, London and Singapore. We do plan to expand to more locations in the future.
                </p>
              </div>
            </div>
          </div>

          {/* <div id="HostDroplet-content-875--3" className={cssGlobal["content-875"]}>
                        <div id="HostDroplet-droplet-feature--2" className={css["droplet-feature"]}>
                            <div id="HostDroplet-droplet-info--3" className={css["droplet-info"]}>
                                <h1 id="HostDroplet-droplet-info-h1--3">Encryption</h1>
                                <p id="HostDroplet-droplet-info-p--3">Our droplets are equipped with AES-256 encryption. Feauturing symmetric key encryption algorithm that is virtually impenetrable</p>
                            </div>
                            <div id="HostDroplet-droplet-art--3" className={css["droplet-art"]}>
                                <section className={"rs-element"}>

                                </section>
                            </div>
                        </div>
                    </div> */}

          <div id="HostDroplet-content-875--3" className={cssGlobal["content-100"]}>
            <div id="HostDroplet-droplets-standard-title" className={css["droplets-standard-title"]}>
              <h1 id="HostDroplet-droplets-standard-title-h1">
                Basic Features:
              </h1>
            </div>

            <div id="HostDroplet-droplets-standard" className={`${css["droplets-standard"]} ${cssGlobal["flex-stretch-left"]}`}>
              {dropletFeatureList.map((list) => (
                <div key={list.id} id={"HostDroplet-droplets-standard-box--" + list.id} className={css["droplets-standard-box"]}>
                  <h1 id={"HostDroplet-droplets-standard-box-h1--" + list.id} >
                    {list.icon}{list.title}
                  </h1>
                  <p id={"HostDroplet-droplets-standards-box-p--" + list.id}>
                    {list.info}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* view templates start */}
          <div id="HostDroplet-content-875--3" className={cssGlobal["content-875"]}>
            <div id="HostDroplet-view-templates" className={`${css["view-templates"]} ${cssGlobal["flex-center-left"]}`}>
              <div id="HostDroplet-view-templates-text" className={css["view-templates-text"]}>
                <h1 id="HostDroplet-view-templates-text-h1">
                  Explore Droplet Templates
                </h1>
                <p id="HostDroplet-view-templates-text-p">
                  <span id="HostDroplet-view-templates-info" className={css["view-templates-info"]}>
                    {templateList.filter((templateList) => templateList.id.includes("S")).map((list) => (
                      <span>{list.id.replace("S", "")} SDS Official Templates</span>
                    )).pop()}
                    {templateList.filter((templateList) => templateList.id.includes("C")).map((list) => (
                      <span><br/>{list.id.replace("C", "")} Community Templates</span>
                    )).pop()}
                  </span>
                </p>
                <div id="HostDroplet-view-templates-button" className={css["view-templates-button"]}>
                  <Link id="HostDroplet-view-templates-link" className={css["view-templates-link"]}
                    to="/products/hosting/templates"
                  >
                    <div id="HostDroplet-view-templates-button-inside" className={css["view-templates-button-inside"]}>
                      <p id="HostDroplet-view-templates-button-inside-p">
                        Explore Templates
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
              <div id="HostDroplet-view-templates-art" className={css["view-templates-art"]}>
                {/* <img src={dropletTemplates}/> */}
              </div>
            </div>
          </div>
          {/* view templates end */}
        </div>
        <Footer />
      </div>
    </div>
  );
}
