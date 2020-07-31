import { constants } from "../constants.json";

export default {
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/api/log`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/api/log`,
  },
};
