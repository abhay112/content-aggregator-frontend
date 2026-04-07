import React from 'react';
import { Search } from 'lucide-react';
import Button from './ui/Button';

interface EmptyStateProps {
    onReset: () => void;
    message?: string;
    description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    onReset,
    message = "No stories match your criteria",
    description = "Try using different keywords or selecting a broader source."
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-16 text-center bg-zinc-50/80 dark:bg-zinc-900/40 rounded-3xl border border-zinc-100 dark:border-zinc-800/50 shadow-sm animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-500/80 mb-6 drop-shadow-sm">
                <Search size={40} />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{message}</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8 leading-relaxed max-w-sm">{description}</p>
            <Button
                variant="outline"
                size="lg"
                className="rounded-xl border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all active:scale-95"
                onClick={onReset}
            >
                Reset Filters
            </Button>
        </div>
    );
};

export default EmptyState;
