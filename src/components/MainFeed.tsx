import React from 'react';
import ArticleCard from './ArticleCard';
import ArticleSkeleton from './ArticleSkeleton';
import ErrorDisplay from './ErrorDisplay';
import EmptyState from './EmptyState';
import Pagination from './Pagination';

import { useGetArticlesQuery } from '../services/apiSlice';

import { useAppDispatch, useAppSelector } from '../store';
import { setPage, toggleBookmark, resetFilters } from '../store/uiSlice';
import { useDebounce } from '../hooks';

interface MainFeedProps { }

import FeedHeader from './FeedHeader';
import { toggleSidebar } from '../store/uiSlice';

const MainFeed: React.FC<MainFeedProps> = () => {
    const dispatch = useAppDispatch();
    const { source, page, search, bookmarks, activeNav } = useAppSelector((state) => state.ui);
    const debouncedSearch = useDebounce(search, 500);

    const { data, isLoading, isError, error, refetch, isFetching } = useGetArticlesQuery({
        page,
        limit: 12,
        source,
        search: debouncedSearch,
        sortBy: activeNav === 'latest' ? 'publishedAt' : undefined
    });

    // Business Logic: Determine Title and Subtitle
    const getFeedMetadata = () => {
        if (source) {
            const displayName = source.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            return {
                title: `Latest from ${displayName}`,
                subtitle: `Curated content specifically from ${displayName}.`
            };
        }
        if (activeNav === 'bookmarks') {
            return {
                title: 'My Bookmarks',
                subtitle: `You have ${bookmarks.length} saved article${bookmarks.length !== 1 ? 's' : ''}.`
            };
        }
        if (activeNav === 'latest') {
            return {
                title: 'Latest Decoded',
                subtitle: 'The most recent stories from the tech world, sorted by time.'
            };
        }
        return {
            title: 'Fresh from the Tech Sphere',
            subtitle: 'Curated articles aggregated from top sources across the web.'
        };
    };

    const { title, subtitle } = getFeedMetadata();

    // Business Logic: Handle bookmark filtering
    const rawArticles = data?.data || [];
    const filteredArticles = activeNav === 'bookmarks'
        ? rawArticles.filter(article => bookmarks.includes(article.id))
        : rawArticles;

    const paginationMeta = {
        total: activeNav === 'bookmarks' ? filteredArticles.length : (data?.meta?.total || 0),
        page,
        limit: 12
    };

    // Error handling message extraction
    const errorMessage = (error as any)?.data?.error?.message || (error as any)?.error || undefined;

    return (
        <main className="flex-1 p-4 lg:p-8 min-w-0">
            <FeedHeader
                title={title}
                subtitle={subtitle}
                onSortChange={() => dispatch(setPage(1))}
                onFilterClick={() => dispatch(toggleSidebar())}
            />

            {isLoading || isFetching ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => <ArticleSkeleton key={i} />)}
                </div>
            ) : isError ? (
                <ErrorDisplay
                    onRetry={() => refetch()}
                    message="Aggregator Error"
                    description={errorMessage}
                />
            ) : (
                <>
                    {filteredArticles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            {filteredArticles.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    isBookmarked={bookmarks.includes(article.id)}
                                    onBookmark={(id) => dispatch(toggleBookmark(id))}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState onReset={() => dispatch(resetFilters())} />
                    )}

                    {paginationMeta.total > 0 && (
                        <Pagination
                            page={page}
                            total={paginationMeta.total}
                            limit={12}
                            onPageChange={(page) => dispatch(setPage(page))}
                        />
                    )}
                </>
            )}
        </main>
    );
};

export default MainFeed;
