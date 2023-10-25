// stores the axios instances in various requests (its settings)
import axios from "axios";

let baseURL;
if (process.env.NODE_ENV == "production") baseURL = "http://localhost:8080";
else baseURL = "http://localhost:8080";

const base = axios.create({ baseURL, withCredentials: true });

export default base;

export const userRequests = axios.create({
  baseURL: baseURL + "/user",
  withCredentials: true,
});
