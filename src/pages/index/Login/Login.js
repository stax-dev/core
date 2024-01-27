// import LoginForm from '../../../components/forms/LoginForm
import Nav from "../../../components/nav/Nav";
// import css from './Login.module.css
import axios from 'axios';

// export default function Login() {
//     function onLoginHandler(userData) {
//         const options = {
//             method: 'post',
//             url: '/',
//             xsrfCookieName: 'Stax-XSRF-TOKEN',
//             xsrfHeaderName: 'Stax-X-XSRF-TOKEN'
//         };
//         axios(options).then(() => {
//             return true;
//         });
//     }

//     return (
//         <>
//         <Nav />
//         <div className={css.login}>
//             <LoginForm onLogin={onLoginHandler}/>
//         </div>
//         </>
//     );
// }

//React
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
import { getJWT, getAccessToken, getUserData } from './auth';

//Main
import css from "./Login.module.css";

//Images
import background from "../../../images/backgrounds/background-short1.svg";
import githubIcon from "../../../images/integrations/icons/github.svg";
import gitlabIcon from "../../../images/integrations/icons/gitlab.svg";
import googleIcon from "../../../images/integrations/icons/google.svg";
import microsoftIcon from "../../../images/integrations/icons/microsoft.svg";
import appleIcon from "../../../images/integrations/icons/apple.svg";
import dropboxIcon from "../../../images/integrations/icons/dropbox.svg";
import discordIcon from "../../../images/integrations/icons/discord.svg";

export default function Login() {


  function sendAPI(type){
    if(type === "login"){
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
        {
          username: document.getElementById("Login-login-details-box-input-username").value,
          password: document.getElementById("Login-login-details-box-type-input-password").value,
        },
      )
      .then(response => {
        if(response.data.success){
          localStorage.setItem("sessionID", response.data.sessionID);
          navigate("/splashboard");
        }else{
          setLoginError(true);
          checkLogin();
        }
      })
      .catch(error => {
        setLoginError(false);
        snackbarNotification(2, "Error Logging In");
        setTimeout(() => {
          checkLogin();
        }, 0);
      });
    }else if(type === "sendForgotPassword"){
      axios.post('http URL HERE',
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `sessionID ${sessionID}`,
          },
          withCredentials: true,
        },{
          username: document.getElementById("Login-login-details-box-input--2").value,
        }
      )
      .then(response => {
        snackbarNotification(1, "Email confirmation sent!");
        document.getElementById("Login-login-details-box-input--2").value = "";
      })
      .catch(error => {
        snackbarNotification(2, "Error Sending Email");
      })
      .finally(() => {
        checkForgotPassword();
      });
    }
  }



  document.documentElement.setAttribute("data-apptheme", "dark");
  document.body.style.overflow = 'auto';

  const navigate = useNavigate();

  var [loginError, setLoginError] = useState(false); //0 for none 1 for error

  // took this from indexjs login page
  // const [loggedIn, setLoggedIn] = useState(false);
  // function login() {
  //   loggedIn ? setLoggedIn(false) : setLoggedIn(true);
  // }

  function showPasswordlogin() {
    var password = document.getElementById("Login-login-details-box-type-input-password");
    if(password.type === "password"){
      password.type = "text";
      document.getElementById(css["show-password-button-off"]).style.display = "inline-block";
      document.getElementById(css["show-password-button-on"]).style.display = "none";
    }else{
      password.type = "password";
      document.getElementById(css["show-password-button-off"]).style.display = "none";
      document.getElementById(css["show-password-button-on"]).style.display = "inline-block";
    }
  }

  function ForgotPassword(type) {
    document.getElementById("Login-login-box-stax-type").className = "";
    document
      .getElementById("Login-login-box-stax-type")
      .classList.add(css["login-box-stax-" + type]);
    setForgotPassword(type);
  }

  function LoginType(type) {
    document.getElementById("Login-login").className = "";
    document.getElementById("Login-login").classList.add(css["login-" + type]);
    setLoginType(type);
    setForgotPassword("normal");
  }

  function sendLogin() {
    if (document.getElementById("Login-login-details-box-input-username").value && document.getElementById("Login-login-details-box-type-input-password").value){
      document.getElementById("Login-login-details-submit").classList = "";
      document.getElementById("Login-login-details-submit").classList.add(css["login-details-submit-load"]);
      sendAPI("login");
      setLoginSubmitDisabled(true);
    }
  }

  var [loginSubmitDisabled, setLoginSubmitDisabled] = useState(true);

  function checkLogin(){
    if(document.getElementById("Login-login-details-box-input-username").value && document.getElementById("Login-login-details-box-type-input-password").value){
      setLoginSubmitDisabled(false);
      document.getElementById("Login-login-details-submit").classList = "";
      document.getElementById("Login-login-details-submit").classList.add(css["login-details-submit"]);
    }else{
      setLoginSubmitDisabled(true);
      document.getElementById("Login-login-details-submit").classList = "";
      document.getElementById("Login-login-details-submit").classList.add(css["login-details-submit-disabled"]);
    }
  }

  // take note forgotPassword is a variable and ForgotPassword is a function
  // same as loginType (caps first letter difference)
  var [loginType, setLoginType] = useState("stax");
  var [forgotPassword, setForgotPassword] = useState("normal");

  // also theres no need to clear value of inputs since react rerenders the whole thing

  var integrationsList = [
    {
      name: "Github",
      colour: "#4078C0",
      textColour: "white",
      icon: githubIcon,
    },
    {
      name: "Gitlab",
      colour: "white",
      textColour: "black",
      icon: gitlabIcon,
    },
    {
      name: "Google",
      colour: "white",
      textColour: "black",
      icon: googleIcon,
    },
    {
      name: "Microsoft",
      colour: "white",
      textColour: "#5E5E5E",
      icon: microsoftIcon,
    },
    {
      name: "Apple",
      colour: "black",
      textColour: "white",
      icon: appleIcon,
    },
    {
      name: "Dropbox",
      colour: "#0060FF",
      textColour: "white",
      icon: dropboxIcon,
    },
    {
      name: "Discord",
      colour: "#5865F2",
      textColour: "white",
      icon: discordIcon,
    },
  ];

  //google integration --------------------------------------------------


  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }

  function integrationClick(type) {
    document.getElementById("Login-integrations-hidden-" + type).click();
    console.log(type + " clicked");
  }

  //github integration code -----------------------------------------
  function SignInWithGitHub() {
    const [loading, setLoading] = useState(false);

    async function handleSignInWithGitHub() {
      setLoading(true);

      // Get JWT
      const jwt = getJWT();

      // Redirect to GitHub for authorization
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_APP_CLIENT_ID}&redirect_uri=${process.env.GITHUB_APP_CALLBACK_URL}&state=${jwt}`;
    }

  }

  function sendForgotPassword(){
    if(document.getElementById("Login-login-details-box-input--2").value){
      sendAPI("sendForgotPassword");
      setForgotPasswordSubmitDisabled(true);
    }
  }

  var [forgotPasswordSubmitDisabled, setForgotPasswordSubmitDisabled] = useState(true);

  function checkForgotPassword(){
    if(document.getElementById("Login-login-details-box-input--2").value){
      setForgotPasswordSubmitDisabled(false);
    }else{
      setForgotPasswordSubmitDisabled(true);
    }
  }


  return (
    <div id="Login-react-div" className={cssGlobal["react-div"]}>
      <div className={cssGlobal["react-background-short"]} style={{ backgroundImage: `url(${background})` }}>
        <div style={{ display: "none" }}>
          <Nav />
        </div>
        <Addons />
        <Bubbles />
        <div id="Login-login-full" className={`${css["login-full"]} ${cssGlobal["flex-stretch-center"]}`}>
          <div id="Login-login-full-box" className={`${css["login-full-box"]} ${cssGlobal["flex-flex-start-center"]}`}>
            <div id="Login-login-page" className={css["login-page"]}>
              <h1 id="Login-login-page-h1">Stax Developer Studios</h1>
              <div id="Login-login" className={css["login-stax"]}>
                <div id="Login-login-choice" className={`${css["login-choice"]} ${cssGlobal["flex-center-center"]}`}>
                  <div  id="Login-login-choice-title" className={css["login-choice-title"]}>
                    <p id="Login-login-choice-title-p">Welcome Back</p>
                  </div>
                  <button className={css["login-choice-box-stax"]} onClick={() => LoginType("stax")}>
                    <p id="Login-login-choice-box-p">Login with Stax</p>
                  </button>
                  <button className={css["login-choice-box-integrations"]} onClick={() => LoginType("integrations")}>
                    <p id="Login-login-choice-box2-p">
                      Login with Integrations
                    </p>
                  </button>
                </div>
                {loginType === "stax" && (
                  <div id="Login-login-box-stax" className={css["login-box-stax"]}>
                    <div id="Login-login-box-stax-type" className={css["login-box-stax-normal"]}>
                      {forgotPassword === "normal" && (
                        <div id="Login-login-normal" className={css["login-normal"]}>
                          <p id="Login-login-js-p">
                            <b>Login with Stax Developer Studios</b>
                          </p>
                          <div id="Login-login-details" className={css["login-details"]}>
                            <div id="Login-login-details-box" className={css["login-details-box"]}>
                              <input id="Login-login-details-box-input-username"
                                type="text"
                                className={css["login-type"]}
                                name="username"
                                placeholder="Username or Email"
                                onKeyUp={() => checkLogin()}
                              />
                            </div>
                            <div id="Login-login-details-box" className={css["login-details-box"]}>
                              <div id="Login-login-details-box-inside" className={css["login-details-box-inside"]}>
                                <div id="Login-login-details-box-type" className={css["login-details-box-type"]}>
                                  <input id="Login-login-details-box-type-input-password"
                                    type="password" className={css["login-type"]}
                                    name="password"
                                    placeholder="Password"
                                    onKeyUp={() => checkLogin()}
                                  />
                                </div>
                                <div id="Login-show-password" className={css["show-password"]} onClick={() => showPasswordlogin()}>
                                  <p id="Login-show-password-p">
                                    <span id={css["show-password-button-on"]}>
                                      <i id="Login-show-password-icon" className={`${css["fas"]} ${css["fa-eye-slash"]} ${"fas fa-eye-slash"}`}></i>
                                    </span>
                                    <span id={css["show-password-button-off"]}>
                                      <i id="Login-show-password-icon--2" className={`${css["fas"]} ${css["fa-eye"]} ${"fas fa-eye"}`}></i>
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div id="Login-login-details-submit" className={css["login-details-submit-disabled"]}>
                              <button type="button" disabled={loginSubmitDisabled} id="Login-login-details-submit-input" className={css["login-submit"]} onClick={() => sendLogin()}>Login</button>
                              <button id="Login-login-details-submit-button" className={css["login-submit-disabled"]} disabled>
                                <div id="Login-loader-circle" className={css["loader-circle"]}></div>
                              </button>
                            </div>
                            <div id="Login-wrong-details" className={css["wrong-details"]}>
                              <div id="Login-wrong-details-box" className={css["wrong-details-box"]}>
                                {loginError === true ?
                                  <span id="Login-wrong-details-box-span">
                                    <i id="Login-login-wrong-details-box-icon" className={`${css["fas"]} ${css["fa-exclamation-circle"]} ${"fas fa-exclamation-circle"}`}></i>
                                    Invalid Details
                                  </span>:
                                  <span id="Login-wrong-details-box-span"></span>
                                }
                              </div>
                              <div id="Login-wrong-details-box--2" className={css["wrong-details-box"]}>
                                <a id="Login-wrong-details-box-a">
                                  <p id="Login-wrong-details-box-p--2">
                                    <button className={css["wrong-details-button"]} id="Login-wrong-details-box-span"
                                      onClick={() => ForgotPassword("forgot")}>
                                      Forgot login details?
                                    </button>
                                  </p>
                                </a>
                              </div>
                            </div>
                            {/* echo hidden('action', 'login"]}> */}
                          </div>
                          {/* form_close('log', '"]}> */}
                        </div>
                      )}
                      {forgotPassword === "forgot" && (
                        <div id="Login-login-forgot" className={css["login-forgot"]}>
                          <p id="Login-login-js--2">
                            <b>Forgot Password</b>
                          </p>
                          <p id="Login-login-js-p--2">
                            A verification email will be sent to your account on steps to
                            change your password. If the username or email is invalid, nothing will happen!
                          </p>
                          <div id="Login-login-details--2" className={css["login-details"]}>
                            <div id="Login-login-details-box--2" className={css["login-details-box"]}>
                              <input id="Login-login-details-box-input--2"
                                maxLength="25"
                                minLength="3"
                                type="text" className={css["login-type"]}
                                name="username"
                                placeholder="Username or Email"
                                onKeyUp={() => checkForgotPassword()}
                              />
                            </div>
                            <div id="Login-login-details-forgot-submit" className={forgotPasswordSubmitDisabled === true ? (css["login-details-forgot-submit-disabled"]):(css["login-details-forgot-submit"])}>
                              <button onClick={() => sendForgotPassword()} disabled={forgotPasswordSubmitDisabled} type="button" id="Login-login-details-submit--2" className={css["login-submit"]}>Send Confirmation</button>
                            </div>
                            <div id="Login-wrong-details--2" className={css["wrong-details"]}>
                              <div id="Login-wrong-details-box--2" className={css["wrong-details-box"]}>
                                <p id="Login-wrong-details-box-p--2">
                                  <span id="Login-wrong-details-box-span"></span>
                                </p>
                              </div>
                              <div id="Login-wrong-details-box--2" className={css["wrong-details-box"]}>
                                <a id="Login-wrong-details-box-a--2">
                                  <p id="Login-wrong-details-box-p--2">
                                    <button className={css["wrong-details-button"]} id="Login-wrong-details-button-span--2"
                                      onClick={() => ForgotPassword("normal")}>
                                      Login with Stax
                                    </button>
                                  </p>
                                </a>
                              </div>
                            </div>
                            {/* echo hidden('action', 'login"]}> */}
                          </div>
                          {/* echo form_close('log', '"]}> */}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* {loginType === "integrations" && ( */}
                  <div className={css["login-box-integrations"]} id="login-integration">
                    <p id="Login-login-integration-p">
                      <b>Integrations</b>
                    </p>
                    <div className={`${css["integrations-list"]} ${cssGlobal["flex-center-left"]}`}>
                      {/* google integration */}
                      <div className={css["integrations-list-box"]}>
                        <div className={css["integrations-list-box-google"]}>
                          <div className={css["integrations-list-box-title"]}>
                            <p>Login with Google</p>
                          </div>
                          <div className={css["integrations-google"]}>
                            <span className={css["integrations-google-button1"]}>
                              <div id="Login-integrations-hidden-Google"></div>
                            </span>
                            <span className={css["integrations-google-button2"]}>
                              <div id="Login-integrations-hidden-Google-mobile"></div>
                            </span>
                            {/* <div id="Login-integrations-hidden-Googles">
                              <div className={"S9gUrf-YoZ4jf"} style={{position: "relative"}}>
                                  <div></div>
                                  <iframe
                                      src="https://accounts.google.com/gsi/button?theme=outline&amp;size=large&amp;text=signin_with&amp;logo_alignment=center&amp;width=250&amp;shape=pill&amp;client_id=998808368164-7jejppic9i4dcjbv32nn61tp3td7fs0m.apps.googleusercontent.com&amp;iframe_id=gsi_134788_877398&amp;as=kjfkZfiyRaqEQ3vh452THQ" id="gsi_134788_877398"
                                      title="Sign in with Google Button"
                                      style={{display: "block", position: "relative", top: "0px", left: "0px", height: "44px", width: "270px", border: "0px", margin: "-2px -10px"}}></iframe>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                      {/* slack integration */}
                      {/* <div className={css["integrations-list-box"]}>
                          <div className={css["integrations-list-box-slack"]}>
                              <div className={css["integrations-list-box-title"]}>
                                  <p>Login with Slack</p>
                              </div>
                              <div className={css["integrations-list-box-button"]}>
                                  <span className={css["slack-desktop"]}>
                                      <a className={css["slack-button"]} href="https://slack.com/openid/connect/authorize?scope=openid%20email%20profile&amp;response_type=code&amp;redirect_uri=https%3A%2F%2Fst.ax&amp;client_id=4761118339746.5153845547255"
                                          style={{alignItems:"center", color:"#fff", backgroundColor:"#4A154B", border:"0", borderRadius:"44px", display:"inline-flex", fontFamily:"Lato, sans-serif", fontSize:"14px", fontWeight:"600", height:"44px", justifyContent:"center", textDecoration:"none", width:"224px"}}>
                                          <svg xmlns="http://www.w3.org/2000/svg" style={{height:"16px", width:"16px", marginRight:"12px"}} viewBox="0 0 122.8 122.8">
                                              <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"></path>
                                              <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"></path>
                                              <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"></path>
                                              <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"></path>
                                          </svg>
                                          Sign in with Slack
                                      </a>
                                  </span>
                                  <span className={css["slack-mobile"]}>
                                      <a href="https://slack.com/openid/connect/authorize?scope=openid%20email%20profile&amp;response_type=code&amp;redirect_uri=https%3A%2F%2Fst.ax&amp;client_id=4761118339746.5153845547255"
                                          style={{alignItems:"center", color:"#fff", backgroundColor:"#4A154B", border:"0", borderRadius:"36px", display:"inline-flex", fontFamily:"Lato, sans-serif", fontSize:"14px", fontWeight:"600", height:"36px", justifyContent:"center", textDecoration:"none", width:"36px"}}>
                                              <svg xmlns="http://www.w3.org/2000/svg" style={{height:"18px", width:"18px", marginRight:"0"}} viewBox="0 0 122.8 122.8">
                                                  <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"></path>
                                                  <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"></path>
                                                  <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"></path>
                                                  <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"></path>
                                              </svg>
                                          </a>
                                  </span>
                              </div>
                          </div>
                      </div> */}
                      <div className={css["integrations-list-box"]}></div>
                    </div>
                    {/* <div id="Login-login-accounts" className={css["login-accounts"]}>
                      {integrationsList.map((list) => (
                        <button onClick={() => integrationClick(list.name)} className={css["login-accounts-button"]}>
                          <div className={css["login-accounts-box"]}>
                            <div className={css["login-accounts-box-inside"]} style={{ backgroundColor: list.colour, color: list.textColour }}>
                              <div className={css["login-accounts-box-photo"]}>
                                <img src={list.icon} />
                              </div>
                              <div className={css["login-accounts-box-text"]}>
                                <p>Login with {list.name}</p>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div> */}
                  </div>
                {/* )} */}
              </div>
            </div>
            <div id="Login-login-bottom" className={css["login-bottom"]}>
              <span id="no-account" className={css["no-account"]}>
                <p id="Login-no-account-p">
                  Don't have an account? Get one{" "}
                  <Link id="Login-no-account-register" to="/register">
                    here
                  </Link>
                </p>
              </span>
              <button id="Login-login-bottom-button"
                type="button"
                onClick={() => navigate(-1)} className={css["return-home-link"]}>
                <div id="Login-return-home" className={css["return-home"]}>
                  <p id="Login-return-home-p">Back</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
