import { constants } from "../constants.json";

export default {
  CREATE: {
    method: "POST",
    url: `${constants["api-host"]}/feedback`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${constants["api-host"]}/feedback`,
  },
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/feedback`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/feedback`,
  },
};
