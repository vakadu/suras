import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';

import {
	Button,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@devas/ui';
import { otpValidator } from '@devas/utils';
import { handleOtp, setLoading } from '@agni/store/layout-reducer';
import { RootState } from '@agni/store/index';
import { useToast } from '@devas/hooks';

const schema = z.object({
	otp: z.string().regex(otpValidator, 'OTP is not valid'),
});

export default function OtpForm() {
	const dispatch = useDispatch();
	const layoutState = useSelector((state: RootState) => state.layout);
	const { toast } = useToast();

	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			otp: '',
		},
	});

	const onSubmit = async (values: FormData) => {
		try {
			dispatch(setLoading(true));
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
					name="otp"
					render={({ field, fieldState }) => {
						return (
							<FormItem>
								<FormControl>
									<FloatingInput
										label="Enter your 6 digit OTP"
										type="numeric"
										id="otp"
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

				<Button
					disabled={!form.formState.isValid || layoutState.loading}
					loading={layoutState.loading}
					loadingText="Verifying OTP..."
					type="submit"
					className="w-full !mt-42"
				>
					Login
				</Button>
			</form>
		</Form>
	);
}
