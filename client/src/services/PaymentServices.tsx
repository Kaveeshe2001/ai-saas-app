import { handleError } from "../handlers/ErrorHandler";
import apiClient from "./apiClient"

export const createCheckoutSessionAPI = async () => {
    try {
        const response = await apiClient.post<{ url: string }>('/payment/create-checkout-session');
        response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
}