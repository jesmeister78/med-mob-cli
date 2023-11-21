import { configureStore } from '@reduxjs/toolkit';
// import messageReducer from './message';
import casesReducer from './cases';
import usersReducer from './users';
import surgeriesReducer from './surgeries';

export const store = configureStore({
  reducer: {
    // message: messageReducer,
    cases: casesReducer,
    surgeries: surgeriesReducer,
    users: usersReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;