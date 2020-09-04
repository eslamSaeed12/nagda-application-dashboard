import { constants } from "../constants";

export default {
  CREATE: {
    method: "POST",
    url: `${process.env.REACT_APP_HOST}/city`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${process.env.REACT_APP_HOST}/city`,
  },
  DELETE: {
    method: "DELETE",
    url: `${process.env.REACT_APP_HOST}/city`,
  },
  GET_ALL: {
    method: "GET",
    url: `${process.env.REACT_APP_HOST}/city`,
  },
  FIND: (id) => ({
    method: "GET",
    url: `${process.env.REACT_APP_HOST}/city/${id}`,
  }),
};
