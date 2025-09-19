export type GeneratedImagePost = {
    prompt: string;
    style: string;
}

export type AIImageResponse = {
    imageUrl: string;
}

export interface CloudinarySignature {
    signature: string;
    timestamp: number;
    apiKey: string;
    cloudName: string;
    folder: string;
}

export interface SaveImagePost {
    prompt: string;
    style: string;
    imageUrl: string; 
    isPublic: boolean;
}