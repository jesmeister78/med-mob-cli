import {
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { RawImage } from '../domain/rawImage';
import { realmUtil } from '../data/realmUtil';


export const fetchImages = createAsyncThunk('images/fetchImages', async () => {
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
            imageSource: 'string'
        }] as RawImage[];
});

export const imagesAdapter = createEntityAdapter<RawImage>();

const imagesSlice = createSlice({
    name: 'images',
    initialState: imagesAdapter.addMany(
        imagesAdapter.getInitialState({
            loading: false
        }),
        [
            {
                id: '1', // uuidv4()
                procedureId: '1',
                imageTimestamp: 12345,
               // imageData: null, // this is the rendered image BEFORE processing
                imageSource: 'string'
            },
            {
                id: '2', // uuidv4()
                procedureId: '1',
                imageTimestamp: 12345,
               // imageData: null, // this is the rendered image BEFORE processing
                imageSource: 'string'
            }
        ]
    ),
    reducers: {
        //patientName: (state, action: PayloadAction<{id:string, name:string}>) => state,
        imageUpdated: imagesAdapter.updateOne,
        imageAdded: imagesAdapter.addOne
    },
    extraReducers: (builder) => {
        builder.addCase(fetchImages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchImages.fulfilled, (state, action) => {
            imagesAdapter.setAll(state, action.payload);
            state.loading = false;
        });
        builder.addCase(fetchImages.rejected, (state) => {

            state.loading = false;
        });
    }
});

export const {
    selectById: selectImageById,
    selectIds: selectImageIds,
    selectEntities: selectImageEntities,
    selectAll: selectAllImages,
    selectTotal: selectTotalImages
} = imagesAdapter.getSelectors((state: RootState) => state.images);

export const { imageUpdated, imageAdded } = imagesSlice.actions;
export default imagesSlice.reducer;
