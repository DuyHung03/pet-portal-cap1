import axios from 'axios';
import { logout } from '../redux/slice/authSlice';
import { store } from '../redux/store';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = JSON.parse(window.atob(base64));
    const currentTime = Date.now() / 1000;
    return decodedPayload.exp < currentTime;
  } catch (error) {
    console.log('Error decoding token:', error);
    return true;
  }
};

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      'http://localhost:4000/api/v1/auth/refresh-token',
      {},
      {
        withCredentials: true,
      },
    );
    const newToken = response.data.token;
    localStorage.setItem('token', newToken);
    return newToken;
  } catch (error) {
    console.log('Session expiry');
    handleAuthorizationError();
    throw error;
  }
};

const handleAuthorizationError = () => {
  const dispatch = store.dispatch;
  dispatch(logout());
};

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('token');

    if (isTokenExpired(token)) {
      console.log('Token expired, trying to refresh');
      try {
        token = await refreshAccessToken();
      } catch (error) {
        console.log('Error refreshing token');
        localStorage.removeItem('token');
        return Promise.reject(error);
      }
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
