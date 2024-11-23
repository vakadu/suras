import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoginContextType {
	showOtp: boolean;
	toggleOtp: (otp: boolean) => void;
	mobileNumber: string | null;
	handleMobileNumber: (mobile: string) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [showOtp, setOtp] = useState(false);
	const [mobileNumber, setMobileNumber] = useState<string | null>(null);

	const toggleOtp = (otp: boolean) => {
		setOtp(otp);
	};

	const handleMobileNumber = (mobile: string) => {
		setMobileNumber(mobile);
	};

	return (
		<LoginContext.Provider value={{ showOtp, toggleOtp, mobileNumber, handleMobileNumber }}>
			{children}
		</LoginContext.Provider>
	);
};

export const useLogin = () => {
	const context = useContext(LoginContext);
	if (!context) {
		throw new Error('useLogin must be used within a LoginProvider');
	}
	return context;
};
