import { constants } from "../constants";

export default {
  CREATE: {
    method: "POST",
    url: `${constants["api-host"]}/admin`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${constants["api-host"]}/admin`,
  },
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/admin`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/admin`,
  },
};
