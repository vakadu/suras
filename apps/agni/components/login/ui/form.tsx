'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAction } from 'next-safe-action/hooks';

import {
	Button,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@devas/ui';
import { newUserAction, oldUserAction } from '../../../actions/login';
import { useLogin } from '../context';

const baseSchema = z.object({
	mobileNumber: z.string().regex(/^\d{10}$/, 'Phone number is not valid'),
});

const newUserSchema = baseSchema.extend({
	name: z.string().min(2, 'Name is required'),
	email: z.string().email('Invalid email address'),
});

const existingUserSchema = baseSchema;

type FormData = z.infer<typeof newUserSchema> | z.infer<typeof existingUserSchema>;

export function LoginForm() {
	const [isNewUser, setNewUser] = useState(false);
	const {
		execute: newAction,
		result: newResult,
		isExecuting: newExecuting,
	} = useAction(newUserAction);
	const {
		execute: oldAction,
		result: oldResult,
		isExecuting: oldExecuting,
	} = useAction(oldUserAction);
	const { toggleOtp, handleMobileNumber } = useLogin();

	const formSchema = isNewUser ? newUserSchema : existingUserSchema;

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			mobileNumber: '',
		},
	});
	const watchMobileNumber = form?.watch('mobileNumber');

	useEffect(() => {
		if (!oldResult?.data) return;

		const { isNewUser, status } = oldResult.data;
		if (isNewUser && status === 'error') {
			setNewUser(true);
		} else {
			toast.success('OTP sent successfully!');
			toggleOtp(true);
			handleMobileNumber(watchMobileNumber);
		}
	}, [oldResult, toggleOtp, handleMobileNumber, watchMobileNumber]);

	useEffect(() => {
		if (!newResult?.data) return;

		const { status, msg } = newResult.data;
		if (status === 'error') {
			if (msg === 'Email already exists') {
				form.setError('email', { type: 'manual', message: msg });
			} else if (msg === 'Phone number is already registered') {
				form.setError('mobileNumber', { type: 'manual', message: msg });
			}
		} else {
			toast.success('OTP sent successfully!');
			toggleOtp(true);
			handleMobileNumber(watchMobileNumber);
		}
	}, [newResult, form, toggleOtp, handleMobileNumber, watchMobileNumber]);

	const onSubmit = async (values: any) => {
		if (isNewUser) {
			const payload = {
				mobileNumber: values.mobileNumber,
				email: values?.email,
				name: values?.name,
			};
			newAction(payload);
		} else {
			const payload = { mobileNumber: values.mobileNumber };
			oldAction(payload);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-24 pt-42">
				<FormField
					control={form.control}
					name="mobileNumber"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormControl>
								<FloatingInput
									label="Enter your 10 digit Mobile Number"
									type="numeric"
									id="mobileNumber"
									placeholder=""
									isError={!!fieldState.error}
									maxLength={10}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{isNewUser && (
					<>
						<FormField
							control={form.control}
							name="name"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormControl>
										<FloatingInput
											label="Enter your Name"
											id="name"
											placeholder=""
											isError={!!fieldState.error}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormControl>
										<FloatingInput
											label="Email"
											id="email"
											placeholder=""
											isError={!!fieldState.error}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				)}
				<div className="text-12 px-12 !mt-12">
					By Clicking here, I accept the{' '}
					<span className="font-medium">Terms & Conditions</span> &{' '}
					<span className="font-medium">Privacy Policy</span>
				</div>
				<Button
					disabled={!form.formState.isValid}
					loading={oldExecuting || newExecuting}
					loadingText="Sending OTP..."
					type="submit"
					className="w-full !mt-42"
				>
					{isNewUser ? 'Signup' : 'Get OTP'}
				</Button>
			</form>
		</Form>
	);
}

export default LoginForm;
