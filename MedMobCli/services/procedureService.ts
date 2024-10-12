import api from './api';
import { env } from '../environment';
import { Procedure } from '../domain/procedure';
import { Update } from '@reduxjs/toolkit';
import { XraiImage } from '../domain/xraiImage';

export const procedureService = {
  getProceduresAsync: async () => {
    console.log("getProcedures")
    const response = await api.get<Procedure[]>(env.XRAI_API_PROCEDURES);
    return response.data;
  },

  getProcedureAsync: async (id: string) => {
    const response = await api.get<Procedure>(`${env.XRAI_API_PROCEDURES}/${id}`);
    return response.data;
  },

  getImagesForProcedureAsync: async (id: string) => {
    const response = await api.get<XraiImage[]>(`${env.XRAI_API_PROCEDURES}/${id}/images`);
    return response.data;
  },

  createProcedureAsync: async (procedure: Procedure) => {
    const response = await api.post<Procedure>(env.XRAI_API_PROCEDURES, procedure);
    return response.data;
  },

  updateProcedureAsync: async (id: string, changes: Update<Procedure>) => {
    const response = await api.patch<Procedure>(`${env.XRAI_API_PROCEDURES}/${id}`, changes);
    return response.data;
  },

  deleteProcedureAsync: async (id: string) => {
    await api.delete(`${env.XRAI_API_PROCEDURES}/${id}`);
  },
};