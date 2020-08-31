import { constants } from "../constants.json";

export default {
  CREATE: {
    method: "POST",
    url: `${constants["api-host"]}/faq`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${constants["api-host"]}/faq`,
  },
  DELETE: {
    method: "DELETE",
    url: `${constants["api-host"]}/faq`,
  },
  GET_ALL: {
    method: "GET",
    url: `${constants["api-host"]}/faq`,
  },
};
