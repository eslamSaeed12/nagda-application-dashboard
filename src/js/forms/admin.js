export default {
  CREATE: {
    method: "POST",
    url: `${process.env.REACT_APP_HOST}/admin`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${process.env.REACT_APP_HOST}/admin`,
  },
  DELETE: {
    method: "DELETE",
    url: `${process.env.REACT_APP_HOST}}/admin`,
  },
  GET_ALL: {
    method: "GET",
    url: `${process.env.REACT_APP_HOST}}/admin`,
  },
};
