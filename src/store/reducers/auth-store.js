import ini from "../config/initial-state";
import {
  CHECK_JWT_USER_DATA,
  CHECK_JWT_USER_FAIL,
  CHECK_JWT_USER_LOAD,
  AUTH_LOGOUT_LOAD,
  AUTH_TRUSY,
  AUTH_LOGOUT,
  AUTH_USER,
  AUTH_LOGOUT_FAIL,
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
    case AUTH_USER:
      return { ...state, user: action.payload };
    case AUTH_LOGOUT:
      return {
        ...state,
        user: null,
        authenticated: false,
      };
    case AUTH_LOGOUT_LOAD:
      return { ...state, logoutLoad: action.payload };
    case AUTH_LOGOUT_FAIL:
      return { ...state, logoutFail: action.payload };
    default:
      return { ...state };
  }
};
