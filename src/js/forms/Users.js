import { constants } from "../constants.json";

export default {
  CREATE: {
    method: "POST",
    url: `${constants["api-host"]}/user`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${constants["api-host"]}/user`,
  },
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/user`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/user`,
  },
};
