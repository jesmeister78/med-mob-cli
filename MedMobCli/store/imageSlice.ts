import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
  Update,
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { env } from '../environment';
import { imageService } from '../services/imageService';
import { setError } from './errorSlice';
import axios, { AxiosError } from 'axios';
import { procedureUpdated, updateProcedure } from './procedureSlice';
import { procedureService } from '../services/procedureService';
import { Image } from '../domain/image';

export const addImage = createAsyncThunk(
  'images/addImage',
  async (img: Image, { dispatch }) => {
    try {
      const image = await imageService.addImageAsync(img)
      return image;
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
  'images/processImage',
  async (id: string, { dispatch }) => {
    try {
      // send the image to the engine 
      const processedImage = await imageService.processImageAsync(id);
      if (processedImage.procedureId)
        // if no errors then we will dispatch an action to update the procedure's default image source to the server-side saved raw img src
        dispatch(updateProcedure({ id: processedImage.procedureId, changes: { defaultImageSource: processedImage.rawImageSource } }))
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
export const updateImage = createAsyncThunk(
  'images/updateImage',
  async (payload: Update<Image>, { dispatch }) => {
    try {
      const proc = await imageService.updateImageAsync(payload)
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
export const fetchImagesForProcedure = createAsyncThunk(
  'images/fetchImagesForProcedure',
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
  'images/fetchProcessedImages',
  async (img: Image) => {
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

      return {} as Image;
    }
  },
);

export const imagesAdapter = createEntityAdapter<Image>();

const imagesSlice = createSlice({
  name: 'images',
  initialState: imagesAdapter.addMany(
    imagesAdapter.getInitialState({
      loading: false,
    }),
    [],
  ),
  reducers: {
    //patientName: (state, action: PayloadAction<{id:string, name:string}>) => state,
    imageUpdated: imagesAdapter.updateOne,
    imageAdded: imagesAdapter.addOne,
    imageRemoved: imagesAdapter.removeOne,
    maskVisibilityUpdated: (state, action: PayloadAction<{ path: string; }>) => {
      const path = action.payload.path;
      const keys = path.split('.');
      const [entityId, maskIndex] = keys;
      const entity = state.entities[entityId];
      if (!entity || !entity.masks) {
        throw new Error(`Invalid entity ID: ${entityId}`);
      }
      const index = parseInt(maskIndex)
      const mask = entity?.masks[index];
      if (!mask) { throw new Error(`Invalid mask at index: ${index}`); } mask.show = !mask.show;
    },
  },
  extraReducers: builder => {

    builder.addCase(fetchImagesForProcedure.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchImagesForProcedure.fulfilled, (state, action) => {

      action.payload && imagesAdapter.addMany(state, action.payload);

      state.loading = false;
    });
    builder.addCase(fetchImagesForProcedure.rejected, state => {
      state.loading = false;
    });
    builder.addCase(processImage.pending, state => {
      state.loading = true;
    });
    builder.addCase(processImage.fulfilled, (state, action) => {
      const img = action.payload;

      imagesAdapter.updateOne(state, {
        id: img.id,
        changes: {
          rawImageSource: img.rawImageSource,
          compositeImageSource: img.compositeImageSource,
          labelsImageSource: img.labelsImageSource,
          predictionImageSource: img.predictionImageSource,
          masks: img.masks,
        },
      });

      state.loading = false;
    });
    builder.addCase(processImage.rejected, state => {
      state.loading = false;
    });
    builder.addCase(updateImage.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateImage.fulfilled, (state, action) => {
      if (action.payload) {

        imagesAdapter.updateOne(state, action.payload);
        //store.dispatch(bookUpdated({ id: 'a', changes: { title: 'First (altered)' } }))
      } else {
        console.log('action.payload is undefined');
      }
      state.loading = false;
    });
    builder.addCase(updateImage.rejected, state => {
      state.loading = false;
    });
    builder.addCase(addImage.pending, state => {
      state.loading = true;
    });
    builder.addCase(addImage.fulfilled, (state, action) => {
      action.payload && 
      imagesAdapter.addOne(state, action.payload);
      state.loading = false;
    });
    builder.addCase(addImage.rejected, state => {
      state.loading = false;
    });
  },
});

export const {
  selectById: selectImageById,
  selectIds: selectImageIds,
  selectEntities: selectImageEntities,
  selectAll: selectAllImages,
  selectTotal: selectTotalImages,
} = imagesAdapter.getSelectors(
  (state: RootState) => state.images,
);

export const selectImagesByProcedureId = createSelector(
  [selectAllImages, (_, procedureId) => procedureId],
  (images, id) => images.filter(img => img.procedureId === id),
);


export const {
  imageUpdated,
  imageAdded,
  imageRemoved,
  maskVisibilityUpdated: maskVisibilityUpdated,
} = imagesSlice.actions;
export default imagesSlice.reducer;
