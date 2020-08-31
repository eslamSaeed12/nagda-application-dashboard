import React, { useState } from "react";
import {
  Box,
  makeStyles,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Popover,
} from "@material-ui/core";
import Auth from "../../wrappers/Auth-wrapper";
import AppLayout from "../../wrappers/App-Layout";
import { connect } from "react-redux";
import settingsImage from "../../static/images/undraw_personal_settings_kihd.svg";
import { Speed } from "@material-ui/icons";
import logsServices from "../../js/clients/logs-services";
import { errorCatcher } from "../../js/utils/error-catcher";
import SnackBarAlert from "../../components/Snack-bar-custom";
const styles = makeStyles({
  image: {
    maxWidth: "40%",
  },
  centeredGrid: {
    "@media(max-width:600px)": {
      margin: "0 auto",
    },
  },
});

const Settings = (props) => {
  const [resetLogsConfirmation, setResetLogsConfirmation] = useState(false);
  const [clientERR, setClientERR] = useState(null);
  const [clientSuccess, setClientSuccess] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const resetLogsPopOverConf = {
    handleClick: (ev) => {
      setAnchorEl(ev.currentTarget);
    },
    handleClose: () => setAnchorEl(null),
    id: resetLogsConfirmation ? "reset-logs-popover" : undefined,
  };

  const resetLogsAsync = async () => {
    try {
      await logsServices.reset();
      setClientSuccess("logs has been reseted successfully");
    } catch (logsClientERR) {
      setClientERR(errorCatcher(logsClientERR));
    }
  };

  const clases = styles();
  return (
    <AppLayout>
      <Box
        display="flex"
        position="fixed"
        bottom={"0.5rem"}
        justifyContent="center"
        width="100%"
      >
        {clientERR || clientSuccess ? (
          <SnackBarAlert
            variant="filled"
            severity={clientERR ? "error" : "success"}
            title={clientERR ? "error" : "success"}
            content={clientERR ? clientERR : clientSuccess}
            onClick={() => {
              setClientERR(null);
              setClientSuccess(null);
            }}
          />
        ) : null}
      </Box>
      <Box py={4}>
        <Typography variant="h3" align="center">
          website settings
        </Typography>
        <Box textAlign="center">
          <img src={settingsImage} className={clases.image} />
        </Box>
        <Container style={{ marginTop: "12px" }}>
          <Grid container>
            <Grid item md={4} sm={6} xs={8} className={clases.centeredGrid}>
              <Paper style={{ width: "80%", margin: "0 auto" }} elevation={8}>
                <Box py={3} px={2} textAlign="center">
                  <Typography>Reset logs</Typography>
                  <Box>
                    <Speed fontSize="large" />
                  </Box>
                  <Button
                    aria-describedby={resetLogsPopOverConf.id}
                    variant="contained"
                    color="primary"
                    className="white-clr"
                    onClick={(ev) => {
                      setResetLogsConfirmation(!resetLogsConfirmation);
                      resetLogsPopOverConf.handleClick(ev);
                    }}
                  >
                    Reset
                  </Button>
                  <Popover
                    open={anchorEl}
                    id={resetLogsPopOverConf.id}
                    anchorEl={anchorEl}
                    onClose={resetLogsPopOverConf.handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <Box py={3} px={3}>
                      <Typography>
                        are you sure you want to reset logs ?
                      </Typography>
                      <Button
                        onClick={resetLogsAsync}
                        color="primary"
                        variant="contained"
                        style={{ marginTop: "8px" }}
                        className="white-clr"
                      >
                        sure
                      </Button>
                      <Button
                        onClick={() => setResetLogsConfirmation(false)}
                        variant="outlined"
                        color="primary"
                        style={{ marginTop: "8px", marginLeft: "8px" }}
                      >
                        close
                      </Button>
                    </Box>
                  </Popover>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppLayout>
  );
};

export default connect((st) => st)(Auth(Settings, ["owner"]));
