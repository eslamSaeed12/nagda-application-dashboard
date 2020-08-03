import React from "react";
import ErrorPage from "./Error-wrapper";
import UnAuhtorizedImg from "../../static/images/undraw_page_not_found_su7k.svg";
const Page = (props) => {
  return (
    <ErrorPage
      header="you dont have the permissions to be here"
      img={UnAuhtorizedImg}
    />
  );
};

export default Page;
