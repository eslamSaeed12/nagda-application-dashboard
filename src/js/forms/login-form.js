import { constants } from "../constants.json";

export const config = {
  method: "POST",
  action: `${constants["api-host"]}/auth/login`,
};
