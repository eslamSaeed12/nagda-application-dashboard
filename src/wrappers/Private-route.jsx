import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRotue = ({ component: Component, ...res }) => {
  return <Route {...rest} render={(props) => <Component />} />;
};
//https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
