import axios from 'axios';

export const api = axios.create({
  baseURL: (process.env.NEXT_BACKEND_API_URL || '').replace(/\/$/, ''),
  withCredentials: true,
});
