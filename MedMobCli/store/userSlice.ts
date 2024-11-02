import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../domain/user';
import { userService } from '../services/userService';
import { setError } from './errorSlice';
import { RootState } from '.';
// Define the state interface
interface UserState extends EntityState<User> {
    loading: boolean;
    activeUsername: string | undefined;  // Allow both string and undefined
}// const initialState: UserState = { user: null, loading: false, activeUsername: null };


// Create thunks
export const setTokenAsync = createAsyncThunk(
    'user/setToken',
    async (token: string, { dispatch }) => {

        try {
            await userService.storeTokenAsync(token);
            return token;
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message));

            } else {
                // Handle other types of errors if needed 
                console.error('An unknown error occurred:', error);
            }
            // throw the error so the rejected extra reducer is called
            throw error;
        }
    }
);

export const clearTokenAsync = createAsyncThunk(
    'user/clearToken',
    async (_, { dispatch }) => {

        try {
            await userService.removeTokenAsync();
            return null;
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message));

            } else {
                // Handle other types of errors if needed 
                console.error('An unknown error occurred:', error);
            }
            // throw the error so the rejected extra reducer is called
            throw error;
        }
    }
);
// Define the async thunk for submitting the login request 
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (credentials: { username: string; password: string }, { dispatch }) => {
        try {
            const response = await userService.loginUserAsync(credentials.username, credentials.password);
            if (!response?.token) {
                throw new Error("Token is undefined");
            }
            // Handle successful login response 
            await userService.storeTokenAsync(response.token.token)
            // we don't do anything else from redux perspective yet as we will just redirect the user to login after their user has been added
            // we will need this functionality because users will need to be activated in prod
            return response;
        } catch (error: any) {
            if (error instanceof Error) {
                dispatch(setError(error.message));

            } else {
                // Handle other types of errors if needed 
                console.error('An unknown error occurred:', error);
            }
            // throw the error so the rejected extra reducer is called
            throw error;
        }
    });

export const registerUser = createAsyncThunk(
    'user/addUser',
    async (user: User, { dispatch }) => {
        try {
            const response = await userService.addUserAsync(user);
            
            return response;
        } catch (error: any) {
            if (error instanceof Error) {
                dispatch(setError(error.message));

            } else {
                // Handle other types of errors if needed 
                console.error('An unknown error occurred:', error);
            }
            // throw the error so the rejected extra reducer is called
            throw error;
        }
    });

const userAdapter = createEntityAdapter<User>();

const userSlice = createSlice(
    {
        name: 'user',
        initialState: userAdapter.getInitialState(
            {
                loading: false,
                activeUsername: ''
            }
        ),
        reducers: {
            userAdded: userAdapter.addOne,
            userUpdated: userAdapter.updateOne

        }, extraReducers: (builder) => {
            builder
                .addCase(loginUser.pending, (state) => {
                    state.loading = true;
                })
                .addCase(loginUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.activeUsername = action.payload.user.username;
                    userAdapter.addOne(state, action.payload.user);

                })
                .addCase(loginUser.rejected, (state, action) => {
                    state.loading = false;
                }
                )// Handle setToken
                .addCase(setTokenAsync.pending, (state) => {
                    state.loading = true;
                })
                .addCase(setTokenAsync.fulfilled, (state, action) => {
                    state.loading = false;
                })
                .addCase(setTokenAsync.rejected, (state, action) => {
                    state.loading = false;
                })
                // Handle clearToken
                .addCase(clearTokenAsync.pending, (state) => {
                    state.loading = true;
                })
                .addCase(clearTokenAsync.fulfilled, (state) => {
                    state.loading = false;
                    state.activeUsername = '';
                    userAdapter.removeAll(state);
                })
                .addCase(clearTokenAsync.rejected, (state, action) => {
                    state.loading = false;
                });
        },
    });

// Create selector functions
export const selectUserState = (state: RootState) => state.user;

// Select the single user (assuming there's only one)
export const selectCurrentUser = createSelector(
    selectUserState,
    (userState) => {
        // Get all user ids
        const userIds = Object.keys(userState.entities);
        // Return the first (and should be only) user, or undefined if none exists
        return userIds.length > 0 && userState.entities[userIds[0]] 
            ? userState.entities[userIds[0]]
            : undefined;
    }
);
export const { userAdded, userUpdated } = userSlice.actions;
export default userSlice.reducer;