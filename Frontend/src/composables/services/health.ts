import { apiClient } from "../apiClient";

export const healthCheck = async (): Promise<boolean> => {
    try {
        const { status } = await apiClient.get("/health");

        return status === 200;
    } catch (error) {
        return false;
    }

};