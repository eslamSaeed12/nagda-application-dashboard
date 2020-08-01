import axios from "axios";
import adminForms from "../forms/admin";

class adminServices {
  getAll() {
    const config = adminForms.GET_ALL;
    return axios.request({
      ...config,
      withCredentials: true,
    });
  }
  create({ body }) {
    const config = adminForms.CREATE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
  update({ body }) {
    const config = adminForms.UPDATE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
  delete({ body }) {
    const config = adminForms.DELETE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
}

export default new adminServices();
