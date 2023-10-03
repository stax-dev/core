//React
import React, { useEffect /*, useState */} from "react";
import { Link, useNavigate } from "react-router-dom";
// import Button from "../../../components/button/Button";

//External
import { Addons, Bubbles, scrollReveal, snackbarNotification, newNotification, viewNotification, closeNotification } from "../../../components/addons/Addons";

import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";
import Nav from "../../../components/nav/Nav";

//Main
import css from "./Register.module.css";

//Images
import background from "../../../images/backgrounds/background2.svg";

export default function Register() {

    // somehow unlike login page, if i put disabled on hard code html, it will not work.
    // so what i will do is put an window onload function and disable it when the page loads
    // extra work but idk why its not working its kind of annoying no idea why is not working
    // useEffect(() => {
    //     document.getElementById("Register-register-details-submit-button").setAttribute("disabled", "");
    //     //runs function on page load
    // });

    // the above is no longer needed since visiblity is hidden when page loads up

    document.documentElement.setAttribute("data-apptheme", "dark");
    document.body.style.overflow = 'auto';

    const navigate = useNavigate();

    var usernameError = '<p><i class="' + css["fa-exclamation-circle"] + ' fas fa-exclamation-circle"></i>Username taken</p>';
    var usernameLength = '<p><i class="' + css["fa-exclamation-circle"] + ' fas fa-exclamation-circle"></i>Username must be between 3-12 characters</p>';
    var usernameSymbol = '<p><i class="' + css["fa-exclamation-circle"] + ' fas fa-exclamation-circle"></i>Can contain only alphanumerics, underscores, dashes and dots</p>';
    var usernameLowercase = '<p><i class="' + css["fa-exclamation-circle"] + ' fas fa-exclamation-circle"></i>Username can only be lowercase</p>';
    var usernameStart = '<p><i class="' + css["fa-exclamation-circle"] + ' fas fa-exclamation-circle"></i>Usernames can only begin with alphabets</p>';
    var usernameCorrect = '';
    var usernameBroken = '<p><i class="' + css["fa-exclamation-circle"] + ' fas fa-exclamation-circle"></i>Error occured. Reloading page...</p>';
    var emailCorrect = '';
    var emailError = '<p><i class="' + css["fa-exclamation-circle"] + ' fas fa-exclamation-circle"></i>Email is already registered</p>';
    var emailSymbol = '<p><i class="' + css["fa-exclamation-circle"] + ' fas fa-exclamation-circle"></i>Email must be a valid address</p>';
    var passwordError = '<p><i class="' + css["fa-exclamation-circle"] + ' fas fa-exclamation-circle"></i>Passwords do not match</p>';
    var passwordLength = '<p style="color: #FFA500"><i class="' + css["fa-exclamation-circle"] + ' fas fa-exclamation-circle"></i>Password length is not recommended</p>';
    var passwordShort = '<p><i class="' + css["fa-exclamation-circle"] + ' fas fa-exclamation-circle"></i>Password is too short</p>';
    var passwordCorrect = '';
    var Symbols = /^[0-9a-zA-Z_.-]+$/;
    var SymbolsUppercase = /^[0-9A-Za-z_.-]+$/;
    var FinalUsername = /^[a-zA-Z][0-9a-zA-Z_.-]{2,11}$/;
    var SymbolsEmail = /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    var usernameCheck = '';
    var emailCheck = '';
    var passwordCheck = '';

    function checkUsername(){
        var username = document.getElementById("Register-register-details-box-username-input").value;

        if(username !== ''){ /* username input check */
            if(username.match(Symbols)){ /* username symbol check */
                if(!username.startsWith('0')&&!username.startsWith('1')&&  /* username starting symbol check */
                !username.startsWith('2')&&!username.startsWith('3')&&
                !username.startsWith('4')&&!username.startsWith('5')&&
                !username.startsWith('6')&&!username.startsWith('7')&&
                !username.startsWith('8')&&!username.startsWith('9')&&
                !username.startsWith('-')&&!username.startsWith('.')&&
                !username.startsWith('_')){
                    if(username.match(SymbolsUppercase)){ /* uppercase check */
                        if(username.length <= 12 && username.length >= 3){ /* username length check */
                            if(username.match(FinalUsername)){ /* final username check */
                                if(username != 'test'){ /* username availability check */
                                    document.getElementById("username-box").style.border = "1px solid var(--theme2)";
                                    document.getElementById('username-tick-box').style.display = "block";
                                    document.getElementById("Register-register-details-box-username-input").style.color = "var(--text1)";
                                    document.getElementById('username-taken').innerHTML = usernameCorrect;
                                    usernameCheck = '';
                                    // show email input
                                    document.getElementById(css["email-box"]).style.visibility = "visible";
                                }else{
                                    document.getElementById('username-taken').innerHTML = usernameError;
                                    document.getElementById("username-box").style.border = "1px solid var(--red)";
                                    document.getElementById('username-tick-box').style.display = "none";
                                    document.getElementById("Register-register-details-box-username-input").style.color = "var(--text1)";
                                    usernameCheck = 'alex';
                                };
                            }else{
                                document.getElementById('username-taken').innerHTML = usernameBroken;
                                document.getElementById("username-box").style.border = "1px solid var(--red)";
                                document.getElementById('username-tick-box').style.display = "none";
                                document.getElementById("Register-register-details-box-username-input").style.color = "var(--text1)";
                                usernameCheck = 'elias';
                                setTimeout("location.reload()","2000");
                            }
                        }else{
                            document.getElementById('username-taken').innerHTML = usernameLength;
                            document.getElementById("username-box").style.border = "1px solid var(--red)";
                            document.getElementById('username-tick-box').style.display = "none";
                            document.getElementById("Register-register-details-box-username-input").style.color = "var(--text1)";
                            usernameCheck = 'stax';
                        }
                    }else{
                        document.getElementById('username-taken').innerHTML = usernameLowercase;
                        document.getElementById("username-box").style.border = "1px solid var(--red)";
                        document.getElementById('username-tick-box').style.display = "none";
                        document.getElementById("Register-register-details-box-username-input").style.color = "var(--text1)";
                        usernameCheck = 'host';
                    }
                }else{
                    document.getElementById('username-taken').innerHTML = usernameStart;
                    document.getElementById("username-box").style.border = "1px solid var(--red)";
                    document.getElementById('username-tick-box').style.display = "none";
                    document.getElementById("Register-register-details-box-username-input").style.color = "var(--text1)";
                    usernameCheck = 'hey there my name is alex';
                }
            }else{
                document.getElementById('username-taken').innerHTML = usernameSymbol;
                document.getElementById("username-box").style.border = "1px solid var(--red)";
                document.getElementById('username-tick-box').style.display = "none";
                document.getElementById("Register-register-details-box-username-input").style.color = "var(--text1)";
                usernameCheck = 'it is nice to meet someone who is artifical haha';
            };
        }else{
            document.getElementById("username-box").style.border = "1px solid var(--theme2)";
            document.getElementById('username-tick-box').style.display = "none";
            document.getElementById('username-taken').innerHTML = usernameCorrect;
            document.getElementById("Register-register-details-box-username-input").style.color = "var(--text1)";
            usernameCheck = 'oh yes same for me i think the same as the same as the current world';
        };
    };

    function checkEmail(){
        var email = document.getElementById("Register-register-details-box-email-input").value;

        if(email !== ''){ /* email input check */
            if(email.match(SymbolsEmail)){ /* email symbol validation check */
                if(email != 'test@fork'){ /* email avaliability check */
                    document.getElementById(css["email-box"]).style.border = "1px solid var(--theme2)";
                    document.getElementById('email-tick-box').style.display = "block";
                    document.getElementById('email-taken').innerHTML = emailCorrect;
                    emailCheck = '';
                    // show password input
                    document.getElementById(css["password-box1"]).style.visibility = "visible";
                    document.getElementById(css["password-box2"]).style.visibility = "visible";
                }else{
                    document.getElementById('email-taken').innerHTML = emailError;
                    document.getElementById(css["email-box"]).style.border = "1px solid var(--red)";
                    document.getElementById('email-tick-box').style.display = "none";
                    emailCheck = 'Invalid';
                };
            }else{
                document.getElementById('email-taken').innerHTML = emailSymbol;
                document.getElementById(css["email-box"]).style.border = "1px solid var(--red)";
                document.getElementById('email-tick-box').style.display = "none";
                emailCheck = 'Invalid';
            };
        }else{
            document.getElementById(css["email-box"]).style.border = "1px solid var(--theme2)";
            document.getElementById('email-tick-box').style.display = "none";
            document.getElementById('email-taken').innerHTML = emailCorrect;
            emailCheck = 'Invalid';
        };
    }

    function checkPassword(){
            var password = document.getElementById("Register-register-details-box-type-input").value;
            var passwordConfirm = document.getElementById("Register-register-details-box-type-input--2").value;

        if(password != passwordConfirm){
            document.getElementById('password-match').innerHTML = passwordError;
            document.getElementById(css["password-box1"]).style.border = "1px solid var(--red)";
            document.getElementById(css["password-box2"]).style.border = "1px solid var(--red)";
            document.getElementById('password-tick-box').style.display = "none";
        }else{
            if(password !== ''){
                if(password.length >= 3){
                    if(password.length >= 6){
                        document.getElementById('password-match').innerHTML = passwordCorrect;
                        document.getElementById(css["password-box1"]).style.border = "1px solid var(--theme2)";
                        document.getElementById(css["password-box2"]).style.border = "1px solid var(--theme2)";
                        document.getElementById('password-tick-box').style.display = "block";
                        passwordCheck = '';
                    }else{
                        document.getElementById('password-match').innerHTML = passwordLength;
                        document.getElementById(css["password-box1"]).style.border = "1px solid var(--theme2)";
                        document.getElementById(css["password-box2"]).style.border = "1px solid var(--theme2)";
                        document.getElementById('password-tick-box').style.display = "block";
                        passwordCheck = '';
                    }
                    //show register submit button
                    document.getElementById(css["register-button"]).style.visibility = "visible";
                }else{
                    document.getElementById('password-match').innerHTML = passwordShort;
                    document.getElementById(css["password-box1"]).style.border = "1px solid var(--red)";
                    document.getElementById(css["password-box2"]).style.border = "1px solid var(--red)";
                    document.getElementById('password-tick-box').style.display = "none";
                    passwordCheck = 'Invalid';
                }
            }else{
                document.getElementById('password-match').innerHTML = passwordCorrect;
                document.getElementById(css["password-box1"]).style.border = "1px solid var(--theme2)";
                document.getElementById(css["password-box2"]).style.border = "1px solid var(--theme2)";
                document.getElementById('password-tick-box').style.display = "none";
                passwordCheck = 'Invalid';
            }
        };

    };

    function registerComplete(){
        var username = document.getElementById("Register-register-details-box-username-input").value;
        var email = document.getElementById("Register-register-details-box-email-input").value;
        var password = document.getElementById("Register-register-details-box-type-input").value;
        var passwordConfirm = document.getElementById("Register-register-details-box-type-input--2").value;

        if(username !== ''
            && email !== ''
            && password !== ''
            && passwordCheck == ''
            && usernameCheck == ''
            && emailCheck == ''
        ){
            if(password == passwordConfirm){
                document.getElementById("Register-register-details-submit-button").removeAttribute("disabled", "");
                document.getElementById("Register-register-details-submit-button").style.cursor = 'pointer';
                document.getElementById(css["register-button"]).classList.replace(css["register-details-submit-hidden"], css["register-details-submit"]);
            }else{
                document.getElementById("Register-register-details-submit-button").style.cursor = 'default';
                document.getElementById("Register-register-details-submit-button").setAttribute("disabled", "");
                document.getElementById(css["register-button"]).classList.replace(css["register-details-submit"], css["register-details-submit-hidden"]);
                document.getElementById(css["register-button"]).classList.replace(css["register-details-submit-load"], css["register-details-submit-hidden"]);
            };
        }else{
            document.getElementById("Register-register-details-submit-button").style.cursor = 'default';
            document.getElementById("Register-register-details-submit-button").setAttribute("disabled", "");
            document.getElementById(css["register-button"]).classList.replace(css["register-details-submit"], css["register-details-submit-hidden"]);
            document.getElementById(css["register-button"]).classList.replace(css["register-details-submit-load"], css["register-details-submit-hidden"]);

        };

    }

    function Loader(){
        document.getElementById(css["register-button"]).classList.replace(css["register-details-submit"], css["register-details-submit-load"]);

    };

    function showPasswordregister(){
        var password = document.getElementById("Register-register-details-box-type-input");
        var password2 = document.getElementById("Register-register-details-box-type-input--2");
        if(password.type ==="password"){
            password.type = "text";
            password2.type = "text";
            document.getElementById(css['show-password-button-off']).style.display = "inline-block";
            document.getElementById(css['show-password-button-on']).style.display = "none";
        }else{
            password.type = "password";
            password2.type = "password";
            document.getElementById(css['show-password-button-off']).style.display = "none";
            document.getElementById(css['show-password-button-on']).style.display = "inline-block";
        }
    }



    return (
        <div id="Register-react-div" className={cssGlobal["react-div"]}>
            <div className={cssGlobal["react-background-short"]} style={{ backgroundImage: `url(${background})` }}>
                <div style={{display: "none"}}>
                    <Nav/>
                </div>
                <Addons />
                <Bubbles/>
                <div id="Register-register-full" className={`${css["register-full"]} ${cssGlobal["flex-center-center"]}`}>
                    <div id="Register-register-full-box" className={`${css["register-full-box"]} ${cssGlobal["flex-flex-start-center"]}`}>
                        <div id="Register-register-page" className={css["register-page"]}>
                            <h1 id="Register-register-page-h1">Stax Developer Suite</h1>
                            <div id="Register-register" className={css["register"]}>

                                <div id="Register-register-box" className={css["register-box"]}>

                                    <div id="Register-register-message" className={css["register-message"]}>
                                        <p id="Register-register-message-p">Welcome to the World of Stax! Don't stress about the perfect username, you can always change it later.
                                        </p>
                                    </div>

                                    <p id="Register-register-box-p">Register a new account</p>
                                        <form id="Register-register-box-form" action="register" method="POST">
                                            <div id="Register-register-details" className={css["register-details"]}>

                                                <div id={"username-box"} className={css["register-details-box"]}>
                                                    <div id="Register-register-details-box-username" className={css["register-details-box-username"]}>
                                                        <input id="Register-register-details-box-username-input" onKeyUp={() => {checkUsername();registerComplete()}} onChange={e => e.target.setCustomValidity("")} minLength="3" maxLength="20" onInvalid={() => this.setCustomValidity("Please enter a username")} type="text" className={css["register-type"]} name="username" placeholder="Username" required/>
                                                    </div>
                                                    <div id="username-tick-box" className={css["register-details-box-tick"]}>
                                                        <p id="Register-register-details-box-tick-p"><i id="Register-register-details-box-tick-icon" className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i></p>
                                                    </div>
                                                    <span id="username-taken" className={css["register-details-error"]}></span>
                                                </div>

                                                <div id={css["email-box"]} className={css["register-details-box2"]}>
                                                    <div  id="Register-register-details-box-email" className={css["register-details-box-email"]}>
                                                        <input id="Register-register-details-box-email-input" onKeyUp={() => {checkEmail();registerComplete()}}  onChange={e => e.target.setCustomValidity("")} onInvalid={() => this.setCustomValidity("Please enter a valid email address")} type="email" className={css["register-type"]} name="email" placeholder="Email" required/>
                                                        {/* if(isset($_SESSION['catch_email'])){
                                                            value="'.$_SESSION['catch_email'].'"
                                                        }else{
                                                            placeholder="Email"
                                                        }
                                                        required/> */}
                                                    </div>
                                                    <div id="email-tick-box" className={css["register-details-box-tick"]}>
                                                        <p id="Register-register-details-box-tick-p"><i id="Register-register-details-box-tick-icon" className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i></p>
                                                    </div>
                                                    <span className={css["register-details-error"]} id="email-taken"></span>
                                                </div>


                                                <div id={css["password-box1"]} className={css["register-details-box"]}>
                                                    <div id="Register-register-details-box-inside" className={css["register-details-box-inside"]}>

                                                        <div id="Register-register-details-box-type" className={css["register-details-box-type"]}>
                                                            <input id="Register-register-details-box-type-input" type="password" className={css["register-type"]} onKeyUp={() => {checkPassword();registerComplete()}} name="password" placeholder="Password" required/>
                                                        </div>

                                                        <div id="Register-show-password" className={css["show-password"]} onClick={() => showPasswordregister()}>
                                                            <p id="Register-show-password-p">
                                                                <span id={css["show-password-button-on"]}>
                                                                    <i id="Register-show-password-icon" className={`${css["fas"]} ${css["fa-eye-slash"]} ${"fas fa-eye-slash"}`}></i>
                                                                </span>
                                                                <span id={css["show-password-button-off"]}>
                                                                    <i id="Register-show-password-icon--2" className={`${css["fas"]} ${css["fa-eye"]} ${"fas fa-eye"}`}></i>
                                                                </span>
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div id={css["password-box2"]} className={css["register-details-box"]}>
                                                    <div id="Register-register-details-box-inside--2" className={css["register-details-box-inside"]}>
                                                        <div id="Register-register-details-box-type--2" className={css["register-details-box-type"]}>
                                                            <input id="Register-register-details-box-type-input--2" type="password" className={css["register-type"]} onKeyUp={() => {checkPassword();registerComplete()}} name="password-confirm" placeholder="Confirm Password" required/>
                                                        </div>
                                                        <div id="password-tick-box" className={css["register-details-box-tick"]}>
                                                            <p id="Register-register-details-box-tick-p"><i className={`${css["fas"]} ${css["fa-check-circle"]} ${"fas fa-check-circle"}`}></i></p>
                                                        </div>
                                                        <span className={css["register-details-error"]} id="password-match"></span>
                                                    </div>
                                                </div>



                                                <div id={css["register-button"]} className={css["register-details-submit-hidden"]}>
                                                    <button id="Register-register-details-submit-button" onClick={() => Loader()} className={css["register-submit"]}>Register Now</button>
                                                    <button id="Register-register-details-submit-button--2" className={css["loader-div"]} disabled><div id="Register-loader-circle" className={css["loader-circle"]}></div></button>
                                                </div>



                                                {/* echo hidden('action', 'register"]}> */}

                                            </div>
                                        </form>


                                </div>

                            </div>
                        </div>
                        <div id="Register-register-bottom" className={css["register-bottom"]}>
                            <span id="Register-no-account" className={css["no-account"]}>
                                <p id="Register-no-account-p">Already have an account? Login <Link id="Register-no-account-a" to="/login">here</Link></p>
                            </span>
                            <button id="Register-return-home-link" type="button" onClick={() => navigate(-1)} className={css["return-home-link"]}>
                                <div id="Register-return-home" className={css["return-home"]}>
                                    <p id="Register-return-home-p">Back</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}