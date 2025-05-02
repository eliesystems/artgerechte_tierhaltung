export interface CreateFarmDto {
	name: string;
	zip_code: number | null;
	place: string | null;
	person_in_charge: string | null;
}
  
export interface Farm {
	id: string;
	name: string;
	zip_code: number | null;
	place: string | null;
	person_in_charge: string | null;

	unsynced?: boolean;
}