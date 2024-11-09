import {
    PayloadAction,
    Update,
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { Procedure } from '../domain/procedure';
import { setError } from './errorSlice';
import { procedureService } from '../services/procedureService';
import { userService } from '../services/userService';


export const fetchProcedures = createAsyncThunk('procedures/fetchProcedures', async (userId: string, { dispatch }) => {
    try {
        const procedures = await userService.getProceduresForUserAsync(userId);

        return procedures;
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setError(error.message));

        } else {
            // Handle other types of errors if needed 
            console.error('An unknown error occurred:', error);
        }
        // throw the error so the rejected extra reducer is called
        throw error;
    }
});

export const updateProcedure = createAsyncThunk('procedures/updateProcedure', async (payload: Update<Procedure>, { dispatch }) => {
    try {
        const proc = procedureService.updateProcedureAsync(payload)
        return payload;
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setError(error.message));

        } else {
            // Handle other types of errors if needed 
            console.error('An unknown error occurred:', error);
        }
        // throw the error so the rejected extra reducer is called
        throw error;
    }
});

export const addProcedure = createAsyncThunk(
    'procedures/addProcedure',
    async (procedure: Procedure, { dispatch }) => {
        try {
            const proc = await procedureService.addProcedureAsync(procedure)

            return proc;
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message));

            } else {
                // Handle other types of errors if needed 
                console.error('An unknown error occurred:', error);
            }
            // throw the error so the rejected extra reducer is called
            throw error;
        }
    }
);

export const proceduresAdapter = createEntityAdapter<Procedure>();

const proceduresSlice = createSlice({
    name: 'procedures',
    initialState: proceduresAdapter.addMany(
        proceduresAdapter.getInitialState({
            loading: false,
            error: null
        }),
        []
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
            action.payload && proceduresAdapter.setAll(state, action.payload);
            state.loading = false;
        });
        builder.addCase(fetchProcedures.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
        // keeping database and local states detatched for now
        builder.addCase(updateProcedure.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProcedure.fulfilled, (state, action) => {
            state.loading = false;
            proceduresAdapter.updateOne(state, action.payload!)
            // // Update the procedure in the state
            // const updatedProc = action.payload;
            // action.payload?.id && state.entities[action.payload.id] = action.payload;
        });
        builder.addCase(updateProcedure.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
        // keeping database and local states detatched for now
        builder.addCase(addProcedure.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addProcedure.fulfilled, (state, action) => {
            state.loading = false;
            action.payload && proceduresAdapter.addOne(state, action.payload);
        });
        builder.addCase(addProcedure.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
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

export const selectProceduresByUserId = createSelector(
    [selectAllProcedures, (_, userId) => userId],
    (procedures, id) => procedures.filter(proc => proc.userId === id),
);

export const { procedureUpdated, procedureAdded } = proceduresSlice.actions;
export default proceduresSlice.reducer;
