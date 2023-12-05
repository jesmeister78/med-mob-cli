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


export const fetchProcessedImages = createAsyncThunk('processedImages/fetchProcessedImages', async () => {
    const response = await realmUtil.fetchImages();
    console.log(response);
    //const responseJson = await response.json();
    //console.log(responseJson);
    return [
        {
            id: '1', // uuidv4()
            procedureId: '1',
            imageTimestamp: 12345,
            rawImageSource: 'string',
            processedDate: '',
            processorVersion: 'string', // version of the ai model used to generate the processed image

            attributes: [
                { name: 'chd', isPresent: true },
                { name: 'cbd', isPresent: true },
                { name: 'rahd', isPresent: true },
                { name: 'lhd', isPresent: true },
                { name: 'cysticDuct', isPresent: true },
                { name: 'duodenum', isPresent: true },
                { name: 'fillingDefects', isPresent: true }] as ImageAttribute[],

            compositeImageSource: 'string',
            labelsImageSource: 'string'
        }] as ProcessedImage[];
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
        processedImageAdded: processedImagesAdapter.addOne
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
export const { processedImageUpdated, processedImageAdded } = processedImagesSlice.actions;
export default processedImagesSlice.reducer;
