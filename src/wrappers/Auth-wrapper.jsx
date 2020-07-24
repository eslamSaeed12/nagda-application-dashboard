import React from "react";
import { commonly, authEvents } from "../store/actions/pages";
import { Redirect } from "react-router-dom";
import Loader from "../components/loader";
const AuthWrapper = (Component) => {
  return class withAuthentication extends React.Component {
    state = {
      authenticated: null,
    };
    dispatcher = this.props.dispatch;
    componentDidMount() {
      const token = localStorage.getItem("META-JWT-KEY");
      if (!token) {
        this.dispatcher(authEvents.AUTH_TRUSY(false));
        this.dispatcher(authEvents.AUTH_USER(null));
        this.dispatcher(commonly.CHECK_JWT_TOKEN_LOAD(true));
        return;
      }
      this.dispatcher(commonly.CHECK_JWT_TOKEN_FN(token));
    }
    render() {
      if (!this.props.auth.jwtCheckerLoad) {
        return <Loader />;
      }
      if (
        this.props.auth.jwtCheckerLoad &&
        this.props.auth.authenticated &&
        this.props.auth.user
      ) {
        return <Component />;
      }
      return <Redirect to="/login" />;
    }
  };
};

export default AuthWrapper;
