import React from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";
import clsx from "clsx";
import { constants } from "../js/constants.json";
const styles = makeStyles((df) => ({
  shadowLg: {
    boxShadow: df.shadows[18],
  },
  boxStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  responsiveIcon: {
    textAlign: "center",
    fontSize: 60,
    margin: "0 auto",
    "@media(max-width:960px)": {
      fontSize: 40,
    },
  },
}));

export const CircleBox = (props) => {
  const { shadowLg, boxStyle, responsiveIcon } = styles();

  return (
    <Grid item {...props} className={clsx(props.className)}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        borderRadius={200}
        style={{ backgroundColor: "#FFC107" }}
        py={4}
        className={clsx(shadowLg, boxStyle, "hover-Top",'insider-circle-box')}
      >
        <Box display="flex" flexDirection="column" textAlign="center">
          <props.Icon className={clsx("white-clr", responsiveIcon)} />
          <Typography
            variant="h6"
            align="center"
            className="white-clr uppercase"
          >
            {props.title}
          </Typography>
          <Typography variant="body1" align="center" className="white-clr">
            {props.count}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};
