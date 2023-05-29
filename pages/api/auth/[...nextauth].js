import User from '@/backend/models/user';
import { connectToDB } from '@/backend/utils/database';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			async authorize(credentials, req) {
				await connectToDB();

				const { email, password } = credentials;

				const user = await User.findOne({ email }).select('+password');

				if (!user) {
					throw new Error('Invalid Email or Password');
				}

				const isPasswordMatched = await bcrypt.compare(password, user.password);

				if (!isPasswordMatched) {
					throw new Error('Invalid Email or Password');
				}

				return user;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			console.log('jwt callback token', token);
			console.log('jwt callback user', user);
			user && (token.user = user);
			return token;
		},
		async session({ session, token, user }) {
			console.log('session callback no.1  ', session);
			console.log('session token callback ', token);
			console.log('session user callback ', user);
			// Send properties to the client, like an access_token and user id from a provider.
			// store the user id from MongoDB to session
			session.user = token.user;
			// delete password from session
			delete session?.user?.password;

			console.log('session callback no.2 ', session);
			const sessionUser = await User.findOne({ email: session.user.email });
			session.user.id = sessionUser._id.toString();

			return session;
		},
		async signIn({ user, account, profile, email, credentials }) {
			console.log('sign in user callback  ', user);
			console.log('sign in account callback ', account);
			console.log('sign in profile callback ', profile);
			console.log('sign in email callback ', email);
			console.log('sign in credentials callback ', credentials);
			if (account.provider === 'google') {
				try {
					await connectToDB();

					// check if user already exists
					const userExists = await User.findOne({ email: profile.email });

					// if not, create a new document and save user in MongoDB
					if (!userExists) {
						await User.create({
							email: profile.email,
							username: profile.name.replace(' ', '').toLowerCase(),
							image: profile.picture,
						});
					}

					return true;
				} catch (error) {
					console.log('Error checking if user exists: ', error.message);
					return false;
				}
			}
			return true;
		},
	},
	pages: {
		signIn: '/sign-in',
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
	},
});

export { handler as GET, handler as POST };
