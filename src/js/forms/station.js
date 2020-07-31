import { constants } from "../constants.json";

export default {
  CREATE: {
    method: "POST",
    url: `${constants["api-host"]}/api/station`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${constants["api-host"]}/api/station`,
  },
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/api/station`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/api/station`,
  },
};
