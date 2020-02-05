import axios from "axios";

let url = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000/api' : 'https://simple.link/api';

export default axios.create({
  baseURL: url,
  withCredentials: true
});
