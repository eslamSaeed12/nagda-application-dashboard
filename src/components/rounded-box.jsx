import React from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";
import clsx from "clsx";
const styles = makeStyles((df) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#fff",
    boxShadow: df.shadows[18],
    borderRadius: "9px",
    margin: "0 auto",
    "@media(max-width:600px)": {
      flexDirection: "column",
    },
  },
  iconWrapper: {
    backgroundColor: (props) => props.color,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: df.spacing(2),
  },
  root: {
    margin: `${df.spacing(2)}px 0`,
    "@media(max-width:600px)": {
      margin: "12px auto",
    },
  },
  InfoWrapper: {
    padding: df.spacing(2),
  },
  responsiveIcon: {
    "@media(max-width:600px)": {
      margin: "0 auto",
    },
  },
  responsiveContent: {
    "@media(max-width:600px)": {
      textAlign: "center",
    },
  },
}));

export const RoundedBox = (props) => {
  const {
    wrapper,
    iconWrapper,
    root,
    InfoWrapper,
    responsiveIcon,
    responsiveContent,
  } = styles({
    color: props.color,
  });
  return (
    <Grid {...props.grid} className={root} item>
      <Box className={wrapper + " " + "hover-Top"}>
        <Box className={iconWrapper}>
          <props.Icon
            className={clsx("white-clr", responsiveIcon)}
            style={{ fontSize: 70 }}
          />
        </Box>
        <Box className={InfoWrapper}>
          <Typography
            variant="h6"
            className={clsx("uppercase", responsiveContent)}
          >
            {props.title}
          </Typography>
          <Typography className={clsx(responsiveContent)}>
            {props.count}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};
