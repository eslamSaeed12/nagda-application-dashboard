import { constants } from "../constants.json";

export default {
  CREATE: {
    method: "POST",
    url: `${constants["api-host"]}/api/feedback`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${constants["api-host"]}/api/feedback`,
  },
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/api/feedback`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/api/feedback`,
  },
};
