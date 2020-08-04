import React, { useState, Fragment, useEffect } from "react";
import clsx from "clsx";
import {
  Box,
  Grid,
  Typography,
  makeStyles,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
  Backdrop,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Error, RemoveRedEye } from "@material-ui/icons";

import UpdateProfileValidator from "../../js/validators/profile-update";

import Alerto from "../../components/Snack-bar-custom";

import confirmUserValidator from "../../js/validators/confirm-user";

import UpdateProfileClient from "../../js/clients/profile-services";

import UpdateProfileConfig from "../../js/forms/profile";

import {
  profileEvents,
  confirmation,
  authEvents,
} from "../../store/actions/pages";

import { Skeleton } from "@material-ui/lab";

import Auth from "../../wrappers/Auth-wrapper";

import { connect } from "react-redux";

import Layout from "../../wrappers/App-Layout";

import aiUserImg from "../../static/images/ai-user.jpg";

import { useFormik } from "formik";

import profile from "../../js/forms/profile";

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
  dangerButton: {
    borderColor: df.palette.error.main,
    color: df.palette.error.main,
    /* "&:hover": {
      backgroundColor: df.palette.error.light,
    },*/
  },
  errorText: {
    color: df.palette.error.main,
  },
  backdrop: {
    zIndex: df.zIndex.drawer + 1,
  },
}));

const ConfirmPasswordComponent = (props) => {
  const [passwordType, setPasswordType] = useState(true);

  let {
    errors,
    values,
    handleChange,
    handleSubmit,
    isValid,
    isValidating,
    isSubmitting,
  } = useFormik({
    initialValues: {
      id: props.state.auth.user._id,
    },
    validationSchema: confirmUserValidator,
    onSubmit: (data) => {
      if (!isValidating && isSubmitting && isValid) {
        props.state.dispatch(confirmation.CONFIRMATION_PROCESS_EV(data));
      }
    },
  });

  const { errorText } = styles();

  return (
    <Dialog open={props.open}>
      <DialogTitle>confirm your cerdentials</DialogTitle>
      <DialogContent>
        <Box mb={3}>
          {props.state.common.confirm_user_fail ? (
            <List>
              {typeof props.state.common.confirm_user_fail === "string" ? (
                <ListItem>
                  <ListItemIcon>
                    <Error />
                  </ListItemIcon>
                  <ListItemText className={errorText}>
                    {props.state.common.confirm_user_fail}
                  </ListItemText>
                </ListItem>
              ) : (
                props.state.common.confirm_user_fail.map((err, index) => {
                  return (
                    <ListItem key={`err-item-${index}`}>
                      <ListItemIcon>
                        <Error />
                      </ListItemIcon>
                      <ListItemText className={errorText}>{err}</ListItemText>
                    </ListItem>
                  );
                })
              )}
            </List>
          ) : null}
        </Box>

        <form onSubmit={handleSubmit}>
          <input
            //ref={handleChange}
            type="hidden"
            name="id"
            value={props.state.auth.user._id}
          />
          <Box position="relative">
            <TextField
              variant="outlined"
              name="password"
              label="password"
              type={passwordType ? "password" : "text"}
              value={values.password}
              onChange={handleChange}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password : null}
            />
            <IconButton
              style={{ position: "absolute", right: "0rem" }}
              onClick={() => setPasswordType(!passwordType)}
            >
              <RemoveRedEye />
            </IconButton>
          </Box>
          <Button
            disabled={!isValid}
            type="submit"
            color="primary"
            variant="contained"
            style={{ marginTop: 12 }}
            className={"white-clr"}
          >
            done
          </Button>
        </form>
      </DialogContent>
      <DialogActions>{props.children}</DialogActions>
    </Dialog>
  );
};

const Profile = (props) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [BACK_DROP, SET_BACK_DROP] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [passwordType, setPasswordType] = useState(true);
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isValid,
    isSubmitting,
    isValidating,
  } = useFormik({
    initialValues: {
      id: props.auth.user._id,
      email: props.auth.user.email,
      username: props.auth.user.username,
    },
    validationSchema: UpdateProfileValidator,
    onSubmit: (data) => {
      if (!isValidating && isSubmitting && isValid) {
        props.dispatch(profileEvents.UPDATE_PROFILE_SAVED_DATA_FN(data));
      }
    },
  });

  const openModalEvt = () => setOpenUpdateModal(true);
  const closeModalEvt = () => setOpenUpdateModal(false);

  useEffect(() => {
    if (props.common.confirm_user_status) {
      setOpenUpdateModal(false);
      SET_BACK_DROP(true);
      props.dispatch(
        profileEvents.UPDATE_PROFILE_EV(props.profile.update_prfoile_saved_data)
      );
    }
  }, [props.common.confirm_user_status]);

  useEffect(() => {
    if (props.profile.update_profile_fail) {
      SET_BACK_DROP(false);
    }
  }, [props.profile.update_profile_fail]);

  useEffect(() => {
    if (props.profile.update_profile_updated_data) {
      props.dispatch(
        authEvents.AUTH_USER(props.profile.update_profile_updated_data)
      );
      console.log(props.profile.update_profile_updated_data);
      SET_BACK_DROP(false);
      setSuccessUpdate(true);
    }
  }, [props.profile.update_profile_updated_data]);

  const {
    leftGrid,
    root,
    rightGrid,
    hrStyle,
    imgWrapper,
    imgProfile,
    darkPrimaryBtn,
    dangerButton,
    backdrop,
    errorText,
  } = styles();

  return (
    <Box className={root}>
      {successUpdate ? (
        <Box
          width="100%"
          style={{ bottom: "1rem", zIndex: 5555 }}
          position="fixed"
          display="flex"
          justifyContent="center"
        >
          <Alerto
            variant="filled"
            severity="success"
            title="success"
            content="profile updated succesfully"
            elevation={18}
            hiddenBy={8}
            onClick={() => setSuccessUpdate(false)}
          />
        </Box>
      ) : null}

      {BACK_DROP ? (
        <Backdrop open={true} className={backdrop}>
          <CircularProgress color="primary" />
        </Backdrop>
      ) : null}
      <Grid container>
        <Grid xs={3} className={leftGrid} item>
          <Box className={imgWrapper}>
            <img src={aiUserImg} className={imgProfile} />
          </Box>
        </Grid>
        <Grid xs={9} className={rightGrid} item>
          <Box
            display="flex"
            flexDirection="column"
            alignContent="center"
            mb={3}
          >
            <hr className={hrStyle} />
            <Typography className="pop-Black capitalize" variant="h5">
              perosnal information
            </Typography>
          </Box>
          <Box>
            {props.profile.update_profile_fail ? (
              <List>
                {typeof props.profile.update_profile_fail === "string" ? (
                  <ListItem>
                    <ListItemIcon>
                      <Error />
                    </ListItemIcon>
                    <ListItemText className={errorText}>
                      {props.profile.update_profile_fail}
                    </ListItemText>
                  </ListItem>
                ) : (
                  props.profile.update_profile_fail.map((err, index) => {
                    return (
                      <ListItem key={`err-list-item-key${index}`}>
                        <ListItemIcon>
                          <Error />
                        </ListItemIcon>
                        <ListItemText className={errorText}>{err}</ListItemText>
                      </ListItem>
                    );
                  })
                )}
              </List>
            ) : null}
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              {props.auth.user && props.auth.user.id ? (
                <input
                  onChange={handleChange}
                  name="id"
                  type="hidden"
                  value={values.id}
                />
              ) : null}
              <Box>
                {props.auth.user && props.auth.user.username ? (
                  <Fragment>
                    <TextField
                      onChange={handleChange}
                      variant="standard"
                      label="username"
                      name="username"
                      type="text"
                      value={values.username}
                      defaultValue={props.auth.user.username}
                      error={errors.username ? true : false}
                      helperText={errors.username ? errors.username : null}
                    />
                  </Fragment>
                ) : (
                  <Skeleton variant="text" width={200} />
                )}
              </Box>
              <Box my={3}>
                {props.auth.user && props.auth.user.email ? (
                  <Fragment>
                    <TextField
                      onChange={handleChange}
                      variant="standard"
                      label="email"
                      name="email"
                      type="email"
                      defaultValue={props.auth.user.email}
                      value={values.email}
                      helperText={errors.email ? errors.email : null}
                      error={errors.email ? true : false}
                    />
                  </Fragment>
                ) : (
                  <Skeleton variant="text" width={200} />
                )}
              </Box>
              <Box my={3} position="relative">
                <TextField
                  onChange={handleChange}
                  variant="standard"
                  label="password"
                  name="password"
                  type={passwordType ? "password" : "text"}
                  value={values.password}
                  error={errors.password ? true : false}
                  helperText={errors.password ? errors.password : null}
                />
                <IconButton
                  style={{ position: "absolute", right: "0rem" }}
                  onClick={() => setPasswordType(!passwordType)}
                >
                  <RemoveRedEye />
                </IconButton>
              </Box>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={openModalEvt}
                  disabled={!isValid}
                  type="submit"
                  className={clsx("white-clr", darkPrimaryBtn)}
                >
                  update profile
                </Button>
              </Box>
            </form>
            {props.auth.user ? (
              <ConfirmPasswordComponent state={props} open={openUpdateModal}>
                <Button
                  onClick={closeModalEvt}
                  variant="outlined"
                  className={clsx(dangerButton)}
                >
                  close
                </Button>
              </ConfirmPasswordComponent>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const WithAppLayout = (props) => {
  return (
    <Layout>
      <Profile {...props} />
    </Layout>
  );
};

export default connect((state) => state)(
  Auth(WithAppLayout, ["owner", "admin"])
);
