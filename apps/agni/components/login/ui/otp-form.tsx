'use client';

import { useActionState, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { FloatingInput, Button } from '@devas/ui';
import { userLogin } from '@agni/actions/login';
import { useLogin } from '../context';
import { handleLoginSidebar } from '@agni/store/layout-reducer';
import { authenticateUser } from '@agni/store/auth';
import { AppDispatch } from '@agni/store/index';

export function OtpForm() {
	const [state, action, isPending] = useActionState(userLogin, null);
	const { mobileNumber } = useLogin();
	const [otp, setOtp] = useState('');
	const error = (state as { error: string })?.error;
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (state?.status === 'success') {
			dispatch(authenticateUser({ token: state?.token?.accessToken }));
			toast.success('Logged In!');
			dispatch(handleLoginSidebar(false));
		}
	}, [state]);

	return (
		<div>
			<div className="text-14">
				OTP sent to <span className="font-medium">+91 - {mobileNumber}</span>
			</div>
			<form className="pt-24" action={action}>
				<div>
					<input name="mobileNumber" value={mobileNumber as string} type="hidden" />
					<FloatingInput
						label="Enter your 6 digit OTP"
						type="numeric"
						id="otp"
						name="otp"
						placeholder=""
						maxLength={6}
						isError={!!error}
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
					/>
					{!!error && <span className="text-12 mt-6 text-destructive">{error}</span>}
				</div>
				<Button
					disabled={isPending || otp.length < 6}
					loading={isPending}
					loadingText="Verifying OTP..."
					className="w-full !mt-24"
					type="submit"
				>
					Login
				</Button>
			</form>
		</div>
	);
}

export default OtpForm;
