'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import SocialSignIn from './SocialSignIn';
import { useRouter } from 'next/navigation';

export default function SignUp() {
	const router = useRouter();

	const [username, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(username, email, password);

		const newUser = {
			username,
			email,
			password,
		};

		// sign up method
		await fetch('/api/auth/sign-up', {
			method: 'POST',
			headers: {
				// authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUser),
		})
			.then((res) => {
				console.log('res ', res);
				return res.json();
			})
			.then((data) => {
				if (data?.success) {
					console.log('sign up data ', data);
					console.log('sign up data message', data?.message);
					router.push('/');
				} else {
					console.log('Something went wrong!');
				}
			})
			.catch((err) => {
				console.log('sign up err', err);
			});
	};

	return (
		<div className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
			<form onSubmit={handleSubmit}>
				<label className='my-2'>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Username
					</span>

					<input
						value={username}
						onChange={(e) => setUserName(e.target.value)}
						type='text'
						placeholder='Username'
						required
						className='form_input'
					/>
				</label>
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
						Sign Up
					</button>
				</div>
				<p className='text-center font-bold'>
					Already have an account?
					<Link href={`/sign-in`}>
						<span className='text-primary cursor-pointer'> sign in now!</span>
					</Link>
				</p>
			</form>
			<div>
				<SocialSignIn />
			</div>
		</div>
	);
}
