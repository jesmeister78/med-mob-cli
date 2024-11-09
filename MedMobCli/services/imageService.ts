import { xraiApi } from './api';
import { Image } from '../domain/image';
import { Update } from '@reduxjs/toolkit';
import { prettyPrint } from '../utils';

export const imageService = (() => {

    const imagesPath = "images";
    const processedPath = "processed"

    return {
        addImageAsync: async (img: Image) => {
            // Create form data
            const formData = new FormData();
            formData.append('image', {
                uri: img.rawImageSource,
                type: "image/jpeg",
                name: `${img.id}.jpeg`,
            });
            formData.append("id", img.id);
            formData.append("imageTimestamp", img.imageTimestamp);
            const response = await xraiApi.post<Image>(`/${imagesPath}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        },
        getImageAsync: async (imageId: string) => {
            const response = await xraiApi.get<Image>(`/${imagesPath}/${processedPath}/${imageId}/`, {
                responseType: 'json',
            });
            return response as Image;
        },

        processImageAsync: async (imageId: string) => {
            const response = await xraiApi.put<Image>(`/${imagesPath}/${imageId}/`, {
                responseType: 'json',
            });
            console.log(prettyPrint(response))
            return response as Image;
        },

        updateImageAsync: async (changes: Update<Image>) => {
            const response = await xraiApi.patch<Image>(`/${imagesPath}/${changes.id}/`, changes);
            return response;
        },

        deleteImageAsync: async (imageId: string) => {
            await xraiApi.delete(`/${imagesPath}/${processedPath}/${imageId}/`);
        },
    };
})();