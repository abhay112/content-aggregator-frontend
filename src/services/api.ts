import axios from 'axios';
import type { Article, ApiResponse, ArticleQueryParams } from '../types/article.types';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:6001/api/v1',
    timeout: 10000,
});

export const getArticles = async (params: ArticleQueryParams) => {
    const { data } = await api.get<ApiResponse<Article[]>>('/articles', { params });
    return data;
};

export const getSources = async () => {
    const { data } = await api.get<ApiResponse<any[]>>('/sources');
    return data;
};
