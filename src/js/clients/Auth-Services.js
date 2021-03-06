import axios from "axios";

class authServices {
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

  logout({ action, method }) {
    return axios.request({
      method,
      url: action,
      withCredentials: true,
    });
  }

  check({ action, method }) {
    return axios.request({
      method,
      url: action,
      withCredentials: true,
    });
  }

  confirm({ action, method, body }) {
    return axios.request({
      method,
      url: action,
      data: body,
      withCredentials: true,
    });
  }
}

export default new authServices();
