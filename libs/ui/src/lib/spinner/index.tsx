import { ImagePlaceholder } from '../image';

export function Spinner() {
	return (
		<div className="relative w-[42px] h-[42px] flex justify-center items-center bg-white rounded-full shadow-base mx-auto">
			<ImagePlaceholder
				src="/images/logo.jpg"
				containerClasses="h-[32px] w-[32px] rounded-full"
				imageClasses="object-contain p-6"
			/>
			<div className="absolute inset-0 rounded-full border-2 border-t-primary-1 border-transparent animate-spin"></div>
		</div>
	);
}

export default Spinner;
