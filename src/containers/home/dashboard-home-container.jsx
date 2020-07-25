import React, { useEffect, useState } from "react";
import Layout from "../../wrappers/App-Layout";
import Auth from "../../wrappers/Auth-wrapper";
import { CircleBox } from "../../components/circle-box";
import { RoundedBox } from "../../components/rounded-box";
import { Skeleton } from "@material-ui/lab";
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
  AccountBalance,
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
import { indexEvents } from "../../store/actions/pages";

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
  const [circlesEntites, setCirclesEntites] = useState(null);
  const [circlesEntitesLoad, setCirclesEntitesLoad] = useState(false);
  const [roundedEntities, setRoundedEntities] = useState(null);
  const [roundedEntitiesLoad, setRoundedEntitiesLoad] = useState(false);
  useEffect(() => {
    if ((props.auth.authenticated, props.auth.META_JWT_KEY)) {
      props.dispatch(indexEvents.ENTITIES_COUNTS_FN(props.auth.META_JWT_KEY));
    }
  }, [props.auth.META_JWT_KEY]);
  useEffect(() => {
    if (props.index.entites) {
      const CirclesKeys = ["ERORRS", "FEEDBACKS"];
      const circlesIcons = [
        { name: "ERORRS", icon: Error },
        { name: "FEEDBACKS", icon: Feedback },
      ];
      const roundedKeys = [
        "USERS",
        "ADMINS",
        "ROLES",
        "FAQS",
        "CITIES",
        "STATIONS",
        "HTTPS",
      ];
      const roundedIcons = [
        { name: "USERS", icon: AccountBalance },
        { name: "ADMINS", icon: Edit },
        { name: "ROLES", icon: Lock },
        { name: "FAQS", icon: Help },
        { name: "CITIES", icon: LocationOn },
        { name: "STATIONS", icon: Policy },
        { name: "HTTPS", icon: Speed },
      ];
      if (props.index.entitesLoad && props.index.entites) {
        const circlesEntitesMapped = props.index.entites
          .filter((c) => CirclesKeys.includes(c.name))
          .map((c) => {
            return {
              ...c,
              icon: circlesIcons.find((i) => i.name === c.name).icon,
              color: "#03A9F4",
            };
          });
        setCirclesEntites(circlesEntitesMapped);
        setCirclesEntitesLoad(true);

        const roundedEntitesMapped = props.index.entites
          .filter((r) => roundedKeys.includes(r.name))
          .map((r) => {
            return {
              ...r,
              icon: roundedIcons.find((i) => i.name === r.name).icon,
              color: "#3F51B5",
            };
          });
        setRoundedEntities(roundedEntitesMapped);
        setRoundedEntitiesLoad(true);
      }
    }
  }, [props.index]);
  //useEffect(() => {}, [props]);
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
              {circlesEntitesLoad
                ? circlesEntites.map((c, ind) => {
                    return (
                      <CircleBox
                        key={`list-key-item${ind}`}
                        title={c.name}
                        Icon={c.icon}
                        count={c.count}
                        color={c.color}
                        xs={2}
                      />
                    );
                  })
                : [0, 1, 2, 3].map((i) => (
                    <Grid item xs={3}>
                      <Skeleton
                        key={`key-of-skeletor-${i}`}
                        variant="circle"
                        height={200}
                        width={"80%"}
                      />
                    </Grid>
                  ))}
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
              {roundedEntitiesLoad
                ? roundedEntities.map((c, ind) => {
                    return (
                      <RoundedBox
                        key={`list-item-${ind}`}
                        title={c.name}
                        Icon={c.icon}
                        count={c.count}
                        color={c.color}
                        grid={{ xs: 3 }}
                      />
                    );
                  })
                : [0, 1, 2, 4, 5, 6, 7, 8].map((rb) => (
                    <Grid
                      item
                      xs={3}
                      key={`skeleton-round-key${rb}`}
                      style={{ marginTop: "12px" }}
                    >
                      <Skeleton variant="rect" height={100} width="80%" />
                    </Grid>
                  ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default connect((state) => state)(Auth(DashHome));
