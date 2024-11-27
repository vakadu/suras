'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getFirestore, doc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';

import { Button, ImagePlaceholder } from '@devas/ui';
import { firebaseApp, Routes } from '../../helpers/index';

export default function Page() {
	const db = getFirestore(firebaseApp);

	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async () => {
		if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
			setError('Please enter a valid email address');
			return;
		}

		setIsSubmitting(true);
		setError('');
		setSuccess(false);

		try {
			const emailsDocRef = doc(db, 'coming-soon', 'emails');
			const emailData = {
				email,
				timestamp: Timestamp.now(),
			};
			await updateDoc(emailsDocRef, {
				emails: arrayUnion(emailData),
			});

			setSuccess(true);
			setEmail('');
		} catch (err) {
			console.error(err);
			setError('Failed to save email. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen">
			<div className="xl:absolute left-0 top-0 w-full">
				<div className="flex flex-wrap justify-between items-center py-6 container">
					<div>
						<Link href="/">
							<ImagePlaceholder
								src="/images/logo.jpg"
								containerClasses="w-[120px] h-[80px]"
								imageClasses="rounded-full object-contain"
							/>
						</Link>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="flex justify-between flex-wrap items-center min-h-screen">
					<div className="max-w-[500px] space-y-24">
						<div className="relative flex space-x-12 items-center text-2xl text-slate-900 dark:text-white">
							<span className="inline-block w-[25px] bg-black-1 h-[1px]"></span>
							<span>Coming soon</span>
						</div>
						<div className="xl:text-[70px] xl:leading-[70px] text-4xl font-semibold text-slate-900 dark:text-white">
							Get notified when we launch
						</div>
						<div>
							<div className="bg-grey-1 flex items-center px-12 rounded">
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
									className="flex-1 bg-transparent h-full block w-full py-16 placeholder:text-secondary-500 text-base focus:outline-none focus:ring-0"
								/>
								<div className="flex-none">
									<Button
										type="button"
										size="sm"
										className="px-12"
										onClick={handleSubmit}
										disabled={isSubmitting}
									>
										<span className="text-12 text-white">
											{isSubmitting ? 'Submitting...' : 'Notify me'}
										</span>
									</Button>
								</div>
							</div>
							{success && (
								<p className="text-green-500 mt-4 text-12">
									Email saved successfully!
								</p>
							)}
							{error && <p className="text-red-500 mt-4 text-12">{error}</p>}
						</div>
					</div>
					<div>
						<img src="/images/coming-soon.svg" alt="" />
					</div>
				</div>
			</div>
			<div className="xl:fixed bottom-0 w-full">
				<div className="container">
					<div className="md:flex justify-between items-center flex-wrap space-y-4 py-6">
						<div></div>
						<div>
							<ul className="flex md:justify-start justify-center space-x-12">
								<li>
									<Link
										href={Routes.Privacy}
										className="text-slate-500 dark:text-slate-400 text-sm transition duration-150 hover:text-slate-900"
									>
										Privacy policy
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
