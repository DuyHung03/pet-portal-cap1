import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => {
	// Retrieve initial user and auth state from localStorage
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedIsAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

	return {
		user: storedUser || null,
		isAuthenticated: storedIsAuthenticated || false,
		error: null,
		isLoading: false,
		isCheckingAuth: true,
		message: null,

		signup: async (username, email, password) => {
			set({ isLoading: true, error: null });
			try {
				const response = await axios.post(`${API_URL}/register`, { username, email, password });
				const user = response.data.user;

				// Store user and authentication status in localStorage
				localStorage.setItem('user', JSON.stringify(user));
				localStorage.setItem('isAuthenticated', JSON.stringify(true));

				set({ user, isAuthenticated: true, isLoading: false });
			} catch (error) {
				set({ error: error.response.data.message || "Error signing up", isLoading: false });
				throw error;
			}
		},

		login: async (email, password) => {
			set({ isLoading: true, error: null });
			try {
				const response = await axios.post(`${API_URL}/login`, { email, password });
				const user = response.data.user;

				// Store user and authentication status in localStorage
				localStorage.setItem('user', JSON.stringify(user));
				localStorage.setItem('isAuthenticated', JSON.stringify(true));

				set({
					isAuthenticated: true,
					user,
					error: null,
					isLoading: false,
				});
			} catch (error) {
				set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
				throw error;
			}
		},

		logout: async () => {
			set({ isLoading: true, error: null });
			try {
				await axios.post(`${API_URL}/logout`);

				// Clear localStorage
				localStorage.removeItem('user');
				localStorage.removeItem('isAuthenticated');

				set({ user: null, isAuthenticated: false, error: null, isLoading: false });
			} catch (error) {
				set({ error: "Error logging out", isLoading: false });
				throw error;
			}
		},

		verifyEmail: async (code) => {
			set({ isLoading: true, error: null });
			try {
				const response = await axios.post(`${API_URL}/verify-email`, { code });
				const user = response.data.user;

				// Store updated user and authentication status in localStorage
				localStorage.setItem('user', JSON.stringify(user));
				localStorage.setItem('isAuthenticated', JSON.stringify(true));

				set({ user, isAuthenticated: true, isLoading: false });
				return response.data;
			} catch (error) {
				set({ error: error.response.data.message || "Error verifying email", isLoading: false });
				throw error;
			}
		},

		forgotPassword: async (email) => {
			set({ isLoading: true, error: null });
			try {
				const response = await axios.post(`${API_URL}/forgot-password`, { email });
				set({ message: response.data.message, isLoading: false });
			} catch (error) {
				set({
					isLoading: false,
					error: error.response.data.message || "Error sending reset password email",
				});
				throw error;
			}
		},

		resetPassword: async (token, password) => {
			set({ isLoading: true, error: null });
			try {
				const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
				set({ message: response.data.message, isLoading: false });
			} catch (error) {
				set({
					isLoading: false,
					error: error.response.data.message || "Error resetting password",
				});
				throw error;
			}
		},
	};
});
