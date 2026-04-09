import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import Button from './Button';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel'
}) => {
    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center">
                            <AlertTriangle className="text-rose-500 dark:text-rose-400" size={24} />
                        </div>
                        <div className="flex-1 mt-1">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-zinc-50 dark:bg-zinc-800/40 px-6 py-4 flex gap-3 justify-end border-t border-zinc-100 dark:border-zinc-800/80">
                    <Button 
                        variant="outline" 
                        onClick={onClose}
                    >
                        {cancelText}
                    </Button>
                    <Button 
                        variant="ghost" 
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="bg-rose-500 hover:bg-rose-600 text-white border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.05)] shadow-rose-500/20"
                    >
                        {confirmText}
                    </Button>
                </div>
                
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

export default ConfirmModal;
