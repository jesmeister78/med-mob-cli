import { env } from '../environment';
import xraiApi from './api';
import { Procedure } from '../domain/procedure';
// Optional: import * as Keychain from 'react-native-keychain';

export const userService = {

    getProceduresForUserAsync: async (id: string) => {
        const response = await xraiApi.get<Procedure[]>(`/${env.XRAI_API_USERS}/${id}/procedures/`);
        return response;
    },

};