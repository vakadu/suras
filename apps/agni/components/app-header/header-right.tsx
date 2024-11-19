import { CartIcon } from '@devas/icons/server';
import LoginSheet from './login-sheet';

export default function HeaderRight() {
	return (
		<div className="flex gap-24">
			<div className="flex items-center gap-8 cursor-pointer">
				<CartIcon width={24} height={24} />
				<span className="text-14 font-medium">Cart</span>
			</div>
			<LoginSheet />
		</div>
	);
}
