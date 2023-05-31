'use client';

import { UserProfile } from '@/components';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Page = ({ params }) => {
	const searchParams = useSearchParams();
	const userName = searchParams.get('name');
	const { id } = params;

	return (
		<UserProfile
			id={id}
			userName={userName}
		/>
	);
};

export default Page;
