import { Procedure } from '../domain/procedure';
import { Update } from '@reduxjs/toolkit';
import { Image } from '../domain/image';
import api from './api';

export const procedureService = (() => {

  const proceduresPath = "procedures";

  return {
    getProceduresAsync: async () => {
      console.log("getProcedures")
      const response = await api.get<Procedure[]>(`/${proceduresPath}/`);
      return response;
    },

    getProcedureAsync: async (id: string) => {
      const response = await api.get<Procedure>(`/${proceduresPath}/${id}/`);
      return response;
    },

    getImagesForProcedureAsync: async (id: string) => {
      const response = await api.get<Image[]>(`/${proceduresPath}/${id}/images/`);
      return response;
    },

    addProcedureAsync: async (procedure: Omit<Procedure, "caseNumber">) => {
      const response = await api.post<Procedure>(`/${proceduresPath}/`, procedure);
      return response;
    },

    updateProcedureAsync: async (payload: Update<Procedure>) => {
      const response = await api.patch<Procedure>(`/${proceduresPath}/${payload.id}/`, payload);
      return response;
    },

    deleteProcedureAsync: async (id: string) => {
      await api.delete(`/${proceduresPath}/${id}/`);
    },
  };
})();