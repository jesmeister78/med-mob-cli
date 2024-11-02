import { env } from '../environment';
import { User } from '../domain/user';
import { Update } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenResponse } from '../domain/tokenResponse';
import xraiApi from './api';
// Optional: import * as Keychain from 'react-native-keychain';

export const userService = {

    addUserAsync: async (user: User) => {
        return xraiApi.post<User>(env.XRAI_API_USERS, user);
    },

    updateUserAsync: async (payload: Update<User>) => {
        const response = await xraiApi.patch<User>(`${env.XRAI_API_USERS}/${payload.id}`, payload);
        return response;
    },

    deleteUserAsync: async (id: string) => {
        await xraiApi.delete(`${env.XRAI_API_USERS}/${id}`);
    },

    loginUserAsync: async (username: string, password: string) => {
        const response = await xraiApi.post<{ user: User, token: TokenResponse }>(`${env.XRAI_API_USERS}/token`, { username: username, password: password });
        return response;
    },
    logoutUserAsync: async (username: string) => {
        const response = await xraiApi.post<User>(`${env.XRAI_API_USERS}/revoke`, username);
        return true;
    },
    // storage.js

    storeTokenAsync: async (token: string) => {
        try {
            await AsyncStorage.setItem('userToken', token);
            // Or for more security:
            // await Keychain.setGenericPassword('token', token);
        } catch (error) {
            console.error('Error storing token:', error);
        }
    },

    getTokenAsync: async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            // Or:
            // const credentials = await Keychain.getGenericPassword();
            // return credentials.password;
            return token;
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    },

    removeTokenAsync: async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            // Or:
            // await Keychain.resetGenericPassword();
        } catch (error) {
            console.error('Error removing token:', error);
        }
    },
};