import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
  } from '@reduxjs/toolkit';
  import { RootState } from '.';
import { Case } from '../models/case.model';
  
  
  export const fetchCases = createAsyncThunk('cases/fetchCases', async () => {
    const response = await fetch('https://reqres.in/api/cases?delay=1');
    return (await response.json()).data as Case[];
  });
  
  export const casesAdapter = createEntityAdapter<Case>();
  
  const casesSlice = createSlice({
    name: 'cases',
    initialState: casesAdapter.getInitialState({
      loading: false
    }),
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchCases.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchCases.fulfilled, (state, action) => {
        casesAdapter.setAll(state, action.payload);
        state.loading = false;
      });
      builder.addCase(fetchCases.rejected, (state) => {
        state.loading = false;
      });
    }
  });
  
  export const {
    selectById: selectCaseById,
    selectIds: selectCaseIds,
    selectEntities: selectCaseEntities,
    selectAll: selectAllCases,
    selectTotal: selectTotalUsers
  } = casesAdapter.getSelectors((state: RootState) => state.cases);
  
  export default casesSlice.reducer;
  