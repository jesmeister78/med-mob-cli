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
import RNFetchBlob from 'rn-fetch-blob';
import { RawImage } from '../domain/rawImage';
import Config from 'react-native-config';
import { getImageFilename, getImageType } from '../domain/imageUtilityService';


export const fetchProcessedImages = createAsyncThunk('processedImages/fetchProcessedImages', async (img: RawImage) => {
    const response = await RNFetchBlob.fetch('POST', Config.XRAI_API_URL || 'http://192.168.50.53:5001/upload_and_process', {
        Server: Config.XRAI_API_SERVER || '',
        'Content-Type': 'multipart/form-data',
    }, [

        // part file from storage
        { name: img.id, filename: getImageFilename(img.rawImageSource), type: getImageType(img.rawImageSource), data: RNFetchBlob.wrap(img.rawImageSource) },
        // elements without property `filename` will be sent as plain text
        // { name: 'name', data: 'user' },
        // {
        //     name: 'info', data: JSON.stringify({
        //         mail: 'example@example.com',
        //         tel: '12345678'
        //     })
        // },
    ]);
    // .then((resp) => {
    //     // ...
    //     return dummyProcessedImages;
    // }).catch((err) => {
    //     // ...
    //     return dummyProcessedImages;
    // })
  const prImg = (await response.json()).data as ProcessedImage;
console.log("rawImg src: " + prImg.rawImageSource)
console.log("predImg src: " + prImg.labelsImageSource)
console.log("compImg src: " + prImg.compositeImageSource)

  return prImg;
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
            processedImagesAdapter.addOne(state, action.payload);
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
