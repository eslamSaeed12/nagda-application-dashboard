import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Auth from "../../../wrappers/Auth-wrapper";
import * as _ from "lodash";
import { connect } from "react-redux";
import {
  Box,
  Container,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import Layout from "../../../wrappers/App-Layout";
import policeLocationImg from "../../../static/images/undraw_Map_dark_k9pw.svg";
import Instructions from "../../../components/instructions-list";
import { DataManagerStarter } from "../../../components/data-manager-starter";
import stationServices from "../../../js/clients/stations-services";
import {
  create_station,
  delete_station,
  update_station,
} from "../../../js/validators/stations-validator";
import moment from "moment";

const styles = makeStyles((df) => ({
  img: {
    width: "40%",
  },
  noVerticalPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  noVerticalMargin: {
    marginTop: 0,
    marginBottom: 0,
  },
  dangerButton: {
    backgroundColor: df.palette.error.main,
    "&:hover": {
      backgroundColor: df.palette.error.dark,
    },
  },
}));

const instructionsList = [
  {
    title: "title",
    instructions: [
      "should be a 8 - 50 length",
      "should not contain a spechials chars",
      "should not contain a numbers",
    ],
  },
  {
    title: "coordinates",
    instructions: [
      "should contain the lat and lon separated by comma -> (,)",
      "every coodrdinate from lat and lon should be valid coordinate which mean a valid float number",
      "example :  32.321 , 36.126",
    ],
  },
];

const Table = (props) => {
  const columns = [
    {
      title: "_id",
      field: "_id",
      hidden: true,
    },
    {
      title: "title",
      field: "title",
    },
    {
      title: "coordinates",
      field: "coordinates",
    },
    {
      title: "created since",
      field: "createdAt",
      readOnly: true,
    },
  ];

  return <MaterialTable title="roles table" columns={columns} {...props} />;
};

const StationsGridTable = (props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleModelTrigger = () => setOpenModal(!openModal);
  const handleModalClose = () => setOpenModal(false);
  const [REQUEST_DONE, SET_REQUEST_DONE] = useState(false);
  const [REQUEST_FAIL, SET_REQUEST_FAIL] = useState(null);
  const [validationErrors, SetvalidationErrors] = useState(null);
  const [Stations, SetStations] = useState([]);

  const { img } = styles();

  const editableFunctions = {
    onRowAdd: (newData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const omitted = _.pull(newData, ["title", "coordinates"]);
          const fullified = {
            title: omitted.title,
            location: {
              type: "Point",
              coordinates: omitted.coordinates.split(","),
            },
          };
          create_station
            .validate(fullified)
            .then((vdata) => {
              stationServices
                .create({ body: { ...vdata } })
                .then((clientData) => {
                  const newFaqData = clientData.data.body;
                  SetStations([
                    ...Stations,
                    {
                      ...newFaqData,
                      createdAt: moment(newFaqData.createdAt)
                        .startOf("hour")
                        .fromNow(),
                      coordinates: newFaqData.location.coordinates,
                    },
                  ]);
                })
                .catch((clientErr) => {
                  SetvalidationErrors([
                    JSON.parse(clientErr.request.response).msg,
                  ]);
                });
            })
            .catch((err) => {
              SetvalidationErrors(err.errors);
            });

          resolve();
        }, 1000);
      });
    },
    // end add user
    onRowDelete: (oldData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const toBeDeleted = _.pull(oldData, ["_id"]);
          toBeDeleted.id = oldData._id;
          _.unset(toBeDeleted, "_id");
          delete_station
            .validate(toBeDeleted)
            .then((vdata) => {
              stationServices
                .delete({ body: { id: vdata.id } })
                .then((clientDt) => {
                  let data = [...Stations];
                  let index = oldData.tableData.id;
                  data.splice(index, 1);
                  SetStations([...data]);
                })
                .catch((clientErr) => {
                  SetvalidationErrors([
                    JSON.parse(clientErr.request.response).msg,
                  ]);
                });
            })
            .catch((vErr) => {
              SetvalidationErrors(vErr);
            });

          resolve();
        }, 1000);
      });
    },
    // on delete user
    onRowUpdate: (newData, oldData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!newData.coordinates) {
            newData.coordinates = oldData.coordinates;
          }
          const omitted = _.omit(newData, ["createdAt", "updatedAt", "__v"]);
          omitted.id = newData._id;
          _.unset(omitted, "_id");
          console.log(omitted);
          const fullifed = {
            title: omitted.title,
            location: {
              coordinates: Array.isArray(omitted.coordinates)
                ? omitted.coordinates
                : omitted.coordinates.split(","),
              type: "Point",
            },
            id: omitted.id,
          };
          console.log(fullifed, "fullfiled");
          update_station
            .validate(fullifed)
            .then((vdata) => {
              stationServices
                .update({
                  body: vdata,
                })
                .then((clientResponse) => {
                  let data = [...Stations];
                  let index = oldData.tableData.id;
                  const updatedFaq = clientResponse.data.body;
                  data[index] = updatedFaq;
                  data[index].createdAt = moment(data[index].createdAt)
                    .startOf("hour")
                    .fromNow();
                  data[index].coordinates =
                    clientResponse.data.body.location.coordinates;
                  SetStations([...data]);
                })
                .catch((clientErr) => {
                  const responseMsg =
                    clientErr.response && clientErr.response.msg
                      ? clientErr.response.msg
                      : null;
                  const requestMsg =
                    clientErr.request && clientErr.request.response
                      ? JSON.parse(clientErr.request.response).msg
                      : null;
                  SetvalidationErrors([
                    responseMsg ? responseMsg : requestMsg || clientErr.message,
                  ]);
                });
            })
            .catch((err) => {
              SetvalidationErrors(err.errors);
            });
          resolve();
        }, 1000);
      });
    },
  };
  useEffect(() => {
    stationServices
      .getAll()
      .then((e) => {
        const convertTimeToMomment = (data) => {
          return data.map((dt) => {
            return {
              ...dt,
              createdAt: moment(dt.createdAt).startOf("hour").fromNow(),
              updatedAt: moment(dt.updatedAt).startOf("hour").fromNow(),
            };
          });
        };
        const flattenCoordinates = (data) => {
          return data.map((dt) => {
            return {
              _id: dt._id,
              title: dt.title,
              coordinates: dt.location.coordinates,
              createdAt: dt.createdAt,
              updatedAt: dt.updatedAt,
            };
          });
        };
        SetStations(flattenCoordinates(convertTimeToMomment(e.data.body)));
        SET_REQUEST_DONE(true);
      })
      .catch((err) => {
        SET_REQUEST_FAIL(err.message);
        SET_REQUEST_DONE(true);
        if (process.env.NODE_ENV === "development") {
          console.error(err);
        }
      });
  }, []);

  return (
    <Layout>
      <Container>
        {validationErrors ? (
          <Dialog open={true}>
            <DialogTitle>validation error</DialogTitle>
            <DialogContent>
              <List>
                {validationErrors.map((err, index) => {
                  return (
                    <ListItem
                      key={`list-item-err-${index + Math.random() * 1000}`}
                    >
                      <ListItemText color={"#d63031"}>{err}</ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                className="white-clr"
                variant="contained"
                onClick={() => SetvalidationErrors(null)}
              >
                close
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
        <Box py={4}>
          <DataManagerStarter
            title="stations model management table"
            img={policeLocationImg}
            imgClass={img}
          />
          <Box mt={4} display="flex" flexDirection="column">
            <Button
              onClick={handleModelTrigger}
              variant="contained"
              size="large"
              className="white-clr"
              color="primary"
              style={{ alignSelf: "center" }}
            >
              instructions
            </Button>
            <Instructions
              open={openModal}
              onClose={handleModalClose}
              title="stations instructions"
              instructionsList={instructionsList}
            />
            <Box maxWidth="100%" mt={4}>
              <Table
                editable={editableFunctions}
                isLoading={!REQUEST_DONE}
                data={Stations}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default connect((st) => st)(Auth(StationsGridTable, ["owner", "admin"]));
