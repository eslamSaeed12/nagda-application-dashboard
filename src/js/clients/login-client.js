import axios from "axios";

class client {
  login({ username, password, csrf, action, method }) {
    return axios.request({
      method,
      url: action,
      withCredentials: true,
      data: {
        username,
        password,
      },
    });
  }
}

export default new client();
