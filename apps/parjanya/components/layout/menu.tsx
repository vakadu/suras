import React from 'react';
import Link from 'next/link';

const Menu = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
	// const { scrollToBottom } = useScrollTop();

	return (
		<div className="px-16 lg:px-0 flex flex-col lg:flex-row h-full">
			<div className="flex-1 gap-24 lg:gap-[60px] items-start flex flex-col lg:flex-row lg:items-center lg:justify-center">
				<Link
					className="text-18 hover:text-brand lg:text-16 lg:leading-24 block lg:inline-block lg:w-auto w-full"
					href="/about"
				>
					About Us
				</Link>
				<Link
					className="text-18 hover:text-brand lg:text-16 lg:leading-24 lg:inline-block lg:w-auto block w-full"
					href="#services"
					scroll={false}
					onClick={() => setOpen(!open)}
				>
					Services
				</Link>
				<Link
					className="text-18 hover:text-brand lg:text-16 lg:leading-24 lg:inline-block lg:w-auto block w-full"
					href="#why"
					onClick={() => setOpen(!open)}
				>
					Why Pemilyy
				</Link>
				<Link
					className="text-18 hover:text-brand lg:text-16 lg:leading-24 lg:inline-block lg:w-auto block w-full"
					href="#features"
					onClick={() => setOpen(!open)}
				>
					Features
				</Link>
				<Link
					className="text-18 hover:text-brand lg:text-16 lg:leading-24 lg:inline-block lg:w-auto block w-full"
					href="#contact"
					onClick={() => setOpen(!open)}
				>
					Contact Us
				</Link>
			</div>
			{/* <Button onClick={scrollToBottom} size="medium" className="hidden lg:block">
				Contact Us
			</Button> */}
		</div>
	);
};

export default Menu;
