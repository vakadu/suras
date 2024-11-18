import { Header } from '@agni/components';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="pt-[80px] flex flex-col">
			<Header />
			{children}
		</main>
	);
};

export default AppLayout;
