import axios from "axios";
import jsCookie from "js-cookie";
import { constants } from "../constants";
if (constants.env.NODE_ENV !== "development") {
  axios.defaults.headers["CSRF-Token"] = jsCookie.get("XSRF-TOKEN");
}
