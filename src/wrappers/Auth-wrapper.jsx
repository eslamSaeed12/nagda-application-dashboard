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
      this.dispatcher(commonly.CHECK_JWT_TOKEN_FN());
    }
    render() {
      if (!this.props.auth.jwtCheckerLoad && !this.props.jwtCheckerFail) {
        return <Loader />;
      }

      if (this.props.auth.jwtCheckerLoad && this.props.auth.user) {
        return <Component {...this.props} />;
      }

      return <Redirect to="/login" />;
    }
  };
};

export default AuthWrapper;
