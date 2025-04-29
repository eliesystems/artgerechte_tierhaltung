interface BaseAnswer {
	string_answer?: string;
	string_array_answer?: string[];
	numeric_answer?: number;
	numeric_array_answer?: number[];
	file_url?: string;
}

export interface CreateAnswerDto extends BaseAnswer {
	farm_id: string;
	question_key: string;
	section: "resources" | "management" | "animal_welfare";
}

export interface Answer extends CreateAnswerDto {
	id: number;
	created_at: Date;
}

export interface UpdateAnswersDto extends BaseAnswer {
	id: number;
}