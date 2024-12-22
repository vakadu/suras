'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { phoneValidator } from '@suras/utils';
import {
	Button,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@suras/ui';
import { getOtpAction } from '../../../../../actions';

const schema = z.object({
	mobileNumber: z
		.string()
		.min(10, { message: 'Mobile number should have minimum 10 digits' })
		.max(10, { message: 'Mobile number cant be more than 10 digits' })
		.regex(phoneValidator, { message: 'Phone number is not valid' }),
});

export default function Login() {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			mobileNumber: '',
		},
	});
	const { execute, result, isExecuting } = useAction(getOtpAction);
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		if (!result.data) {
			return;
		}

		if (result.data.status === 'SUCCESS') {
			router.replace(`${pathname}?stage=1&mobileNumber=${form.getValues('mobileNumber')}`);
			toast.success(result.data.msg);
		} else {
			toast.error(result.data.msg);
		}
	}, [form, pathname, result, router]);

	const onSubmit = async (values: { mobileNumber: string }) => {
		const payload = {
			mobileNumber: values.mobileNumber,
		};
		execute(payload);
	};

	return (
		<div className="max-w-[520px] mx-auto flex flex-col justify-center items-center h-full">
			<div className="mb-24 text-24 font-semibold text-center">
				Please enter your 10 digit mobile number to proceed
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-24 w-full">
					<FormField
						control={form.control}
						name="mobileNumber"
						render={({ field, fieldState }) => (
							<FormItem className="relative">
								<FormControl>
									<FloatingInput
										label="Enter your Mobile Number"
										type="numeric"
										id="mobileNumber"
										maxLength={10}
										isError={!!fieldState.error}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						loading={isExecuting}
						disabled={isExecuting}
						loadingText="Sending Otp"
						type="submit"
						className="w-full mt-24"
					>
						Get OTP
					</Button>
				</form>
			</Form>
		</div>
	);
}
