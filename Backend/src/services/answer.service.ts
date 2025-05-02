import { section_enum } from "@prisma/client";
import prisma from "../utils/prisma";
import { Prisma } from "@prisma/client";

export const createAnswers = async (data: Prisma.answersCreateManyInput[]) => {
	return prisma.answers.createManyAndReturn({ data });
}

export const getAnswers = async (farmId: string, section: section_enum) => {
	return prisma.answers.findMany({
		where: {
		  	farm_id: farmId,
		  	section: section,
		},
	});
}

export const getAnswersByFarmId = async (farmId: string) => {
	return prisma.answers.findMany({
		where: {
			farm_id: farmId,
		}
	});
}

export const updateAnswer = async(answerId: number, updateData: Prisma.answersUpdateWithoutFarmInput) => {
	return prisma.answers.update({
		where: {
			id: answerId,
		},
		data: updateData,
	});
}

export const updateAnswers = async (answerIds: number[], newAnswers: Prisma.answersUpdateManyMutationInput) => {
	return prisma.answers.updateMany({
		where: {
			id: {
				in: answerIds,
			},
		},
		data: newAnswers,
	});
}