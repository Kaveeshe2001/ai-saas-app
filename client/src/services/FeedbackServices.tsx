import axios from "axios";
import { handleError } from "../handlers/ErrorHandler";
import type { FeedbackPost } from "../models/Feedback";

const api = 'http://localhost:5257/server_saas/';

export const feedbackPostAPI = async (
    email: string,
) => {
    try {
        const data = await axios.post<FeedbackPost>(
            `${api}feedback`,
            {
                email: email,
            },
        );
        return data;
    } catch (error) {
        handleError(error);
    }
};