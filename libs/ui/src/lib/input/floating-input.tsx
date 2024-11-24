import { InputHTMLAttributes } from 'react';
import Input from './input';
import { Label } from '../label';

export interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	id: string;
	className?: string;
	isError?: boolean;
}

export const FloatingInput = ({
	type,
	label,
	id,
	className = '',
	isError = false,
	...props
}: FloatingInputProps) => {
	return (
		<div className="group relative text-14">
			<Label
				htmlFor={id}
				className={`origin-start absolute top-1/2 block -translate-y-1/2 cursor-text transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground px-4 mx-6 bg-background ${
					isError && '!text-destructive'
				}`}
			>
				{label}
			</Label>
			<Input
				id={id}
				type={type}
				className={`${
					isError &&
					'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
				} ${className}`}
				placeholder=""
				{...props}
			/>
		</div>
	);
};

export default FloatingInput;
