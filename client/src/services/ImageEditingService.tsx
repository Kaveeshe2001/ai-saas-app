import { handleError } from "../handlers/ErrorHandler";
import type { EditedImageResponse } from "../models/EditedImageResponse";
import apiClient from "./apiClient";

export const removeObjectAPI = async (imageFile: File, maskFile: File) => {
    try {
        const formData = new FormData();
        formData.append('imageFIle', imageFile);
        formData.append('maskFile', maskFile);

        const response = await apiClient.post('/image-editing/remove-object', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
}

export const removeBackgroundAPI = async (imageFile: File): Promise<EditedImageResponse | undefined> => {
    try {
        const formData = new FormData();
        formData.append('imageFile', imageFile);

        const response = await apiClient.post<EditedImageResponse>(
            '/image-editing/remove-background',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }  
        );
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
}