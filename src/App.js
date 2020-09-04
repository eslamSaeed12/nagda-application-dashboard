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
import AdminGridTable from "./containers/tables/admins/admins-table";
import CityMainPage from "./containers/tables/city/main-city";
import NewCityPage from "./containers/tables/city/new-city";
import EditCityPage from "./containers/tables/city/edit-city";
import UnAuhtorized from "./containers/common/unAuhtorized";
import BadRequest from "./containers/common/bad-request";
import InternalServerError from "./containers/common/internal-server-error";
import {
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
  StylesProvider,
} from "@material-ui/core";
import "./static/sass/main.scss";
import settingsContainer from "./containers/settings/settings-container";

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
  {
    path: "/admins",
    component: AdminGridTable,
  },
  {
    path: "/cities",
    component: CityMainPage,
  },
  {
    path: "/city/new",
    component: NewCityPage,
  },
  {
    path: "/city/edit/:id",
    component: EditCityPage,
  },
  {
    path: "/settings",
    component: settingsContainer,
  },
];

function App(props) {
  return (
    <React.Fragment>
      <StylesProvider injectFirst>
        <ThemeProvider theme={overridedTheme}>
          <CssBaseline />
          <Router basename="/cp">
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
              <Route path="/un-authorized">
                <UnAuhtorized />
              </Route>

              <Route path="/bad-request/:error">
                <BadRequest />
              </Route>

              <Route path="/server-down">
                <InternalServerError />
              </Route>

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
