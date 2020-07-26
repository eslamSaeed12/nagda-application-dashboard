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
} from "./names";
import AuthServices from "../../js/clients/Auth-Services";
import CommonServices from "../../js/clients/Common-Services";
import AuthForms from "../../js/forms/Auth";
import CommonForms from "../../js/forms/Common";
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
          if (err.response) {
            dispatch(
              commonly.CHECK_JWT_TOKEN_FAIL(err.response.msg || err.message)
            );
          } else {
            dispatch(commonly.CHECK_JWT_TOKEN_FAIL(err.message));
          }

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
        .catch((er) => {
          dispatch(authEvents.AUTH_LOGOUT_FAIL(er.response.msg || er.message));
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
          dispatch(
            indexEvents.ENTITES_COUNTS_FAIL(
              err.response.data.msg || err.message
            )
          );
          dispatch(indexEvents.ENTITES_COUNTS_TRUTHY(true));
        });
    };
  },
};
