import axios from "axios";
import type { Article, ArticlePost } from "../models/Article";
import { handleError } from "../handlers/ErrorHandler";

const api = 'http://localhost:5257/server_saas/';

export const articleGenerateAPI = async (topic: string, articleLength: string) => {
    try {
        const token = localStorage.getItem('token');

        const articleData: ArticlePost = {
            topic,
            articleLength,
        };

        const response = await axios.post<Article>(
            `${api}/articles`,
            articleData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const getMyArticlesAPI = async () => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get<Article[]>(`${api}/article`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};