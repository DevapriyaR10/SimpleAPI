import axios from "axios";

export const api = axios.create({
  baseURL: "https://simpleapi-8ab8.onrender.com"
});

export const setToken = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
