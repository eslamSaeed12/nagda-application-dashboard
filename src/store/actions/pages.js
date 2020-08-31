import {
  CHECK_JWT_USER_LOAD,
  CHECK_JWT_USER_FAIL,
  CHECK_JWT_USER_DATA,
  AUTH_TRUSY,
  AUTH_USER,
  AUTH_LOGOUT,
  ENTITIES_COUNT_DATA,
  ENTITIES_COUNT_FAIL,
  ENTITIES_COUNT_LOAD,
  AUTH_LOGOUT_FAIL,
  AUTH_LOGOUT_LOAD,
  CONFIRMATION_PROCESS_FAIL,
  CONFIRMATION_PROCESS_LOAD,
  CONFIRMATION_PROCESS_STATUS,
  UPDATE_PROFILE_UPDATED_DATA,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_LOAD,
  UPDATE_PROFILE_SAVED_DATA,
  UPDATE_PROFILE_PASSWORD,
} from "./names";
import AuthServices from "../../js/clients/Auth-Services";
import CommonServices from "../../js/clients/Common-Services";
import AuthForms from "../../js/forms/Auth";
import CommonForms from "../../js/forms/Common";
import profileServices from "../../js/clients/profile-services";
import profileForms from "../../js/forms/profile";

const IsJson = (val) => {
  try {
    JSON.parse(val);
    return true;
  } catch (err) {
    return false;
  }
};

const errorCatcher = (err) => {
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

export const commonly = {
  CHECK_JWT_TOKEN_LOAD: (payload) => ({ type: CHECK_JWT_USER_LOAD, payload }),
  CHECK_JWT_TOKEN_FAIL: (payload) => ({ type: CHECK_JWT_USER_FAIL, payload }),
  CHECK_JWT_TOKEN_FN: () => {
    return (dispatch) => {
      dispatch(commonly.CHECK_JWT_TOKEN_LOAD(false));
      AuthServices.check(AuthForms.check)
        .then((e) => {
          // assign user data
          dispatch(commonly.CHECK_JWT_TOKEN_DT(e.data.body));
          dispatch(commonly.CHECK_JWT_TOKEN_LOAD(true));
        })
        .catch((err) => {
          let msg = errorCatcher(err);
          dispatch(commonly.CHECK_JWT_TOKEN_FAIL(msg));
          dispatch(commonly.CHECK_JWT_TOKEN_LOAD(true));
        });
    };
  },
  CHECK_JWT_TOKEN_DT: (payload) => {
    return { type: CHECK_JWT_USER_DATA, payload };
  },
};

export const authEvents = {
  AUTH_TRUSY: (payload) => ({
    type: AUTH_TRUSY,
    payload,
  }),
  AUTH_USER: (payload) => ({ type: AUTH_USER, payload }),
  AUTH_LOGOUT: () => ({ type: AUTH_LOGOUT }),
  AUTH_LOGOUT_FAIL: (payload) => ({ type: AUTH_LOGOUT_FAIL, payload }),
  AUTH_LOGOUT_LOAD: (payload) => ({ type: AUTH_LOGOUT_LOAD, payload }),
  AUTH_LOGOUT_FN: () => {
    return (dispatch) => {
      dispatch(authEvents.AUTH_LOGOUT_LOAD(false));
      AuthServices.logout(AuthForms.Logout)
        .then((e) => {
          dispatch(authEvents.AUTH_LOGOUT_LOAD(true));
        })
        .catch((err) => {
          const msg = errorCatcher(err);
          dispatch(authEvents.AUTH_LOGOUT_FAIL(msg));
          dispatch(authEvents.AUTH_LOGOUT_LOAD(true));
        });
    };
  },
};

// index page

export const indexEvents = {
  ENTITES_COUNTS_TRUTHY: (payload) => ({ type: ENTITIES_COUNT_LOAD, payload }),
  ENTITES_COUNTS_FAIL: (payload) => ({ type: ENTITIES_COUNT_FAIL, payload }),
  ENTITES_COUNTS_DT: (payload) => ({ type: ENTITIES_COUNT_DATA, payload }),
  ENTITIES_COUNTS_FN: () => {
    return (dispatch) => {
      dispatch(indexEvents.ENTITES_COUNTS_TRUTHY(false));
      CommonServices.counts(CommonForms.Counter)
        .then((e) => {
          dispatch(indexEvents.ENTITES_COUNTS_DT(e.data.body));
          dispatch(indexEvents.ENTITES_COUNTS_TRUTHY(true));
        })
        .catch((err) => {
          const msg = errorCatcher(err);
          dispatch(indexEvents.ENTITES_COUNTS_FAIL(msg));
          dispatch(indexEvents.ENTITES_COUNTS_TRUTHY(true));
        });
    };
  },
};

export const profileEvents = {
  UPDATE_PROFILE_LOAD_EV: (payload) => ({
    type: UPDATE_PROFILE_LOAD,
    payload,
  }),
  UPDATE_PROFILE_DATA_EV: (payload) => ({
    type: UPDATE_PROFILE_UPDATED_DATA,
    payload,
  }),
  UPDATE_PROFILE_FAIL_EV: (payload) => ({
    type: UPDATE_PROFILE_FAIL,
    payload,
  }),
  UPDATE_PROFILE_SAVED_DATA_FN: (payload) => ({
    type: UPDATE_PROFILE_SAVED_DATA,
    payload,
  }),
  UPDATE_PROFILE_EV: (body) => {
    return (dispatch) => {
      dispatch(profileEvents.UPDATE_PROFILE_LOAD_EV(false));
      console.log(body);
      profileServices
        .updateProfile({ ...profileForms.UPDATE_PROFILE, data: body })
        .then((e) => {
          dispatch(profileEvents.UPDATE_PROFILE_DATA_EV(e.data.body));
          dispatch(profileEvents.UPDATE_PROFILE_LOAD_EV(true));
        })
        .catch((err) => {
          const msg = errorCatcher(err);
          dispatch(profileEvents.UPDATE_PROFILE_FAIL_EV(msg));
          dispatch(profileEvents.UPDATE_PROFILE_LOAD_EV(true));
        });
    };
  },
  update_Profile_password: (payload) => ({
    type: UPDATE_PROFILE_PASSWORD,
    payload,
  }),
};

// confirmation events

export const confirmation = {
  CONFIRMATION_PROCESS_LOAD_EV: (payload) => ({
    type: CONFIRMATION_PROCESS_LOAD,
    payload,
  }),
  CONFIRMATION_PROCESS_FAIL_EV: (payload) => ({
    type: CONFIRMATION_PROCESS_FAIL,
    payload,
  }),
  CONFIRMATION_PROCESS_STATUS_EV: (payload) => ({
    type: CONFIRMATION_PROCESS_STATUS,
    payload,
  }),
  CONFIRMATION_PROCESS_EV: (body) => {
    return (dispatch) => {
      dispatch(confirmation.CONFIRMATION_PROCESS_LOAD_EV(false));
      AuthServices.confirm({ ...AuthForms.confirm, body })
        .then((e) => {
          dispatch(confirmation.CONFIRMATION_PROCESS_STATUS_EV(true));
          dispatch(confirmation.CONFIRMATION_PROCESS_LOAD_EV(true));
          dispatch(confirmation.CONFIRMATION_PROCESS_FAIL_EV(null));
        })
        .catch((err) => {
          const msg = errorCatcher(err);
          dispatch(confirmation.CONFIRMATION_PROCESS_FAIL_EV(msg));
          dispatch(confirmation.CONFIRMATION_PROCESS_LOAD_EV(true));
        });
    };
  },
};
