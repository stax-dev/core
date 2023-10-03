import React from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import css from "./avatar.module.css";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Avatar() {
  const classes = useStyles();

  return (
    <Avatar
      alt="Remy Sharp"
      src="/static/images/avatar/1.jpg" className={css.large}
    />
  );
}
