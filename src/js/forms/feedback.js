export default {
  CREATE: {
    method: "POST",
    url: `${process.env.REACT_APP_HOST}/feedback`,
  },
  UPDATE: {
    method: "PATCH",
    url: `${process.env.REACT_APP_HOST}/feedback`,
  },
  DELETE: {
    method: "DELETE",
    url: `${process.env.REACT_APP_HOST}/feedback`,
  },
  GET_ALL: {
    method: "GET",
    url: `${process.env.REACT_APP_HOST}/feedback`,
  },
};
