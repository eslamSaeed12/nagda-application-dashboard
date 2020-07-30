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
import { connect } from "react-redux";

import { indexEvents } from "../../store/actions/pages";

import SnackErr from "../../components/Snack-bar-custom";

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
      {props.isUserLoad ? (
        <Typography variant="h4" align="center">
          welcome back
          <span className={UsernameSpanColor}> {props.username} </span>
        </Typography>
      ) : (
        <Skeleton variant="text" width={200} style={{ margin: "0 auto" }} />
      )}
    </Box>
  );
};

const DashHome = (props) => {
  const [circlesEntites, setCirclesEntites] = useState(null);
  const [circlesEntitesLoad, setCirclesEntitesLoad] = useState(false);
  const [roundedEntities, setRoundedEntities] = useState(null);
  const [roundedEntitiesLoad, setRoundedEntitiesLoad] = useState(false);
  const [ERR, SET_ERR] = useState(null);

  useEffect(() => {
    if (props.auth.user) {
      props.dispatch(indexEvents.ENTITIES_COUNTS_FN());
    }
  }, [props.auth.user]);

  useEffect(() => {
    if (props.index.entites) {
      const CirclesKeys = ["ERORRS", "FEEDBACKS", "HTTPS"];
      const circlesIcons = [
        { name: "ERORRS", icon: Error },
        { name: "FEEDBACKS", icon: Feedback },
        { name: "HTTPS", icon: Speed },
      ];
      const roundedKeys = [
        "USERS",
        "ADMINS",
        "ROLES",
        "FAQS",
        "CITIES",
        "STATIONS",
      ];
      const roundedIcons = [
        { name: "USERS", icon: AccountBalance },
        { name: "ADMINS", icon: Edit },
        { name: "ROLES", icon: Lock },
        { name: "FAQS", icon: Help },
        { name: "CITIES", icon: LocationOn },
        { name: "STATIONS", icon: Policy },
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

  useEffect(() => {
    if (props.index.entitesLoad && props.index.entitesFail) {
      SET_ERR(props.indexEvents.entitesFail);
    }
  }, [props.index.entitesFail]);

  const { root } = styles();
  return (
    <Layout>
      {Boolean(ERR) ? (
        <SnackErr title={ERR} variant="filled" severity="error" />
      ) : null}
      <Box className={root}>
        <Container>
          <DashWelcomeHeader
            isUserLoad={props.auth.jwtCheckerLoad}
            username={props.auth.user.username}
          />
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
                    <Grid item xs={3} key={`skeleton-circle-loader-key${i}`}>
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

export default connect((state) => state)(Auth(DashHome, ["owner", "admin"]));
