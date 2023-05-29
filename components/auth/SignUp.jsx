'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import SocialSignIn from './SocialSignIn';

export default function SignUp() {
	const [username, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, email, password);
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
