import axios from "axios";

class client {
  check({ jwt, action }) {
    return axios.request({
      method: "POST",
      url: action,
      data: {
        token: jwt,
      },
    });
  }
}

export default new client();
