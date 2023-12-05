import 'react-native-get-random-values';
import { configureStore } from '@reduxjs/toolkit';
// import messageReducer from './message';
import usersReducer from './users';
import surgeriesReducer from './procedures';
import rawImagesReducer from './rawImages';
import processedImagesReducer from './processedImages';

export const store = configureStore({
  reducer: {
    // message: messageReducer,
    procedures: surgeriesReducer,
    rawImages: rawImagesReducer,
    processedImages: processedImagesReducer,
    users: usersReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;