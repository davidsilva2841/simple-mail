import axios from "axios";

// let url = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000/api' : 'https://paperclip.link/api';
// let url = 'http://localhost:3000/api';
let url = 'http://192.168.1.241:3000/api';
export default axios.create({
  baseURL: url,
  withCredentials: true
});
