import Prompt from '@/backend/models/prompt';
import { connectToDB } from '@/backend/utils/database';

// export const GET = async (request, { params }) => {
// 	try {
// 		await connectToDB();

// 		const prompt = await Prompt.findById(params.id).populate('creator');
// 		if (!prompt)
// 			return new Response('Prompt Not Found', {
// 				status: 404,
// 			});

// 		return new Response(JSON.stringify(prompt), {
// 			status: 200,
// 		});
// 	} catch (error) {
// 		return new Response('Internal Server Error', {
// 			status: 500,
// 		});
// 	}
// };

// export const PATCH = async (request, { params }) => {
// 	const { prompt, tag } = await request.json();

// 	try {
// 		await connectToDB();

// 		// Find the existing prompt by ID
// 		const existingPrompt = await Prompt.findById(params.id);

// 		if (!existingPrompt) {
// 			return new Response('Prompt not found', { status: 404 });
// 		}

// 		// Update the prompt with new data
// 		existingPrompt.prompt = prompt;
// 		existingPrompt.tag = tag;

// 		await existingPrompt.save();

// 		return new Response('Successfully updated the Prompts', { status: 200 });
// 	} catch (error) {
// 		return new Response('Error Updating Prompt', { status: 500 });
// 	}
// };

// export const DELETE = async (request, { params }) => {
// 	try {
// 		await connectToDB();

// 		// Find the prompt by ID and remove it
// 		await Prompt.findByIdAndRemove(params.id);

// 		return new Response('Prompt deleted successfully', {
// 			status: 200,
// 		});
// 	} catch (error) {
// 		return new Response('Error deleting prompt', {
// 			status: 500,
// 		});
// 	}
// };

export default async function handler(req, res) {
	const { id } = req.query;
	console.log(id);

	if (req.method === 'GET') {
		// Process a POST request
		try {
			await connectToDB();
			const prompt = await Prompt.findById({ _id: id }).populate('creator');

			if (!prompt)
				return new Response('Prompt Not Found', {
					status: 404,
				});

			console.log('prompt ', prompt);

			res.status(200).json({
				success: true,
				message: 'Prompt Info!',
				data: prompt,
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
