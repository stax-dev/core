//React
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Button from "../../../components/button/Button";
import axios from "axios";

//External
import { Addons, Bubbles, scrollReveal, snackbarNotification, newNotification, viewNotification, closeNotification } from "../../../components/addons/Addons";

import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";
import cssNavbar from "../../../components/nav/Nav.module.css";
import Nav from "../../../components/nav/Nav";
import Footer from "../../../components/footer/Footer";

//Main
import css from "./Status.module.css";

//Images
import background from "../../../images/backgrounds/background3.svg";

export default function Status() {


    //0 for online - 1 for offline - 2 for having difficulties
    //if no comment leave blank - if not add a comment


    document.documentElement.setAttribute("data-apptheme", "dark");
    document.body.style.overflow = 'auto';
    const statusNumber = 8;

    var status0Name = 'Website';
    var [status0, setstatus0] = useState(3);
    var [status0Comment, setstatus0Comment] = useState('This message overrides the normal message');

    var status1Name = 'Splashboard';
    var [status1, setstatus1] = useState(0);
    var [status1Comment, setstatus1Comment] = useState('test message to see if code works plus the breaking point seeing if the div is positioned');

    var status2Name = 'Dashboard';
    var [status2, setstatus2] = useState(1);
    var [status2Comment, setstatus2Comment] = useState('');

    var status3Name = 'Servers';
    var [status3, setstatus3] = useState(2);
    var [status3Comment, setstatus3Comment] = useState('');

    var status4Name = 'Gateway';
    var [status4, setstatus4] = useState(3);
    var [status4Comment, setstatus4Comment] = useState('');

    var status5Name = 'Chatrooms';
    var [status5, setstatus5] = useState(0);
    var [status5Comment, setstatus5Comment] = useState('');

    var status6Name = 'API';
    var [status6, setstatus6] = useState(0);
    var [status6Comment, setstatus6Comment] = useState('');

    var status7Name = 'Integrations';
    var [status7, setstatus7] = useState(0);
    var [status7Comment, setstatus7Comment] = useState('');

    //placeholders end


    var divInside =
        <p>
            <span className={css["status-box-icon-online-text"]}><i className={`${css["fas"]} ${css["fa-check-circle"]}  ${"fas fa-check-circle"}`}></i>Online</span>
            <span className={css["status-box-icon-issues-text"]}><i className={`${css["fas"]} ${css["fa-minus-circle"]}  ${"fas fa-minus-circle"}`}></i>Slight Issues</span>
            <span className={css["status-box-icon-offline-text"]}><i className={`${css["fas"]} ${css["fa-times-circle"]}  ${"fas fa-times-circle"}`}></i>Offline</span>
            <span className={css["status-box-icon-unknown-text"]}><i className={`${css["fas"]} ${css["fa-exclamation-circle"]}  ${"fas fa-exclamation-circle"}`}></i>Unknown</span>
        </p>
    ;

    var onlineDiv = <div className={css["status-box-icon-online"]}>{divInside}</div>
    var offlineDiv = <div className={css["status-box-icon-offline"]}>{divInside}</div>
    var issueDiv = <div className={css["status-box-icon-issues"]}>{divInside}</div>
    var unknownDiv = <div className={css["status-box-icon-unknown"]}>{divInside}</div>


    return (
        <div id="Status-react-div" className={cssGlobal["react-div"]}>
            <div className={cssGlobal["react-background"]}>
                <div id="Status-page-full" className={cssGlobal["page-full"]}>
                    <Nav number="4"/>
                    <Addons />
                    <Bubbles/>
                    <div id="Status-content-100" className={cssGlobal["content-100"]}>
                        <div id="Status-status-title" className={css["status-title"]}>
                            <h1 id="Status-status-title-h1">Status</h1>
                            <p id="Status-status-title-p"><b>System Status of Stax Developer Studios</b></p>
                        </div>
                    </div>
                    <div id="Status-content-875" className={cssGlobal["content-875"]}>
                        <div id="Status-status" className={`${css["status"]} ${cssGlobal["flex-stretch-left"]}`}>

                            {[...Array(statusNumber)].map((x, number) => (
                                <div className={`${css["status-box"]} ${cssGlobal["flex-flex-start-left"]}`}>
                                    <div className={css["status-box-info"]}>
                                        <p><b>{eval("status" + number + "Name")}</b></p>
                                        {eval("status" + number + "Comment") === '' ?
                                            <span>
                                                {eval("status" + number) === 0 &&
                                                    <p>System is currently fully operational</p>
                                                }
                                                {eval("status" + number) === 1 &&
                                                    <p>System is currently offline and unavaliable</p>
                                                }
                                                {eval("status" + number) === 2 &&
                                                    <p>System is currently experiencing issues</p>
                                                }
                                                {eval("status" + number) > 2 &&
                                                    <p>System status is currently unknown</p>
                                                }
                                            </span>:
                                            <span>
                                                <p>{eval("status" + number + "Comment")}</p>
                                            </span>
                                        }
                                    </div>
                                    <div className={css["status-box-icon"]}>
                                        {eval("status" + number) === 0 &&
                                            <span>{onlineDiv}</span>
                                        }
                                        {eval("status" + number) === 1 &&
                                            <span>{offlineDiv}</span>
                                        }
                                        {eval("status" + number) === 2 &&
                                            <span>{issueDiv}</span>
                                        }
                                        {eval("status" + number) > 2 &&
                                            <span>{unknownDiv}</span>
                                        }
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    );
}