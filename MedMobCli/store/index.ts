import { configureStore } from '@reduxjs/toolkit';
// import messageReducer from './message';
import usersReducer from './users';
import surgeriesReducer from './procedures';
import imagesReducer from './images';

export const store = configureStore({
  reducer: {
    // message: messageReducer,
    procedures: surgeriesReducer,
    images: imagesReducer,
    users: usersReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;