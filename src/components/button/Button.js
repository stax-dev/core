import css from "./Button.module.css";

function Button(props) {
  return (
    <button className={props.class + " " + css.btn} onClick={props.onClick}>
      {props.text}
      {/* Capitalize the first letter of the text */}
      {props.text.charAt(0).toUpperCase() + props.text.slice(1)}
    </button>
  );
}
export default Button;
