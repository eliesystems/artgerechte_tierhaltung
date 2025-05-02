import { Prisma, section_enum } from "@prisma/client";
import * as answerService from "../services/answer.service";
import { Request, Response } from "express";

export const createAnswers = async (req: Request, res: Response) => {
	try {
		const answers = req.body;

		if (!Array.isArray(answers) || answers.length === 0) {
			console.error("No answers provided");
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
		console.info("Saved " + result.length + " Answers");

		res.status(201).json(result);
	} catch (err) {
		console.error("Error saving answers: ", err);
		res.status(500).json({ error: "Failed to save answers" });
	}
};

export const updateAnswers = async (req: Request, res: Response): Promise<void> => {
	try {
		const answers = req.body;

		const sanitizedAnswers = answers.map((a) => {

			const data: Prisma.answersUpdateWithoutFarmInput = {
				string_answer: a.string_answer ?? null,
				string_array_answer: Array.isArray(a.string_array_answer) ? a.string_array_answer : [],
				numeric_answer: a.numeric_answer ?? null,
				numeric_array_answer: Array.isArray(a.numeric_array_answer) ? a.numeric_array_answer : [],
				file_url: a.file_url ?? null,
			};

			return {id: a.id, data: data};
		});

		const result = await Promise.all(
			sanitizedAnswers.map(({ id, data }) => answerService.updateAnswer(id, data))
		);

		console.info("Updated " + result.length + " Answers");
		res.status(200).json(result);
	} catch (error) {
		console.log("Error updating answers: ", error);
		res.status(500).json({ error: "Failed to update answers" });
	}
}

export const getAnswers = async (req: Request, res: Response): Promise<void> => {
	try {
		const farmId = req.query.farmId as string;
		const section = (req.query.section as string) || 'resources';

		if (!farmId) {
			console.error("No FarmId present in Request");
			res.status(400).json({ error: "farmId is required" });
			return;
		}
		
		const sectionEnumValue = Object.values(section_enum).find(
            (value) => value === section
        );

		if (!sectionEnumValue) {
			console.error("Invalid section: " + sectionEnumValue);
			res.status(400).json({ error: "Invalid section value" });
			return;
		}

		const answers = await answerService.getAnswers(farmId, sectionEnumValue);

		const filteredAnswers = answers.map(({ 
			id, farm_id, question_key, section, created_at, 
			string_answer, string_array_answer, numeric_answer, 
			numeric_array_answer, file_url 
		}) => {
			const filtered = {
				id, farm_id, question_key, section, created_at,
				...(string_answer && { string_answer }),
				...(string_array_answer?.length > 0 && { string_array_answer }),
				...(numeric_answer !== null && { numeric_answer }),
				...(numeric_array_answer?.length > 0 && { numeric_array_answer }),
				...(file_url && { file_url })
			};
			return filtered;
		});

		console.info("Fetching " + filteredAnswers.length + " Answers");
		res.json(filteredAnswers);
	} catch (error) {
		console.error("Error fetching answers: ", error);
		res.status(500).json({ error: "Failed to fetch answers" });
	}
};

export const getAnswersByFarmId = async (req: Request, res: Response): Promise<void> => {
	try {
		const farmId = req.query.farmId as string;

		if (!farmId) {
			res.status(400).json({ error: "farmId is required" });
			return;
		}

		const answers = await answerService.getAnswersByFarmId(farmId);
		const filteredAnswers = answers.map(({ 
			id, farm_id, question_key, section, created_at, 
			string_answer, string_array_answer, numeric_answer, 
			numeric_array_answer, file_url 
		}) => {
			const filtered = {
				id, farm_id, question_key, section, created_at,
				...(string_answer && { string_answer }),
				...(string_array_answer?.length > 0 && { string_array_answer }),
				...(numeric_answer !== null && { numeric_answer }),
				...(numeric_array_answer?.length > 0 && { numeric_array_answer }),
				...(file_url && { file_url })
			};
			return filtered;
		});

		console.info("Fetching " + filteredAnswers.length + " Answers");
		res.json(filteredAnswers);
	} catch (error) {
		console.error("Error fetching answers: ", error);
		res.status(500).json({ error: "Failed to fetch answers" });
	}
};