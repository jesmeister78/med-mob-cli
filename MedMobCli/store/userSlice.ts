import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../domain/user';
import { userService } from '../services/userService';
import { setError } from './errorSlice';
import { RootState } from '.';
import { authService } from '../services/authService';
// Define the state interface
interface UserState extends EntityState<User> {
    loading: boolean;
}


// Define the async thunk for submitting the login request 
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (credentials: { username: string; password: string }, { dispatch }) => {
        try {
            const response = await authService.loginUserAsync(credentials.username, credentials.password);
            if (!response?.token) {
                throw new Error("Token is undefined");
            }
            // Handle successful login response 
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
    
    export const logoutUser = createAsyncThunk(
        'user/logoutUser',
        async (_, { dispatch }) => {
            try {
                const response = await authService.logoutUserAsync();
                if (!response) {
                    throw new Error("Error logging out user");
                }
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
    'user/register',
    async (user: User, { dispatch }) => {
        try {
            const response = await authService.addUserAsync(user);
            
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
                    userAdapter.addOne(state, action.payload.user);

                })
                .addCase(loginUser.rejected, (state, action) => {
                    state.loading = false;
                }
                )// Handle setToken
               
                // Handle clearToken
                .addCase(logoutUser.pending, (state) => {
                    state.loading = true;
                })
                .addCase(logoutUser.fulfilled, (state) => {
                    state.loading = false;
                    userAdapter.removeAll(state);
                })
                .addCase(logoutUser.rejected, (state, action) => {
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