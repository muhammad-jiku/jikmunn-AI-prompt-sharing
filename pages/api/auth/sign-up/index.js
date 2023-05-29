import User from '@/backend/models/user';
import { connectToDB } from '@/backend/utils/database';
import bcrypt from 'bcryptjs';

export const POST = async (request) => {
	const { username, email, password } = await request.json();

	try {
		await connectToDB();

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

		await newUser.save();
		return new Response(JSON.stringify(newUser), {
			status: 201,
		});
	} catch (error) {
		return new Response('Failed to create a new user', {
			status: 500,
		});
	}
};
