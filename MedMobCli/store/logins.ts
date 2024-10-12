import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
interface LoginState { email: string; password: string; loading: boolean; error: string | null; }
const initialState: LoginState = { email: '', password: '', loading: false, error: null, };
// Define the async thunk for submitting the login request 
export const loginUser = createAsyncThunk(
    'login/loginUser',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/login', credentials);
            // Handle successful login response 
            return response.data;
        } catch (error: any) {
            // Handle login error 
            return rejectWithValue(error.response.data);
        }
    });
const loginSlice = createSlice(
    {
        name: 'logins',
        initialState,
        reducers: {
            setEmail: (state, action: PayloadAction<string>) => { state.email = action.payload; },
            setPassword: (state, action: PayloadAction<string>) => { state.password = action.payload; },
            loginRequest: (state) => { state.loading = true; state.error = null; },
            loginSuccess: (state) => { state.loading = false; state.email = ''; state.password = ''; },
            loginFailure: (state, action: PayloadAction<string>) => { state.loading = false; state.error = action.payload; },
        }, extraReducers: (builder) => {
            builder
                .addCase(loginUser.pending, (state) => {
                    state.loading = true; state.error = null;
                })
                .addCase(loginUser.fulfilled, (state) => {
                    state.loading = false; 
                    state.email = '';
                    state.password = '';
                })
                .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload;
                }
                );
        },
    });
export const { setEmail, setPassword, loginRequest, loginSuccess, loginFailure } = loginSlice.actions;
export default loginSlice.reducer;