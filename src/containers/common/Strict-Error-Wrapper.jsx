import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

class StrictErrorWrapper extends Component {
  state = {
    isUiError: false,
  };

  componentDidCatch(err, errInfo) {
    if (process.env.NODE_ENV === "development") {
      console.log(err);
      console.error(errInfo);
    }
    this.setState({ isUiError: true });
  }

  render() {
    if (this.state.isUiError) {
      return <Redirect to="/server-down" />;
    }
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default StrictErrorWrapper;
