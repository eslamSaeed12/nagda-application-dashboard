import React, { useEffect, useState } from "react";
import LoginFormSchema from "../../js/validators/login-form";
import AuthClient from "../../js/clients/Auth-Services";
import AuthForms from "../../js/forms/Auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { connect } from "react-redux";
import Alerto from "../../components/Snack-bar-custom";
import { authEvents } from "../../store/actions/pages";
import { useHistory } from "react-router-dom";
import { commonly } from "../../store/actions/pages";
import Loader from "../../components/loader";
import { errorCatcher } from "../../js/utils/error-catcher.js";
import { ClipLoader } from "react-spinners";
import {
  makeStyles,
  Box,
  Typography,
  Button,
  Container,
  FormHelperText,
  Grid,
  TextField,
  Chip,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";
import AppMockup from "../../static/images/Group 2 copy 2.svg";
import clsx from "clsx";
import { RemoveRedEye } from "@material-ui/icons";
const styles = makeStyles((df) => ({
  root: {
    backgroundColor: "#ffff",
    height: "100vh",
  },
  mookUpWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
    alignContent: "center",
    backgroundColor: df.palette.primary.main,
    boxShadow: df.shadows[10],
  },
  imgWrapper: {
    alignSelf: "center",
    width: "100%",
    padding: "0 12px",
  },
  paddingVertical: {
    padding: df.spacing(2),
  },
}));

const Login = (props) => {
  const router = useHistory();
  const [loading, setLoading] = useState(true);
  const { root, mookUpWrapper, imgWrapper, paddingVertical } = styles();
  const [Err, setErr] = useState(null);
  const [AuthLoading, setAuthLoading] = useState(false);
  const [passwordType, setPasswordType] = useState(true);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(LoginFormSchema),
  });

  const formSignIn = async (data) => {
    try {
      setAuthLoading(true);
      const loginClientResult = await AuthClient.login({
        ...data,
        ...AuthForms.Login,
      });

      const dispatcher = props.dispatch;

      dispatcher(authEvents.AUTH_TRUSY(true));
      dispatcher(authEvents.AUTH_USER(loginClientResult.data.user));
      setAuthLoading(false);
      router.push("/home");
      return;
    } catch (err) {
      const msg = errorCatcher(err);
      setErr(msg);
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    props.dispatch(commonly.CHECK_JWT_TOKEN_FN());
  }, []);

  useEffect(() => {
    if (props.auth.jwtCheckerLoad && props.auth.user) {
      router.push("/home");
    }

    if (!props.auth.user && props.jwtCheckerLoad === null) {
      setLoading(false);
    }
  }, [props.auth]);

  useEffect(() => {
    if (props.auth.jwtCheckerFail) {
      setLoading(false);
    }
  }, [props.auth.jwtCheckerFail]);

  if (loading) return <Loader />;
  return (
    <Box className={clsx(root)}>
      {Boolean(Err) ? (
        <Box
          style={{
            position: "fixed",
            bottom: "0.5rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Alerto
            title={Err}
            variant="filled"
            severity="error"
            shadows={12}
            onClick={() => setErr(null)}
            style={{ alignItems: "flex-start" }}
          />
        </Box>
      ) : null}
      <Grid container>
        <Grid md={8} sm={6} xs={12} item className={mookUpWrapper}>
          <img src={AppMockup} className={imgWrapper} />
          <Container>
            <Typography align="center" className="white-clr" component="div">
              nagdaa project for getting the best route and clossest police
              station by geolocation with closest facility algorithm and best
              route created by <Chip label="think first team" /> , started in
              2019
            </Typography>
            <Typography
              className="white-clr"
              variant="caption"
              align="center"
              style={{ display: "block", marginTop: "12px" }}
            >
              all copy rights reserved to{" "}
              <Chip label="think first" size="small" /> faculty of arts gis
              department - zagazig university
            </Typography>
          </Container>
        </Grid>
        <Grid md={4} sm={6} xs={12} item>
          <Box py={4}>
            <Container>
              <Box mt={4}>
                <Typography variant="h4" color="primary" className="capitalize">
                  Hello!
                </Typography>
                <Typography variant="h6" className="pop-Bold" color="primary">
                  we hope you are in good mode!
                </Typography>
              </Box>
              <Box mt={8}>
                <Typography align="center" variant="h6">
                  Login your account
                </Typography>
                <form
                  onSubmit={handleSubmit(formSignIn)}
                  noValidate
                  autoComplete="off"
                >
                  <Box width="80%" mx="auto" px={2} mt={3}>
                    <Box mb={3} mx="auto">
                      <TextField
                        inputRef={register}
                        fullWidth
                        type="text"
                        variant="standard"
                        label="username"
                        name="username"
                        error={errors.username ? true : false}
                        helperText={
                          errors.username ? errors.username.message : null
                        }
                      />
                    </Box>
                    <Box my={4} mx="auto" position="realtive">
                      <TextField
                        inputRef={register}
                        fullWidth
                        type={passwordType ? "password" : "text"}
                        variant="standard"
                        label="password"
                        name="password"
                        error={errors.password ? true : false}
                        helperText={
                          errors.password ? errors.password.message : null
                        }
                      />
                      <IconButton
                        style={{ position: "absolute", right: "4.5rem" }}
                        onClick={() => setPasswordType(!passwordType)}
                      >
                        <RemoveRedEye />
                      </IconButton>
                    </Box>

                    <Box my={3} mx="auto">
                      <FormControlLabel
                        control={
                          <Checkbox
                            inputRef={register}
                            label="rememberMe"
                            name="rememberMe"
                            color="primary"
                          />
                        }
                        label="remember me"
                        name="rememberMe"
                      />
                      {errors.rememberMe ? (
                        <FormHelperText variant="filled" error={true}>
                          {errors.rememberMe.message}
                        </FormHelperText>
                      ) : null}
                    </Box>

                    <Box my={3} mx="auto">
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        style={{
                          width: "80%",
                          margin: "0 auto",
                          display: "block",
                        }}
                        className={clsx("white-clr", paddingVertical)}
                      >
                        {AuthLoading ? <ClipLoader /> : "login"}
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Box>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default connect((state) => state)(Login);
