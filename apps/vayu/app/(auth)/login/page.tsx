'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
import { getOtpAction } from '../../../actions';

const schema = z.object({
	mobileNumber: z
		.string()
		.min(10, { message: 'Mobile number should have minimum 10 digits' })
		.max(10, { message: 'Mobile number cant be more than 10 digits' })
		.regex(phoneValidator, { message: 'Phone number is not valid' }),
});

export default function Page() {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			mobileNumber: '',
		},
	});
	const { execute, result, isExecuting } = useAction(getOtpAction);
	const router = useRouter();

	useEffect(() => {
		if (!result.data) {
			return;
		}

		if (result.data.status === 'SUCCESS') {
			toast.success(result.data.msg);
			router.push(`/otp/${form.getValues('mobileNumber')}`);
		} else {
			toast.error(result.data.msg);
		}
	}, [form, result, router]);

	const onSubmit = async (values: { mobileNumber: string }) => {
		const payload = {
			mobileNumber: values.mobileNumber,
		};
		execute(payload);
	};

	return (
		<div>
			<div className="flex items-center gap-24">
				<span className="text-[32px] leading-[42px] font-semibold text-left">
					Get started with your 10 digit mobile number
				</span>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-24">
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
