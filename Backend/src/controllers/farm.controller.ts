import { Request, Response } from "express";
import * as farmService from "../services/farm.service";

export const createFarm = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.sub;
        const { name, zip_code, place, person_in_charge } = req.body;

		if (!userId) {
			res.status(400).json({ error: "User ID is missing" });
			return;
		};

        const farm = await farmService.createFarm({
            name,
            zip_code,
            place,
            person_in_charge,
            user: {
                connect: { id: String(userId) }
            },
        });
		console.log('Farm created with ID:', farm.id);

		const sanitizedFarm = (farm: any) => ({
			id: farm.id,
			name: farm.name,
			zip_code: farm.zip_code,
			place: farm.place,
			person_in_charge: farm.person_in_charge
		});

        res.status(201).json(sanitizedFarm(farm));
    } catch (err) {
		console.error('Error in createFarm:', err);
        res.status(500).json({ error: "Failed to create farm" });
    }
};

export const getFarmsByUserId = async (req: Request, res: Response) => {
  	try {
		const userId = (req as any).user.sub;

        if (!userId) {
            res.status(400).json({ error: "User ID is missing" });
            return;
        }

    	const farms = await farmService.getFarmsByUserId(userId);

		const sanitizedFarms = farms.map(farm => ({
			id: farm.id,
			name: farm.name,
			zip_code: farm.zip_code,
			place: farm.place,
			person_in_charge: farm.person_in_charge
		}));

		console.info("Fetching " + sanitizedFarms.length + " Farms");
   		res.json(sanitizedFarms);
  	} catch (err) {
    	res.status(500).json({ error: "Failed to fetch farms" });
  	}
};
