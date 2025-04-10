import { section_enum } from "@prisma/client";
import prisma from "../utils/prisma";
import { Prisma } from "@prisma/client";

export const createAnswers = async (data: Prisma.answersCreateManyInput[]) => {
	return prisma.answers.createMany({ data });
}

export const getAnswers = async (farmId: string, section: section_enum) => {
	return prisma.answers.findMany({
		where: {
		  	farm_id: farmId,
		  	section: section,
		},
	});
}