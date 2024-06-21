import axios from "axios";
const domain: string = import.meta.env.BASE_URL;
// import { useLocalStorage } from "@mantine/hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AxiosInstance = axios.create({
  baseURL: domain,
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  (response) => {
    response.status;
    return response;
  },
  (error) => {
    toast.error(`Request failed: ${error.message}`);
    return Promise.reject(error);
  },
);

export default AxiosInstance;
