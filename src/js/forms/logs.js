export default {
  DELETE: {
    method: "DELETE",
    url: `${process.env.REACT_APP_HOST}/log`,
  },
  GET_ALL: {
    method: "GET",
    url: `${process.env.REACT_APP_HOST}/log`,
  },
  reset: {
    method: "DELETE",
    url: `${process.env.REACT_APP_HOST}/log/reset`,
  },
};
