import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook to manage theme (dark/light mode).
 * @returns Object containing theme state and toggle function
 */
export function useTheme() {
    const [darkMode, setDarkMode] = useLocalStorage<boolean>(
        'darkMode',
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((prev: boolean) => !prev);

    return { darkMode, setDarkMode, toggleDarkMode };
}
