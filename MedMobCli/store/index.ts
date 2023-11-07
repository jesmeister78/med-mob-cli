import { configureStore } from '@reduxjs/toolkit';
// import messageReducer from './message';
import casesReducer from './cases';

export const store = configureStore({
  reducer: {
    // message: messageReducer,
    cases: casesReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;