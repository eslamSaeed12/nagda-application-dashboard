import React from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";

const styles = makeStyles((df) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#fff",
    boxShadow: df.shadows[18],
    borderRadius: "9px",
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
  },
  InfoWrapper: {
    padding: df.spacing(2),
  },
}));

export const RoundedBox = (props) => {
  const { wrapper, iconWrapper, root, InfoWrapper } = styles({
    color: props.color,
  });
  return (
    <Grid {...props.grid} className={root} item>
      <Box className={wrapper + " " + "hover-Top"}>
        <Box className={iconWrapper}>
          <props.Icon className={"white-clr"} style={{ fontSize: 70 }} />
        </Box>
        <Box className={InfoWrapper}>
          <Typography variant="h6" className="uppercase">
            {props.title}
          </Typography>
          <Typography>{props.count}</Typography>
        </Box>
      </Box>
    </Grid>
  );
};
