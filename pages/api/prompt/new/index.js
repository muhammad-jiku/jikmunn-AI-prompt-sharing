import Prompt from '@/backend/models/prompt';
import { connectToDB } from '@/backend/utils/database';

export default async function handler(req, res) {
	const { userId, prompt, tag } = await req.body;

	if (req.method === 'POST') {
		// Process a POST request
		try {
			await connectToDB();
			console.log('backend prompt info', { userId, prompt, tag });

			const newPrompt = await new Prompt({
				creator: userId,
				prompt,
				tag,
			});

			const savedPrompt = await newPrompt.save();

			res.status(201).json({
				success: true,
				message: 'Prompt added successfully!!',
				data: savedPrompt,
			});
		} catch (error) {
			console.log(error);
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
