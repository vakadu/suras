'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';

import {
	Button,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@suras/ui';
import { deactivateUserAction } from '../../../../../actions/deactivate';
import { useRouter, useSearchParams } from 'next/navigation';

const schema = z.object({
	reason: z.string().min(1, 'Reason is required'),
});

type FormValues = z.infer<typeof schema>;

export default function Deactivate() {
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			reason: '',
		},
	});
	const { execute, result, isExecuting } = useAction(deactivateUserAction);
	const searchParams = useSearchParams();
	const params = Object.fromEntries(searchParams.entries());
	const router = useRouter();

	useEffect(() => {
		if (!result?.data) return;

		if (result?.data?.status === 'SUCCESS') {
			form?.reset();
			router.push('/user/deactivate');
			toast.success('Data submitted successfully!');
		} else {
			toast.error('Please try again.');
		}
	}, [form, result, router]);

	const onSubmit: SubmitHandler<FormValues> = async (values) => {
		const payload = {
			mobileNumber: params.mobileNumber,
			reason: values?.reason,
			token: params?.token,
		};
		execute(payload);
	};

	return (
		<div className="max-w-[520px] mx-auto flex justify-center items-center h-full">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
					<FormField
						control={form.control}
						name="reason"
						render={({ field, fieldState }) => (
							<FormItem>
								<FormControl>
									<FloatingInput
										label="Reason"
										id="reason"
										placeholder=""
										isError={!!fieldState.error}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={
							!form.formState.isValid || form.formState.isSubmitting || isExecuting
						}
						loading={form.formState.isSubmitting || isExecuting}
						loadingText="Submitting..."
						type="submit"
						className="mt-24 w-full"
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
