import { constants } from "../constants.json";

export default {
  CREATE: {
    method: "POST",
    url: `${constants["api-host"]}/api/role`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${constants["api-host"]}/api/role`,
  },
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/api/role`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/api/role`,
  },
};
