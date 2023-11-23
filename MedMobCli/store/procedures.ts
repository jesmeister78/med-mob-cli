import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { Procedure } from '../domain/procedure';
import { realmUtil } from '../data/realmUtil';


export const fetchProcedures = createAsyncThunk('procedures/fetchProcedures', async () => {
    const response = await realmUtil.fetchProcedures();
    console.log(response);
    //const responseJson = await response.json();
    //console.log(responseJson);
    return  [{id: '1', caseNumber: 1,
    patientName: 'jesse',
    urIdentifier: 'ur1',
    date: new Date(),
    hospital: 'epworth',
    surgeon: 'henry',

    indication: 'Routine'}] as Procedure[];
});

export const ProceduresAdapter = createEntityAdapter<Procedure>();

const ProceduresSlice = createSlice({
    name: 'procedures',
    initialState: ProceduresAdapter.addMany(
        ProceduresAdapter.getInitialState({
          loading: false
        }),
        [
          {
            id: '1', // uuidv4()
            caseNumber: 1,
            patientName: 'jesse',
            urIdentifier: 'ur1',
            date: new Date(),
            hospital: 'epworth',
            surgeon: 'dr henry',
        
            /*
                Routine
                Suspected choledocholithiasis
                Deranged LFTs
                Pancreatitis
                Other (free text)
            */
            indication: 'Routine',
          }
        ]
      ),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProcedures.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProcedures.fulfilled, (state, action) => {
            ProceduresAdapter.setAll(state, action.payload);
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
} = ProceduresAdapter.getSelectors((state: RootState) => state.procedures);

export default ProceduresSlice.reducer;
