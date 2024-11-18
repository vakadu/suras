'use client';

import { useDispatch, useSelector } from 'react-redux';

import { CartIcon, UserIcon } from '@devas/icons/server';
import { RootState } from '@agni/store/index';
import { handleLoginSidebar } from '@agni/store/layout-reducer';

export default function HeaderRight() {
	const isOpen = useSelector((state: RootState) => state.layout);
	const dispatch = useDispatch();

	const handleLogin = (val: boolean) => {
		dispatch(handleLoginSidebar(val));
	};

	return (
		<div className="flex gap-24">
			<div className="flex items-center gap-8 cursor-pointer">
				<CartIcon width={24} height={24} />
				<span className="text-14 font-medium">Cart</span>
			</div>
			<div
				onClick={() => handleLogin(true)}
				className="flex items-center gap-8 cursor-pointer"
			>
				<UserIcon width={24} height={24} />
				<span className="text-14 font-medium">Login</span>
			</div>
		</div>
	);
}
