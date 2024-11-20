import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

const formSchema = z.object({
	mobileNumber: z.string().regex(phoneValidator, 'Phone number is not valid'),
});

export default function LoginForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			mobileNumber: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await getOtp(values);
		} catch (error) {}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 pt-42">
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
				<div className="text-12 px-12">
					By Clicking here, I accept the{' '}
					<span className="font-medium">Terms & Conditions</span> &{' '}
					<span className="font-medium">Privacy Policy</span>
				</div>
				<Button disabled={!form.formState.isValid} type="submit" className="w-full !mt-42">
					Get OTP
				</Button>
			</form>
		</Form>
	);
}
