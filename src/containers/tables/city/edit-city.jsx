import React, { useEffect, useState } from "react";
import Auth from "../../../wrappers/Auth-wrapper";
import * as _ from "lodash";
import { connect } from "react-redux";
import clsx from "clsx";
import { useFormik } from "formik";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import Alerto from "../../../components/Snack-bar-custom";
import { withRouter, useHistory, Redirect } from "react-router-dom";
import Loader from "../../../components/loader";
import {
  Box,
  Container,
  makeStyles,
  Button,
  Grid,
  ListItemIcon,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Checkbox,
  IconButton,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import Layout from "../../../wrappers/App-Layout";
import cityServices from "../../../js/clients/city-services";
import stationServices from "../../../js/clients/stations-services";
import { update_city } from "../../../js/validators/city-validator";
import { errorCatcher } from "../../../js/utils/error-catcher";
const styles = makeStyles((df) => ({
  instructionsSection: {
    backgroundColor: df.palette.primary.dark,
    height: "100vh",
    boxShadow: df.shadows[8],
    "@media(max-width:960px)": {
      height: "auto",
    },
  },
  noVerticalPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  noVerticalMargin: {
    marginTop: 0,
    marginBottom: 0,
  },
  listFirst: {
    marginTop: df.spacing(4),
  },
  ContentSection: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
  textDanger: {
    color: df.palette.error.main,
  },
  dangerCheckBox: {
    color: df.palette.error.light,
    "&$checked": {
      color: df.palette.error.dark,
    },
  },
  dangerBtn: {
    backgroundColor: df.palette.error.light,
    "&:hover": {
      backgroundColor: df.palette.error.dark,
    },
  },
}));
const instructionsList = [
  {
    title: "title",
    instructions: [
      "should be a 6 - 50 length",
      "should not contain a spechials chars except hypens (-) ",
    ],
  },
  {
    title: "stations",
    instructions: [
      "not required",
      "should not add a station that exist in another city",
    ],
  },
];

const CityEditContainer = (props) => {
  const [loading, setLoading] = useState(true);
  const [stationsLoad, setStationsLoad] = useState(false);
  const [stations, setStations] = useState(null);
  const [selectedStations, setSelectedStations] = useState([]);
  const [clientReqErr, setClientReqErr] = useState(null);
  const [leftBoxSelected, setLeftBoxSelected] = useState([]);
  const [rightBoxSelected, setRightBoxSelected] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [validationErr, setValidationErr] = useState(null);
  const [city, setCity] = useState(null);
  const router = useHistory();
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isValid,
    isSubmitting,
    isValidating,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      stations: selectedStations,
      id: "",
    },
    validationSchema: update_city,
    onSubmit: (data) => {
      if (!isValidating && isSubmitting && isValid) {
        cityServices
          .update({ body: data })
          .then((cityClientRes) => {
            setSuccessAlert("city has been updated successfully");
          })
          .catch((cityClientErr) => {
            if (process.env.NODE_ENV === "development") {
              console.error(cityClientErr);
            }

            setValidationErr([errorCatcher(cityClientErr)]);
          });
      }
    },
  });
  const {
    instructionsSection,
    noVerticalMargin,
    noVerticalPadding,
    listFirst,
    ContentSection,
    textDanger,
    dangerCheckBox,
    dangerBtn,
  } = styles();

  useEffect(() => {
    stationServices
      .getAll()
      .then((stationClientRes) => {
        const stationsIdTitle = stationClientRes.data.body.map((st) => ({
          id: st._id,
          title: st.title,
        }));
        setStations(stationsIdTitle);
        setStationsLoad(true);
      })
      .catch((stationClientErr) => {
        setClientReqErr(stationClientErr.response.data.msg);
      });
  }, []);

  useEffect(() => {
    setFieldValue(
      "stations",
      selectedStations.map((st) => st.id),
      false
    );
  }, [selectedStations]);

  useEffect(() => {
    // validate the id param
    if (!props.match.params.id && String(props.match.params.id).length === 24) {
      router.push("/bad-request", { msg: "not valid city id" });
      return;
    }
    if (stationsLoad) {
      cityServices
        .find({ body: { id: props.match.params.id } })
        .then((clientRsponse) => {
          setCity(clientRsponse.data.body);
          setFieldValue("title", clientRsponse.data.body.title);
          setFieldValue("id", clientRsponse.data.body._id);
          const modifedSelectedStations = stations
            .filter((st) =>
              clientRsponse.data.body.stations.find((stp) => stp._id === st.id)
            )
            .map((stmp) => ({ id: stmp.id, title: stmp.title }));
          setSelectedStations(modifedSelectedStations);
          setLeftBoxSelected(modifedSelectedStations);
          setLoading(false);
        })
        .catch((clientErr) => {
          if (process.env.NODE_ENV === "development") {
            console.error(clientErr);
          }
          const msg = Boolean(clientErr.response.data)
            ? Array.isArray(clientErr.response.data.msg)
              ? clientErr.response.data.msg[0]
              : clientErr.response.data.msg
            : clientErr.message;
          router.push(`/bad-request/${msg}`);
        });
    }
  }, [stationsLoad]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout>
      <Grid container>
        {clientReqErr ? (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            position="fixed"
            style={{ zIndex: 5599, bottom: "1rem" }}
            width="100%"
          >
            <Alerto
              title="Network error"
              variant="filled"
              severity="error"
              content={clientReqErr}
              onClick={() => setSuccessAlert(null)}
            />
          </Box>
        ) : null}
        {successAlert ? (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            position="fixed"
            style={{ zIndex: 5599, bottom: "1rem" }}
            width="100%"
          >
            <Alerto
              title="validation success"
              variant="filled"
              severity="success"
              content={successAlert}
              onClick={() => setSuccessAlert(null)}
            />
          </Box>
        ) : null}
        {validationErr ? (
          <Dialog open={true}>
            <DialogTitle>validation error</DialogTitle>
            <DialogContent>
              <List>
                {validationErr.map((err, index) => {
                  return (
                    <ListItem key={`err-list-item-${err}-${index}`}>
                      <ListItemText className={textDanger}>{err}</ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="default"
                className={clsx(dangerBtn, "white-clr")}
                onClick={() => setValidationErr(null)}
              >
                close
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
        <Grid item md={3} xs={12}>
          <Box className={instructionsSection} py={4}>
            <Container>
              <Typography variant="h5" className="white-clr capitalize">
                please read the instruction before add data
              </Typography>
              <List className={clsx(noVerticalPadding, listFirst)}>
                {instructionsList.map((i, x) => {
                  return (
                    <ListItem
                      key={`instuction-list-item${x}`}
                      className={clsx(noVerticalPadding)}
                      style={{ flexDirection: "column", alignItems: "unset" }}
                    >
                      <ListItemText
                        className={clsx(noVerticalPadding, "white-clr")}
                        primary={i.title}
                        primaryTypographyProps={{
                          variant: "subtitle2",
                          className: "uppercase",
                        }}
                      />
                      <List className={noVerticalPadding}>
                        {i.instructions.map((st, x) => {
                          return (
                            <ListItem
                              key={`instruction-list-instance-list-item${x}`}
                              className={clsx(
                                noVerticalPadding,
                                noVerticalMargin
                              )}
                            >
                              <ListItemText
                                className={clsx(
                                  noVerticalPadding,
                                  noVerticalMargin,
                                  "white-clr"
                                )}
                                primary={st}
                                primaryTypographyProps={{
                                  variant: "caption",
                                }}
                              />
                            </ListItem>
                          );
                        })}
                      </List>
                    </ListItem>
                  );
                })}
              </List>
            </Container>
          </Box>
        </Grid>
        <Grid item md={9} xs={12}>
          <Container>
            <Box className={clsx(ContentSection)}>
              <Typography variant="h5" className="pop-Black capitalize">
                edit a city
              </Typography>
              <Box mt={4} width="95%">
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <Box>
                    <TextField
                      onChange={handleChange}
                      variant="filled"
                      label="Title"
                      name="title"
                      type="text"
                      value={values.title}
                      error={errors.title ? true : false}
                      helperText={errors.title ? errors.title : null}
                    />
                  </Box>
                  <Box mt={3}>
                    <Grid container>
                      <Grid item sm={5} xs={8}>
                        <Card elevation={4}>
                          <CardContent>
                            <Typography variant="h6">avaialable</Typography>
                            {stationsLoad ? (
                              <List>
                                {stations.map((st, index) => {
                                  return (
                                    <ListItem key={`${st.id}-station`}>
                                      <ListItemIcon>
                                        <FormControlLabel
                                          label={st.title}
                                          control={
                                            <Checkbox
                                              edge="start"
                                              color="primary"
                                              checked={Boolean(
                                                leftBoxSelected.find(
                                                  (stc) => stc.id === st.id
                                                )
                                              )}
                                              onChange={(ev) => {
                                                if (
                                                  !leftBoxSelected.find(
                                                    (stc) => stc.id === st.id
                                                  )
                                                ) {
                                                  setLeftBoxSelected([
                                                    ...leftBoxSelected,
                                                    st,
                                                  ]);
                                                }
                                                if (
                                                  leftBoxSelected.find(
                                                    (stc) => stc.id === st.id
                                                  )
                                                ) {
                                                  const leftBoxData = leftBoxSelected;
                                                  const theChecked = leftBoxData.findIndex(
                                                    (v) => v.id === st.id
                                                  );
                                                  leftBoxData.splice(
                                                    theChecked
                                                  );
                                                  setLeftBoxSelected([
                                                    ...leftBoxData,
                                                  ]);
                                                }
                                              }}
                                            />
                                          }
                                        />
                                      </ListItemIcon>
                                    </ListItem>
                                  );
                                })}
                              </List>
                            ) : null}
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box>
                          <IconButton
                            color="primary"
                            onClick={() => {
                              setSelectedStations([...leftBoxSelected]);
                            }}
                          >
                            <ArrowForward />
                          </IconButton>
                        </Box>
                        <Box>
                          <IconButton
                            color="default"
                            className={textDanger}
                            onClick={() => {
                              let selectedToSplice = selectedStations;
                              let diff = _.difference(
                                selectedToSplice,
                                rightBoxSelected
                              );
                              setSelectedStations([...diff]);
                              setRightBoxSelected([]);
                            }}
                          >
                            <ArrowBack />
                          </IconButton>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        sm={5}
                        xs={8}
                        key="right-section-box"
                        className="my-sm-4"
                      >
                        <Card elevation={4}>
                          <CardContent>
                            <Typography variant="h6" className="capitalize">
                              selected
                            </Typography>
                            {
                              <List>
                                {selectedStations.map((st) => {
                                  return (
                                    <ListItem key={st.title + st.index}>
                                      <ListItemIcon>
                                        <FormControlLabel
                                          label={st.title}
                                          control={
                                            <Checkbox
                                              color="default"
                                              className={dangerCheckBox}
                                              checked={
                                                rightBoxSelected.find(
                                                  (stc) => stc.id === st.id
                                                )
                                                  ? true
                                                  : false
                                              }
                                              onChange={() => {
                                                if (
                                                  !rightBoxSelected.find(
                                                    (stc) => stc.id === st.id
                                                  )
                                                ) {
                                                  setRightBoxSelected([
                                                    ...rightBoxSelected,
                                                    st,
                                                  ]);
                                                }
                                                if (
                                                  rightBoxSelected.find(
                                                    (stc) => stc.id === st.id
                                                  )
                                                ) {
                                                  const rightBoxData = rightBoxSelected;
                                                  const theChecked = rightBoxData.findIndex(
                                                    (v) => v.id === st.id
                                                  );
                                                  rightBoxData.splice(
                                                    theChecked
                                                  );
                                                  setRightBoxSelected([
                                                    ...rightBoxData,
                                                  ]);
                                                }
                                              }}
                                            />
                                          }
                                        />
                                      </ListItemIcon>
                                    </ListItem>
                                  );
                                })}
                              </List>
                            }
                          </CardContent>
                        </Card>

                        <input
                          type="hidden"
                          value={values.stations}
                          name="stations"
                          onChange={handleChange}
                        />
                        <input
                          type="hidden"
                          value={values.id}
                          name="id"
                          onChange={handleChange}
                        />
                        {errors.stations ? (
                          <Typography color="error">
                            {errors.stations}
                          </Typography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} style={{ marginTop: "12px" }}>
                        <Box>
                          <Button
                            disabled={!isValid}
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="white-clr"
                          >
                            submit
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </form>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default connect((st) => st)(
  Auth(withRouter(CityEditContainer), ["owner", "admin"])
);
