import axios from "axios";
import type { AIImageResponse, CloudinarySignature, GeneratedImagePost, SaveImagePost } from "../models/GeneratedImage";
import { handleError } from "../handlers/ErrorHandler";

const api = 'http://localhost:5257/server_saas/';

export const generatedAIImageAPI = async (prompt: string, style: string) => {
    try {
        const token = localStorage.getItem('token');
        const postData: GeneratedImagePost = { prompt, style };

        const response = await axios.post<AIImageResponse>(`${api}generate-images/generate`, postData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const getCloudinarySignatureAPI = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get<CloudinarySignature>(`${api}cloudinary/upload-signature`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const saveImageToDB_API = async (imageData: SaveImagePost) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${api}generate-images//save`, imageData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};