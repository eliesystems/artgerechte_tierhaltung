import { apiClient } from "../apiClient";
import type { CreateAnswerDto, Answer } from "../model/answerDtos";

export const createAnswers = async (answers: CreateAnswerDto[]) => {
	const response = await apiClient.post("/answers", answers);
	return response.data;
};

export const getAnswers = async (farmId: string, section: string) => {
	const response = await apiClient.get<Answer[]>("/answers", {
		params: { farmId, section },
	});
	return response.data;
}