export interface Article {
    id: string;
    externalId: string | null;
    title: string;
    url: string;
    source: string;
    author: string;
    summary: string;
    publishedAt: string;
    fetchedAt: string;
    tags: string[];
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
    error?: {
        message: string;
        code: string;
    };
}

export interface ArticleQueryParams {
    page?: number;
    limit?: number;
    source?: string;
    search?: string;
    sortBy?: string;
}
