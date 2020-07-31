import axios from "axios";
import usersForms from "../forms/Users";

class usersServices {
  getAll() {
    const config = usersForms.GET_ALL;
    return axios.request({
      ...config,
      withCredentials: true,
    });
  }
  create({ body }) {
    const config = usersForms.CREATE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
  update({ body }) {
    const config = usersForms.UPDATE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
  delete({ body }) {
    const config = usersForms.DELETE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
}

export default new usersServices();
