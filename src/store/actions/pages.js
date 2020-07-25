import CHECK_JWT_TOKEN_CLIENT from "../../js/clients/check-jwt-token";
import { constants } from "../../js/constants.json";
import {
  CHECK_JWT_USER_LOAD,
  CHECK_JWT_USER_FAIL,
  CHECK_JWT_USER_DATA,
  AUTH_TRUSY,
  AUTH_JWT,
  AUTH_USER,
  AUTH_LOGOUT,
  ENTITIES_COUNT,
  ENTITIES_COUNT_DATA,
  ENTITIES_COUNT_FAIL,
  ENTITIES_COUNT_LOAD,
} from "./names";
import counter from "../../js/clients/counter-client";

export const commonly = {
  CHECK_JWT_TOKEN_LOAD: (payload) => ({ type: CHECK_JWT_USER_LOAD, payload }),
  CHECK_JWT_TOKEN_FAIL: (payload) => ({ type: CHECK_JWT_USER_FAIL, payload }),
  CHECK_JWT_TOKEN_FN: (jwt) => {
    return (dispatch) => {
      dispatch(commonly.CHECK_JWT_TOKEN_LOAD(false));
      CHECK_JWT_TOKEN_CLIENT.check({
        jwt,
        action: constants["api-host"] + "/auth/anti-forgery",
      })
        .then((e) => {
          dispatch(commonly.CHECK_JWT_TOKEN_DT(e.data.body));
          dispatch(commonly.CHECK_JWT_TOKEN_LOAD(true));
          dispatch(authEvents.AUTH_JWT(jwt));
        })
        .catch((err) => {
          dispatch(commonly.CHECK_JWT_TOKEN_FAIL(err.message));
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
  AUTH_JWT: (payload) => ({ type: AUTH_JWT, payload }),
  AUTH_USER: (payload) => ({ type: AUTH_USER, payload }),
  AUTH_LOGOUT: () => ({ type: AUTH_LOGOUT }),
};

// index page

export const indexEvents = {
  ENTITES_COUNTS_TRUTHY: (payload) => ({ type: ENTITIES_COUNT_LOAD, payload }),
  ENTITES_COUNTS_FAIL: (payload) => ({ type: ENTITIES_COUNT_FAIL, payload }),
  ENTITES_COUNTS_DT: (payload) => ({ type: ENTITIES_COUNT_DATA, payload }),
  ENTITIES_COUNTS_FN: (jwt) => {
    return (dispatch) => {
      dispatch(indexEvents.ENTITES_COUNTS_TRUTHY(false));
      counter
        .counts({
          action: constants["api-host"] + "/misc/entites-counter",
          jwt,
        })
        .then((e) => {
          dispatch(indexEvents.ENTITES_COUNTS_DT(e.data.body));
          dispatch(indexEvents.ENTITES_COUNTS_TRUTHY(true));
        })
        .catch((err) => {
          console.log(err);
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
