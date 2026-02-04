import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1"
});

export const setToken = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
