import React from "react";
import clsx from "clsx";
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import Auth from "../../wrappers/Auth-wrapper";

import { connect } from "react-redux";

import Layout from "../../wrappers/App-Layout";

import aiUserImg from "../../static/images/ai-user.jpg";

const styles = makeStyles((df) => ({
  root: {
    height: "100vh",
  },
  leftGrid: {
    backgroundColor: df.palette.primary.dark,
    height: "100vh",
    position: "relative",
  },
  rightGrid: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  hrStyle: {
    border: `3px solid ${df.palette.primary.dark}`,
    width: 250,
    borderRadius: 50,
  },
  imgProfile: {
    width: "100%",
    borderRadius: 200,
  },
  imgWrapper: {
    position: "absolute",
    boxShadow: df.shadows[4],
    width: "250px",
    height: "250px",
    borderRadius: 200,
    left: "60%",
    top: "30%",
  },
  darkPrimaryBtn: {
    backgroundColor: df.palette.primary.dark,
  },
}));

const Profile = (props) => {
  const {
    leftGrid,
    root,
    rightGrid,
    hrStyle,
    imgWrapper,
    imgProfile,
    darkPrimaryBtn,
  } = styles();
  return (
    <Box className={root}>
      <Grid container>
        <Grid xs={3} className={leftGrid}>
          <Box className={imgWrapper}>
            <img src={aiUserImg} className={imgProfile} />
          </Box>
        </Grid>
        <Grid xs={9} className={rightGrid}>
          <Box display="flex" flexDirection="column" alignContent="center">
            <hr className={hrStyle} />
            <Typography className="pop-Black capitalize" variant="h5">
              perosnal information
            </Typography>
          </Box>
          <Box>
            <form>
              <Box>
                <TextField
                  variant="standard"
                  label="username"
                  name="username"
                  type="text"
                />
              </Box>
              <Box my={3}>
                <TextField
                  variant="standard"
                  label="email"
                  name="email"
                  type="email"
                />
              </Box>
              <Box my={3}>
                <TextField
                  variant="standard"
                  label="password"
                  name="password"
                  type="password"
                />
              </Box>

              <Box my={3}>
                <TextField
                  variant="standard"
                  label="job title"
                  name="job"
                  type="text"
                />
              </Box>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={clsx("white-clr", darkPrimaryBtn)}
                >
                  update profile
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const WithAppLayout = (props) => {
  return (
    <Layout>
      <Profile />
    </Layout>
  );
};

export default connect((state) => state)(Auth(WithAppLayout));
