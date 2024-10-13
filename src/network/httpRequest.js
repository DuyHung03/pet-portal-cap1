import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slice/authSlice';
// import useAuthStore from '../store/useAuthStore';
// import useUserStore from '../store/useUserStore';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

const handleAuthorizationError = () => {
    // const { clearUser } = useUserStore.getState();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    // clearUser();
    dispatch(logout);
};

const refreshAccessToken = async () => {
    try {
        await axios.post(
            'http://localhost:4000/api/v1/auth/refresh-token',
            {},
            {
                withCredentials: true,
            }
        );
    } catch (error) {
        console.log('Session expiry');
        handleAuthorizationError();
        throw error;
    }
};

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
                await refreshAccessToken();
                // Retry the request without modifying headers (cookies will be sent automatically)
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
