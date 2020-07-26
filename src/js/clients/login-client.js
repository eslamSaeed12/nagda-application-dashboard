import axios from "axios";

class client {
  login({ username, password, rememberMe, csrf, action, method }) {
    return axios.request({
      method,
      url: action,
      withCredentials: true,
      data: {
        username,
        password,
        rememberMe,
      },
    });
  }
}

export default new client();
