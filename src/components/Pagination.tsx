import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './ui/Button';

interface PaginationProps {
    page: number;
    total: number;
    limit: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    total,
    limit,
    onPageChange
}) => {
    if (total <= limit) return null;

    return (
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 px-4 py-8 border-t border-zinc-100 dark:border-zinc-800/50">
            <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Showing page <span className="text-emerald-600 dark:text-emerald-400 font-bold">{page}</span> of <span className="font-bold">{Math.ceil(total / limit)}</span>
            </div>

            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-2 pr-4 transition-all disabled:opacity-50"
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                >
                    <ChevronLeft size={16} />
                    Earlier
                </Button>

                <div className="flex items-center gap-1.5 mx-2">
                    {[...Array(Math.min(3, Math.ceil(total / limit)))].map((_, i) => (
                        <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${page === i + 1 ? 'bg-emerald-500 w-4 shadow-sm shadow-emerald-500/20' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                        />
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-2 pl-4 transition-all disabled:opacity-50"
                    disabled={page * limit >= total}
                    onClick={() => onPageChange(page + 1)}
                >
                    Later
                    <ChevronRight size={16} />
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
