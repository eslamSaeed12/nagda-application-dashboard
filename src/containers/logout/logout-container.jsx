import React, { useCallback, useState, useEffect } from "react";
import { connect } from "react-redux";
import { authEvents } from "../../store/actions/pages";
import Loader from "../../components/loader";
import { useHistory } from "react-router-dom";

const Logout = (props) => {
  const [loading, setLoading] = useState(true);
  const [LogOut, setLogOut] = useState(null);
  const router = useHistory();
  useEffect(() => {
    localStorage.removeItem("META-JWT-KEY");
    props.dispatch(authEvents.AUTH_LOGOUT());
    setLogOut(true);
  }, []);

  useEffect(() => {
    if (LogOut) {
      router.push("/login");
    }
  }, [LogOut]);
  if (loading) return <Loader />;
};

export default connect((st) => st)(Logout);
