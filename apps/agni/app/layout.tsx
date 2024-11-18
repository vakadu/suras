import localFont from 'next/font/local';

import '../assets/css/global.css';
import Header from '../components/header';

export const metadata = {
	title: 'Biggr',
	description: 'Biggr',
};

const sathoshi = localFont({
	src: [
		{
			path: '../assets/fonts/sathoshi/Satoshi-Light.otf',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Medium.otf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Bold.otf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../assets/fonts/sathoshi/Satoshi-Black.otf',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-sathoshi',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${sathoshi.variable} font-sathoshi scroll-smooth`}>
			<body>
				<main className="pt-[80px] flex flex-col">
					<Header />
					{children}
				</main>
			</body>
		</html>
	);
}
