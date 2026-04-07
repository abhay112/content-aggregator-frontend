import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="mt-16 py-12 border-t border-zinc-100 dark:border-zinc-800 text-center bg-zinc-50 dark:bg-zinc-950/50 backdrop-blur-sm">
            <div className="max-w-2xl mx-auto px-4">
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-semibold mb-2">
                    Built with precision for professional aggregation.
                </p>
                <div className="flex items-center justify-center gap-4 text-zinc-400 text-xs mb-4">
                    <span className="hover:text-emerald-500 cursor-pointer transition-colors">Privacy Policy</span>
                    <span>•</span>
                    <span className="hover:text-emerald-500 cursor-pointer transition-colors">Terms of Service</span>
                    <span>•</span>
                    <span className="hover:text-emerald-500 cursor-pointer transition-colors">API Docs</span>
                </div>
                <p className="text-zinc-400/60 text-[10px] uppercase tracking-[0.2em]">
                    © 2026 Content Aggregator Pro • System Version 4.2.0
                </p>
            </div>
        </footer>
    );
};

export default Footer;
