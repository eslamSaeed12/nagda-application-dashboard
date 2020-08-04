import React from "react";
import {
  makeStyles,
  Box,
  Typography,
  Button,
  Menu as Dropdown,
  MenuItem,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import clsx from "clsx";
import { Skeleton } from "@material-ui/lab";
import avatartImg from "../static/images/ai-user.jpg";
import {
  Menu,
  Settings,
  Home,
  AccountBox,
  Lock,
  Edit,
  LocationOn,
  Help,
  Speed,
  Warning,
  Policy,
  Feedback,
  ExitToApp,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import SnackErr from "../components/Snack-bar-custom";
import { authEvents } from "../store/actions/pages";

import { connect } from "react-redux";
const { useEffect, useState } = React;

const siteNavigation = [
  {
    href: "/home",
    icon: Home,
    title: "Home",
  },
  {
    href: "/users",
    icon: AccountBox,
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
    href: "/feedbacks",
    icon: Feedback,
    title: "feedbacks",
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

const resrictedForNotOwner = ["settings", "admins", "roles", "users"];

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
    topBarDock: {
      display: "flex",
      flexDirection: "column",
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
    },
    userImgDockMode: {
      alignSelf: "center",
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      border: `2px solid #fff`,
    },
    sideBar: {
      height: "100vh",
      width: (props) => props.sideBarSize,
      zIndex: 99879,
    },
    sideBarFakeElement: {
      width: "inherit",
      height: "inherit",
      display: "flex",
      flexDirection: "column",
      backgroundColor: df.palette.primary.main,
      boxShadow: df.shadows[16],
      overflowY: "scroll",
      overflowX: "hidden",
    },
    customScrollbarStyle: {
      "&::-webkit-scrollbar": {
        width: "12px",
      },
      "&::-webkit-scrollbar-track": {
        "&::-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.3)",
        background: "#f1f1f1",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "10px",
        "&::-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)",
        background: df.palette.warning.light,
        "&:hover": {
          background: df.palette.warning.main,
        },
      },
    },
  };
});

const SIDEBAR = (props) => {
  const [dockMode, setDockMode] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);

  const router = useHistory();

  const [DROP_BACK, SET_DROP_BACK] = useState(false);

  const [ERR, SET_ERR] = useState(null);

  const handleClick = (ev) => {
    setAnchorEl(ev.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const onLogOut = () => {
    props.dispatch(authEvents.AUTH_LOGOUT_FN());
    SET_DROP_BACK(true);
  };

  const dropdownMenuItems = [
    {
      title: "profile",
      evt: () => router.push("/profile"),
      icon: AccountBox,
    },
    {
      title: "logout",
      evt: () => onLogOut(),
      icon: ExitToApp,
    },
  ];

  useEffect(() => {
    if (props.auth && props.auth.logoutLoad) {
      props.dispatch(authEvents.AUTH_LOGOUT());
    }
  }, [props.auth && props.auth.logoutLoad]);

  useEffect(() => {
    if (props.auth && props.auth.logoutLoad && !props.auth.user) {
      router.push("/login");
    }

    if (props.auth && props.auth.logoutLoad && props.auth.logoutFail) {
      SET_ERR(props.auth.logoutFail);
    }
  }, [props]);

  const {
    userImg,
    sideBar,
    userImgWrapper,
    topBar,
    topBarIconButton,
    customScrollbarStyle,
    sideBarFakeElement,
    userImgDockMode,
    topBarDock,
  } = styles({ sideBarSize: dockMode ? "70px" : "200px" });
  if (!props.dispatch) {
    return <Skeleton variant="rect" height="100vh" />;
  }
  return (
    <Box className={sideBar}>
      {DROP_BACK ? (
        <Backdrop open={true}>
          <CircularProgress color="primary" />
        </Backdrop>
      ) : null}
      {Boolean(ERR) ? (
        <SnackErr title={ERR} variant="filled" severity="error" />
      ) : null}
      <Box
        position="fixed"
        className={clsx(
          sideBarFakeElement,
          "width-slide-effect",
          customScrollbarStyle
        )}
      >
        <Box className={dockMode ? topBarDock : topBar} mt={2} px={1}>
          <Button
            onClick={() => setDockMode(!dockMode)}
            variant="text"
            className={`${topBarIconButton} white-clr `}
          >
            <Menu />
          </Button>

          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            variant="text"
            className={`${topBarIconButton} white-clr`}
          >
            <Settings />
          </Button>

          <Dropdown
            id="user-dropdown-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {dropdownMenuItems.map((mi, ind) => {
              return (
                <MenuItem
                  key={`dropdown-item-${ind}`}
                  onClick={mi.evt}
                  className="capitalize"
                >
                  <ListItemIcon>
                    <mi.icon />
                  </ListItemIcon>
                  <ListItemText>{mi.title}</ListItemText>
                </MenuItem>
              );
            })}
          </Dropdown>
        </Box>
        <Box className={userImgWrapper}>
          <img
            src={props.auth.user.image_link}
            className={`${dockMode ? userImgDockMode : userImg}`}
          />
          <Box mt={1} className={` ${dockMode ? "invisible" : ""}`}>
            <Typography
              variant="subtitle1"
              align="center"
              className={`white-clr`}
            >
              {props.auth.user.username}
            </Typography>
            <Typography
              variant="caption"
              align="center"
              style={{ display: "block" }}
              className={`white-clr`}
            >
              {props.auth.user.role.title}
            </Typography>
          </Box>
        </Box>
        <Box mt={dockMode ? 0 : 3}>
          <List component="nav">
            {props.auth.user.role.title === "owner"
              ? siteNavigation.map((Li, index) => {
                  return (
                    <ListItem
                      key={`li-nav-item${index}`}
                      button
                      component={"a"}
                      onClick={() => router.push(Li.href)}
                    >
                      <ListItemIcon>
                        <Li.icon className="white-clr" />
                      </ListItemIcon>
                      <ListItemText
                        primary={Li.title}
                        className={`white-clr ${!dockMode ? "" : "invisible"}`}
                      />
                    </ListItem>
                  );
                })
              : siteNavigation.map((Li, index) => {
                  if (!resrictedForNotOwner.includes(Li.title)) {
                    return (
                      <ListItem
                        key={`li-nav-item${index}`}
                        button
                        component="a"
                        href={Li.href}
                      >
                        <ListItemIcon>
                          <Li.icon className="white-clr" />
                        </ListItemIcon>
                        <ListItemText
                          primary={Li.title}
                          className={`white-clr ${
                            !dockMode ? "" : "invisible"
                          }`}
                        />
                      </ListItem>
                    );
                  }
                })}
            }
          </List>
        </Box>
      </Box>
    </Box>
  );
};

const APP_LAYOUT = (props) => {
  const { Root, content } = styles();
  return (
    <Box className={Root}>
      <SIDEBAR {...props} />
      <Box className={content}>{props.children}</Box>
    </Box>
  );
};

export default connect((st) => st)(APP_LAYOUT);
