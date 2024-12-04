'use client';

import { useDispatch, useSelector } from 'react-redux';
import { UserRound } from 'lucide-react';

import { Sheet, SheetTrigger } from '@devas/ui';
import { LoginProvider } from '../context';
import ContentSheet from './sheet-content';
import { RootState } from '../../../store';
import { handleLoginSidebar } from '../../../store/layout-reducer';

export function LoginSheet() {
	const isLoginSidebarOpen = useSelector((state: RootState) => state.layout.loginSidebar);
	const dispatch = useDispatch();

	const handleSidebarChange = (isOpen: boolean) => {
		dispatch(handleLoginSidebar(isOpen));
	};

	return (
		<LoginProvider>
			<Sheet open={isLoginSidebarOpen} onOpenChange={handleSidebarChange}>
				<SheetTrigger asChild>
					<div className="flex items-center gap-6 cursor-pointer">
						<UserRound width={18} height={18} />
						<span className="text-14 font-medium">Login</span>
					</div>
				</SheetTrigger>
				<ContentSheet />
			</Sheet>
		</LoginProvider>
	);
}

export default LoginSheet;
