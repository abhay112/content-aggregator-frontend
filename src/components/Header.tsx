import React from 'react';
import { Menu, Moon, Sun, Search, TrendingUp, RefreshCcw } from 'lucide-react';
import Button from './ui/Button';

interface HeaderProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    showSidebar: boolean;
    setShowSidebar: (value: boolean) => void;
    search: string;
    setSearch: (value: string) => void;
    isFetching: boolean;
    refetch: () => void;
}

const Header: React.FC<HeaderProps> = ({
    darkMode,
    setDarkMode,
    showSidebar,
    setShowSidebar,
    search,
    setSearch,
    isFetching,
    refetch
}) => {
    return (
        <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
            <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        <Menu size={20} />
                    </Button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
                            <TrendingUp size={18} className="text-white" />
                        </div>
                        <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                            Aggregator
                        </span>
                    </div>
                </div>

                <div className="flex-1 max-w-xl mx-8 relative group hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search stories, authors..."
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100/50 dark:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400/50 transition-all text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden sm:flex items-center gap-2"
                        onClick={() => refetch()}
                        disabled={isFetching}
                    >
                        <RefreshCcw size={16} className={isFetching ? "animate-spin" : ""} />
                        Refresh
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
