import axios from 'axios';

const API_BASE = 'http://127.0.0.1:5000/api';

// ✅ Instance untuk endpoint yang butuh token (taaruf)
const api = axios.create({
  baseURL: `${API_BASE}/taaruf`,
});

// ✅ Tambahkan token ke setiap request secara otomatis
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ✅ Instance khusus untuk auth (login & register) — tidak pakai token
export const authApi = axios.create({
  baseURL: `${API_BASE}/auth`,
});

export default api;
