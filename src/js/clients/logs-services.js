import axios from "axios";
import logsForms from "../forms/logs";

class logservices {
  getAll() {
    const config = logsForms.GET_ALL;
    return axios.request({
      ...config,
      withCredentials: true,
    });
  }

  delete({ body }) {
    const config = logsForms.DELETE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
}

export default new logservices();
