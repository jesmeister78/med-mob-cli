import {
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { RawImage } from '../domain/rawImage';
import { realmUtil } from '../data/realmUtil';


export const fetchRawImages = createAsyncThunk('rawImages/fetchRawImages', async () => {
    const response = await realmUtil.fetchImages();
    console.log(response);
    //const responseJson = await response.json();
    //console.log(responseJson);
    return [
        {
            id: '1', // uuidv4()
            procedureId: '1',
            imageTimestamp: 12345,
            // imageData: null, // this is the rendered image BEFORE processing
            rawImageSource: 'string'
        }] as RawImage[];
});

export const rawImagesAdapter = createEntityAdapter<RawImage>();

const rawImagesSlice = createSlice({
    name: 'rawImages',
    initialState: rawImagesAdapter.getInitialState({
                loading: false
            }),
    // rawImagesAdapter.addMany(
    //     rawImagesAdapter.getInitialState({
    //         loading: false
    //     }),
    //     [
    //         {
    //             id: '1', // uuidv4()
    //             procedureId: '1',
    //             imageTimestamp: 12345,
    //             // imageData: null, // this is the rendered image BEFORE processing
    //             rawImageSource: 'string'
    //         },
    //         {
    //             id: '2', // uuidv4()
    //             procedureId: '1',
    //             imageTimestamp: 12345,
    //             // imageData: null, // this is the rendered image BEFORE processing
    //             rawImageSource: 'string'
    //         }
    //     ]
   // ),
    reducers: {
        //patientName: (state, action: PayloadAction<{id:string, name:string}>) => state,
        rawImageUpdated: rawImagesAdapter.updateOne,
        rawImageAdded: rawImagesAdapter.addOne
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRawImages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchRawImages.fulfilled, (state, action) => {
            rawImagesAdapter.setAll(state, action.payload);
            state.loading = false;
        });
        builder.addCase(fetchRawImages.rejected, (state) => {

            state.loading = false;
        });
    }
});

export const {
    selectById: selectRawImageById,
    selectIds: selectRawImageIds,
    selectEntities: selectRawImageEntities,
    selectAll: selectAllRawImages,
    selectTotal: selectTotalRawImages
} = rawImagesAdapter.getSelectors((state: RootState) => state.rawImages);

export const selectRawImagesByProcedureId = createSelector(
    [selectAllRawImages, (images, procedureId) => procedureId],
    (images, id) => images.filter((img) => img.procedureId === id)
);

export const { rawImageUpdated, rawImageAdded } = rawImagesSlice.actions;
export default rawImagesSlice.reducer;
