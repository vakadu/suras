import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loginSidebar: false,
};

export const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		handleLoginSidebar: (state, action) => {
			state.loginSidebar = action.payload;
		},
	},
});

export const { handleLoginSidebar } = layoutSlice.actions;

export default layoutSlice.reducer;
