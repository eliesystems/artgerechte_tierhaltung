export interface CreateAnswerDto {
	farm_id: string;
	question_key: string;
	section: "resources" | "management" | "animal_welfare";
  
	string_answer?: string;
	string_array_answer?: string[];
	numeric_answer?: number;
	numeric_array_answer?: number[];
	file_url?: string;
}

export interface Answer extends CreateAnswerDto {
	id: string;
	created_at: Date;
}