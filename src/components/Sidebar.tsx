import React from 'react';
import { X, TrendingUp, Heart, LayoutGrid, PlusCircle } from 'lucide-react';
import Button from './ui/Button';
import { cn } from '../utils/cn';

interface NavItemProps {
    icon?: React.ReactNode;
    label: string;
    active?: boolean;
    count?: number;
    onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ icon, label, active, count, onClick }) => {
    return (
        <button
            className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                active
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
            )}
            onClick={onClick}
        >
            <div className="flex items-center gap-3">
                {icon}
                {label}
            </div>
            {count !== undefined && (
                <span className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full border",
                    active ? "bg-white/20 border-white/20 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-200 dark:border-zinc-700"
                )}>
                    {count}
                </span>
            )}
        </button>
    );
};

import { useGetSourcesQuery } from '../services/apiSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { setSource, setShowSidebar, toggleSidebar, setActiveNav } from '../store/uiSlice';

interface SidebarProps { }

const Sidebar: React.FC<SidebarProps> = () => {
    const dispatch = useAppDispatch();
    const { source, showSidebar, activeNav } = useAppSelector((state) => state.ui);
    const { data: sourcesData } = useGetSourcesQuery();
    const sources = sourcesData?.data || [];

    const handleSourceClick = (slug: string | undefined) => {
        dispatch(setSource(slug));
        dispatch(setShowSidebar(false));
    };

    const handleNavClick = (view: 'trending' | 'bookmarks' | 'latest') => {
        dispatch(setActiveNav(view));
        dispatch(setShowSidebar(false));
    };

    return (
        <aside className={cn(
            "fixed lg:sticky top-0 lg:top-16 z-30 h-full lg:h-[calc(100vh-64px)] w-64 bg-white dark:bg-zinc-900 lg:bg-transparent border-r dark:border-zinc-800 lg:border-none px-4 py-8 lg:py-6 transition-transform duration-300 transform lg:translate-x-0 overflow-y-auto",
            showSidebar ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}>
            <div className="lg:hidden flex justify-end mb-6">
                <Button variant="ghost" size="icon" onClick={() => dispatch(toggleSidebar())}>
                    <X size={20} />
                </Button>
            </div>

            <div className="mb-8">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Discovery</h4>
                <div className="space-y-1">
                    <NavItem
                        icon={<TrendingUp size={18} />}
                        label="Trending"
                        active={activeNav === 'trending' && !source}
                        onClick={() => handleNavClick('trending')}
                    />
                    <NavItem
                        icon={<Heart size={18} />}
                        label="Bookmarks"
                        active={activeNav === 'bookmarks'}
                        onClick={() => handleNavClick('bookmarks')}
                    />
                    <NavItem
                        icon={<LayoutGrid size={18} />}
                        label="Latest"
                        active={activeNav === 'latest'}
                        onClick={() => handleNavClick('latest')}
                    />
                </div>
            </div>

            <div className="mb-8">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 px-2">Sources</h4>
                <div className="space-y-1">
                    <NavItem
                        label="All Sources"
                        active={activeNav === 'trending' && !source}
                        onClick={() => handleNavClick('trending')}
                    />
                    {sources?.map((s: any) => (
                        <NavItem
                            key={s.slug}
                            label={s.name}
                            active={source === s.slug}
                            onClick={() => handleSourceClick(s.slug)}
                        />
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

