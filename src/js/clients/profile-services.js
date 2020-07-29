import axios from "axios";

class profileServices {
  updateProfile({ method, action, body }) {
    return axios.request({
      method,
      url: action,
      data: body,
      withCredentials: true,
    });
  }
}

export default new profileServices();
