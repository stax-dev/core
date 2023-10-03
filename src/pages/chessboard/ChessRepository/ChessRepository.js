//React
//import React, { useState } from "react";
import { Link } from "react-router-dom";
//import Button from "../../../components/button/Button";

//External
import {
  Addons,
  scrollReveal,
  snackbarNotification,
  newNotification,
  viewNotification,
  closeNotification,
} from "../../../components/addons/Addons";

import cssGlobal from "../../../components/globalcss/GlobalCSS.module.css";
import Navchess from "../../../components/navchess/Navchess";

//Main
import css from "./ChessRepository.module.css";

export default function ChessRepository() {
  return (
    <div className={cssGlobal["chessboard-full"]}>
      <Navchess number="6" type="nav" />
      <div className={cssGlobal["chessboard-section"]}>
        <Navchess number="6" type="top" />
      </div>
    </div>
  );
}
