'use client';

import { Toaster } from '@suras/ui';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{children}
			<Toaster closeButton richColors position="bottom-left" />
		</>
	);
};

export default Providers;
