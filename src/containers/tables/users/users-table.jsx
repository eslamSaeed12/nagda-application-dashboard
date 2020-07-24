import React from "react";
import MaterialTable from "material-table";
import Auth from "../../../wrappers/Auth-wrapper";

import { connect } from "react-redux";
import { Box, Container, makeStyles, Button } from "@material-ui/core";
import Layout from "../../../wrappers/App-Layout";
import usersImg from "../../../static/images/undraw_people_tax5.svg";
import Instructions from "../../../components/instructions-list";
import { DataManagerStarter } from "../../../components/data-manager-starter";
const Table = (props) => {
  const columns = [
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
      field: "password",
    },
  ];
  const data = [
    {
      username: "islam saeed",
      email: "islam.s.mhmd1998@gmail.com",
      password: "qkerlqeklrkqerk",
    },
    {
      username: "eman ayman",
      email: "eman.ayman@gmail.com",
      password: "qkerlqeklrkqerk",
    },
  ];

  const [Dt, setData] = React.useState(data);

  const editableFunctions = {
    onRowAdd: (newdata) => {
      return new Promise((resolve, reject) => {
        setData([...Dt, newdata]);
        resolve();
      });
    },
    onRowUpdate: (newdata, oldData) => {
      return new Promise((resolve, reject) => {
        const dataItSelf = [...Dt];
        const indexOfUpdated = oldData.tableData.id;
        dataItSelf[indexOfUpdated] = newdata;
        setData([...dataItSelf]);
        resolve();
      });
    },
    onRowDelete: (deletedData) => {
      return new Promise((resolve, reject) => {
        const dataOFtable = [...Dt];
        const index = deletedData.tableData.id;
        dataOFtable.splice(index, 1);
        setData([...dataOFtable]);
        resolve();
      });
    },
  };

  return (
    <MaterialTable
      title="users table"
      editable={editableFunctions}
      columns={columns}
      data={Dt}
    />
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
];

const UsersGridTable = (props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleModelTrigger = () => setOpenModal(!openModal);
  const handleModalClose = () => setOpenModal(false);
  const { img } = styles();
  return (
    <Layout>
      <Container>
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
              <Table />
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default connect((st) => st)(Auth(UsersGridTable));
