import { constants } from "../constants.js";

export default {
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/log`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/log`,
  },
  reset: {
    method: "DELETE",
    url: `${constants["api-host"]}/log/reset`,
  },
};
