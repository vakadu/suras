import localFont from 'next/font/local';
import dynamic from 'next/dynamic';

import '../assets/css/global.css';
const Providers = dynamic(() => import('../core/services/providers'));

export const metadata = {
	title: 'Pemilyy - Your Digital Pet Clinic Companion',
	description: 'Transitioning Your Pet Clinic into the Digital Age with Our Advanced Platform',
	themeColor: '#ffffff',
	keywords: [
		'pemilyy',
		'pemily',
		'pemil',
		'pets',
		'cats',
		'dogs',
		'animals',
		'animal',
		'pet family',
		'family',
	],
	icons: {
		icon: [
			{ rel: 'icon', url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ rel: 'icon', url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
			{ rel: 'icon', url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
		],
		apple: [
			{ rel: 'apple-touch-icon', url: '/favicon/apple-icon-57x57.png', sizes: '57x57' },
			{ rel: 'apple-touch-icon', url: '/favicon/apple-icon-60x60.png', sizes: '60x60' },
			{ rel: 'apple-touch-icon', url: '/favicon/apple-icon-72x72.png', sizes: '72x72' },
			{ rel: 'apple-touch-icon', url: '/favicon/apple-icon-76x76.png', sizes: '76x76' },
			{ rel: 'apple-touch-icon', url: '/favicon/apple-icon-120x120.png', sizes: '120x120' },
			{ rel: 'apple-touch-icon', url: '/favicon/apple-icon-144x144.png', sizes: '144x144' },
			{ rel: 'apple-touch-icon', url: '/favicon/apple-icon-152x152.png', sizes: '152x152' },
			{ rel: 'apple-touch-icon', url: '/favicon/apple-icon-180x180.png', sizes: '180x180' },
		],
		other: [
			{ rel: 'manifest', url: '/favicon/manifest.json' },
			{ rel: 'msapplication-TileImage', url: '/favicon/ms-icon-144x144.png' },
		],
	},
	generator: 'Next.js',
	applicationName: 'Pemilyy',
	referrer: 'origin-when-cross-origin',
	authors: [{ name: 'Vinod Kumar', url: 'https://vakaduvinod.in' }, { name: 'Avishek Singh' }],
	creator: 'Pemilyy',
	publisher: 'Pemilyy',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		title: 'Pemilyy - Your Digital Pet Clinic Companion',
		description:
			'Transitioning Your Pet Clinic into the Digital Age with Our Advanced Platform',
		url: 'https://pemilyy.com',
		siteName: 'Pemilyy',
		images: [
			{
				url: '/favicon/android-chrome-512x512.png',
				width: 512,
				height: 512,
			},
		],
		locale: 'en_US',
		type: 'website',
	},
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
	preload: true,
	display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${sathoshi.variable} font-sathoshi scroll-smooth`}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
