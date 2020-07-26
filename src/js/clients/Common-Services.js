import axios from 'axios'
class CommonlySerivces {
  counts({ action }) {
    return axios.request({
      method: "POST",
      url: action,
      withCredentials: true,
    });
  }
}

export default new CommonlySerivces();
