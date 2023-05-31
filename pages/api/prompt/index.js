import Prompt from '@/backend/models/prompt';
import { connectToDB } from '@/backend/utils/database';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		// get all prompts
		try {
			await connectToDB();
			const prompts = await Prompt.find({}).populate('creator');

			res.status(200).json({
				success: true,
				message: 'All the prompts!',
				data: prompts,
			});
		} catch (error) {
			// console.log(error);
			return res.status(500).json({
				success: false,
				message: 'Something went wrong',
			});
		}
	} else {
		return res.status(500).json({
			message: 'Something went wrong',
		});
	}
}
