import {
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { realmUtil } from '../data/realmUtil';
import { ProcessedImage } from '../domain/processedImage';
import ImageAttribute from '../domain/imageAttribute';
import { dummyProcessedImages } from './dummyInitState';


export const fetchProcessedImages = createAsyncThunk('processedImages/fetchProcessedImages', async () => {
    const response = await realmUtil.fetchImages();
    console.log(response);
    //const responseJson = await response.json();
    //console.log(responseJson);
    return dummyProcessedImages;
});

export const processedImagesAdapter = createEntityAdapter<ProcessedImage>();

const processedImagesSlice = createSlice({
    name: 'processedImages',
    initialState: processedImagesAdapter.addMany(
        processedImagesAdapter.getInitialState({
            loading: false
        }),
        []
    ),
    reducers: {
        //patientName: (state, action: PayloadAction<{id:string, name:string}>) => state,
        processedImageUpdated: processedImagesAdapter.updateOne,
        processedImageAdded: processedImagesAdapter.addOne,
        processedImageRemoved: processedImagesAdapter.removeOne
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProcessedImages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProcessedImages.fulfilled, (state, action) => {
            processedImagesAdapter.setAll(state, action.payload);
            state.loading = false;
        });
        builder.addCase(fetchProcessedImages.rejected, (state) => {

            state.loading = false;
        });
    }
});

export const {
    selectById: selectProcessedImageById,
    selectIds: selectProcessedImageIds,
    selectEntities: selectProcessedImageEntities,
    selectAll: selectAllProcessedImages,
    selectTotal: selectTotalProcessedImages
} = processedImagesAdapter.getSelectors((state: RootState) => state.processedImages);

export const selectProcessedImagesByProcedureId = createSelector(
    [selectAllProcessedImages, (_, procedureId) => procedureId],
    (images, id) => images.filter((img) => img.procedureId === id)
);
export const { processedImageUpdated, processedImageAdded, processedImageRemoved } = processedImagesSlice.actions;
export default processedImagesSlice.reducer;
