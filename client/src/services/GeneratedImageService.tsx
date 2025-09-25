import type { AIImageResponse, CloudinarySignature, GeneratedImagePost, PublicImage, SaveImagePost } from "../models/GeneratedImage";
import { handleError } from "../handlers/ErrorHandler";
import axios from "axios";

const API_BASE_URL = 'http://localhost:5257/server_saas';
const imageEndpoint = '/generate-images';
const cloudinaryEndpoint = '/cloudinary';

// Helper to create authorized headers
const createAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const generatedAIImageAPI = async (prompt: string, style: string) => {
    try {
        const postData: GeneratedImagePost = { prompt, style };

        const response = await axios.post<AIImageResponse>(
            `${API_BASE_URL}${imageEndpoint}/generate`,
            postData,
            createAuthHeaders()
        );
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const getCloudinarySignatureAPI = async () => {
    try {
        const response = await axios.get<CloudinarySignature>(
            `${API_BASE_URL}${cloudinaryEndpoint}/upload-signature`,
            createAuthHeaders()
        );
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const saveImageToDB_API = async (imageData: SaveImagePost) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}${imageEndpoint}/save`,
            imageData,
            createAuthHeaders()
        );
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const getPublicImageAPI = async () => {
    try {
        const response = await axios.get<PublicImage[]>(
            `${API_BASE_URL}${imageEndpoint}/public`,
            createAuthHeaders() 
        );
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const likeImageAPI = async (imageId: string | number) => {
    try {
        const response = await axios.post<{ newLikeCount: number }>(
            `${API_BASE_URL}${imageEndpoint}/${imageId}/like`,
            {}, 
            createAuthHeaders()
        );
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
}