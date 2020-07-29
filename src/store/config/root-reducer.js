import { combineReducers } from "redux";
import { authStore as auth } from "../reducers/auth-store";
import { indexStore as index } from "../reducers/index-store";
import { commonStore as common } from "../reducers/common-store";
import { profileStore as profile } from "../reducers/profile-store";
export const root = combineReducers({
  auth,
  index,
  common,
  profile,
});
