import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Article, ApiResponse, ArticleQueryParams } from '../types/article.types';

export const articlesApi = createApi({
    reducerPath: 'articlesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL
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
        toggleBookmark: builder.mutation<ApiResponse<Article>, string>({
            query: (id) => ({
                url: `/articles/${id}/bookmark`,
                method: 'POST',
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: 'Article', id },
                { type: 'Article', id: 'LIST' },
            ],
        }),
        clearBookmarks: builder.mutation<ApiResponse<void>, void>({
            query: () => ({
                url: '/articles/bookmarks',
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Article', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetArticlesQuery,
    useGetSourcesQuery,
    useToggleBookmarkMutation,
    useClearBookmarksMutation
} = articlesApi;

