import axios from "axios";
import stationsForms from "../forms/station";

class stationsServices {
  getAll() {
    const config = stationsForms.GET_ALL;
    return axios.request({
      ...config,
      withCredentials: true,
    });
  }
  create({ body }) {
    const config = stationsForms.CREATE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
  update({ body }) {
    const config = stationsForms.UPDATE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
  delete({ body }) {
    const config = stationsForms.DELETE;
    return axios.request({
      ...config,
      data: body,
      withCredentials: true,
    });
  }
}

export default new stationsServices();
