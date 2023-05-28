'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className='mt-16 prompt_layout'>
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState('');
	const [posts, setPosts] = useState([]);

	const handleSearchChange = (e) => {};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('/api/prompt');
			const data = await response.json();

			setPosts(data);
		};

		console.log(posts);

		fetchPosts();
	}, []);

	return (
		<section className='w-full flex-center flex-col'>
			<h1 className='head_text text-center'>
				Discover & Share
				<br className='max-md:hidden' />
				<span className='orange_gradient text-center'> AI-Powered Prompts</span>
			</h1>
			<p className='desc text-center'>
				Promptopia is an open-source AI prompting tool for modern world to
				discover, create and share creative prompts
			</p>
			<section className='feed'>
				<form className='relative w-full flex-center'>
					<input
						type='text'
						placeholder='Search for a tag or a username'
						value={searchText}
						onChange={handleSearchChange}
						required
						className='search_input peer'
					/>
				</form>

				<PromptCardList
					data={posts}
					handleTagClick={() => {}}
				/>
			</section>
		</section>
	);
};

export default Feed;
