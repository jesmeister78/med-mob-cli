import { configureStore } from '@reduxjs/toolkit';
// import messageReducer from './message';
import usersReducer from './users';
import surgeriesReducer from './procedures';

export const store = configureStore({
  reducer: {
    // message: messageReducer,
    procedures: surgeriesReducer,
    users: usersReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;