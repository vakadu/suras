'use client';

import { useDispatch, useSelector } from 'react-redux';
import { UserRound, X } from 'lucide-react';
import dynamic from 'next/dynamic';

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@devas/ui';
import { RootState } from '@agni/store/index';
import { handleLoginSidebar } from '@agni/store/layout-reducer';
import LoginForm from '../login/form';

const OtpForm = dynamic(() => import('../login/otp-form'), {
	loading: () => <span>Loading...</span>,
});

export default function LoginSheet() {
	const isLoginSidebarOpen = useSelector((state: RootState) => state.layout.loginSidebar);
	const isOtpShown = useSelector((state: RootState) => state.layout.showOtp);
	const dispatch = useDispatch();

	const handleSidebarChange = (isOpen: boolean) => {
		dispatch(handleLoginSidebar(isOpen));
	};

	return (
		<Sheet open={isLoginSidebarOpen} onOpenChange={handleSidebarChange}>
			<SheetTrigger asChild>
				<div className="flex items-center gap-6 cursor-pointer">
					<UserRound width={18} height={18} />
					<span className="text-14 font-medium">Login</span>
				</div>
			</SheetTrigger>
			<SheetContent className="px-16 py-32">
				<SheetHeader className="flex justify-between gap-24">
					<SheetClose className="cursor-pointer" asChild>
						<X size={32} strokeWidth={1} />
					</SheetClose>
					<SheetTitle className="!text-32">Login</SheetTitle>
				</SheetHeader>
				<SheetDescription></SheetDescription>
				{isOtpShown ? <OtpForm /> : <LoginForm />}
			</SheetContent>
		</Sheet>
	);
}
