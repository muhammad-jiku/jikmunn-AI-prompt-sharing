import Prompt from '@/backend/models/prompt';
import { connectToDB } from '@/backend/utils/database';

export default async function handler(req, res) {
	const { id } = await req.query;
	const { prompt, tag } = await req.body;

	if (req.method === 'GET') {
		try {
			await connectToDB();

			const promptData = await Prompt.findById({ _id: id }).populate('creator');

			if (!promptData)
				return res.status(404).json({
					message: 'Prompt Not Found',
				});

			// console.log('prompt ', promptData);

			res.status(200).json({
				success: true,
				message: 'Prompt Info!',
				data: promptData,
			});
		} catch (error) {
			// console.log(error);
			return res.status(500).json({
				success: false,
				message: 'Something went wrong',
			});
		}
	} else if (req.method == 'PATCH') {
		try {
			await connectToDB();

			// Find the existing prompt by ID
			const existingPrompt = await Prompt.findById({ _id: id });

			if (!existingPrompt) {
				return res.status(404).json({
					message: 'Prompt Not Found',
				});
			}

			// Update the prompt with new data
			existingPrompt.prompt = prompt;
			existingPrompt.tag = tag;

			const savedExistingPrompt = await existingPrompt.save();

			res.status(200).json({
				success: true,
				message: 'Prompt Info updated successfully!',
				data: savedExistingPrompt,
			});
		} catch (error) {
			// console.log(error);
			return res.status(500).json({
				success: false,
				message: 'Something went wrong',
			});
		}
	} else if (req.method === 'DELETE') {
		try {
			await connectToDB();
			// Find the prompt by ID and remove it
			await Prompt.findByIdAndRemove({ _id: id });

			res.status(200).json({
				success: true,
				message: 'Prompt Info deleted successfully!',
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
