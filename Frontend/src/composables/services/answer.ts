import { apiClient } from "../apiClient";
import type { CreateAnswerDto, Answer, UpdateAnswersDto } from "../model/answerDtos";

export const createAnswers = async (answers: CreateAnswerDto[]) => {
	const response = await apiClient.post<Answer[]>("/answers", answers);
	return response.data;
};

export const getAnswers = async (farmId: string, section: string) => {
	const response = await apiClient.get<Answer[]>("/answers", {
		params: { farmId, section },
	});
	return response.data;
};

export const getAnswersByFarmId = async (farmId: string) => {
	const response = await apiClient.get<Answer[]>("/answers/farmId", {
		params: { farmId },
	});
	return response.data;
}

export const updateAnswers = async (answers: UpdateAnswersDto[]) => {
	const response = await apiClient.patch<Answer[]>("/answers", answers);
	return response.data;
}