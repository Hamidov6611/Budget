import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

export const instance = axios.create({
  baseURL: "https://budget-xx03.onrender.com/api",
  headers: {
    Authorization: `Bearer ` + getTokenFromLocalStorage() || "",
  },
});
