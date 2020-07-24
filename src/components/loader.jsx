import React from "react";
import { GridLoader } from "react-spinners";
import { Box, Container, Typography } from "@material-ui/core";

const Loader = (props) => {
  return (
    <Container>
      <Box
        height="100vh"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <GridLoader
            size={props.size || 40}
            color={props.color || "#03A9F4"}
          />
          <Typography align="center" className="pop-Black" style={{ marginTop: "8px" }}>
            {props.msg || "loading"}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Loader;
