import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loginSidebar: false,
	loading: false,
	showOtp: false,
};

export const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		handleLoginSidebar: (state, action) => {
			state.loginSidebar = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		handleOtp: (state, action) => {
			state.showOtp = action.payload;
		},
	},
});

export const { handleLoginSidebar, setLoading, handleOtp } = layoutSlice.actions;

export default layoutSlice.reducer;
