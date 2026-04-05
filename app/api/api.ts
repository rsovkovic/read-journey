import axios from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api',
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const currentRefreshToken = useAuthStore.getState().user?.refreshToken;

      if (!currentRefreshToken) {
        useAuthStore.getState().setLogout();
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/current/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${currentRefreshToken}`,
            },
          },
        );

        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          useAuthStore.getState().setLogin({
            ...currentUser,
            token: data.token,
            refreshToken: data.refreshToken,
          });
        }

        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().setLogout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
