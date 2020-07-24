import React from "react";
import { Box, Typography } from "@material-ui/core";

export const DataManagerStarter = (props) => {
  return (
    <React.Fragment>
      <Box py={4}>
        <Typography align="center" variant="h5" className="pop-Bold capitalize">
          {props.title}
        </Typography>
      </Box>
      <Box mt={2} textAlign="center">
        <img src={props.img} className={props.imgClass} />
      </Box>
    </React.Fragment>
  );
};
