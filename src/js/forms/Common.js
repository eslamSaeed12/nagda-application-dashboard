import { constants } from "../constants.json";

export default {
  Counter: {
    method: "POST",
    action: `${constants["api-host"]}/misc/entites-counter`,
  },
};
