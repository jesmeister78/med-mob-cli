import xraiApi from './api';
import { Procedure } from '../domain/procedure';
// Optional: import * as Keychain from 'react-native-keychain';

export const userService = (() => {

    const usersPath = "users";

    return {

        getProceduresForUserAsync: async (id: string) => {
            const response = await xraiApi.get<Procedure[]>(`/${usersPath}/${id}/procedures/`);
            return response;
        },

    };
})();