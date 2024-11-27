'use client';

import { getFirestore, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { firebaseApp, Routes } from '../../helpers';
import { Header } from '@agni/components';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	const [value, loading, error] = useDocument(
		doc(getFirestore(firebaseApp), 'layout', 'fimdsCwxe83TX2zwI3i6'),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	const data = value?.data();
	const router = useRouter();

	useEffect(() => {
		if (data?.comingSoon) {
			router.push(Routes.ComingSoon);
		}
	}, [data]);

	return (
		<main className="pt-[80px] flex flex-col">
			<Header />
			{children}
		</main>
	);
};

export default AppLayout;
