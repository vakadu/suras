import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import {
	Button,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@devas/ui';
import { phoneValidator } from '@devas/utils';
import getOtp from '@agni/actions/otp';
import { handleOtp, setLoading } from '@agni/store/layout-reducer';
import { RootState } from '@agni/store/index';
import { useToast } from '@devas/hooks';

// Define the base schema for mobile number
const baseSchema = z.object({
	mobileNumber: z.string().regex(phoneValidator, 'Phone number is not valid'),
});

// Define schema for new users
const newUserSchema = baseSchema.extend({
	mobileNumber: z.string().regex(phoneValidator, 'Phone number is not valid'),
	name: z.string().min(2, 'Name is required'),
	email: z.string().email('Invalid email address'),
});

// Define schema for existing users
const existingUserSchema = baseSchema;

// Type that can be either newUser or existingUser form data
type FormData = z.infer<typeof newUserSchema> | z.infer<typeof existingUserSchema>;

export default function LoginForm() {
	const [isNewUser, setNewUser] = useState(false);
	const dispatch = useDispatch();
	const layoutState = useSelector((state: RootState) => state.layout);
	const { toast } = useToast();

	const formSchema = isNewUser ? newUserSchema : existingUserSchema;

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			mobileNumber: '',
		},
	});

	const onSubmit = async (values: FormData) => {
		try {
			dispatch(setLoading(true));
			const response = await getOtp(values, isNewUser);
			if (response.status === 'success') {
				toast({
					title: 'OTP sent successfully!',
				});
				dispatch(handleOtp(true));
			}
			if (response.status === 'error' && response.isNewUser) {
				setNewUser(true);
			}
		} catch (error) {
			console.log(error, 'rty');
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-24 pt-42">
				<FormField
					control={form.control}
					name="mobileNumber"
					render={({ field, fieldState }) => {
						return (
							<FormItem>
								<FormControl>
									<FloatingInput
										label="Enter your 10 digit Mobile Number"
										type="numeric"
										id="mobileNumber"
										placeholder=""
										isError={!!fieldState.error}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				{isNewUser && (
					<>
						<FormField
							control={form.control}
							name="name"
							render={({ field, fieldState }) => {
								return (
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
								);
							}}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field, fieldState }) => {
								return (
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
								);
							}}
						/>
					</>
				)}
				<div className="text-12 px-12 !mt-12">
					By Clicking here, I accept the{' '}
					<span className="font-medium">Terms & Conditions</span> &{' '}
					<span className="font-medium">Privacy Policy</span>
				</div>
				<Button
					disabled={!form.formState.isValid || layoutState.loading}
					loading={layoutState.loading}
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
