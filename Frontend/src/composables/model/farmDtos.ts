export interface CreateFarmDto {
	name: string;
	zip_code: number;
	place: string;
	person_in_charge: string;
}
  
export interface Farm {
	id: string;
	name: string;
	zip_code: number | null;
	place: string | null;
	person_in_charge: string | null;
}