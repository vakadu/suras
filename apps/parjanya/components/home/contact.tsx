'use client';

import { useEffect } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import {
	Button,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	ImagePlaceholder,
} from '@suras/ui';
import { contactUsAction } from '../../actions/contact';

const schema = z.object({
	name: z.string().min(3, 'Name is required'),
	mobileNumber: z
		.string()
		.regex(/^[6-9]\d{9}$/, 'Please enter a valid mobile number')
		.refine((num) => num.length === 10, {
			message: 'Mobile number must be exactly 10 digits',
		}),
	message: z.string().optional(),
});

export const Contact = () => {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			mobileNumber: '',
			message: '',
		},
	});
	const { execute, result, isExecuting } = useAction(contactUsAction);

	useEffect(() => {
		if (!result?.data) return;

		if (result?.data?.status === 'SUCCESS') {
			form?.reset();
			toast.success('Data submitted successfully!');
		} else {
			toast.error('Please try again.');
		}
	}, [form, result]);

	const onSubmit = async (values: { name: string; mobileNumber: string; message?: string }) => {
		const payload = {
			mobileNumber: values.mobileNumber,
			message: values?.message,
			name: values?.name,
		};
		execute(payload);
	};

	return (
		<section id="contact" className="px-16 container relative py-[64px]">
			<h2 className="text-[24px] leading-[34px] font-medium text-left my-24">
				What can we help with?
			</h2>
			<section className="lg:grid lg:grid-cols-3 lg:gap-42">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-24 pt-42 col-span-2"
					>
						<div className="grid md:grid-cols-2 lg:gap-42 mb-24">
							<FormField
								control={form.control}
								name="name"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormControl>
											<FloatingInput
												label="Name"
												id="name"
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
							<FormField
								control={form.control}
								name="mobileNumber"
								render={({ field, fieldState }) => (
									<FormItem>
										<FormControl>
											<FloatingInput
												label="Your 10 digit Mobile Number"
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
						</div>
						<FormField
							control={form.control}
							name="message"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormControl>
										<FloatingInput
											label="Message"
											id="message"
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
						<Button
							disabled={!form.formState.isValid || isExecuting}
							loading={isExecuting}
							loadingText="Submitting..."
							type="submit"
							className="!mt-42 min-w-[220px]"
						>
							Submit
						</Button>
					</form>
				</Form>
				<section className="col-span-1 flex justify-center items-center mt-24 lg:mt-0">
					<ImagePlaceholder
						src="/images/Dog.png"
						containerClasses="h-[256px] w-[253px]"
						imageClasses="object-cover"
					/>
				</section>
			</section>
		</section>
	);
};

export default Contact;
