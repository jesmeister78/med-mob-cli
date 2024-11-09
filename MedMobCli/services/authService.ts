import { User } from '../domain/user';
import { Update } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenResponse } from '../domain/tokenResponse';
import xraiApi from './api';
// Optional: import * as Keychain from 'react-native-keychain';

export const authService = (() => {

    // Private fields
    const accountPath = "account";
    const accessTokenKey = "accessToken"
    const refreshTokenKey = "refreshToken"

    // Private functions
    const getTokenAsync = async (tokenKey: string) => {
        try {
            const token = await AsyncStorage.getItem(tokenKey);
            return token;
        } catch (error) {
            console.error(`Error getting ${tokenKey} token:`, error);
            return null;
        }
    };

    const storeTokenAsync = async (tokenKey: string, token: string) => {
        try {
            await AsyncStorage.setItem(tokenKey, token);
        } catch (error) {
            console.error(`Error storing ${tokenKey} token:`, error);
            throw error; // Throw error to handle it in calling function
        }
    };

    const removeTokenAsync = async (tokenKey: string) => {
        try {
            await AsyncStorage.removeItem(tokenKey);
        } catch (error) {
            console.error(`Error removing ${tokenKey} token:`, error);
            throw error;
        }
    };

    return {
        // auth
        addUserAsync: async (user: User) => {
            return xraiApi.post<boolean>(`/${accountPath}/`, user);
        },

        updateUserAsync: async (payload: Update<User>) => {
            const response = await xraiApi.patch<User>(`/${accountPath}/${payload.id}/`, payload);
            return response;
        },

        deleteUserAsync: async (id: string) => {
            await xraiApi.delete(`/${accountPath}/${id}`);
        },

        loginUserAsync: async (username: string, password: string) => {
            const response = await xraiApi.post<{ user: User, token: TokenResponse }>(`/${accountPath}/token/`, { username: username, password: password });
            if (response?.token) {
                await storeTokenAsync(accessTokenKey, response.token.access_token);
                await storeTokenAsync(refreshTokenKey, response.token.refresh_token);
            }
            return response;
        },

        logoutUserAsync: async () => {
            try {
                const response = await xraiApi.delete(`/${accountPath}/token/`);
                await removeTokenAsync(accessTokenKey);
                await removeTokenAsync(refreshTokenKey);
                return true;
            } catch (error) {
                console.error('Error revoking token:', error);
                // Still remove tokens locally even if API call fails
                await removeTokenAsync(accessTokenKey);
                await removeTokenAsync(refreshTokenKey);
                throw error;
            }
        },

        // Token storage
        getAccessTokenAsync: async () => {
            return getTokenAsync(accessTokenKey);
        },

        getRefreshTokenAsync: async () => {
            return getTokenAsync(refreshTokenKey);
        },

        removeAccessTokenAsync: async () => {
            return removeTokenAsync(accessTokenKey);
        },

        removeRefreshTokenAsync: async () => {
            return removeTokenAsync(refreshTokenKey);
        },

        storeAccessTokenAsync: async (token: string) => {
            return storeTokenAsync(accessTokenKey, token);
        },

        storeRefreshTokenAsync: async (token: string) => {
            return storeTokenAsync(refreshTokenKey, token);
        },

        setTokensAsync: async (accessToken: string, refreshToken: string) => {
            await Promise.all([
                storeTokenAsync(accessTokenKey, accessToken),
                storeTokenAsync(refreshTokenKey, refreshToken)
            ]);
        }
    };
})();


