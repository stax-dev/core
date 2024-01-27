import React, {/* useState */} from "react";
import { Link } from "react-router-dom";
// import Button from "../../../components/button/Button";

//External imports
import { Addons, Bubbles, scrollReveal, snackbarNotification, newNotification, viewNotification, closeNotification } from "../../../components/addons/Addons";

import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";
import cssNavbar from "../../../components/nav/Nav.module.css";
import Nav from "../../../components/nav/Nav";
import Footer from "../../../components/footer/Footer";

//Main
import css from "./Products.module.css";

//Images
import background from "../../../images/backgrounds/background-short1.svg";
import scalableArt from "../../../images/main/scalable.svg";
import locationArt from "../../../images/main/location.svg";
import iconHosting from "../../../images/icons/hosting.svg";
import iconWiki from "../../../images/icons/wiki.svg";
import iconOffices from "../../../images/icons/offices.svg";
import iconChat from "../../../images/icons/chat.svg";

export default function Products() {


    //this is the page scroll reveal function
    document.addEventListener('scroll', function() {
        scrollReveal();
    });

    document.documentElement.setAttribute("data-apptheme", "dark");
    document.body.style.overflow = 'auto';

    var productsList = [
        {
          title: "Hosting",
          colour: "var(--accent)",
          info: " Hosting service to launch your projects, developments and websites.",
          link: "/products/hosting",
          icon: iconHosting,
        },/*
        {
          title: "Chats",
          colour: "var(--accent3)",
          info: "Encrypted secure messaging designed for maximum security.",
          link: "/products/chats",
          icon: iconChat,

        },
        {
          title: "Offices",
          colour: "var(--accent2)",
          info: "The ultimate note-taking and collaboration workplace for your team.",
          link: "/products/offices",
          icon: iconOffices,
        },*/
        {
          title: "Wiki",
          colour: "var(--accent4)",
          info: "The Stax Developer Studios full documentation library, with guides and tutorials.",
          link: "/wiki",
          icon: iconWiki,
        },
      ];

      const productsDisplay = productsList.map((list) =>
        <div id={`Product-products-list-box-${list.title}`} key={list.title} className={`${css["products-list-box"]} ${cssGlobal["flex-flex-start-left"]}`}>
          <div id={`Product-products-list-box-inside-${list.title}`} className={`${css["products-list-box-inside"]} ${cssGlobal["flex-center-left"]}`}>
            <div id={`Product-products-list-box-icon-${list.title}`} className={css["products-list-box-icon"]}>
              <img src={list.icon}/>
            </div>
            <div id={`Product-products-list-box-title-${list.title}`}className={css["products-list-box-title"]}>
              <h2 style={{color: list.colour}} id={`Product-products-list-box-title-h2-${list.title}`}>{list.title}</h2>
            </div>
            <div id={`Product-products-list-box-info-${list.title}`}className={css["products-list-box-info"]}>
              <p id={`Product-products-list-box-info-p-${list.title}`}>{list.info}</p>
            </div>
          </div>
          <div id={`Product-products-list-box-button-${list.title}`}style={{filter: `drop-shadow(0px 0px 10px ${list.colour})`}} className={css["products-list-box-button"]}>
            <Link id={`Product-products-list-box-button-a-${list.title}`}style={{backgroundColor: list.colour}} to={list.link}>
              <i id={`Product-products-list-box-button-icon-${list.title}`}className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i>
            </Link>
          </div>
        </div>
      );

    return (

        <div id="Product-react-div" className={cssGlobal["react-div"]}>
            <div id="Product-react-background" className={cssGlobal["react-background-short"]}>
            {/* style={{backgroundImage: `url(${background})`}} */}
                <div id="Product-page-full" className={cssGlobal["page-full"]}>
                    <Nav number="2" />
                    <Addons />
                    <Bubbles/>
                    <div id="Product-content-100" className={cssGlobal["content-100"]}>
                        <div id="Product-plan-title" className={css["plan-title"]}>
                            <h1 id="Product-plan-title-h1">Products and Services</h1>
                        </div>
                    </div>

                    <div className={cssGlobal["content-750"]}>
                      <div className={css["products-subtitle"]}>
                        <p id="Product-plan-title-p">The Ecosystem of Stax Developer Studios.</p>
                        <p id="Product-plan-title-p--2">Working seamlessly with one another to create an experience for you. Our products are built with functionality and user experience at the forefront of our minds.</p>
                      </div>
                    </div>

                    <div id="Product-content-100--2" className={cssGlobal["content-100"]}>
                        <div id="Product-products" className={css["products"]}>
                            <div id="Product-products-list" className={`${css["products-list"]} ${cssGlobal["flex-stretch-left"]}`}>
                              {productsDisplay}
                              <div id="Product-products-list-more" className={css["products-list-more"]}>
                                <p id="Product-products-list-more-p">More services coming soon...</p>
                              </div>
                            </div>
                        </div>
                    </div>






                </div>
                <Footer />
            </div>
        </div>
    );
}