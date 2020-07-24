import React from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";

const styles = makeStyles((df) => ({
  shadowLg: {
    boxShadow: df.shadows[18],
  },
  boxStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export const CircleBox = (props) => {
  const { shadowLg, boxStyle } = styles();
  const gridRef = React.useRef();
  const [circleSize, setCircleSize] = React.useState();

  React.useEffect(() => setCircleSize(gridRef.current.offsetWidth), [gridRef]);

  return (
    <Grid
      ref={gridRef}
      item
      xs={props.xs}
      lg={props.lg}
      md={props.md}
      sm={props.sm}
      className={shadowLg + " " + boxStyle + " " + "hover-Top"}
      style={{
        borderRadius: "200px",
        height: Number(circleSize + 10) + "px",
        backgroundColor: props.color,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box display="flex" flexDirection="column" textAlign="center">
          <props.Icon
            className="white-clr"
            style={{ textAlign: "center", fontSize: 70, margin: "0 auto" }}
          />
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
