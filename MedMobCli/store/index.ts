import 'react-native-get-random-values';
import { configureStore } from '@reduxjs/toolkit';
// import messageReducer from './message';
import usersReducer from './users';
import surgeriesReducer from './procedures';
import processedImagesReducer from './xraiImages';
import loginsReducer from './logins'
import errorsReducer from './errors'

export const store = configureStore({
  reducer: {
    // message: messageReducer,
    procedures: surgeriesReducer,
    processedImages: processedImagesReducer,
    users: usersReducer,
    logins: loginsReducer,
    errors: errorsReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;