import { constants } from "../constants.json";

export default {
  Login: {
    method: "POST",
    action: `${constants["api-host"]}/auth/login`,
  },
  Logout: {
    method: "POST",
    action: `${constants["api-host"]}/auth/logout`,
  },
  check: {
    method: "POST",
    action: `${constants["api-host"]}/auth/who-me`,
  },
  confirm: {
    method: "POST",
    action: `${constants["api-host"]}/auth/confirm-user`,
  },
};
