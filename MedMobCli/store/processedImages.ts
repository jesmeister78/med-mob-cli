import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { ProcessedImage } from '../domain/processedImage';
import RNFetchBlob from 'rn-fetch-blob';
import { RawImage } from '../domain/rawImage';
import { getImageFilename, getImageType } from '../domain/imageUtilityService';
import { env } from '../environment';
import { dummyAttributes } from './dummyInitState';

export const fetchProcessedImages = createAsyncThunk(
  'processedImages/fetchProcessedImages',
  async (img: RawImage) => {
    const apiUrl = env.XRAI_API_HOST + env.XRAI_API_UPLOAD;
    console.log(apiUrl)
    try {
      const response = await RNFetchBlob.fetch(
        'POST',
        apiUrl,
        {
          Server: env.XRAI_API_SERVER || '',
          'Content-Type': 'multipart/form-data',
        },
        [
          // part file from storage
          {
            name: img.id,
            filename: getImageFilename(img.rawImageSource),
            type: getImageType(img.rawImageSource),
            data: RNFetchBlob.wrap(img.rawImageSource),
          },
          // elements without property `filename` will be sent as plain text
          { name: 'name', data: img.id },
          { name: 'caseNum', data: img.procedureId },
        ],
      );
      let procImg = (await response.json()) as ProcessedImage;

      // set the dummy image attributes while we are not yet getting labels from ML
      //procImg.attributes = dummyAttributes;

      return procImg;
    } catch (error) {

      return {} as ProcessedImage;
    }
  },
);

export const processedImagesAdapter = createEntityAdapter<ProcessedImage>();

const processedImagesSlice = createSlice({
  name: 'processedImages',
  initialState: processedImagesAdapter.addMany(
    processedImagesAdapter.getInitialState({
      loading: false,
    }),
    [],
  ),
  reducers: {
    //patientName: (state, action: PayloadAction<{id:string, name:string}>) => state,
    processedImageUpdated: processedImagesAdapter.updateOne,
    processedImageAdded: processedImagesAdapter.addOne,
    processedImageRemoved: processedImagesAdapter.removeOne,
    attributeVisibilityUpdated: ( state, action: PayloadAction<{ path: string; }> ) => { 
      const path = action.payload.path; 
      const keys = path.split('.'); 
      const [entityId, attrIndex] = keys;  
      const entity = state.entities[entityId]; 
      if (!entity || !entity.attributes) { 
        throw new Error(`Invalid entity ID: ${entityId}`); 
      }  
      const index = parseInt(attrIndex)
      const attribute = entity?.attributes[index]; 
    if (!attribute) { throw new Error(`Invalid attribute at index: ${index}`); }  attribute.show = !attribute.show; }, 
  },
  extraReducers: builder => {
    builder.addCase(fetchProcessedImages.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProcessedImages.fulfilled, (state, action) => {
      if (action.payload) {
        console.log('inside fetchProcessedImages.fulfilled reducer ');

        const apiImagePath = env.XRAI_API_HOST;
        const img = action.payload;
        let procImg = {
          id: img.id,
          procedureId: img.procedureId,
          imageTimestamp: img.imageTimestamp,
          rawImageSource: apiImagePath + img.rawImageSource,
          compositeImageSource: apiImagePath + img.compositeImageSource,
          labelsImageSource: apiImagePath + img.labelsImageSource,
          predictionImageSource: apiImagePath + img.predictionImageSource,
          attributes: img.attributes,
        } as ProcessedImage;

        for (var propt in procImg) {
          console.log(propt + ': ' + procImg[propt as keyof ProcessedImage]);
        }
        processedImagesAdapter.updateOne(state, {
          id: procImg.id,
          changes: {
            compositeImageSource: procImg.compositeImageSource,
            labelsImageSource: procImg.labelsImageSource,
            predictionImageSource: procImg.predictionImageSource,
            attributes: procImg.attributes,
          },
        });
        //store.dispatch(bookUpdated({ id: 'a', changes: { title: 'First (altered)' } }))
      } else {
        console.log('action.payload is undefined');
      }
      state.loading = false;
    });
    builder.addCase(fetchProcessedImages.rejected, state => {
      state.loading = false;
    });
  },
});

export const {
  selectById: selectProcessedImageById,
  selectIds: selectProcessedImageIds,
  selectEntities: selectProcessedImageEntities,
  selectAll: selectAllProcessedImages,
  selectTotal: selectTotalProcessedImages,
} = processedImagesAdapter.getSelectors(
  (state: RootState) => state.processedImages,
);

export const selectProcessedImagesByProcedureId = createSelector(
  [selectAllProcessedImages, (_, procedureId) => procedureId],
  (images, id) => images.filter(img => img.procedureId === id),
);


export const {
  processedImageUpdated,
  processedImageAdded,
  processedImageRemoved,
  attributeVisibilityUpdated,
} = processedImagesSlice.actions;
export default processedImagesSlice.reducer;
