import { constants } from "../constants";

export default {
  Login: {
    method: "POST",
    action: `${process.env.REACT_APP_HOST}/auth/login`,
  },
  Logout: {
    method: "POST",
    action: `${process.env.REACT_APP_HOST}/auth/logout`,
  },
  check: {
    method: "POST",
    action: `${process.env.REACT_APP_HOST}/auth/who-me`,
  },
  confirm: {
    method: "POST",
    action: `${process.env.REACT_APP_HOST}/auth/confirm-user`,
  },
};
