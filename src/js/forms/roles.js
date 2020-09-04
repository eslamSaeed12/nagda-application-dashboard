export default {
  CREATE: {
    method: "POST",
    url: `${process.env.REACT_APP_HOST}/role`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${process.env.REACT_APP_HOST}/role`,
  },
  DELETE: {
    method: "DELETE",
    url: `${process.env.REACT_APP_HOST}/role`,
  },
  GET_ALL: {
    method: "GET",
    url: `${process.env.REACT_APP_HOST}/role`,
  },
};
