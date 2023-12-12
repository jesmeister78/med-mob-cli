import {
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { Procedure } from '../domain/procedure';
import { realmUtil } from '../data/realmUtil';
import { dummyProcedures } from './dummyInitState';


export const fetchProcedures = createAsyncThunk('procedures/fetchProcedures', async () => {
    const response = await realmUtil.fetchProcedures();
    console.log(response);
    //const responseJson = await response.json();
    //console.log(responseJson);
    return dummyProcedures;
});

export const proceduresAdapter = createEntityAdapter<Procedure>();

const proceduresSlice = createSlice({
    name: 'procedures',
    initialState: proceduresAdapter.addMany(
        proceduresAdapter.getInitialState({
            loading: false
        }),
        dummyProcedures
    ),
    reducers: {
        //patientName: (state, action: PayloadAction<{id:string, name:string}>) => state,
        procedureUpdated: proceduresAdapter.updateOne,
        procedureAdded: proceduresAdapter.addOne
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProcedures.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProcedures.fulfilled, (state, action) => {
            proceduresAdapter.setAll(state, action.payload);
            state.loading = false;
        });
        builder.addCase(fetchProcedures.rejected, (state) => {

            state.loading = false;
        });
    }
});

export const {
    selectById: selectProcedureById,
    selectIds: selectProcedureIds,
    selectEntities: selectProcedureEntities,
    selectAll: selectAllProcedures,
    selectTotal: selectTotalProcedures
} = proceduresAdapter.getSelectors((state: RootState) => state.procedures);

export const selectMaxCaseNumber = createSelector(
    [selectAllProcedures],
    (procedures) => Math.max.apply(null,
        procedures.map(procedure => procedure.caseNumber))
);

export const { procedureUpdated, procedureAdded } = proceduresSlice.actions;
export default proceduresSlice.reducer;
