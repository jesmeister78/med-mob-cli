import {
    PayloadAction,
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
    date: '2023-11-24',
    hospital: 'epworth',
    surgeon: 'henry',

    indication: 'Routine'}] as Procedure[];
});

export const proceduresAdapter = createEntityAdapter<Procedure>();

const proceduresSlice = createSlice({
    name: 'procedures',
    initialState: proceduresAdapter.addMany(
        proceduresAdapter.getInitialState({
          loading: false
        }),
        [
          {
            id: '1', // uuidv4()
            caseNumber: 1,
            patientName: 'jesse',
            urIdentifier: 'ur1',
            date: '2023-11-24',
            hospital: 'epworth',
            surgeon: 'dr henry',
            surgeryType: 'laparoscopic cholecystectomy',
        
            /*
                Routine
                Suspected choledocholithiasis
                Deranged LFTs
                Pancreatitis
                Other (free text)
            */
            indication: 'Routine',
          },
          {
            id: '2', // uuidv4()
            caseNumber: 2,
            patientName: 'belinda',
            urIdentifier: 'ur2',
            date: '2023-11-25',
            hospital: 'monash',
            surgeon: 'dr yuming',
            surgeryType: 'open cholecystectomy',
        
            /*
                Routine
                Suspected choledocholithiasis
                Deranged LFTs
                Pancreatitis
                Other (free text)
            */
            indication: 'Deranged LFTs',
          }
        ]
      ),
    reducers: {
        //patientName: (state, action: PayloadAction<{id:string, name:string}>) => state,
        procedureUpdated: proceduresAdapter.updateOne
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

export const { procedureUpdated } = proceduresSlice.actions;
export default proceduresSlice.reducer;
