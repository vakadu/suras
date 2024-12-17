'use client';

import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { RootState } from '../../../store';
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

// import { phoneValidator } from '@webservices/helpers';
// import { Button, ButtonWrapper, TextInput } from '@webservices/ui';
// import { useCheckUser } from '@webservices/api';
// import { PemilyRootState } from '@webservices/slices';
// import { BackIcon } from '@webservices/icons';
// import useLoginOtpHook from '../hooks/otp-hook';
// import { logEvent } from '@webservices/services';
// import { USER_EVENTS } from '@webservices/primitives';

const schema = z.object({
	mobileNumber: z
		.string()
		.min(10, { message: 'Mobile number should have minimum 10 digits' })
		.max(10, { message: 'Mobile number cant be more than 10 digits' })
		.regex(phoneValidator, { message: 'Phone number is not valid' }),
});

const LoginForm = () => {
	const layoutState = useSelector((state: RootState) => state.layout);
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			mobileNumber: '',
		},
	});
	// const watchMobileNumber = watch('mobileNumber');
	// const { mutate: checkUser, isPending } = useCheckUser({ mobileNumber: watchMobileNumber });
	// const { otp, otpRefs, handleClick, handleKeyDown, handleOtpChange, handleBack } =
	// 	useLoginOtpHook({ mobile: watchMobileNumber });

	// const onSubmit = (values: { mobileNumber: string }) => {
	// 	logEvent({ name: USER_EVENTS.GET_OTP, events: { mobileNumber: values.mobileNumber } });
	// 	checkUser({ mobileNumber: values.mobileNumber });
	// };

	const onSubmit = async () => {
		// const payload = {
		// 	email: values.email,
		// };
		// execute(payload);
	};

	return (
		<div>
			<div
				onClick={layoutState?.showOtp ? () => null : () => null}
				className="flex items-center gap-24"
			>
				{/* {layoutState?.showOtp && < />} */}
				<span className="text-[32px] leading-[42px] font-semibold text-left">
					{layoutState?.showOtp
						? 'Enter 6 digit OTP code'
						: 'Get started with your 10 digit mobile number'}
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
					<Button type="submit" className="w-full mt-24">
						Get OTP
					</Button>
				</form>
			</Form>
			{/*
			<form className="w-full mt-24" onSubmit={handleSubmit(onSubmit)}>
				{!layoutState?.showOtp && (
					<TextInput
						label=""
						type="numeric"
						placeholder="Enter your Mobile Number"
						error={errors?.mobileNumber}
						maxLength={10}
						readonly={layoutState?.showOtp}
						disabled={layoutState.showOtp}
						{...register('mobileNumber')}
					/>
				)}
				{layoutState?.showOtp && (
					<span className="text-14 text-grey-text3">
						OTP sent to +91-{watchMobileNumber}
					</span>
				)}
				{layoutState?.showOtp && (
					<div className="flex gap-12 mt-24">
						{otp.map((_, i) => {
							return (
								<input
									key={i}
									ref={(input) => (otpRefs.current[i] = input) as any}
									className={`${
										otp[i] !== '' ? 'bg-primary-1 text-white' : 'bg-white'
									} leading-16 h-[52px] w-[52px] px-12 transition duration-300 ease-in-out border focus:ring-1  focus:shadow-sm outline-none focus:border-none
   focus:outline-none focus:ring-opacity-90 rounded-8 focus:ring-brand border-grey-divider text-center text-24 font-medium`}
									onChange={(e) => handleOtpChange(e, i)}
									onKeyDown={(e) => handleKeyDown(e, i)}
									value={otpRefs.current[i]?.value as string}
									onClick={(e) => handleClick(e, i)}
									maxLength={1}
								/>
							);
						})}
					</div>
				)}
				{!layoutState?.showOtp && (
					<Button
						isLoading={isPending}
						disabled={isPending}
						className="w-full rounded-12 mt-24"
						type="submit"
					>
						<span className="text-14 font-black tracking-[0.9px]">GET OTP</span>
					</Button>
				)}
			</form> */}
		</div>
	);
};

export default LoginForm;
