import { constants } from "../constants.json";

export default {
  CREATE: {
    method: "POST",
    url: `${constants["api-host"]}/city`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${constants["api-host"]}/city`,
  },
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/city`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/city`,
  },
  FIND: (id) => ({
    method: "GET",
    url: `${constants["api-host"]}/city/${id}`,
  }),
};
