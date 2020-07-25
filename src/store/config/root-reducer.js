import { combineReducers } from "redux";
import { authStore as auth } from "../reducers/auth-store";
import { indexStore as index } from "../reducers/index-store";
export const root = combineReducers({
  auth,
  index,
});
