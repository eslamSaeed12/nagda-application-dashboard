import React from "react";
import { commonly } from "../store/actions/pages";
import { Redirect } from "react-router-dom";
import Loader from "../components/loader";
const AuthWrapper = (Component, roles) => {
  return class withAuthentication extends React.Component {
    dispatcher = this.props.dispatch;
    componentDidMount() {
      this.dispatcher(commonly.CHECK_JWT_TOKEN_FN());
    }
    render() {
      if (!this.props.auth.jwtCheckerLoad && !this.props.jwtCheckerFail) {
        return <Loader />;
      }

      if (
        this.props.auth.jwtCheckerLoad &&
        this.props.auth.user &&
        roles.includes(this.props.auth.user.role.title)
      ) {
        return <Component {...this.props} />;
      }

      if (
        this.props.auth.jwtCheckerLoad &&
        this.props.auth.user &&
        !roles.includes(this.props.auth.user.role.title)
      ) {
        return <Redirect to="/home" />;
      }

      return <Redirect to="/login" />;
    }
  };
};

export default AuthWrapper;
