import axios from 'axios';

const rawApiUrl = process.env.NEXT_BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL;
const baseUrl = (rawApiUrl?.trim() || 'http://localhost:3000').replace(/\/$/, '');

export const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
