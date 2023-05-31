'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from './Form';

const UpdatePrompt = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const promptId = searchParams.get('id');

	const [submitting, setIsSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: '',
		tag: '',
	});

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`/api/prompt/${promptId}`);
			const data = await response.json();

			setPost({
				prompt: data.data.prompt,
				tag: data.data.tag,
			});
		};

		if (promptId) getPromptDetails();
	}, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		if (!promptId) return alert('Missing PromptId!');

		const updatePrompt = {
			prompt: post.prompt,
			tag: post.tag,
		};

		try {
			await fetch(`/api/prompt/${promptId}`, {
				method: 'PATCH',
				headers: {
					// authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatePrompt),
			})
				.then((res) => {
					console.log('res ', res);
					return res.json();
				})
				.then((data) => {
					if (data?.success) {
						console.log('prompt updated data ', data);
						console.log('prompt updated data message', data?.message);
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
			type='Edit'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	);
};

export default UpdatePrompt;
