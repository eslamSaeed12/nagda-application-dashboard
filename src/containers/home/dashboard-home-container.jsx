import React from "react";
import Layout from "../../wrappers/App-Layout";
import Auth from "../../wrappers/Auth-wrapper";
import { CircleBox } from "../../components/circle-box";
import { RoundedBox } from "../../components/rounded-box";
import {
  Error,
  Speed,
  Edit,
  Help,
  LocationOn,
  Policy,
  Lock,
  AccountBox,
  Feedback,
} from "@material-ui/icons";
import {
  Typography,
  Box,
  Container,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { DataUsage, MobileScreenShare } from "@material-ui/icons";
import { connect } from "react-redux";

const Circles = [
  {
    title: "errors",
    count: 0,
    icon: Error,
    color: "#E91E63",
  },
  {
    title: "web usage",
    count: 30,
    icon: DataUsage,
    color: "#3F51B5",
  },
  {
    title: "mobile usage",
    count: 5000,
    icon: MobileScreenShare,
    color: "#009688",
  },
  {
    title: "feedbacks",
    count: 5,
    icon: Feedback,
    color: "#03A9F4",
  },
];

const roundedBoxes = [
  {
    title: "admins",
    count: 2,
    icon: Edit,
    color: "#E91E63",
  },
  {
    title: "users",
    count: 2,
    icon: AccountBox,
    color: "#3F51B5",
  },
  {
    title: "roles",
    count: 3,
    icon: Lock,
    color: "#3F51B5",
  },
  {
    title: "faqs",
    count: 8,
    icon: Help,
    color: "#FFC107",
  },
  {
    title: "cities",
    count: 8,
    icon: LocationOn,
    color: "#607D8B",
  },
  {
    title: "stations",
    count: 20,
    icon: Policy,
    color: "#03A9F4",
  },
  {
    title: "http",
    count: 20000,
    icon: Speed,
    color: "#2d3436",
  },
];

const styles = makeStyles((df) => ({
  UsernameSpanColor: {
    color: df.palette.primary.light,
  },
  root: {
    backgroundColor: "#ffff",
    height: "100%",
  },
}));

const DashWelcomeHeader = (props) => {
  const { UsernameSpanColor } = styles();
  return (
    <Box py={4}>
      <Typography variant="h4" align="center">
        welcome back <span className={UsernameSpanColor}>islam</span>
      </Typography>
    </Box>
  );
};

const DashHome = (props) => {
  const { root } = styles();
  return (
    <Layout>
      <Box className={root}>
        <Container>
          <DashWelcomeHeader />
          <Box mt={2} py={2}>
            <Typography
              align="center"
              variant="h6"
              className="pop-Bold capitalize"
              style={{ marginBottom: "20px" }}
            >
              important to know statics
            </Typography>
            <Grid container justify="space-between">
              {Circles.map((c, ind) => {
                return (
                  <CircleBox
                    key={`list-key-item${ind}`}
                    title={c.title}
                    Icon={c.icon}
                    count={c.count}
                    color={c.color}
                    xs={2}
                  />
                );
              })}
            </Grid>
          </Box>
          <Box mt={2} py={2}>
            <Typography
              align="center"
              variant="h6"
              className="pop-Bold capitalize"
              style={{ marginBottom: "20px" }}
            >
              good to know statics
            </Typography>
            <Grid container direction="row">
              {roundedBoxes.map((c, ind) => {
                return (
                  <RoundedBox
                    key={`list-item-${ind}`}
                    title={c.title}
                    Icon={c.icon}
                    count={c.count}
                    color={c.color}
                    grid={{ xs: 3 }}
                  />
                );
              })}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default connect((state) => state)(Auth(DashHome));
