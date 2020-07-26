import axios from "axios";

class client {
  check({ action }) {
    return axios.request({
      method: "POST",
      url: action,
      withCredentials: true,
    });
  }
}

export default new client();
