import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, Bookmark, User, Tag, Clock } from 'lucide-react';
import type { Article } from '../types/article.types';
import Button from './ui/Button';
import { cn } from '../utils/cn';

interface ArticleCardProps {
    article: Article;
    isBookmarked?: boolean;
    onBookmark?: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
    article,
    isBookmarked = false,
    onBookmark
}) => {
    const publishedDate = new Date(article.publishedAt);

    return (
        <article className="card-gradient group flex flex-col h-full rounded-xl overflow-hidden">
            <div className="p-5 flex flex-col grow">
                {/* Source Badge */}
                <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                        <Tag size={12} />
                        {article.source}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "text-zinc-400 hover:text-amber-500",
                            isBookmarked && "text-amber-500 fill-amber-500"
                        )}
                        onClick={() => onBookmark?.(article.id)}
                    >
                        <Bookmark size={18} />
                    </Button>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 leading-tight text-zinc-900 dark:text-zinc-100 line-clamp-2">
                    {article.title}
                </h3>

                {/* Info */}
                <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                        <User size={14} />
                        <span className="truncate max-w-[120px]">{article.author || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{formatDistanceToNow(publishedDate, { addSuffix: true })}</span>
                    </div>
                </div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-md">
                                {tag.split('_').join(' ')}
                            </span>
                        ))}
                    </div>
                )}

                {/* Summary */}
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 grow line-clamp-3 leading-relaxed">
                    {article.summary || "No summary available for this story. Follow the link to read the full content."}
                </p>

                {/* Footer Link */}
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                    >
                        Read Story
                        <ExternalLink size={16} />
                    </a>
                </div>
            </div>
        </article>
    );
};

export default ArticleCard;
