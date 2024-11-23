'use client';

import { useActionState } from 'react';

import { FloatingInput, Button } from '@devas/ui';
import { userLogin } from '@agni/actions/login';
import { useLogin } from '../context';

export function OtpForm() {
	const [error, action, isPending] = useActionState(userLogin, null);
	const { mobileNumber } = useLogin();

	return (
		<div>
			<div className="text-14">
				OTP sent to <span className="font-medium">+91 - {mobileNumber}</span>
			</div>
			<form className="pt-24" action={action}>
				<div>
					<FloatingInput
						label="Enter your 6 digit OTP"
						type="numeric"
						id="otp"
						name="otp"
						placeholder=""
						maxLength={6}
						isError={!!error?.error}
					/>
					{!!error?.error && (
						<span className="text-12 mt-6 text-destructive">{error?.error}</span>
					)}
				</div>
				<Button
					disabled={isPending}
					loading={isPending}
					loadingText="Verifying OTP..."
					type="submit"
					className="w-full !mt-24"
				>
					Login
				</Button>
			</form>
		</div>
	);
}

export default OtpForm;
