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

interface SidebarProps {
    showSidebar: boolean;
    setShowSidebar: (value: boolean) => void;
    source: string | undefined;
    setSource: (value: string | undefined) => void;
    setPage: (value: number) => void;
    bookmarksCount: number;
    sources: any[];
}

const Sidebar: React.FC<SidebarProps> = ({
    showSidebar,
    setShowSidebar,
    source,
    setSource,
    setPage,
    bookmarksCount,
    sources
}) => {
    return (
        <aside className={cn(
            "fixed lg:sticky top-0 lg:top-16 z-30 h-full lg:h-[calc(100vh-64px)] w-64 bg-white dark:bg-zinc-900 lg:bg-transparent border-r dark:border-zinc-800 lg:border-none px-4 py-8 lg:py-6 transition-transform duration-300 transform lg:translate-x-0 overflow-y-auto",
            showSidebar ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}>
            <div className="lg:hidden flex justify-end mb-6">
                <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)}>
                    <X size={20} />
                </Button>
            </div>

            <div className="mb-8">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Discovery</h4>
                <div className="space-y-1">
                    <NavItem icon={<TrendingUp size={18} />} label="Trending" active={!source} onClick={() => setSource(undefined)} />
                    <NavItem icon={<Heart size={18} />} label="Bookmarks" count={bookmarksCount} />
                    <NavItem icon={<LayoutGrid size={18} />} label="Latest" />
                </div>
            </div>

            <div className="mb-8">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 px-2">Sources</h4>
                <div className="space-y-1">
                    <NavItem
                        label="All Sources"
                        active={!source}
                        onClick={() => { setSource(undefined); setPage(1); }}
                    />
                    {sources?.map((s: any) => (
                        <NavItem
                            key={s.slug}
                            label={s.name}
                            active={source === s.slug}
                            onClick={() => { setSource(s.slug); setPage(1); }}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-auto">
                <div className="p-4 rounded-xl bg-emerald-600 text-white flex flex-col gap-3">
                    <p className="text-sm font-medium leading-tight">Got a suggestion for a new source?</p>
                    <Button variant="secondary" size="sm" className="bg-white text-emerald-600 border-none hover:bg-emerald-50">
                        <PlusCircle size={14} className="mr-2" />
                        Propose Source
                    </Button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
