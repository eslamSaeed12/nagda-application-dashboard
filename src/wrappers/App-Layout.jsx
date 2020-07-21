import React from "react";
import { makeStyles, Box, Typography, Button } from "@material-ui/core";
import avatartImg from "../static/images/ai-user.jpg";
import {
  Menu,
  Settings,
  Home,
  AccountBalance,
  Lock,
  Edit,
  LocationOn,
  Help,
  Speed,
  Warning,
  Policy,
} from "@material-ui/icons";
const { useEffect, useState } = React;

const siteNavigation = [
  {
    href: "/home",
    icon: Home,
    title: "Home",
  },
  {
    href: "/users",
    icon: AccountBalance,
    title: "users",
  },
  {
    href: "/roles",
    icon: Lock,
    title: "roles",
  },
  {
    href: "/faqs",
    icon: Help,
    title: "faqs",
  },
  {
    href: "/admins",
    icon: Edit,
    title: "admins",
  },
  {
    href: "/cities",
    icon: LocationOn,
    title: "cities",
  },
  {
    href: "/stations",
    icon: Policy,
    title: "stations",
  },
  {
    href: "/logs",
    icon: Speed,
    title: "logs",
  },
  {
    href: "/errors",
    icon: Warning,
    title: "errors",
  },
  {
    href: "/settings",
    icon: Settings,
    title: "settings",
  },
];

const styles = makeStyles((df) => {
  return {
    Root: {
      display: "flex",
      flexDirection: "row",
    },
    topBar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    topBarIconButton: {
      minWidth: "34px",
    },
    content: {
      flex: "1",
    },
    userImgWrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginTop: df.spacing(1),
    },
    userImg: {
      alignSelf: "center",
      width: "65px",
      height: "65px",
      borderRadius: "50%",
      border: `2px solid #fff`,
      padding: "2px",
    },
    sideBar: {
      height: "100vh",
      width: "150px",
      display: "flex",
      flexDirection: "column",
      backgroundColor: df.palette.primary.main,
      boxShadow: df.shadows[16],
    },
    sideBarListWrapper: {
      display: "flex",
      flexDirection: "column",
    },
  };
});

const SIDEBAR = (props) => {
  const {
    userImg,
    sideBar,
    userImgWrapper,
    topBar,
    topBarIconButton,
    sideBarListWrapper,
  } = styles();
  return (
    <Box className={sideBar}>
      <Box className={topBar} mt={2} px={1}>
        <Button variant="text" className={topBarIconButton + " " + "white-clr"}>
          <Menu />
        </Button>

        <Button variant="text" className={topBarIconButton + " " + "white-clr"}>
          <Settings />
        </Button>
      </Box>
      <Box className={userImgWrapper}>
        <img src={avatartImg} className={userImg} />
        <Box mt={1}>
          <Typography
            variant="subtitle1"
            align="center"
            className={"white-clr"}
          >
            username
          </Typography>
          <Typography
            variant="caption"
            align="center"
            className={"white-clr"}
            style={{ display: "block" }}
          >
            job title
          </Typography>
        </Box>
      </Box>
      <Box className={sideBarListWrapper} mt={3} pl={2}>
        {siteNavigation.map((Li) => {
          return (
            <Box display="flex" flexDirection="row" py={1}>
              <Li.icon className="white-clr" size="lg" />
              <Typography
                variant="caption"
                style={{ marginLeft: "14px" }}
                className="white-clr capitalize"
              >
                {Li.title}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const APP_LAYOUT = (props) => {
  const { Root, content } = styles();

  return (
    <Box className={Root}>
      <SIDEBAR />
      <Box className={content}>{props.children}</Box>
    </Box>
  );
};

export default APP_LAYOUT;
