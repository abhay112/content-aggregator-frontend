import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import Button from './ui/Button';

interface ErrorDisplayProps {
    onRetry: () => void;
    message?: string;
    description?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
    onRetry,
    message = "Sync failure detected",
    description = "We're having trouble reaching the aggregator mothership. Please check your connection or try again."
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-amber-50/50 dark:bg-amber-900/10 rounded-3xl border-dashed border-2 border-amber-200/50 dark:border-amber-900/30">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
                <AlertCircle size={32} />
            </div>
            <h2 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">{message}</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm leading-relaxed">{description}</p>
            <Button
                onClick={onRetry}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-lg shadow-emerald-500/20"
            >
                <RefreshCcw size={18} className="mr-2" />
                Attempt Re-sync
            </Button>
        </div>
    );
};

export default ErrorDisplay;
