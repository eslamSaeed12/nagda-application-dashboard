import { constants } from "../constants.json";

export default {
  CREATE: {
    method: "POST",
    url: `${constants["api-host"]}/api/user`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${constants["api-host"]}/api/user`,
  },
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/api/user`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/api/user`,
  },
};
