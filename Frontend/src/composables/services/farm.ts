import { apiClient } from "../apiClient";
import type { CreateFarmDto, Farm } from "../model/farmDtos";

export const createFarm = async (farm: CreateFarmDto) => {
    const response = await apiClient.post("/farms", farm);
    return response.data;
};

export const getFarms = async () => {
    const response = await apiClient.get<Farm[]>("/farms");
    return response.data;
};