import axios from "axios";
import { PREFIX } from "./common";

const client = axios.create({
  baseURL: PREFIX,
  timeout: 5000,
  withCredentials: true,
});

export default client;
