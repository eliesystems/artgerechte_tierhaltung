import { Request, Response } from 'express';
import { saveUserId } from '../services/user.service';

export const saveUserIdToDb = async (req: Request, res: Response): Promise<void> => {
	try {
		console.log("Saving user to db");

		const userId = (req as any).user?.sub;

		if (!userId) {
			res.status(400).json({ error: 'No user ID found in token' });
			return;
		}

		const user = await saveUserId(userId);
		res.status(200).json({ message: 'User saved/exists in DB', user });
	} catch (error) {
		console.error('Error saving user:', error);
		res.status(500).json({ error: 'Failed to save user' });
	}
};
