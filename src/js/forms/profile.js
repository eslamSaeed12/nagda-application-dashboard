import { constants } from "../constants.json";

export default {
  UPDATE_PROFILE: {
    method: "PATCH",
    url: `${constants["api-host"]}/admin/profile`,
  },
};
