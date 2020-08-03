import axios from "axios";
import cityForms from "../forms/city";

class cityServices {
  getAll() {
    const config = cityForms.GET_ALL;
    return axios.request({
      ...config,
      withCredentials: true,
    });
  }
  create({ body }) {
    const config = cityForms.CREATE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
  update({ body }) {
    const config = cityForms.UPDATE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
  delete({ body }) {
    const config = cityForms.DELETE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
  find({ body }) {
    const config = cityForms.FIND(body.id);
    return axios.request({
      ...config,
      withCredentials: true,
    });
  }
}

export default new cityServices();
