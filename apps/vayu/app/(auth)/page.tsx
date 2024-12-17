import Link from 'next/link';

import LoginForm from './ui/form';
import { ImagePlaceholder } from '@suras/ui';

export default function Page() {
	return (
		<section className="min-h-screen w-full overflow-hidden">
			<div className="grid grid-cols-3 overflow-hidden min-h-screen">
				<div className="col-span-2 bg-grey-4 flex items-center justify-center">
					<ImagePlaceholder
						src="/images/bg.png"
						imageClasses="object-cover"
						containerClasses="w-full h-full"
					/>
				</div>
				<div className="col-span-1 bg-white flex flex-col">
					<div className="flex-col flex flex-1  justify-center px-24">
						<ImagePlaceholder
							src="/images/logo.jpg"
							containerClasses="w-32 h-32"
							imageClasses="object-contain"
						/>
						<p className=" text-grey-text3 text-14 mb-16 mt-24">
							Welcome to <span className="text-black font-semibold">Pemilyy</span>
						</p>
						<LoginForm />
					</div>
					<p className="text-12 py-24 px-16 text-center">
						By clicking you agree to our{' '}
						<Link
							href="https://www.pemilyy.com/privacy"
							className="font-semibold text-primary-1"
							target="_blank"
						>
							privacy policy
						</Link>{' '}
						and{' '}
						<Link
							href="https://www.pemilyy.com/terms"
							className="font-semibold text-primary-1"
							target="_blank"
						>
							terms of use
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
