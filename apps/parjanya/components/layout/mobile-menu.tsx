import React, { useState } from 'react';
import { MenuIcon } from 'lucide-react';

import Menu from './menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@suras/ui';

const MobileMenu = () => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={() => setOpen(!open)}>
			<DialogTrigger>
				<MenuIcon />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogDescription className="mx-16">
						<Menu open={open} setOpen={setOpen} />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default MobileMenu;
