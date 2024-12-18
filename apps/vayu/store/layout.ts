import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	mobileMenu: false,
	// isCollapsed: themeConfig.dashboardLayout.menu.isCollapsed,
	// isRTL: themeConfig.dashboardLayout.isRTL,
};

export const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		handleMobileMenu: (state, action) => {
			state.mobileMenu = action.payload;
		},
		// handleSidebarCollapsed: (state, action) => {
		// 	state.isCollapsed = action.payload;
		// 	if (typeof window !== 'undefined') {
		// 		window?.localStorage.setItem('sidebarCollapsed', action.payload);
		// 	}
		// },
		// handleRtl: (state, action) => {
		// 	state.isRTL = action.payload;
		// 	if (typeof window !== 'undefined') {
		// 		window?.localStorage.setItem('direction', JSON.stringify(action.payload));
		// 	}
		// },
	},
});

export const { handleMobileMenu } = layoutSlice.actions;

export default layoutSlice.reducer;
