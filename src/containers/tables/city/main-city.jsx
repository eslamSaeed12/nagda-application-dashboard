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
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  AccordionSummary,
  Accordion,
  Typography,
  AccordionDetails,
  Tooltip,
} from "@material-ui/core";
import { ExpandMore, Edit, Add } from "@material-ui/icons";
import Layout from "../../../wrappers/App-Layout";
import cityImg from "../../../static/images/undraw_Map_light_3hjy.svg";
import { DataManagerStarter } from "../../../components/data-manager-starter";
import cityServices from "../../../js/clients/city-services";
import { delete_city } from "../../../js/validators/city-validator";
import moment from "moment";
import { useHistory } from "react-router-dom";

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

const columnsCustomRender = (render, manage) => [
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
    title: "stations",
    field: "stations",
    render,
  },
  {
    title: "created since",
    field: "createdAt",
    readOnly: true,
  },
  {
    title: "manage",
    field: "manage",
    render: manage,
  },
];
const Table = (props) => {
  return <MaterialTable title="city table" {...props} />;
};

const CityGridTable = (props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleModelTrigger = () => setOpenModal(!openModal);
  const handleModalClose = () => setOpenModal(false);
  const [REQUEST_DONE, SET_REQUEST_DONE] = useState(false);
  const [REQUEST_FAIL, SET_REQUEST_FAIL] = useState(null);
  const [validationErrors, SetvalidationErrors] = useState(null);
  const [Cities, setCities] = useState([]);
  const [columns, setColumns] = useState([]);
  const { img, dangerButton } = styles();
  const router = useHistory();

  const editableFunctions = {
    // end add user
    onRowDelete: (oldData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const toBeDeleted = _.pull(oldData, ["_id"]);
          toBeDeleted.id = oldData._id;
          _.unset(toBeDeleted, "_id");
          delete_city
            .validate(toBeDeleted)
            .then((vdata) => {
              cityServices
                .delete({ body: { id: vdata.id } })
                .then((clientDt) => {
                  let data = [...Cities];
                  let index = oldData.tableData.id;
                  data.splice(index, 1);
                  setCities([...data]);
                })
                .catch((clientErr) => {
                  if (process.env.NODE_ENV === "development") {
                    console.error(clientErr);
                  }
                  const responseMsg =
                    clientErr.response && clientErr.response.data
                      ? clientErr.response.data.msg
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
            .catch((vErr) => {
              if (process.env.NODE_ENV === "development") {
                console.error(vErr);
              }
              SetvalidationErrors(vErr.message);
            });

          resolve();
        }, 1000);
      });
    },
  };
  useEffect(() => {
    const cols = columnsCustomRender(
      (rowdata) => {
        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>stations</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {rowdata.stations.map((dt, index) => {
                  return (
                    <ListItem key={`${index} + ${rowdata._id}`}>
                      <ListItemText>{dt}</ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      },
      (rowdata) => {
        return (
          <Tooltip title="Edit">
            <Fab
              color="primary"
              className={dangerButton}
              aria-label="edit"
              onClick={() => router.push(`/city/edit/${rowdata._id}`)}
            >
              <Edit className="white-clr" />
            </Fab>
          </Tooltip>
        );
      }
    );
    setColumns(cols);
    cityServices
      .getAll()
      .then((cityRsponse) => {
        const convertTimeToMomment = (data) => {
          return data.map((dt) => {
            return {
              ...dt,
              createdAt: moment(dt.createdAt).startOf("hour").fromNow(),
              updatedAt: moment(dt.updatedAt).startOf("hour").fromNow(),
              stations: dt.stations.map((st) => st.title),
            };
          });
        };
        setCities(convertTimeToMomment(cityRsponse.data.body));
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
                      <ListItemText style={{ color: "#d63031" }}>
                        {err}
                      </ListItemText>
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
            title="cities model management table"
            img={cityImg}
            imgClass={img}
          />
          <Box mt={4} display="flex" flexDirection="column">
            <Box textAlign="center" className="uppercase">
              <Typography variant="h6">add new city</Typography>
              <Tooltip title="new City">
                <Fab color="primary" onClick={() => router.push("/city/new")}>
                  <Add className="white-clr" />
                </Fab>
              </Tooltip>
            </Box>
            <Box maxWidth="100%" mt={4}>
              <Table
                editable={editableFunctions}
                isLoading={!REQUEST_DONE}
                data={Cities}
                columns={columns}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default connect((st) => st)(Auth(CityGridTable, ["owner", "admin"]));
