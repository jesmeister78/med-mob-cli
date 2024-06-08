import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { ProcessedImage } from '../domain/processedImage';
import RNFetchBlob from 'rn-fetch-blob';
import { RawImage } from '../domain/rawImage';
import Config from 'react-native-config';
import { getImageFilename, getImageType } from '../domain/imageUtilityService';


export const fetchProcessedImages = createAsyncThunk('processedImages/fetchProcessedImages', async (img: RawImage) => {
    // const apiUrl = Config.XRAI_API! + Config.XRAI_API_UPLOAD!;
    const apiUrl = 'http://192.168.50.53:5001/upload_and_process'; // Config.XRAI_API_URL;
    const apiImagePath = 'http://192.168.50.53:5001/images/processed/'; //Config.XRAI_API_IMAGES;
    console.log("apiUrl: " + apiUrl)
    if (apiUrl) {
        const response = await RNFetchBlob.fetch('POST', apiUrl, {
            Server: Config.XRAI_API_SERVER || '',
            'Content-Type': 'multipart/form-data',
        }, [

            // part file from storage
            { name: img.id, filename: getImageFilename(img.rawImageSource), type: getImageType(img.rawImageSource), data: RNFetchBlob.wrap(img.rawImageSource) },
            // elements without property `filename` will be sent as plain text
            { name: 'name', data: img.id },
        ]);
        return (await response.json()) as ProcessedImage;

    }
    else return {} as ProcessedImage

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
            if (action.payload) {
                
                console.log('inside fetchProcessedImages.fulfilled reducer ');
                
                const apiImagePath = 'http://192.168.50.53:5001/'; //Config.XRAI_API_IMAGES;
                const img = action.payload;
                let procImg = {
                    id: img.id,
                    procedureId: img.procedureId,
                    imageTimestamp: img.imageTimestamp,
                    rawImageSource: apiImagePath + img.rawImageSource,
                    compositeImageSource: apiImagePath + img.compositeImageSource,
                    labelsImageSource: apiImagePath + img.labelsImageSource,
                    predictionImageSource: apiImagePath + img.predictionImageSource
                } as ProcessedImage;

                for(var propt in procImg){
                    console.log(propt + ': ' + procImg[propt as keyof ProcessedImage]);
                }
                processedImagesAdapter.updateOne(state, { 
                    id: procImg.id, 
                    changes: { 
                        compositeImageSource: procImg.compositeImageSource, 
                        labelsImageSource: procImg.labelsImageSource, 
                        predictionImageSource: procImg.predictionImageSource, 

                    } });
                //store.dispatch(bookUpdated({ id: 'a', changes: { title: 'First (altered)' } }))

            } else {
                console.log("action.payload is undefined")
            }
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
