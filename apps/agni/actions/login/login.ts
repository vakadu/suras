'use server';

import axios from 'axios';
import { z } from 'zod';
import { cookies } from 'next/headers';

import { otpValidator } from '@devas/utils';
import { LoginPayload } from '../schema';
import { API_ENDPOINTS } from '../../helpers';
import { actionClient } from '../utils';

const schema = z.object({
	otp: z
		.string()
		.length(6, 'OTP must be exactly 6 digits')
		.regex(otpValidator, 'OTP is not valid'),
	mobileNumber: z.string().regex(/^\d{10}$/, 'Phone number is not valid'),
});

const userLogin = actionClient.schema(schema).action(async ({ parsedInput }) => {
	const { mobileNumber, otp } = parsedInput;
	const payload = {
		username: mobileNumber,
		isWO: 1,
		isNewUser: false,
		otp: otp,
	} as LoginPayload;
	const { data } = await axios.post(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/${API_ENDPOINTS.LOGIN}`,
		payload
	);
	if (data?.status === 'success') {
		const cookieStore = await cookies();
		const token = data?.token?.accessToken;
		const refreshToken = data?.token?.refreshToken;
		cookieStore.set('token', token, { secure: true });
		cookieStore.set('refreshToken', refreshToken, { secure: true });
		return data;
	}
	return data;
});

export { userLogin };
