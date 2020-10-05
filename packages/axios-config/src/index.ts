import axios from 'axios';
import 'dotenv/config';

const urlBase = process.env.HOST_APP || 'http://localhost:3333';

const api = axios.create({
  baseURL: `${urlBase}/v1`
});

export default api;
