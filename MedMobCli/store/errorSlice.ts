import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface ErrorState {
  message: string | null;
}

const initialState: ErrorState = {
  message: null,
};

const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearError: (state) => {
      state.message = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;

// Selector
export const selectError = (state:RootState) => state.errors.message;