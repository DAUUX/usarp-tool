import axios from "axios";
import { URL } from "./base";

const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//add token to headers
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export { api, setAuthToken };
