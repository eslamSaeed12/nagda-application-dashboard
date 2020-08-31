import axios from "axios";

class profileServices {
  updateProfile({ method, url, data }) {
    return axios.request({
      method,
      url,
      data,
      withCredentials: true,
    });
  }
}

export default new profileServices();
