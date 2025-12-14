import axios from "axios";

const api = axios.create({
  baseURL: "https://agriman-uowp.onrender.com/api",
});

export default api;
