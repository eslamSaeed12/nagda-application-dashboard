import { constants } from "../constants.js";

export default {
  Counter: {
    method: "POST",
    action: `${constants["api-host"]}/misc/entites-counter`,
  },
};
