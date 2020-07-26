import axios from "axios";

class client {
  counts({ action }) {
    return axios.request({
      method: "POST",
      url: action,
      withCredentials: true,
    });
  }
}

export default new client();
