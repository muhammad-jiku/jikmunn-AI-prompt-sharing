'use client';

import React from 'react';
import googleLogo from '../../assets/google.png';
import githubLogo from '../../assets/github.png';
import { signIn } from 'next-auth/react';

const SocialSignIn = () => {
	const handleGoogleLogin = async () => {
		console.log('google sign in');
		try {
			await signIn('google', {
				callbackUrl: '/',
			});
		} catch (err) {
			console.log('google error => ', err);
		}
	};

	const handleGithubLogin = async () => {
		console.log('github sign in');
		try {
			await signIn('github', {
				callbackUrl: '/',
			});
		} catch (err) {
			console.log('github error => ', err);
		}
	};

	return (
		<div className='flex flex-col md:flex-row'>
			<button
				className='bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 py-2 px-4 m-2 rounded-full w-full flex justify-center items-center'
				onClick={handleGoogleLogin}
			>
				Continue with{' '}
				<img
					src={googleLogo.src}
					alt='google'
					className='ml-2'
				/>{' '}
			</button>{' '}
			<button
				className='bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 py-2 px-4 m-2 rounded-full w-full flex justify-center items-center'
				onClick={handleGithubLogin}
			>
				Continue with{' '}
				<img
					src={githubLogo.src}
					alt='github'
					className='ml-2'
				/>{' '}
			</button>
		</div>
	);
};

export default SocialSignIn;
