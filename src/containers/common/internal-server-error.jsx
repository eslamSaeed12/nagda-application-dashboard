import React from "react";
import ErrorPage from "./Error-wrapper";
import ErrorEventImg from "../../static/images/undraw_server_down_s4lk.svg";
const Page = (props) => {
  return (
    <ErrorPage
      header="oops something wrong is happend"
      img={ErrorEventImg}
    />
  );
};

export default Page;
