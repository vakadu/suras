'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import { Spinner } from '@suras/ui';

const Login = dynamic(() => import('./ui/login'), {
	loading: () => <Spinner />,
});

const Otp = dynamic(() => import('./ui/otp'), {
	loading: () => <Spinner />,
});

const Deactivate = dynamic(() => import('./ui/deactivate'), {
	loading: () => <Spinner />,
});

export default function Page() {
	const searchParams = useSearchParams();
	const params = Object.fromEntries(searchParams.entries());
	const { stage } = params;

	return (
		<div className="pt-[72px] h-screen container">
			{!stage && <Login />}
			{stage === '1' && <Otp />}
			{stage === '2' && <Deactivate />}
		</div>
	);
}
