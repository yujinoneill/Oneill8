import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://oneill8.herokuapp.com/api/",
});
