import axios from "axios";
import rolesForms from "../forms/roles";

class rolesServices {
  getAll() {
    const config = rolesForms.GET_ALL;
    return axios.request({
      ...config,
      withCredentials: true,
    });
  }
  create({ body }) {
    const config = rolesForms.CREATE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
  update({ body }) {
    const config = rolesForms.UPDATE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
  delete({ body }) {
    const config = rolesForms.DELETE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
}

export default new rolesServices();
