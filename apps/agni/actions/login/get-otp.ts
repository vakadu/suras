'use server';

import axios from 'axios';

import { IOtpPayload, LoginFormData } from '../schema';
import { API_ENDPOINTS } from '@agni/helpers/api-endpoints';

const getOtp = async (formData: any, newUser: boolean) => {
	try {
		const { mobileNumber, name, email } = formData as LoginFormData;
		let payload;
		if (newUser) {
			payload = {
				username: mobileNumber,
				role_value: 'wo_customer',
				isWO: 1,
				isNewUser: true,
				name,
				email,
				onboardingType: 'USER',
			} as IOtpPayload;
		} else {
			payload = {
				username: mobileNumber,
				role_value: 'wo_customer',
				isWO: 1,
				isNewUser: false,
			} as IOtpPayload;
		}
		const { data } = await axios.post(
			`${process.env.BASE_PATH}/${API_ENDPOINTS.GET_OTP}`,
			payload
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export { getOtp };
