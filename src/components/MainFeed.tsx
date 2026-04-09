import React from 'react';
import ArticleCard from './ArticleCard';
import ArticleSkeleton from './ArticleSkeleton';
import ErrorDisplay from './ErrorDisplay';
import EmptyState from './EmptyState';
import Pagination from './Pagination';

import { useGetArticlesQuery, useToggleBookmarkMutation, useClearBookmarksMutation } from '../services/apiSlice';

import { useAppDispatch, useAppSelector } from '../store';
import { setPage, resetFilters, setSortBy, setLimit } from '../store/uiSlice';
import { useDebounce } from '../hooks';

interface MainFeedProps { }

import FeedHeader from './FeedHeader';
import { toggleSidebar } from '../store/uiSlice';
import Button from './ui/Button';
import { Trash2 } from 'lucide-react';
import { cn } from '../utils/cn';

const MainFeed: React.FC<MainFeedProps> = () => {
    const dispatch = useAppDispatch();
    const { source, page, search, activeNav, sortBy, limit } = useAppSelector((state) => state.ui);
    const debouncedSearch = useDebounce(search, 500);

    const [toggleBookmarkApi] = useToggleBookmarkMutation();
    const [clearBookmarksApi] = useClearBookmarksMutation();

    const { data, isLoading, isError, error, refetch, isFetching } = useGetArticlesQuery({
        page,
        limit,
        source,
        search: debouncedSearch,
        saved: activeNav === 'bookmarks' ? true : undefined,
        sortBy: activeNav === 'latest' ? 'publishedAt' : sortBy
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
            const count = data?.meta?.total || 0;
            return {
                title: 'My Bookmarks',
                subtitle: `You have ${count} saved article${count !== 1 ? 's' : ''}.`
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

    const articles = data?.data || [];

    const paginationMeta = {
        total: data?.meta?.total || 0,
        page,
        limit
    };

    const handleClearAll = async () => {
        if (window.confirm('Are you sure you want to remove all bookmarks?')) {
            await clearBookmarksApi();
        }
    };

    const errorMessage = (error as any)?.data?.error?.message || (error as any)?.error || undefined;

    return (
        <main className="flex-1 p-4 lg:p-8 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <FeedHeader
                    title={title}
                    subtitle={subtitle}
                    sortBy={sortBy}
                    onSortChange={(val) => dispatch(setSortBy(val))}
                    onFilterClick={() => dispatch(toggleSidebar())}
                />

                {activeNav === 'bookmarks' && paginationMeta.total > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 gap-2 self-start sm:self-center"
                        onClick={handleClearAll}
                    >
                        <Trash2 size={16} />
                        Clear All
                    </Button>
                )}
            </div>

            {isLoading ? (
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
                    <div className={cn(
                        "relative transition-opacity duration-300",
                        isFetching ? "opacity-70" : "opacity-100"
                    )}>
                        {articles.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                {articles.map((article) => (
                                    <ArticleCard
                                        key={article.id}
                                        article={article}
                                        isBookmarked={article.isBookmarked}
                                        onBookmark={(id) => toggleBookmarkApi(id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState onReset={() => dispatch(resetFilters())} />
                        )}
                    </div>

                    {paginationMeta.total > 0 && (
                        <Pagination
                            page={page}
                            total={paginationMeta.total}
                            limit={limit}
                            onPageChange={(page) => dispatch(setPage(page))}
                            onLimitChange={(limit) => dispatch(setLimit(limit))}
                        />
                    )}
                </>
            )}
        </main>
    );
};

export default MainFeed;
