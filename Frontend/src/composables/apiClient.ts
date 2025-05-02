import axios from "axios";
import { useAuthStore } from "@/stores/authStore";  


const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
	  'Content-Type': 'application/json',
	},
});

apiClient.interceptors.request.use(async (config) => {
	const authStore = useAuthStore();

	if (authStore.keycloak) {
		try {
			await authStore.refreshToken();
			const token = authStore.keycloak.token;

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		} catch (error) {
			console.error("Token refresh failed in request", error);
			authStore.logout();
		}
	}

	return config;
});

export { apiClient };