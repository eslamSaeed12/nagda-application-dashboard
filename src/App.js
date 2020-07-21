import React from "react";
import {
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
  StylesProvider,
} from "@material-ui/core";
import "./static/sass/main.scss";
import Layout from "./wrappers/App-Layout";

const overridedTheme = createMuiTheme({
  typography: {
    fontFamily: "Poppins",
  },
  palette: {
    primary: {
      main: "#0984e3",
    },
    secondary: {
      main: "#dfe6e9",
    },
    warning: {
      main: "#fdcb6e",
    },
    info: {
      main: "#81ecec", // #00cec9
    },
    error: {
      main: "#ff7675", //#d63031
    },
    success: {
      main: "#55efc4", // #00b894
    },
    black: {
      main: "#2d3436",
    },
    subtitle: {
      main: "#636e72",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
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

function App() {
  return (
    <React.Fragment>
      <StylesProvider injectFirst>
        <ThemeProvider theme={overridedTheme}>
          <CssBaseline />
          <Layout />
        </ThemeProvider>
      </StylesProvider>
    </React.Fragment>
  );
}

export default App;
