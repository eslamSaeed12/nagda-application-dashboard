import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Auth from "../../../wrappers/Auth-wrapper";
import * as _ from "lodash";
import Alerto from "../../../components/Snack-bar-custom";
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
import usersImg from "../../../static/images/undraw_people_tax5.svg";
import Instructions from "../../../components/instructions-list";
import { DataManagerStarter } from "../../../components/data-manager-starter";
import UserServices from "../../../js/clients/Users-services";
import {
  create_user,
  update_user,
} from "../../../js/validators/user-validtors";
import moment from "moment";
const Table = (props) => {
  const columns = [
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
  ];
  const [Dt, setData] = React.useState(props.data);

  return (
    <MaterialTable title="users table" columns={columns} data={Dt} {...props} />
  );
};

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
];

const UsersGridTable = (props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleModelTrigger = () => setOpenModal(!openModal);
  const handleModalClose = () => setOpenModal(false);
  const [REQUEST_DONE, SET_REQUEST_DONE] = useState(false);
  const [REQUEST_FAIL, SET_REQUEST_FAIL] = useState(null);
  const [validationErrors, SetvalidationErrors] = useState(null);
  const [Users, setUsers] = useState([]);

  const { img } = styles();

  const editableFunctions = {
    onRowAdd: (newData) => {
      return new Promise((resolve, reject) => {
        newData.password = newData.NewPassword;
        const omitted = _.pull(newData, ["username", "email", "password"]);
        _.unset(omitted, "NewPassword");
        setTimeout(() => {
          create_user
            .validate(omitted, {
              strict: false,
            })
            .then((vdata) => {
              UserServices.create({ body: { ...vdata } })
                .then((clientData) => {
                  const NewUserData = clientData.data.body;
                  setUsers([
                    ...Users,
                    {
                      ...NewUserData,
                      createdAt: moment(NewUserData.createdAt)
                        .startOf("hour")
                        .fromNow(),
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
          const id = oldData._id || "0";
          UserServices.delete({ body: { id } })
            .then((clientDt) => {
              let data = [...Users];
              let index = oldData.tableData.id;
              data.splice(index, 1);
              setUsers([...data]);
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
          update_user
            .validate({ ...omitted })
            .then((vdata) => {
              UserServices.update({
                body: { ...vdata },
              })
                .then((clientResponse) => {
                  let data = [...Users];
                  let index = oldData.tableData.id;
                  const updatedUser = clientResponse.data.body;
                  data[index] = updatedUser;
                  data[index].createdAt = moment(data[index].createdAt)
                    .startOf("hour")
                    .fromNow();
                  setUsers([...data]);
                })
                .catch((clientErr) => {
                  if (process.env.NODE_ENV === "development") {
                    console.error(clientErr);
                  }

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
              if (process.env.NODE_ENV === "development") {
                console.error(err);
              }
              SetvalidationErrors(err.errors);
            });
          resolve();
        }, 1000);
      });
    },
  };
  useEffect(() => {
    UserServices.getAll()
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
        const hidePasswords = (data) => {
          return data.map((dt) => {
            return {
              ...dt,
            };
          });
        };
        setUsers(hidePasswords(convertTimeToMomment(e.data.body)));
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
            title="users model management table"
            img={usersImg}
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
              title="users instructions"
              instructionsList={instructionsList}
            />
            <Box maxWidth="100%" mt={4}>
              <Table
                editable={editableFunctions}
                isLoading={!REQUEST_DONE}
                data={Users}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default connect((st) => st)(Auth(UsersGridTable, ["owner"]));
