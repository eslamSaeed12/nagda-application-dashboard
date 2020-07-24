import { combineReducers } from "redux";
import { authStore as auth } from "../reducers/auth-store";
export const root = combineReducers({
  auth,
});
