import { constants } from "../constants.js";

export default {
  UPDATE_PROFILE: {
    method: "PATCH",
    url: `${constants["api-host"]}/admin/profile`,
  },
};
