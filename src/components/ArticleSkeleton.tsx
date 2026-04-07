import React from 'react';
import Skeleton from './ui/Skeleton';

const ArticleSkeleton: React.FC = () => {
    return (
        <div className="card-gradient group flex flex-col h-full rounded-xl p-5 overflow-hidden">
            <Skeleton className="h-6 w-24 rounded-full mb-4" />
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-8 w-1/2 mb-4" />
            <div className="flex gap-4 mb-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <Skeleton className="h-5 w-24" />
            </div>
        </div>
    );
};

export default ArticleSkeleton;
