import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Article, ApiResponse, ArticleQueryParams } from '../types/article.types';

export const articlesApi = createApi({
    reducerPath: 'articlesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:6001/api/v1'
    }),
    tagTypes: ['Article', 'Source'],
    endpoints: (builder) => ({
        getArticles: builder.query<ApiResponse<Article[]>, ArticleQueryParams>({
            query: (params) => ({
                url: '/articles',
                params,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Article' as const, id })),
                        { type: 'Article', id: 'LIST' },
                    ]
                    : [{ type: 'Article', id: 'LIST' }],
        }),
        getSources: builder.query<ApiResponse<any[]>, void>({
            query: () => '/sources',
            providesTags: [{ type: 'Source', id: 'LIST' }],
        }),
    }),
});

export const { useGetArticlesQuery, useGetSourcesQuery } = articlesApi;
