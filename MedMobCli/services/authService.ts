import { env } from '../environment';
import { User } from '../domain/user';
import { Update } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenResponse } from '../domain/tokenResponse';
import xraiApi from './api';
// Optional: import * as Keychain from 'react-native-keychain';

export const authService = (() => {
    // Private functions
    const getTokenAsync = async (tokenName: string) => {
        try {
            const token = await AsyncStorage.getItem(tokenName);
            return token;
        } catch (error) {
            console.error(`Error getting ${tokenName} token:`, error);
            return null;
        }
    };

    const storeTokenAsync = async (tokenName: string, token: string) => {
        try {
            await AsyncStorage.setItem(tokenName, token);
        } catch (error) {
            console.error(`Error storing ${tokenName} token:`, error);
            throw error; // Throw error to handle it in calling function
        }
    };

    const removeTokenAsync = async (tokenName: string) => {
        try {
            await AsyncStorage.removeItem(tokenName);
        } catch (error) {
            console.error(`Error removing ${tokenName} token:`, error);
            throw error;
        }
    };

    return {
        // auth
        addUserAsync: async (user: User) => {
            return xraiApi.post<boolean>(`/${env.XRAI_API_ACCOUNT}/`, user);
        },

        updateUserAsync: async (payload: Update<User>) => {
            const response = await xraiApi.patch<User>(`/${env.XRAI_API_ACCOUNT}/${payload.id}/`, payload);
            return response;
        },

        deleteUserAsync: async (id: string) => {
            await xraiApi.delete(`/${env.XRAI_API_ACCOUNT}/${id}`);
        },

        loginUserAsync: async (username: string, password: string) => {
            const response = await xraiApi.post<{ user: User, token: TokenResponse }>(`/${env.XRAI_API_ACCOUNT}/token/`, { username: username, password: password });
            if (response?.token) {
                await storeTokenAsync('accessToken', response.token.access_token);
                await storeTokenAsync('refreshToken', response.token.refresh_token);
            }
            return response;
        },

        logoutUserAsync: async () => {
            try {
                const response = await xraiApi.delete(`/${env.XRAI_API_ACCOUNT}/token/`);
                await removeTokenAsync('accessToken');
                await removeTokenAsync('refreshToken');
                return true;
            } catch (error) {
                console.error('Error revoking token:', error);
                // Still remove tokens locally even if API call fails
                await removeTokenAsync('accessToken');
                await removeTokenAsync('refreshToken');
                throw error;
            }
        },

        // Token storage
        getAccessTokenAsync: async () => {
            return getTokenAsync("accessToken");
        },

        getRefreshTokenAsync: async () => {
            return getTokenAsync("refreshToken");
        },

        removeAccessTokenAsync: async () => {
            return removeTokenAsync("accessToken");
        },

        removeRefreshTokenAsync: async () => {
            return removeTokenAsync("refreshToken");
        },

        storeAccessTokenAsync: async (token: string) => {
            return storeTokenAsync("accessToken", token);
        },

        storeRefreshTokenAsync: async (token: string) => {
            return storeTokenAsync("refreshToken", token);
        },

        setTokensAsync: async (accessToken: string, refreshToken: string) => {
            await Promise.all([
                storeTokenAsync("accessToken", accessToken),
                storeTokenAsync("refreshToken", refreshToken)
            ]);
        }
    };
})();


