import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { XraiImage } from '../domain/xraiImage';
import { env } from '../environment';
import { imageService } from '../services/imageService';
import { setError } from './errors';
import axios, { AxiosError } from 'axios';
import { procedureUpdated, updateProcedure } from './procedures';
import { procedureService } from '../services/procedureService';

export const addXraiImage = createAsyncThunk(
  'xraiImages/uploadNewImage',
  async (img: XraiImage, { dispatch }) => {
    try {
      const imageUrl = await imageService.uploadImageAsync(img)
      console.log('Uploaded image URL:', imageUrl);
      return img;
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
  },
);

export const processImage = createAsyncThunk(
  'xraiImages/processImage',
  async (id: string, { dispatch }) => {
    try {
      // send the image to the engine 
      const processedImage = await imageService.processImageAsync(id);
      if (processedImage.procedureId)
        // if no errors then we will dispatch an action to update the procedure's default image source to the server-side saved raw img src
        dispatch(updateProcedure({ procId: processedImage.procedureId, update: { id: processedImage.procedureId, changes: { defaultImageSource: processedImage.rawImageSource } } }))
      return processedImage;

    } catch (error) {
      if (error instanceof AxiosError) {
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

export const fetchImagesForProcedure = createAsyncThunk(
  'xraiImages/fetchImagesForProcedure',
  async (procedureId: string, { dispatch }) => {
    try {

      const images = await procedureService.getImagesForProcedureAsync(procedureId);
      return images;
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
  },
);

export const fetchProcessedImage = createAsyncThunk(
  'xraiImages/fetchProcessedImages',
  async (img: XraiImage) => {
    const apiUrl = env.XRAI_API_HOST + env.XRAI_API_UPLOAD;
    console.log(apiUrl)
    try {
      // const response = await RNFetchBlob.fetch(
      //   'POST',
      //   apiUrl,
      //   {
      //     Server: env.XRAI_API_SERVER || '',
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   [
      //     // part file from storage
      //     {
      //       name: img.id,
      //       filename: getImageFilename(img.rawImageSource),
      //       type: getImageType(img.rawImageSource),
      //       data: RNFetchBlob.wrap(img.rawImageSource),
      //     },
      //     // elements without property `filename` will be sent as plain text
      //     { name: 'name', data: img.id },
      //     { name: 'caseNum', data: img.procedureId },
      //   ],
      // );
      // let procImg = (await response.json()) as ProcessedImage;

      // set the dummy image attributes while we are not yet getting labels from ML
      //procImg.attributes = dummyAttributes;
      const procImg = imageService.getImageAsync(img.id);
      return procImg;
    } catch (error) {

      return {} as XraiImage;
    }
  },
);

export const xraiImagesAdapter = createEntityAdapter<XraiImage>();

const xraiImagesSlice = createSlice({
  name: 'xraiImages',
  initialState: xraiImagesAdapter.addMany(
    xraiImagesAdapter.getInitialState({
      loading: false,
    }),
    [],
  ),
  reducers: {
    //patientName: (state, action: PayloadAction<{id:string, name:string}>) => state,
    xraiImageUpdated: xraiImagesAdapter.updateOne,
    xraiImageAdded: xraiImagesAdapter.addOne,
    xraiImageRemoved: xraiImagesAdapter.removeOne,
    maskVisibilityUpdated: (state, action: PayloadAction<{ path: string; }>) => {
      const path = action.payload.path;
      const keys = path.split('.');
      const [entityId, attrIndex] = keys;
      const entity = state.entities[entityId];
      if (!entity || !entity.masks) {
        throw new Error(`Invalid entity ID: ${entityId}`);
      }
      const index = parseInt(attrIndex)
      const attribute = entity?.masks[index];
      if (!attribute) { throw new Error(`Invalid mask at index: ${index}`); } attribute.show = !attribute.show;
    },
  },
  extraReducers: builder => {

    builder.addCase(fetchImagesForProcedure.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchImagesForProcedure.fulfilled, (state, action) => {
      
      xraiImagesAdapter.addMany(state, action.payload);
      
      state.loading = false;
    });
    builder.addCase(fetchImagesForProcedure.rejected, state => {
      state.loading = false;
    });
    builder.addCase(processImage.pending, state => {
      state.loading = true;
    });
    builder.addCase(processImage.fulfilled, (state, action) => {
      if (action.payload) {
        console.log('inside processImages.fulfilled reducer ');

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
          masks: img.masks,
        } as XraiImage;

        for (var propt in procImg) {
          console.log(propt + ': ' + procImg[propt as keyof XraiImage]);
        }
        xraiImagesAdapter.updateOne(state, {
          id: procImg.id,
          changes: {
            compositeImageSource: procImg.compositeImageSource,
            labelsImageSource: procImg.labelsImageSource,
            predictionImageSource: procImg.predictionImageSource,
            masks: procImg.masks,
          },
        });
        //store.dispatch(bookUpdated({ id: 'a', changes: { title: 'First (altered)' } }))
      } else {
        console.log('action.payload is undefined');
      }
      state.loading = false;
    });
    builder.addCase(processImage.rejected, state => {
      state.loading = false;
    });
    builder.addCase(addXraiImage.pending, state => {
      state.loading = true;
    });
    builder.addCase(addXraiImage.fulfilled, (state, action) => {
      if (action.payload) {
        console.log('inside addXraiImage.fulfilled reducer ');

        // const apiImagePath = env.XRAI_API_HOST;
        // const img = action.payload;
        // let procImg = {
        //   id: img.id,
        //   procedureId: img.procedureId,
        //   imageTimestamp: img.imageTimestamp,
        //   rawImageSource: img.rawImageSource,
        // } as XraiImage;

        // for (var propt in procImg) {
        //   console.log(propt + ': ' + procImg[propt as keyof XraiImage]);
        // }
        xraiImagesAdapter.addOne(state, action.payload);
      } else {
        console.log('action.payload is undefined');
      }
      state.loading = false;
    });
    builder.addCase(addXraiImage.rejected, state => {
      state.loading = false;
    });
  },
});

export const {
  selectById: selectXraiImageById,
  selectIds: selectXraiImageIds,
  selectEntities: selectXraiImageEntities,
  selectAll: selectAllXraiImages,
  selectTotal: selectTotalXraiImages,
} = xraiImagesAdapter.getSelectors(
  (state: RootState) => state.processedImages,
);

export const selectXraiImagesByProcedureId = createSelector(
  [selectAllXraiImages, (_, procedureId) => procedureId],
  (images, id) => images.filter(img => img.procedureId === id),
);


export const {
  xraiImageUpdated,
  xraiImageAdded,
  xraiImageRemoved,
  maskVisibilityUpdated: maskVisibilityUpdated,
} = xraiImagesSlice.actions;
export default xraiImagesSlice.reducer;
