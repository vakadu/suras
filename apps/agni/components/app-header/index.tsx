import { ImagePlaceholder } from '@devas/ui';
import HeaderRight from './header-right';

export function Header() {
	return (
		<header className="shadow-base fixed z-50 w-full h-[80px] top-0 left-0 right-0 bottom-0 bg-white">
			<div className="max-w-[1200px] min-w-[1200px] mx-auto h-[80px]">
				<div className="flex justify-between items-center h-full">
					<div>
						<ImagePlaceholder
							src="/images/logo.jpg"
							containerClasses="w-[120px] h-[80px]"
							imageClasses="rounded-full object-contain"
						/>
					</div>
					<HeaderRight />
				</div>
			</div>
		</header>
	);
}

export default Header;
