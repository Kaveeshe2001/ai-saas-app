import { handleError } from "../handlers/ErrorHandler";
import type { ResumeReviewResponse } from "../models/ResumeReview";
import apiClient from "./apiClient";

export const reviewResumeAPI = async (resumeFile: File): Promise<ResumeReviewResponse | undefined> => {
    try {
        const formData = new FormData();
        formData.append('resumeFile', resumeFile);

        const response = await apiClient.post<ResumeReviewResponse>(
            '/review-resume/upload',
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
};