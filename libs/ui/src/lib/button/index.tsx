import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '../../utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-8 whitespace-nowrap rounded-8 text-14 font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-24 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: 'bg-brand text-primary-foreground shadow hover:bg-brand/90',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline:
					'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-brand underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-54 px-12',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'h-9 w-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	loading?: boolean;
	loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			loading = false,
			loadingText = 'Submitting...',
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button';

		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size, className }),
					loading && 'opacity-60 cursor-not-allowed'
				)}
				ref={ref}
				disabled={loading || props.disabled}
				{...props}
			>
				{loading ? (
					<div className="flex gap-8 items-center">
						<Loader2 className="animate-spin" />
						<span className="font-medium text-14">{loadingText}</span>
					</div>
				) : (
					props.children
				)}
			</Comp>
		);
	}
);
Button.displayName = 'DefaultButton';

export { Button, buttonVariants };
