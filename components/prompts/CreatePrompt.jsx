'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from './Form';

const CreatePrompt = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [submitting, setIsSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: '',
		tag: '',
	});

	const createPrompt = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		const newPrompt = {
			prompt: post.prompt,
			userId: session?.user.id,
			tag: post.tag,
		};

		try {
			await fetch('/api/prompt/new', {
				method: 'POST',
				headers: {
					// authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newPrompt),
			})
				.then((res) => {
					// console.log('res ', res);
					return res.json();
				})
				.then((data) => {
					if (data?.success) {
						// console.log('prompt data ', data);
						// console.log('prompt data message', data?.message);
						router.push('/');
					} else {
						console.log('Something went wrong!');
					}
				})
				.catch((err) => {
					console.log('create prompt error', err);
				});
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form
			type='Create'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	);
};

export default CreatePrompt;
