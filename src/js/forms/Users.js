export default {
  CREATE: {
    method: "POST",
    url: `${process.env.REACT_APP_HOST}/user`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${process.env.REACT_APP_HOST}/user`,
  },
  DELETE: {
    method: "DELETE",
    url: `${process.env.REACT_APP_HOST}/user`,
  },
  GET_ALL: {
    method: "GET",
    url: `${process.env.REACT_APP_HOST}/user`,
  },
};
