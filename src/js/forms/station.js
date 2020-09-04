
export default {
  CREATE: {
    method: "POST",
    url: `${process.env.REACT_APP_HOST}/station`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${process.env.REACT_APP_HOST}/station`,
  },
  DELETE: {
    method: "DELETE",
    url: `${process.env.REACT_APP_HOST}/station`,
  },
  GET_ALL: {
    method: "GET",
    url: `${process.env.REACT_APP_HOST}/station`,
  },
};
