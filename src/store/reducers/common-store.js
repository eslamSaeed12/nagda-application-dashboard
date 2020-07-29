import ini from "../config/initial-state";
import {
  CONFIRMATION_PROCESS_LOAD,
  CONFIRMATION_PROCESS_FAIL,
  CONFIRMATION_PROCESS_STATUS,
} from "../actions/names";

export const commonStore = (state = ini.commonly, action) => {
  switch (action.type) {
    case CONFIRMATION_PROCESS_STATUS:
      return { ...state, confirm_user_status: action.payload };
    case CONFIRMATION_PROCESS_LOAD:
      return { ...state, confirm_user_load: action.payload };
    case CONFIRMATION_PROCESS_FAIL:
      return { ...state, confirm_user_fail: action.payload };
    default:
      return { ...state };
  }
};
