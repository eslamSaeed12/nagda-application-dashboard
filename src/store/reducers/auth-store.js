import ini from "../config/initial-state";
import {
  CHECK_JWT_USER_DATA,
  CHECK_JWT_USER_FAIL,
  CHECK_JWT_USER_LOAD,
  AUTH_JWT,
  AUTH_LOGOUT,
  AUTH_TRUSY,
  AUTH_USER,
} from "../actions/names";

export const authStore = (state = ini.auth, action) => {
  switch (action.type) {
    case CHECK_JWT_USER_LOAD:
      return { ...state, jwtCheckerLoad: action.payload };
    case CHECK_JWT_USER_FAIL:
      return {
        ...state,
        jwtCheckerFail: action.payload,
        user: null,
        authenticated: false,
      };
    case CHECK_JWT_USER_DATA:
      return { ...state, user: action.payload, authenticated: true };
    case AUTH_TRUSY:
      return { ...state, authenticated: action.payload };
    case AUTH_JWT:
      return { ...state, META_JWT_KEY: action.payload };
    case AUTH_USER:
      return { ...state, user: action.payload };

    case AUTH_LOGOUT:
      return {
        ...state,
        user: null,
        authenticated: false,
        jwtCheckerFail: null,
        jwtCheckerLoad: null,
      };

    default:
      return { ...state };
  }
};
