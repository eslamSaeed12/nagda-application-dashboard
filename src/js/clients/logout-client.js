import axios from "axios";

class client {
  logout({ action }) {
    return axios.request({
      method: "POST",
      url: action,
      withCredentials: true,
    });
  }
}

export default new client();
