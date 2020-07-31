import { constants } from "../constants.json";

export default {
  CREATE: {
    method: "POST",
    url: `${constants["api-host"]}/api/faq`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${constants["api-host"]}/api/faq`,
  },
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/api/faq`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/api/faq`,
  },
};
