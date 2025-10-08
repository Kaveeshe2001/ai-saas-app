import apiClient from './apiClient';
import { handleError } from '../handlers/ErrorHandler';

// The return type promises an object with a URL, or undefined on failure
export const createCheckoutSessionAPI = async (): Promise<{ url: string } | undefined> => {
    try {
        const response = await apiClient.post<{ url: string }>('payment/create-checkout-session');
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};