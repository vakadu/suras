'use server';

import axios from 'axios';
import { z } from 'zod';
import { cookies } from 'next/headers';

import { otpValidator } from '@devas/utils';
import { LoginPayload } from '../schema';
import { API_ENDPOINTS } from '@agni/helpers/api-endpoints';

const schema = z.object({
	otp: z
		.string()
		.length(6, 'OTP must be exactly 6 digits')
		.regex(otpValidator, 'OTP is not valid'),
});

const userLogin = async (prevState: any, formData: FormData) => {
	try {
		const mobileNumber = formData.get('mobileNumber')?.toString();
		const otp = formData.get('otp')?.toString();
		const otpValidation = schema.parse({ otp });
		const cookieStore = await cookies();

		const payload = {
			username: mobileNumber,
			isWO: 1,
			isNewUser: false,
			otp: otpValidation.otp,
		} as LoginPayload;
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_PATH}/${API_ENDPOINTS.LOGIN}`,
			payload
		);
		if (data?.status === 'error') {
			return { error: data?.msg };
		} else {
			const token = data?.token?.accessToken;
			const refreshToken = data?.token?.refreshToken;
			cookieStore.set('token', token, { secure: true });
			cookieStore.set('refreshToken', refreshToken, { secure: true });
			return data;
		}
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { error: error.errors[0].message };
		}
		return { error: 'Something went wrong. Please try again later.' };
	}
};

export { userLogin };
