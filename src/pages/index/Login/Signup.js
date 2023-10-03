import SignupForm from "../../components/forms/SignupForm";
import css from "./Signup.module.css";
import axios from "axios";

function Signup() {
  function onSignupHandler(userData) {
    const options = {
      method: "post",
      url: "/",
      xsrfCookieName: "Stax-XSRF-TOKEN",
      xsrfHeaderName: "Stax-X-XSRF-TOKEN",
    };
    axios(options);
  }

  return (
    <div className={css.signup}>
      <SignupForm onSignup={onSignupHandler} />
    </div>
  );
}
export default Signup;
