import { constants } from "../constants.json";

export default {
  CREATE: {
    method: "POST",
    url: `${constants["api-host"]}/api/city`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${constants["api-host"]}/api/city`,
  },
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/api/city`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/api/city`,
  },
  FIND: (id) => ({
    method: "GET",
    url: `${constants["api-host"]}/api/city/${id}`,
  }),
};
