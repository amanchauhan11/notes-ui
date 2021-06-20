import axios from "axios";

const baseUrl = "";

const Api = {
  getUserProfile: () => {
    return axios.get(baseUrl + "/user");
  },
  login: (email, password) => {
    return axios.post(baseUrl + "/login", { email: email, password: password });
  },
  signup: (email, password) => {
    return axios.post(baseUrl + "/user/signup", {
      email: email,
      password: password
    });
  },
  saveNote: note => {
    return axios.put(baseUrl + "/note", note);
  },
  deleteNote: noteId => {
    return axios.delete(baseUrl + "/note", { params: { noteId: noteId } });
  },
  logout: () => {
    return axios.get(baseUrl + "/logout");
  },
  getResponseObj: resp => {
    if (resp.data.status === 1000) {
      return resp.data.responseObject;
    } else {
      throw new Error(resp.status.message);
    }
  }
};

const isOk = code => {
  if (code === 1000) {
    return true;
  } else {
    return false;
  }
};

export { isOk };
export default Api;
