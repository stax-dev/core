//React
import React, {/* useState */} from "react";
import { Link } from "react-router-dom";
// import Button from "../../../components/button/Button";

//External
import { Addons, Bubbles, scrollReveal, snackbarNotification, newNotification, viewNotification, closeNotification } from "../../../components/addons/Addons";

import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";
import cssNavbar from "../../../components/nav/Nav.module.css";
import Nav from "../../../components/nav/Nav";
import Footer from "../../../components/footer/Footer";

//Main
import css from "./Support.module.css";

//Images
import background from "../../../images/backgrounds/background3.svg";
import wikiIcon from "../../../images/icons/wiki.svg";

export default function Support() {

    var supportEmail = 'support@st.ax';

    function CopyEmail(){
        navigator.clipboard.writeText(supportEmail);
        snackbarNotification(1,'Email copied to clipboard!', 2);
        document.getElementById("Support-contact-box-emailbox").classList.replace(css["contact-box-emailbox"], css["contact-box-emailbox-copied"]);
        setTimeout(() => {
            document.getElementById("Support-contact-box-emailbox").classList.replace(css["contact-box-emailbox-copied"], css["contact-box-emailbox"]);
        }, 2000);
    }

    //this function is basically window.onscroll but div version
    //used const cause to make it look different from normal functions
    const pageScroll =() => {
        scrollReveal();
    }

    document.documentElement.setAttribute("data-apptheme", "dark");
    document.body.style.overflow = 'auto';

    return (
        <div id="Support-react-div" onScroll={() => pageScroll()} className={cssGlobal["react-div"]}>
            <div className={cssGlobal["react-background-short"]} style={{ backgroundImage: `url(${background})` }}>
                <div id="Support-page-full" className={cssGlobal["page-full"]}>
                    <Nav number="3"/>
                    <Addons />
                    <Bubbles/>
                    <div id="Support-content-100" className={cssGlobal["content-100"]}>
                        <div id="Support-support-title" className={css["support-title"]}>
                            <h1 id="Support-support-title-h1">Support</h1>
                            <p id="Support-support-title-p">Get help and resources</p>
                        </div>
                    </div>

                    <div id="Support-content-875" className={cssGlobal["content-875"]}>
                        <div id="Support-docs" className={`${css["docs"]} ${cssGlobal["flex-center-left"]}`}>
                            <div id="Support-docs-info" className={css["docs-info"]}>
                                <h1 id="Support-docs-info-h1">SDS Wiki</h1>
                                <p id="Support-docs-info-p">View the full Stax Developer Studios documentation library. Explore our guides, tutorials and instructions to our various products and services.</p>
                                <Link id="Support-docs-info-a" className={css["docs-link"]} to="/wiki/sds">
                                    <div id="Support-docs-button" className={css["docs-button"]}>
                                        <p id="Support-docs-button-p">View Wiki<i id="Support-docs-button-icon" className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i></p>
                                    </div>
                                </Link>
                            </div>
                            <div id="Support-docs-art" className={css["docs-art"]}>
                                {/* <img src="https://cdn.st.ax/v2/logo.svg" /> */}
                                <img src={wikiIcon}/>
                            </div>
                        </div>
                        <div id="Support-contact" className={`${css["contact"]} ${cssGlobal["flex-flex-start-center"]}`}>
                            <div id="Support-contact-box" className={css["contact-box"]}>
                                <h1 id="Support-contact-box-h1">Chatroom</h1>
                                <p id="Support-contact-box-p">With every SDS account having a dedicated support chatroom, contact us for support directly from your splashboard.</p>
                                <Link id="Support-contact-box-a" className={css["contact-box-link"]} to="/splashboard/chatrooms">
                                    <div id="Support-contact-box-button" className={css["contact-box-button"]}>
                                        <p id="Support-contact-box-button-p">View Chatrooms<i id="Support-contact-box-button-icon" className={`${css["fas"]} ${css["fa-arrow-right"]} ${"fas fa-arrow-right"}`}></i></p>
                                    </div>
                                </Link>
                            </div>
                            <div id="Support-contact-box--2" className={css["contact-box"]}>
                                <h1 id="Support-contact-box-h1--2">Email Us</h1>
                                <p id="Support-contact-box-p--2">Drop us an email at <span id="Support-email-text" className={css["email-text"]}>{supportEmail}</span> for any questions or queries you might have! Please include any relevant information if needed.</p>
                                <div id="Support-contact-box-emailbox" className={css["contact-box-emailbox"]}>
                                    <button id="Support-contact-box-email" onClick={() => CopyEmail()} className={css["contact-box-email"]}>
                                        <p id="Support-contact-box-email-p"><i id="Support-contact-box-email-icon" className={`${css["fas"]} ${css["fa-copy"]} ${"fas fa-copy"}`}></i>Copy Email</p>
                                    </button>
                                    <button disabled id="Support-contact-box-email-copied" onClick={() => CopyEmail()} className={css["contact-box-email-copied"]}>
                                        <p id="Support-contact-box-email-copied-p"><i id="Support-contact-box-email-copied-icon" className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i>Copied</p>
                                    </button>
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