'use client';

import { useSelector } from 'react-redux';

import { CartIcon } from '@devas/icons/server';
import { LoginSheet } from '../login/ui';
import { RootState } from '@agni/store/index';

export default function HeaderRight() {
	const auth = useSelector((state: RootState) => state.auth);
	return (
		<div className="flex gap-24">
			<div className="flex items-center gap-8 cursor-pointer">
				<CartIcon width={24} height={24} />
				<span className="text-14 font-medium">Cart</span>
			</div>
			{auth.loggedIn ? <span>My Account</span> : <LoginSheet />}
		</div>
	);
}
