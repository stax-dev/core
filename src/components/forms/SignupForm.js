import { useRef } from "react";
import css from "/SignupForm.module.css";

function SignupForm() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const userData = {
      username: enteredUsername,
      password: enteredPassword,
    };

    console.log(userData);
    props.onSignup(userData);
  }

  return (
    <form className={css.form} onSubmit={submitHandler}>
      <div className={css.control}>
        <label htmlFor="username">Username</label>
        <input type="text" required id="username" ref={usernameRef} />
      </div>
      <div className={css.control}>
        <label htmlFor="password">Password</label>
        <input type="password" required id="password" ref={passwordRef} />
      </div>
      <div className={css.action}>
        <button>Signup</button>
      </div>
    </form>
  );
}
export default SignupForm;