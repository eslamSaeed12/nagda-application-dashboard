import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ErrorWrapper from "./containers/common/Strict-Error-Wrapper";
import "./js/utils/axios";
ReactDOM.render(
  <React.StrictMode>
    <ErrorWrapper>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
