import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonProps {
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800',
                className
            )}
        />
    );
};

export default Skeleton;
