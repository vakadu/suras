'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

import { otpValidator } from '@suras/utils';
import {
	Button,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@suras/ui';
import { signinAction } from '../../../../../actions';

const schema = z.object({
	otp: z
		.string()
		.min(6, { message: 'Otp should have minimum 6 digits' })
		.max(6, { message: 'Otp cant be more than 6 digits' })
		.regex(otpValidator, { message: 'OTP is not valid' }),
});

export default function Otp() {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			otp: '',
		},
	});
	const { execute, result, isExecuting } = useAction(signinAction);
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = Object.fromEntries(searchParams.entries());

	useEffect(() => {
		if (!result.data) {
			return;
		}

		if (result.data.status === 'SUCCESS') {
			router.replace(
				`${pathname}?stage=2&mobileNumber=${params?.mobileNumber}&token=${result?.data?.data?.accessToken}`
			);
			toast.success('OTP Verified');
		} else {
			toast.error(result.data?.data?.msg);
		}
	}, [form, params?.mobileNumber, pathname, result, router]);

	const onSubmit = async (values: { otp: string }) => {
		execute({
			mobileNumber: params?.mobileNumber,
			otp: values.otp,
		});
	};

	return (
		<div className="max-w-[520px] mx-auto flex justify-center items-center h-full">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-24 w-full">
					<FormField
						control={form.control}
						name="otp"
						render={({ field, fieldState }) => (
							<FormItem className="relative">
								<FormControl>
									<FloatingInput
										label="Enter OTP"
										type="numeric"
										id="otp"
										maxLength={6}
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
						Verify OTP
					</Button>
				</form>
			</Form>
		</div>
	);
}
