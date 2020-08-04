import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Auth from "../../../wrappers/Auth-wrapper";
import * as _ from "lodash";
import { connect } from "react-redux";
import Alerto from "../../../components/Snack-bar-custom";
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
import questionImg from "../../../static/images/undraw_questions_75e0.svg";
import Instructions from "../../../components/instructions-list";
import { DataManagerStarter } from "../../../components/data-manager-starter";
import faqsServices from "../../../js/clients/Faqs-services";
import {
  create_faq,
  update_faq,
  delete_faq,
} from "../../../js/validators/faqs-validators";
import moment from "moment";
import faqs from "../../../js/forms/faqs";

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
      "should be a 30 - 255 length",
      "should not contain a spechials chars",
    ],
  },
  {
    title: "description",
    instructions: ["should be a 30 - 2000 length"],
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
      title: "description",
      field: "description",
    },
    {
      title: "created since",
      field: "createdAt",
      readOnly: true,
    },
  ];

  return <MaterialTable title="faqs table" columns={columns} {...props} />;
};

const FaqsGridTable = (props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleModelTrigger = () => setOpenModal(!openModal);
  const handleModalClose = () => setOpenModal(false);
  const [REQUEST_DONE, SET_REQUEST_DONE] = useState(false);
  const [REQUEST_FAIL, SET_REQUEST_FAIL] = useState(null);
  const [validationErrors, SetvalidationErrors] = useState(null);
  const [Faqs, setFaqs] = useState([]);

  const { img } = styles();

  const editableFunctions = {
    onRowAdd: (newData) => {
      return new Promise((resolve, reject) => {
        const omitted = _.pull(newData, ["title", "description"]);
        setTimeout(() => {
          create_faq
            .validate(omitted)
            .then((vdata) => {
              faqsServices
                .create({ body: { ...vdata } })
                .then((clientData) => {
                  const newFaqData = clientData.data.body;
                  setFaqs([
                    ...Faqs,
                    {
                      ...newFaqData,
                      createdAt: moment(newFaqData.createdAt)
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
          const toBeDeleted = _.pull(oldData, ["_id"]);
          toBeDeleted.id = oldData._id;
          _.unset(toBeDeleted, "_id");
          delete_faq
            .validate(toBeDeleted)
            .then((vdata) => {
              faqsServices
                .delete({ body: { id: vdata.id } })
                .then((clientDt) => {
                  let data = [...Faqs];
                  let index = oldData.tableData.id;
                  data.splice(index, 1);
                  setFaqs([...data]);
                })
                .catch((clientErr) => {
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
              SetvalidationErrors(vErr.errors);
            });

          resolve();
        }, 1000);
      });
    },
    // on delete user
    onRowUpdate: (newData, oldData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const omitted = _.omit(newData, ["createdAt", "updatedAt", "__v"]);
          omitted.id = newData._id;
          _.unset(omitted, "_id");
          update_faq
            .validate(omitted)
            .then((vdata) => {
              faqsServices
                .update({
                  body: vdata,
                })
                .then((clientResponse) => {
                  let data = [...Faqs];
                  let index = oldData.tableData.id;
                  const updatedFaq = clientResponse.data.body;
                  data[index] = updatedFaq;
                  data[index].createdAt = moment(data[index].createdAt)
                    .startOf("hour")
                    .fromNow();
                  setFaqs([...data]);
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
    faqsServices
      .getAll()
      .then((e) => {
        console.log(e.data.body);
        const convertTimeToMomment = (data) => {
          return data.map((dt) => {
            return {
              ...dt,
              createdAt: moment(dt.createdAt).startOf("hour").fromNow(),
              updatedAt: moment(dt.updatedAt).startOf("hour").fromNow(),
            };
          });
        };
        setFaqs(convertTimeToMomment(e.data.body));
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
            title="faqs model management table"
            img={questionImg}
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
              title="faqs instructions"
              instructionsList={instructionsList}
            />
            <Box maxWidth="100%" mt={4}>
              <Table
                editable={editableFunctions}
                isLoading={!REQUEST_DONE}
                data={Faqs}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default connect((st) => st)(Auth(FaqsGridTable, ["owner", "admin"]));
