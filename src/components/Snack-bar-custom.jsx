import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Typography, makeStyles } from "@material-ui/core";

const styles = makeStyles((df) => ({
  whiteBtn: {
    backgroundColor: "#fff",
    color: (props) => df.palette[props.severity].main,
    borderColor: (props) => df.palette[props.severity].main,
    "&:hover": {
      borderColor: "#ffff",
      color: "#ffff",
    },
  },
}));

function Alerto(props) {
  const { whiteBtn } = styles({ severity: props.severity });

  return (
    <Alert
      className={props.className}
      elevation={props.shadows}
      variant={props.variant}
      severity={props.severity}
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        ...props.style,
      }}
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
