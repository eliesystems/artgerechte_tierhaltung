import { Prisma, section_enum } from "@prisma/client";
import * as answerService from "../services/answer.service";
import { Request, Response } from "express";

export const createAnswers = async (req: Request, res: Response) => {
	try {
		const answers = req.body;

		if (!Array.isArray(answers) || answers.length === 0) {
			res.status(400).json({ error: "No answers provided" });
			return;
		}

		const sanitizedAnswers: Prisma.answersCreateManyInput[] = answers.map((a) => {
			const sectionEnumValue = Object.values(section_enum).find(
				(value) => value === a.section
			);
		  
			if (!sectionEnumValue) {
			  	throw new Error(`Invalid section value: ${a.section}`);
			}
		  
			const cleanedAnswer: Prisma.answersCreateManyInput = {
				farm_id: String(a.farm_id),
				question_key: a.question_key,
				section: sectionEnumValue,
				string_answer: a.string_answer ?? null,
				string_array_answer: Array.isArray(a.string_array_answer) ? a.string_array_answer : [],
				numeric_answer: a.numeric_answer ?? null,
				numeric_array_answer: Array.isArray(a.numeric_array_answer) ? a.numeric_array_answer : [],
				file_url: a.file_url ?? null,
			};
		  
			return cleanedAnswer;
		});

		const result = await answerService.createAnswers(sanitizedAnswers);

		res.status(201).json({ count: result });
	} catch (err) {
		console.error("Error saving answers:", err);
		res.status(500).json({ error: "Failed to save answers" });
	}
};

export const getAnswers = async (req: Request, res: Response): Promise<void> => {
	try {
		const farmId = req.query.farmId as string;
		const section = (req.query.section as string) || 'resources';

		if (!farmId) {
			res.status(400).json({ error: "farmId is required" });
			return;
		}
		
		const sectionEnumValue = Object.values(section_enum).find(
            (value) => value === section
        );

		if (!sectionEnumValue) {
			res.status(400).json({ error: `Invalid section value: ${section}` });
			return;
		}

		const answers = await answerService.getAnswers(farmId, sectionEnumValue);

		const filteredAnswers = answers.map(answer => {
			const filteredAnswer: any = {};
	  
			if (answer.string_answer) filteredAnswer.string_answer = answer.string_answer;
			if (answer.string_array_answer && answer.string_array_answer.length > 0) filteredAnswer.string_array_answer = answer.string_array_answer;
			if (answer.numeric_answer !== null) filteredAnswer.numeric_answer = answer.numeric_answer;
			if (answer.numeric_array_answer && answer.numeric_array_answer.length > 0) filteredAnswer.numeric_array_answer = answer.numeric_array_answer;
			if (answer.file_url) filteredAnswer.file_url = answer.file_url;
	  
			filteredAnswer.id = answer.id;
			filteredAnswer.farm_id = answer.farm_id;
			filteredAnswer.question_key = answer.question_key;
			filteredAnswer.section = answer.section;
			filteredAnswer.created_at = answer.created_at;
	  
			return filteredAnswer;
		});

		res.json(filteredAnswers);
	} catch (err) {
		res.status(500).json({ err: "Failed to fetch answers" });
	}
};