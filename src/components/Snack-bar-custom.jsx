import React from "react";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Typography, makeStyles } from "@material-ui/core";

const styles = makeStyles((df) => ({
  whiteBtn: {
    backgroundColor: "#fff",
    color: df.palette.error.main,
    borderColor: df.palette.error.main,
    "&:hover": {
      borderColor: "#ffff",
      color: "#ffff",
    },
  },
}));

function Alerto(props) {
  const { whiteBtn } = styles();
  return (
    <Alert
      style={props.style}
      className={props.className}
      elevation={props.shadows}
      variant={props.variant}
      severity={props.severity}
      style={{ textAlign: "center" }}
    >
      <AlertTitle>{props.title}</AlertTitle>
      {props.content ? (
        <Typography>{props.content}</Typography>
      ) : (
        props.children
      )}
      <Button
        variant="outlined"
        color="secondary"
        className={whiteBtn}
        onClick={props.onClick}
      >
        close
      </Button>
    </Alert>
  );
}

export default Alerto;
