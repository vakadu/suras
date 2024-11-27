import dynamic from 'next/dynamic';
import { X, ArrowLeft } from 'lucide-react';

import { SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@devas/ui';
import LoginForm from './form';
import { useLogin } from '../context';

const OtpForm = dynamic(() => import('./otp-form'), {
	loading: () => <span>Loading...</span>,
});

export default function ContentSheet() {
	const { showOtp, mobileNumber, toggleOtp } = useLogin();

	const handleBack = () => {
		toggleOtp(false);
	};

	return (
		<SheetContent className="px-16 py-32">
			<SheetHeader className="flex justify-between gap-24">
				{showOtp ? (
					<div
						onClick={handleBack}
						className="cursor-pointer w-32 h-32 flex justify-center items-center"
					>
						<ArrowLeft size={24} />
					</div>
				) : (
					<SheetClose className="cursor-pointer" asChild>
						<X size={32} strokeWidth={1} />
					</SheetClose>
				)}

				<SheetTitle className="!text-32">{!showOtp && 'Login'}</SheetTitle>
			</SheetHeader>
			<SheetDescription></SheetDescription>
			{showOtp ? <OtpForm /> : <LoginForm />}
		</SheetContent>
	);
}
