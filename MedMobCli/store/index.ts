import 'react-native-get-random-values';
import { configureStore } from '@reduxjs/toolkit';
// import messageReducer from './message';
import surgeriesReducer from './procedureSlice';
import xraiImagesReducer from './xraiImageSlice';
import errorsReducer from './errorSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    // message: messageReducer,
    procedures: surgeriesReducer,
    xraiImages: xraiImagesReducer,
    user: userReducer,
    errors: errorsReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;