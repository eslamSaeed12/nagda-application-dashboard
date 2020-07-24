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
      break;
    case CHECK_JWT_USER_FAIL:
      return {
        ...state,
        jwtCheckerFail: action.payload,
        user: null,
        authenticated: false,
      };
      break;
    case CHECK_JWT_USER_DATA:
      return { ...state, user: action.payload, authenticated: true };

    case AUTH_TRUSY:
      return { ...state, authenticated: action.payload };
      break;
    case AUTH_JWT:
      return { ...state, META_JWT_KEY: action.payload };
      break;
    case AUTH_USER:
      return { ...state, user: action.payload };
      break;

    case AUTH_LOGOUT:
      return {
        ...state,
        user: null,
        authenticated: false,
        user: null,
        jwtCheckerFail: null,
        jwtCheckerLoad: null,
      };
      break;
  }

  return state;
};
