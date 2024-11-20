'use server';

import axios from 'axios';
import { LoginFormData } from './model';

export default async function getOtp(formData: LoginFormData) {
	try {
		const response = await axios.get('https://dummyjson.com/test');
		console.log(response.status, 'status');
	} catch (error) {}
}
