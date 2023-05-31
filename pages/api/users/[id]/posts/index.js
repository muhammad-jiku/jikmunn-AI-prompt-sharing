import Prompt from '@/backend/models/prompt';
import { connectToDB } from '@/backend/utils/database';

// export const GET = async (request, { params }) => {
// 	try {
// 		await connectToDB();

// 		const prompts = await Prompt.find({
// 			creator: params.id,
// 		}).populate('creator');

// 		return new Response(JSON.stringify(prompts), {
// 			status: 200,
// 		});
// 	} catch (error) {
// 		return new Response('Failed to fetch prompts created by user', {
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
			const prompts = await Prompt.find({
				creator: id,
			}).populate('creator');

			console.log('prompts', prompts);

			res.status(200).json({
				success: true,
				message: 'All the prompts!',
				data: prompts,
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
