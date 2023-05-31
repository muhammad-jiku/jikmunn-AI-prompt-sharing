import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: [true, 'Email already exists!'],
			required: [true, 'Email is required!'],
		},
		password: {
			type: String,
			minLength: [6, 'Invalid password length!'],
			// required: [true, 'Password is required!'],
		},
		username: {
			type: String,
			required: [true, 'Username is required!'],
			// match: [
			// 	/^(?=.{8,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			// 	'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
			// ],
		},
		image: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
