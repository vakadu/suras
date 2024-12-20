'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Toaster } from '@suras/ui';
import { persistor, store } from '../../core/store';
import { LoadingModal } from '../components';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
				<Toaster closeButton richColors position="bottom-left" />
				<LoadingModal />
			</PersistGate>
		</Provider>
	);
};

export default Providers;
