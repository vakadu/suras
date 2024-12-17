import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';

// import modalReducer from '../modal/modal.slice';
// import snackbarReducer from '../snackbar/snackbar.slice';
import layoutReducer from './layout';
import authReducer from './auth';

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['auth'],
};

const rootReducer = combineReducers({
	// modal: modalReducer,
	// snackbar: snackbarReducer,
	layout: layoutReducer,
	auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		process.env.NODE_ENV === 'development'
			? getDefaultMiddleware({ serializableCheck: false }).concat(logger as any)
			: getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const usePemilyAppDispatch = () => useDispatch<AppDispatch>();
export const usePemilyAppSelector: TypedUseSelectorHook<RootState> = useSelector;
