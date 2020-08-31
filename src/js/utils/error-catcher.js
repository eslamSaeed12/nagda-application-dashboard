const IsJson = (val) => {
  try {
    JSON.parse(val);
    return true;
  } catch (err) {
    return false;
  }
};

export const errorCatcher = (err) => {
  if (err.response && err.response.data & err.response.data.msg) {
    return err.response.data.msg;
  }
  if (err.request && err.request.response && IsJson(err.request.response)) {
    return JSON.parse(err.request.response).msg;
  }
  if (
    err.response &&
    err.response.data &&
    typeof err.response.data === "string"
  ) {
    return err.response.data;
  }

  return err.message;
};
