import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './ui/Button';

interface PaginationProps {
    page: number;
    total: number;
    limit: number;
    onPageChange: (page: number) => void;
    onLimitChange?: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    total,
    limit,
    onPageChange,
    onLimitChange
}) => {
    const totalPages = Math.ceil(total / limit);
    
    // We shouldn't hide it completely if total <= limit, maybe the user wants to change limit?
    // But if totalPages <= 1 and limit is 100, might still be useful to have it. 
    // Usually if there's no result, we don't show pagination, but if there's < limit, we might.
    if (total === 0) return null;

    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 px-4 py-8 border-t border-zinc-100 dark:border-zinc-800/50">
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Items per page:
                </span>
                <select
                    value={limit}
                    onChange={(e) => onLimitChange?.(Number(e.target.value))}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-xl text-sm px-3 py-1.5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-zinc-700 dark:text-zinc-300 shadow-sm"
                >
                    {[10, 20, 50, 100].map(size => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 hidden md:block ml-2">
                    Showing {Math.min((page - 1) * limit + 1, total)} - {Math.min(page * limit, total)} of {total}
                </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800 w-8 h-8 sm:w-9 sm:h-9 p-0 flex items-center justify-center transition-all disabled:opacity-50 shrink-0"
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                >
                    <ChevronLeft size={16} />
                </Button>

                {startPage > 1 && (
                    <>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 sm:w-9 sm:h-9 p-0 flex items-center justify-center rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium text-xs sm:text-sm shrink-0"
                            onClick={() => onPageChange(1)}
                        >
                            1
                        </Button>
                        {startPage > 2 && <span className="text-zinc-400 dark:text-zinc-600 tracking-widest px-0.5 sm:px-1 shrink-0">...</span>}
                    </>
                )}

                {pages.map((p) => (
                    <Button
                        key={p}
                        variant={page === p ? 'primary' : 'ghost'}
                        size="sm"
                        className={`w-8 h-8 sm:w-9 sm:h-9 p-0 flex items-center justify-center rounded-xl transition-all font-medium text-xs sm:text-sm shrink-0 ${
                            page === p 
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/20' 
                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                        onClick={() => onPageChange(p)}
                    >
                        {p}
                    </Button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="text-zinc-400 dark:text-zinc-600 tracking-widest px-0.5 sm:px-1 shrink-0">...</span>}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 sm:w-9 sm:h-9 p-0 flex items-center justify-center rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium text-xs sm:text-sm shrink-0"
                            onClick={() => onPageChange(totalPages)}
                        >
                            {totalPages}
                        </Button>
                    </>
                )}

                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800 w-8 h-8 sm:w-9 sm:h-9 p-0 flex items-center justify-center transition-all disabled:opacity-50 shrink-0"
                    disabled={page === totalPages || totalPages === 0}
                    onClick={() => onPageChange(page + 1)}
                >
                    <ChevronRight size={16} />
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
