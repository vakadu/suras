'use server';

import axios from 'axios';
import { z } from 'zod';

import { API_ENDPOINTS } from '@agni/helpers/api-endpoints';
import { otpValidator } from '@devas/utils';

const schema = z.object({
	otp: z
		.string()
		.length(6, 'OTP must be exactly 6 digits')
		.regex(otpValidator, 'OTP is not valid'),
});

const userLogin = async (previousState: any, formData: FormData) => {
	try {
		const otp = formData.get('otp')?.toString();
		const otpValidation = schema.parse({ otp });

		console.log(previousState, otpValidation, '====');
	} catch (error) {
		if (error instanceof z.ZodError) {
			return { error: error.errors[0].message };
		}
		console.error('Error in userLogin:', error);
		// throw error;
	}
};

export { userLogin };
