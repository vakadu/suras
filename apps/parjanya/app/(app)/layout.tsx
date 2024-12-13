import { PropsWithChildren } from 'react';

import { Header, Footer } from '../../components/layout';

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<main>
			<Header />
			{children}
			<Footer />
		</main>
	);
};

export default RootLayout;
