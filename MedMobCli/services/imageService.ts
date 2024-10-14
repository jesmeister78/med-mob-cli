import { Platform } from 'react-native';
import { env } from '../environment';
import api from './api';
import { XraiImage } from '../domain/xraiImage';
import { Update } from '@reduxjs/toolkit';

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
        const response = await api.post<XraiImage>(env.XRAI_API_IMAGES, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    getImageAsync: async (imageId: string) => {
        const response = await api.get<XraiImage>(`${env.XRAI_API_PROCESSED_IMAGES}/${imageId}`, {
            responseType: 'json',
        });
        return response.data as XraiImage;
    },

    processImageAsync: async (imageId: string) => {
        const response = await api.put<XraiImage>(`${env.XRAI_API_IMAGES}/${imageId}`, {
            responseType: 'json',
        });
        return response.data as XraiImage;
    },

    updateImageAsync: async (changes: Update<XraiImage>) => {
        const response = await api.patch<XraiImage>(`${env.XRAI_API_IMAGES}/${changes.id}`, changes);
        return response.data;
    },

    deleteImageAsync: async (imageId: string) => {
        await api.delete(`${env.XRAI_API_PROCESSED_IMAGES}/${imageId}`);
    },
};