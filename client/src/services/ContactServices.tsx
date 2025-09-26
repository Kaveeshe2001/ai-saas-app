import axios from "axios";
import type { ContactPost } from "../models/Contact";
import { handleError } from "../handlers/ErrorHandler";

const api = 'http://localhost:5257/server_saas/';

export const contactPostAPI = async (
    name: string,
    email: string,
    subject: string,
    message: string,
) => {
    try {
        const data = await axios.post<ContactPost>(
            api,
            {
                name: name,
                email: email,
                subject: subject,
                message: message,
            },
        );
        return data;
    } catch (error) {
        handleError(error);
    }
}
