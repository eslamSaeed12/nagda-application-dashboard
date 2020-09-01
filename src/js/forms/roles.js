import { constants } from "../constants.js";

export default {
  CREATE: {
    method: "POST",
    url: `${constants["api-host"]}/role`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${constants["api-host"]}/role`,
  },
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/role`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/role`,
  },
};
