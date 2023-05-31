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
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState([]);
	const [allPosts, setAllPosts] = useState([]);

	const fetchPosts = async () => {
		const response = await fetch('/api/prompt');
		const data = await response.json();

		setAllPosts(data?.data);
	};

	useEffect(() => {
		console.log(allPosts);

		fetchPosts();
	}, []);

	const filterPrompts = (searchtext) => {
		const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
		return allPosts.filter(
			(item) =>
				regex.test(item.creator.username) ||
				regex.test(item.tag) ||
				regex.test(item.prompt)
		);
	};

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value); // debounce method
		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterPrompts(e.target.value);
				setSearchedResults(searchResult);
			}, 500)
		);
	};

	const handleTagClick = (tagName) => {
		setSearchText(tagName);

		const searchResult = filterPrompts(tagName);
		setSearchedResults(searchResult);
	};

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

				{/* All Prompts */}
				{searchText ? (
					<PromptCardList
						data={searchedResults}
						handleTagClick={handleTagClick}
					/>
				) : (
					<PromptCardList
						data={allPosts}
						handleTagClick={handleTagClick}
					/>
				)}
			</section>
		</section>
	);
};

export default Feed;
