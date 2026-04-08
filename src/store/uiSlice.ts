import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    search: string;
    source: string | undefined;
    page: number;
    showSidebar: boolean;
    bookmarks: string[];
    activeNav: 'trending' | 'bookmarks' | 'latest';
}

const getInitialBookmarks = (): string[] => {
    try {
        const item = window.localStorage.getItem('bookmarks');
        return item ? JSON.parse(item) : [];
    } catch (error) {
        return [];
    }
};

const initialState: UIState = {
    search: '',
    source: undefined,
    page: 1,
    showSidebar: false,
    bookmarks: getInitialBookmarks(),
    activeNav: 'trending',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
            state.page = 1;
        },
        setSource: (state, action: PayloadAction<string | undefined>) => {
            state.source = action.payload;
            state.page = 1;
            state.activeNav = 'trending'; // Reset to trending when a specific source is selected
        },
        setActiveNav: (state, action: PayloadAction<'trending' | 'bookmarks' | 'latest'>) => {
            state.activeNav = action.payload;
            state.source = undefined; // Reset source when changing discovery view
            state.page = 1;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        toggleSidebar: (state) => {
            state.showSidebar = !state.showSidebar;
        },
        setShowSidebar: (state, action: PayloadAction<boolean>) => {
            state.showSidebar = action.payload;
        },
        toggleBookmark: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (state.bookmarks.includes(id)) {
                state.bookmarks = state.bookmarks.filter(b => b !== id);
            } else {
                state.bookmarks.push(id);
            }
            window.localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
        },
        resetFilters: (state) => {
            state.search = '';
            state.source = undefined;
            state.page = 1;
            state.activeNav = 'trending';
        }
    },
});

export const {
    setSearch,
    setSource,
    setActiveNav,
    setPage,
    toggleSidebar,
    setShowSidebar,
    toggleBookmark,
    resetFilters
} = uiSlice.actions;

export default uiSlice.reducer;
