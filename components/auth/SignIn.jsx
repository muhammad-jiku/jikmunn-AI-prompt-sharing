'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import SocialSignIn from './SocialSignIn';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(email, password);

		try {
			const existedUser = {
				email,
				password,
			};

			const data = await signIn('credentials', {
				redirect: false,
				email: existedUser?.email,
				password: existedUser?.password,
				callbackUrl: '/',
				redirect: false,
			});

			// console.log('credentials data', data);
			if (data?.ok) {
				router.push(data?.url);
			}
		} catch (err) {
			console.log('sign in err', err);
		}
	};

	return (
		<div className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
			<form onSubmit={handleSubmit}>
				<label className='my-2'>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Email
					</span>

					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type='email'
						placeholder='Email'
						required
						className='form_input'
					/>
				</label>
				<label className='my-2'>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Password
					</span>

					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type='password'
						placeholder='Password'
						required
						className='form_input'
					/>
				</label>

				<div className='flex-end mx-3 my-2 gap-4'>
					<button
						type='submit'
						className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
					>
						Sign In
					</button>
				</div>
				<p className='text-center font-bold'>
					Don't have an account?
					<Link href={`/sign-up`}>
						<span className='text-primary cursor-pointer'> sign up now!</span>
					</Link>
				</p>
			</form>
			<div>
				<SocialSignIn />
			</div>
		</div>
	);
}
