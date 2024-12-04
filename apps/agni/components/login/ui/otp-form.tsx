'use client';

import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';

import {
	FloatingInput,
	Button,
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from '@devas/ui';
import { useLogin } from '../context';
import { userLogin } from '../../../actions/login';
import { otpValidator } from '@devas/utils';
import { handleLoginSidebar } from '../../../store/layout-reducer';
import { authenticateUser } from '../../../store/auth';
import { AppDispatch } from '../../../store';

const schema = z.object({
	otp: z
		.string()
		.length(6, 'OTP must be exactly 6 digits')
		.regex(otpValidator, 'OTP is not valid'),
});

export function OtpForm() {
	const { mobileNumber, toggleOtp } = useLogin();
	const { execute, result, isExecuting } = useAction(userLogin);
	const dispatch = useDispatch<AppDispatch>();

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			otp: '',
		},
	});

	useEffect(() => {
		if (!result?.data) return;
		const { status, msg } = result.data;
		if (status === 'error') {
			form.setError('otp', { type: 'manual', message: msg });
		} else {
			dispatch(
				authenticateUser({
					token: result?.data?.token?.accessToken as string,
				})
			);
			toast.success('Logged In!');
			dispatch(handleLoginSidebar(false));
			toggleOtp(false);
		}
	}, [dispatch, form, result, toggleOtp]);

	const onSubmit = async (values: any) => {
		const payload = {
			mobileNumber: mobileNumber as string,
			otp: values?.otp,
		};
		execute(payload);
	};

	return (
		<div>
			<div className="text-14">
				OTP sent to <span className="font-medium">+91 - {mobileNumber}</span>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-24 pt-42">
					<FormField
						control={form.control}
						name="otp"
						render={({ field, fieldState }) => (
							<FormItem>
								<FormControl>
									<FloatingInput
										label="Enter your 6 digit OTP"
										type="numeric"
										id="otp"
										placeholder=""
										isError={!!fieldState.error}
										maxLength={6}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={!form.formState.isValid}
						loading={isExecuting}
						loadingText="Verifying OTP..."
						type="submit"
						className="w-full !mt-42"
					>
						Login
					</Button>
				</form>
			</Form>
		</div>
	);
}

export default OtpForm;
