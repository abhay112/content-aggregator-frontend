import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    search: string;
    source: string | undefined;
    page: number;
    showSidebar: boolean;
    activeNav: 'trending' | 'bookmarks' | 'latest';
    sortBy: string;
}

const initialState: UIState = {
    search: '',
    source: undefined,
    page: 1,
    showSidebar: false,
    activeNav: 'trending',
    sortBy: 'newest',
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
            state.activeNav = 'trending';
        },
        setActiveNav: (state, action: PayloadAction<'trending' | 'bookmarks' | 'latest'>) => {
            state.activeNav = action.payload;
            state.source = undefined;
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
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
            state.page = 1;
        },
        resetFilters: (state) => {
            state.search = '';
            state.source = undefined;
            state.page = 1;
            state.activeNav = 'trending';
            state.sortBy = 'newest';
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
    setSortBy,
    resetFilters
} = uiSlice.actions;

export default uiSlice.reducer;
