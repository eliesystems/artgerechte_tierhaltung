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
    const token = authStore.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { apiClient };