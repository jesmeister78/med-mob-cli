import { env } from '../environment';
import { Procedure } from '../domain/procedure';
import { Update } from '@reduxjs/toolkit';
import { XraiImage } from '../domain/xraiImage';
import api from './api';

export const procedureService = {
  getProceduresAsync: async () => {
    console.log("getProcedures")
    const response = await api.get<Procedure[]>(env.XRAI_API_PROCEDURES);
    return response;
  },

  getProcedureAsync: async (id: string) => {
    const response = await api.get<Procedure>(`${env.XRAI_API_PROCEDURES}/${id}`);
    return response;
  },

  getImagesForProcedureAsync: async (id: string) => {
    const response = await api.get<XraiImage[]>(`${env.XRAI_API_PROCEDURES}/${id}/images`);
    return response;
  },

  addProcedureAsync: async (procedure: Omit<Procedure, "caseNumber">) => {
    const response = await api.post<Procedure>(env.XRAI_API_PROCEDURES, procedure);
    return response;
  },

  updateProcedureAsync: async (payload: Update<Procedure>) => {
    const response = await api.patch<Procedure>(`${env.XRAI_API_PROCEDURES}/${payload.id}`, payload);
    return response;
  },

  deleteProcedureAsync: async (id: string) => {
    await api.delete(`${env.XRAI_API_PROCEDURES}/${id}`);
  },
};