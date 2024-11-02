import { Platform } from 'react-native';
import { env } from '../environment';
import api, { xraiApi } from './api';
import { XraiImage } from '../domain/xraiImage';
import { Update } from '@reduxjs/toolkit';
import { prettyPrint } from '../utils';

export const imageService = {
    addImageAsync: async (img: XraiImage) => {
        // Create form data
        const formData = new FormData();
        formData.append('image', {
            uri: img.rawImageSource,
            type: "image/jpeg",
            name: `${img.id}.jpeg`,
        });
        formData.append("id", img.id);
        formData.append("imageTimestamp", img.imageTimestamp);
        const response = await xraiApi.post<XraiImage>(env.XRAI_API_IMAGES, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    },
    getImageAsync: async (imageId: string) => {
        const response = await xraiApi.get<XraiImage>(`${env.XRAI_API_PROCESSED_IMAGES}/${imageId}`, {
            responseType: 'json',
        });
        return response as XraiImage;
    },

    processImageAsync: async (imageId: string) => {
        const response = await xraiApi.put<XraiImage>(`${env.XRAI_API_IMAGES}/${imageId}`, {
            responseType: 'json',
        });
        console.log(prettyPrint(response))
        return response as XraiImage;
    },

    updateImageAsync: async (changes: Update<XraiImage>) => {
        const response = await xraiApi.patch<XraiImage>(`${env.XRAI_API_IMAGES}/${changes.id}`, changes);
        return response;
    },

    deleteImageAsync: async (imageId: string) => {
        await xraiApi.delete(`${env.XRAI_API_PROCESSED_IMAGES}/${imageId}`);
    },
};