import React, { useEffect, useState } from "react";
import Auth from "../../../wrappers/Auth-wrapper";
import * as _ from "lodash";
import { connect } from "react-redux";
import MuiTable from "mui-datatables";
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
import serverImg from "../../../static/images/undraw_server_q2pb.svg";
import { DataManagerStarter } from "../../../components/data-manager-starter";
import logsServices from "../../../js/clients/logs-services";
import { deleteLog } from "../../../js/validators/logs-validator";
import Alerto from '../../../components/Snack-bar-custom';
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

const Table = (props) => {
  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        display: false,
      },
    },
    {
      name: "type",
      label: "type",
    },
    {
      name: "hostname",
      label: "hostname",
    },
    {
      name: "url",
      label: "url",
    },
    {
      name: "method",
      label: "method",
    },
    {
      name: "responseTime",
      label: "responseTime",
    },
    {
      name: "statusCode",
      label: "statusCode",
    },
    {
      name: "msg",
      label: "msg",
    },
  ];

  return <MuiTable title="logs table" columns={columns} {...props} />;
};
const FaqsGridTable = (props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleModelTrigger = () => setOpenModal(!openModal);
  const handleModalClose = () => setOpenModal(false);
  const [REQUEST_DONE, SET_REQUEST_DONE] = useState(false);
  const [REQUEST_FAIL, SET_REQUEST_FAIL] = useState(null);
  const [validationErrors, SetvalidationErrors] = useState(null);
  const [Logs, setLogs] = useState([]);

  const { img } = styles();

  const editableFunctions = {
    onRowsDelete: (param1, param2, param3) => {
      console.log(param1, param2, param3);
      const selector = Logs[param1.data[0].index];
      let status;
      deleteLog
        .validate({ id: selector.id })
        .then((vdata) => {
          logsServices
            .delete({ body: { id: vdata.id } })
            .then((clientResponse) => {
              // delete it from the data
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
              status = false;
            });
        })
        .catch((verr) => {
          if (process.env.NODE_ENV === "development") {
            console.error(verr);
          }
          status = false;
          SetvalidationErrors(verr.errors);
        });

      return status;
    },
  };
  useEffect(() => {
    logsServices
      .getAll()
      .then((clientLogs) => {
        const clientLogsHandeled = (data) =>
          data
            .filter((dt) => dt.level === 30)
            .map((log) => {
              return {
                type: "request",
                hostname: log.hostname,
                method: log.req.method,
                url: log.req.url,
                statusCode: log.res.statusCode,
                responseTime: log.responseTime,
                msg: log.msg,
                id: log.req.id,
              };
            });
        setLogs(clientLogsHandeled(clientLogs.data));
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
            title="logs model management table"
            img={serverImg}
            imgClass={img}
          />
          <Box mt={4} display="flex" flexDirection="column">
            <Box maxWidth="100%" mt={4}>
              <Table
                isLoading={!REQUEST_DONE}
                data={Logs}
                options={editableFunctions}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default connect((st) => st)(Auth(FaqsGridTable, ["owner", "admin"]));
