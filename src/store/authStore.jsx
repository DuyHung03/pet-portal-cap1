import axios from 'axios';
import { create } from 'zustand';

const API_URL = 'http://localhost:4000/api/v1/auth';

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedIsAuthenticated = JSON.parse(
        localStorage.getItem('isAuthenticated'),
    );
    const storedRole = localStorage.getItem('role');
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    const parsedRole = storedRole ? storedRole.split(',') : [];

    return {
        user: storedUser || null,
        isAuthenticated: storedIsAuthenticated || false,
        role: parsedRole,
        token: storedToken || null,
        refreshToken: storedRefreshToken || null,
        error: null,
        isLoading: false,
        isCheckingAuth: true,
        message: null,

        setUserInfo: async (user) => {
            localStorage.setItem('user', JSON.stringify(user));
        },

        signup: async (username, email, password) => {
            set({ isLoading: true, error: null });
            try {
                const response = await axios.post(`${API_URL}/register`, {
                    username,
                    email,
                    password,
                });
                set({
                    user: response.data.user,
                    isAuthenticated: true,
                    isLoading: false,
                });
            } catch (error) {
                set({
                    error: error.response?.data?.error || 'Error signing up',
                    isLoading: false,
                });
                throw error;
            }
        },

        login: async (email, password) => {
            set({ isLoading: true, error: null });
            try {
                const response = await axios.post(`${API_URL}/login`, {
                    email,
                    password,
                });
                const { user, token, refreshToken } = response.data;
                const role = user.role;

                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('isAuthenticated', JSON.stringify(true));
                localStorage.setItem('role', role);
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);

                set({
                    user,
                    role,
                    token,
                    refreshToken,
                    isAuthenticated: true,
                    error: null,
                    isLoading: false,
                });
            } catch (error) {
                set({
                    error: error.response?.data?.message || 'Error logging in',
                    isLoading: false,
                });
                throw error;
            }
        },

        logout: async () => {
            set({ isLoading: true, error: null });
            try {
                await axios.post(`${API_URL}/logout`);
                localStorage.clear();

                set({
                    user: null,
                    role: null,
                    isAuthenticated: false,
                    error: null,
                    isLoading: false,
                });
            } catch (error) {
                set({ error: 'Error logging out', isLoading: false });
                throw error;
            }
        },

        verifyEmail: async (code) => {
            set({ isLoading: true, error: null });
            try {
                const response = await axios.post(`${API_URL}/verify-email`, {
                    code,
                });
                const { user } = response.data;
                const role = user.role;

                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('isAuthenticated', JSON.stringify(true));
                localStorage.setItem('role', role);

                set({ user, role, isAuthenticated: true, isLoading: false });
                return response.data;
            } catch (error) {
                set({
                    error:
                        error.response?.data?.message ||
                        'Error verifying email',
                    isLoading: false,
                });
                throw error;
            }
        },

        forgotPassword: async (email) => {
            set({ isLoading: true, error: null });
            try {
                const response = await axios.post(
                    `${API_URL}/forgot-password`,
                    { email },
                );
                set({ message: response.data.message, isLoading: false });
            } catch (error) {
                set({
                    isLoading: false,
                    error:
                        error.response?.data?.message ||
                        'Error sending reset password email',
                });
                throw error;
            }
        },

        resetPassword: async (token, password) => {
            set({ isLoading: true, error: null });
            try {
                const response = await axios.post(
                    `${API_URL}/reset-password/${token}`,
                    { password },
                );
                set({ message: response.data.message, isLoading: false });
            } catch (error) {
                set({
                    isLoading: false,
                    error:
                        error.response?.data?.message ||
                        'Error resetting password',
                });
                throw error;
            }
        },
    };
});
