import axios from "axios";
import jsCookie from "js-cookie";

if (process.env.NODE_ENV !== "development") {
  axios.defaults.headers["CSRF-Token"] = jsCookie.get("XSRF-TOKEN");
}
