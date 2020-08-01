import { constants } from "../constants.json";

export default {
  CREATE: {
    method: "POST",
    url: `${constants["api-host"]}/api/admin`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${constants["api-host"]}/api/admin`,
  },
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/api/admin`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/api/admin`,
  },
};
