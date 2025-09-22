import type { AIImageResponse, CloudinarySignature, GeneratedImagePost, PublicImage, SaveImagePost } from "../models/GeneratedImage";
import { handleError } from "../handlers/ErrorHandler";
import apiClient from "./apiClient";

const imageEndpoint = '/generate-images';
const cloudinaryEndpoint = '/cloudinary';

export const generatedAIImageAPI = async (prompt: string, style: string) => {
    try {
        const postData: GeneratedImagePost = { prompt, style };

        const response = await apiClient.post<AIImageResponse>(`${imageEndpoint}/generate`, postData);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const getCloudinarySignatureAPI = async () => {
    try {
        const response = await apiClient.get<CloudinarySignature>(`${cloudinaryEndpoint}/upload-signature`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const saveImageToDB_API = async (imageData: SaveImagePost) => {
    try {
        const response = await apiClient.post(`${imageEndpoint}/save`, imageData);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const getPublicImageAPI = async () => {
    try {
        const response = await apiClient.get<PublicImage[]>(`${imageEndpoint}/public`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
}