export interface LoginFormData {
	mobileNumber: string;
	name?: string;
	email: string;
}

export interface IOtpPayload {
	username: string;
	role_value: string;
	isWO: number;
	isNewUser: boolean;
	name?: string;
	email?: string;
	onboardingType?: string;
}
