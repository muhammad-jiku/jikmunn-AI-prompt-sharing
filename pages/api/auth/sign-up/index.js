import User from '@/backend/models/user';
import { connectToDB } from '@/backend/utils/database';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
	const { username, email, password } = await req.body;

	if (req.method === 'POST') {
		// Process a POST request
		try {
			await connectToDB();
			console.log('backend info', { username, email, password });
			const checkExistingUser = await User.findOne({ email });

			if (checkExistingUser)
				return res.status(422).json({
					message: 'User Already Exists...!',
					data: checkExistingUser,
				});

			const hashedPassword = await bcrypt.hash(password, 12);
			const newUser = await new User({
				username,
				email,
				password: hashedPassword,
			});

			const savedUser = await newUser.save();
			// return new Response(JSON.stringify(newUser), {
			// 	status: 201,
			// });
			console.log(savedUser);
			res.status(201).json({
				success: true,
				message: 'User added successfully!!',
				data: savedUser,
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
