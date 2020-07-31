import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import LoginContainer from "./containers/login/login-container";
import DashHomeContainer from "./containers/home/dashboard-home-container";
import ProfileContainer from "./containers/profile/profile-container";
import UsersGridTable from "./containers/tables/users/users-table";
import FaqsGridTable from "./containers/tables/faqs/faqs-table";
import RolesGridTable from "./containers/tables/roles/roles-table";
import FeedbackGridTable from "./containers/tables/feedbacks/feedbacks-table";
import StationsGridTable from "./containers/tables/stations/stations-table";
import LogsGridTable from "./containers/tables/logs/logs-table.jsx";
import ErorrsGridTable from "./containers/tables/errors/errors-table";

import {
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
  StylesProvider,
} from "@material-ui/core";

import "./static/sass/main.scss";

const overridedTheme = createMuiTheme({
  typography: {
    fontFamily: "Poppins",
  },
  palette: {
    primary: {
      main: "#03A9F4",
    },
    secondary: {
      main: "#607D8B",
    },
    warning: {
      main: "#FFC107",
    },
    info: {
      main: "#3F51B5", // #00cec9
    },
    error: {
      main: "#E91E63", //#d63031
    },
    success: {
      main: "#009688", // #00b894
    },
    black: {
      main: "#2d3436",
    },
    subtitle: {
      main: "#576574",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        color: "#222f3e",
        ".white-clr": {
          color: "#fff",
        },
        ".uppercase": {
          textTransform: "uppercase",
        },
        ".capitalize": {
          textTransform: "capitalize",
        },
      },
    },
  },
});

const gridTables = [
  {
    path: "/users",
    component: UsersGridTable,
  },
  {
    path: "/faqs",
    component: FaqsGridTable,
  },
  {
    path: "/roles",
    component: RolesGridTable,
  },
  {
    path: "/feedbacks",
    component: FeedbackGridTable,
  },
  {
    path: "/stations",
    component: StationsGridTable,
  },
  {
    path: "/logs",
    component: LogsGridTable,
  },
  {
    path: "/errors",
    component: ErorrsGridTable,
  },
];

function App(props) {
  return (
    <React.Fragment>
      <StylesProvider injectFirst>
        <ThemeProvider theme={overridedTheme}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route path="/login" exact={true}>
                <LoginContainer />
              </Route>

              <Route path="/profile">
                <ProfileContainer />
              </Route>

              {gridTables.map((t, i) => {
                return (
                  <Route key={`route-item-${i}`} path={t.path}>
                    <t.component />
                  </Route>
                );
              })}

              <Route path="/">
                <DashHomeContainer />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </StylesProvider>
    </React.Fragment>
  );
}

export default App;
