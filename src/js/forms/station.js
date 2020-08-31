import { constants } from "../constants.json";

export default {
  CREATE: {
    method: "POST",
    url: `${constants["api-host"]}/station`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${constants["api-host"]}/station`,
  },
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/station`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/station`,
  },
};
