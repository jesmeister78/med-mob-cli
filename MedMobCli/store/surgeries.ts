import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { Procedure } from '../domain/surgery';
import { realmUtil } from '../data/realmUtil';


export const fetchSurgeries = createAsyncThunk('surgeries/fetchSurgeries', async () => {
    const response = await realmUtil.fetchSurgeries();
    console.log(response);
    //const responseJson = await response.json();
    //console.log(responseJson);
    return response as Procedure[];
});

export const SurgeriesAdapter = createEntityAdapter<Procedure>();

const SurgeriesSlice = createSlice({
    name: 'surgeries',
    initialState: SurgeriesAdapter.getInitialState({
        loading: false
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSurgeries.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchSurgeries.fulfilled, (state, action) => {
            SurgeriesAdapter.setAll(state, action.payload);
            state.loading = false;
        });
        builder.addCase(fetchSurgeries.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const {
    selectById: selectSurgeryById,
    selectIds: selectSurgeryIds,
    selectEntities: selectSurgeryEntities,
    selectAll: selectAllSurgeries,
    selectTotal: selectTotalUsers
} = SurgeriesAdapter.getSelectors((state: RootState) => state.surgeries);

export default SurgeriesSlice.reducer;
