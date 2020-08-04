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
import adminImg from "../../../static/images/undraw_software_engineer_lvl5.svg";
import Instructions from "../../../components/instructions-list";
import { DataManagerStarter } from "../../../components/data-manager-starter";
import adminServices from "../../../js/clients/admin-services";
import roleServices from "../../../js/clients/roles-services";
import Alerto from '../../../components/Snack-bar-custom';
import {
  create_admin,
  delete_admin,
  update_admin,
} from "../../../js/validators/admin-validator";
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
    title: "username",
    instructions: [
      "should be a 6 - 16 length",
      "should not contain a spechials chars",
    ],
  },
  {
    title: "password",
    instructions: [
      "should be a 8 - 18 length",
      "should contain one uppercase letter at least",
      "should contain one lowercase letter at least",
      "should contain one spechial character at least",
    ],
  },
  {
    title: "email",
    instructions: [
      "should be a valid email to receive an email conirmation message",
    ],
  },
  {
    title: "role",
    instructions: ["must be one of [owner,admin,editor]"],
  },
];
const columnsAsFunction = (lookup) => [
  {
    title: "_id",
    field: "_id",
    hidden: true,
  },
  {
    title: "username",
    field: "username",
  },
  {
    title: "email",
    field: "email",
  },
  {
    title: "password",
    field: "NewPassword",
  },
  {
    title:"image link",
    field:"image_link"
  },
  {
    title: "OriginalPassword",
    field: "password",
    hidden: true,
    readOnly: true,
  },
  {
    title: "created since",
    field: "createdAt",
    readOnly: true,
  },
  {
    title: "role",
    field: "role",
    lookup,
  },
];

const Table = (props) => {
  return <MaterialTable title="admins table" {...props} />;
};

const FaqsGridTable = (props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleModelTrigger = () => setOpenModal(!openModal);
  const handleModalClose = () => setOpenModal(false);
  const [REQUEST_DONE, SET_REQUEST_DONE] = useState(false);
  const [REQUEST_FAIL, SET_REQUEST_FAIL] = useState(null);
  const [validationErrors, SetvalidationErrors] = useState(null);
  const [Admins, setAdmins] = useState([]);
  const [columns, setColumns] = useState([]);

  const { img } = styles();

  const editableFunctions = {
    onRowAdd: (newData) => {
      return new Promise((resolve, reject) => {
        newData.password = newData.NewPassword;
        const omitted = _.pull(newData, [
          "username",
          "email",
          "password",
          "role",
          "image_link"
        ]);
        _.unset(omitted, "NewPassword");

        setTimeout(() => {
          create_admin
            .validate(omitted)
            .then((vdata) => {
              adminServices
                .create({ body: { ...vdata } })
                .then((clientData) => {
                  const newAdminData = clientData.data.body;
                  setAdmins([
                    ...Admins,
                    {
                      ...newAdminData,
                      createdAt: moment(newAdminData.createdAt)
                        .startOf("hour")
                        .fromNow(),
                      role: newAdminData.role._id,
                    },
                  ]);
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
            .catch((err) => {
              if (process.env.NODE_ENV === "development") {
                console.error(err);
              }
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
          delete_admin
            .validate(toBeDeleted)
            .then((vdata) => {
              adminServices
                .delete({ body: { id: vdata.id } })
                .then((clientDt) => {
                  let data = [...Admins];
                  let index = oldData.tableData.id;
                  data.splice(index, 1);
                  setAdmins([...data]);
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
    // on delete user
    onRowUpdate: (newData, oldData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (newData.NewPassword) {
            newData.password = newData.NewPassword;
          }
          const omitted = _.omit(newData, [
            "NewPassword",
            "createdAt",
            "updatedAt",
            "__v",
          ]);
          omitted.id = newData._id;
          _.unset(omitted, "_id");
          if (oldData.password === omitted.password) {
            _.unset(omitted, "password");
          }
          update_admin
            .validate(omitted)
            .then((vdata) => {
              adminServices
                .update({
                  body: vdata,
                })
                .then((clientResponse) => {
                  let data = [...Admins];
                  let index = oldData.tableData.id;
                  const updatedAdmin = clientResponse.data.body;
                  data[index] = updatedAdmin;
                  data[index].createdAt = moment(data[index].createdAt)
                    .startOf("hour")
                    .fromNow();
                  data[index].role = updatedAdmin.role._id;
                  setAdmins([...data]);
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
            .catch((err) => {
              SetvalidationErrors(err.errors);
              if (process.env.NODE_ENV === "development") {
                console.error(err);
              }
            });
          resolve();
        }, 1000);
      });
    },
  };
  useEffect(() => {
    adminServices
      .getAll()
      .then((adminResponse) => {
        roleServices
          .getAll()
          .then((roleResponse) => {
            const roles = roleResponse.data.body;
            const rolesAsLookup = {};

            roles.forEach((role) => {
              rolesAsLookup[role._id] = role.title;
            });
            setColumns(columnsAsFunction(rolesAsLookup));
            const convertTimeToMomment = (data) => {
              return data.map((dt) => {
                return {
                  ...dt,
                  createdAt: moment(dt.createdAt).startOf("hour").fromNow(),
                  updatedAt: moment(dt.updatedAt).startOf("hour").fromNow(),
                };
              });
            };
            const hidePasswords = (data) => {
              return data.map((dt) => {
                return {
                  ...dt,
                };
              });
            };
            const roleToRoleId = (data) => {
              return data.map((dt) => {
                return {
                  ...dt,
                  role: dt.role._id,
                };
              });
            };
            setAdmins(
              roleToRoleId(
                hidePasswords(convertTimeToMomment(adminResponse.data.body))
              )
            );
            SET_REQUEST_DONE(true);
          })
          .catch((rolesClientErr) => {
            SET_REQUEST_FAIL(rolesClientErr.message);
            SET_REQUEST_DONE(true);
            if (process.env.NODE_ENV === "development") {
              console.error(rolesClientErr);
            }
          });
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
      {REQUEST_FAIL ? (
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
              content={REQUEST_FAIL}
              onClick={() => SET_REQUEST_FAIL(null)}
            />
          </Box>
        ) : null}
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
            title="admin model management table"
            img={adminImg}
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
              title="roles instructions"
              instructionsList={instructionsList}
            />
            <Box maxWidth="100%" mt={4}>
              <Table
                editable={editableFunctions}
                isLoading={!REQUEST_DONE}
                data={Admins}
                columns={columns}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default connect((st) => st)(Auth(FaqsGridTable, ["owner"]));
