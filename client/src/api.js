import axios from "axios";

const API = axios.create({
  baseURL: "https://pet4ever-production.up.railway.app/api",
});

// Attach JWT token to every request if logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;