import ini from "../config/initial-state";
import {
  UPDATE_PROFILE_SAVED_DATA,
  UPDATE_PROFILE_UPDATED_DATA,
  UPDATE_PROFILE_LOAD,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_PASSWORD,
} from "../actions/names";

export const profileStore = (state = ini.profile, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_LOAD:
      return { ...state, update_profile_load: action.payload };
    case UPDATE_PROFILE_SAVED_DATA:
      return { ...state, update_prfoile_saved_data: action.payload };
    case UPDATE_PROFILE_UPDATED_DATA:
      return { ...state, update_profile_updated_data: action.payload };
    case UPDATE_PROFILE_FAIL:
      return { ...state, update_profile_fail: action.payload };
    case UPDATE_PROFILE_PASSWORD:
      return { ...state, update_profile_password: action.payload };
    default:
      return { ...state };
  }
};
