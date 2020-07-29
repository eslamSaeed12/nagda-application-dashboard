import { constants } from "../constants.json";

export default {
  update: {
    method: "PATCH",
    action: `${constants["api-host"]}/api/admin`,
  },
};
