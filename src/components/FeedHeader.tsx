import React from 'react';
import { Filter } from 'lucide-react';
import Button from './ui/Button';

interface FeedHeaderProps {
    title: string;
    subtitle: string;
    sortBy?: string;
    onSortChange?: (value: string) => void;
    onFilterClick?: () => void;
}

const FeedHeader: React.FC<FeedHeaderProps> = ({
    title,
    subtitle,
    sortBy,
    onSortChange,
    onFilterClick
}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-8 border-b border-zinc-100 dark:border-zinc-800/50">
            <div>
                <h1 className="text-2xl font-black mb-2 tracking-tight text-zinc-900 dark:text-zinc-100">
                    {title}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                    {subtitle}
                </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
                <div className="relative inline-block">
                    <select
                        className="appearance-none bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 text-sm py-2 pl-4 pr-10 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 outline-none transition-all cursor-pointer shadow-sm hover:border-emerald-500/30 font-medium"
                        value={sortBy}
                        onChange={(e) => onSortChange?.(e.target.value)}
                    >
                        <option value="newest">Newest First</option>
                        <option value="relative">Relative Time</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                        <Filter size={14} />
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden rounded-xl border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 group"
                    onClick={onFilterClick}
                >
                    <Filter size={18} className="group-hover:scale-110 transition-transform" />
                </Button>
            </div>
        </div>
    );
};

export default FeedHeader;
