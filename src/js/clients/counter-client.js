import axios from "axios";

class client {
  counts({ action, jwt }) {
    return axios.request({
      method: "POST",
      url: action,
      withCredentials: true,
      headers: {
        "x-meta-jwt": jwt,
      },
    });
  }
}

export default new client();
