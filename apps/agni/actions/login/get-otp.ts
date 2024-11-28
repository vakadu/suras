'use server';

import axios from 'axios';
import { z } from 'zod';

import { IOtpPayload } from '../schema';
import { actionClient } from '../utils';
import { API_ENDPOINTS } from '../../helpers';

const oldUserSchema = z.object({
	mobileNumber: z.string().regex(/^\d{10}$/, 'Phone number is not valid'),
});

const newUserSchema = z.object({
	mobileNumber: z.string().regex(/^\d{10}$/, 'Phone number is not valid'),
	name: z.string().min(2, 'Name is required'),
	email: z.string().email('Invalid email address'),
});

const oldUserAction = actionClient.schema(oldUserSchema).action(async ({ parsedInput }) => {
	const { mobileNumber } = parsedInput;
	const payload = {
		username: mobileNumber,
		role_value: 'wo_customer',
		isWO: 1,
		isNewUser: false,
	} as IOtpPayload;
	const { data } = await axios.post(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/${API_ENDPOINTS.GET_OTP}`,
		payload
	);
	return data;
});

const newUserAction = actionClient.schema(newUserSchema).action(async ({ parsedInput }) => {
	const { mobileNumber, name, email } = parsedInput;
	const payload = {
		username: mobileNumber,
		role_value: 'wo_customer',
		isWO: 1,
		isNewUser: true,
		name,
		email,
		onboardingType: 'USER',
	} as IOtpPayload;
	const { data } = await axios.post(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/${API_ENDPOINTS.GET_OTP}`,
		payload
	);
	return data;
});

export { oldUserAction, newUserAction };
