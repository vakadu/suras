import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FloatingInput, Form, FormControl, FormField, FormItem, FormMessage } from '@devas/ui';
import { phoneValidator } from '@devas/utils';

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

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
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
				<button type="submit">Submit</button>
			</form>
		</Form>
	);
}
