import dynamic from 'next/dynamic';

import Hero from '../../components/home/hero';
import { Spinner } from '@suras/ui';

const Booking = dynamic(() => import('../../components/home/booking'), {
	loading: () => <Spinner />,
});
const Why = dynamic(() => import('../../components/home/why'), {
	loading: () => <Spinner />,
});
const Features = dynamic(() => import('../../components/home/features'), {
	loading: () => <Spinner />,
});
const Contact = dynamic(() => import('../../components/home/contact'), {
	loading: () => <Spinner />,
});
const Services = dynamic(() => import('../../components/home/services'), {
	loading: () => <Spinner />,
});

export default function Page() {
	return (
		<div>
			<Hero />
			<Services />
			<Why />
			<Booking />
			<Features />
			<Contact />
		</div>
	);
}
