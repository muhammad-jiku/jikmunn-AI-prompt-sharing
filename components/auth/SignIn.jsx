'use client';

import React from 'react';

export default function SignIn() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, password);
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
			>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Email
					</span>

					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type='text'
						placeholder='email'
						required
						className='form_input'
					/>
				</label>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700'>
						Password
					</span>

					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type='text'
						placeholder='#Tag'
						required
						className='form_input'
					/>
				</label>

				<div className='flex-end mx-3 mb-5 gap-4'>
					<button
						type='submit'
						className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
					>
						Sign In
					</button>
				</div>
			</form>
		</div>
	);
}
