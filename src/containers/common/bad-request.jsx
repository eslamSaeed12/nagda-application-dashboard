import React from "react";
import ErrorPage from "./Error-wrapper";
import ErrorEventImg from "../../static/images/undraw_bug_fixing_oc7a.svg";
import { withRouter } from "react-router-dom";
const Page = (props) => {
  return (
    <ErrorPage
      header="oops something is wrong"
      img={ErrorEventImg}
      content={props.match.params.error}
      {...props}
    />
  );
};

export default withRouter(Page);
