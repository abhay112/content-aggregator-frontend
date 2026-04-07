import React, { useState, useEffect } from 'react';
import { useGetArticlesQuery, useGetSourcesQuery } from './services/apiSlice';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainFeed from './components/MainFeed';
import Footer from './components/Footer';

const App: React.FC = () => {
  // UI State
  const [page, setPage] = useState(1);
  const [source, setSource] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [showSidebar, setShowSidebar] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem('bookmarks') || '[]')
  );

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on search
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Dark Mode Sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Bookmark Sync
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  // Data Fetching
  const { data, isLoading, isError, refetch, isFetching } = useGetArticlesQuery({
    page,
    limit: 12,
    source,
    search: debouncedSearch
  });
  const { data: sourcesData } = useGetSourcesQuery();

  const articles = data?.data || [];
  const meta = data?.meta;

  const handleResetFilters = () => {
    setSearch('');
    setSource(undefined);
    setPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-black transition-colors duration-300">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        search={search}
        setSearch={setSearch}
        isFetching={isFetching}
        refetch={refetch}
      />

      <div className="max-w-[1440px] mx-auto w-full flex-1 flex">
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          source={source}
          setSource={setSource}
          setPage={setPage}
          bookmarksCount={bookmarks.length}
          sources={sourcesData?.data || []}
        />

        <MainFeed
          source={source}
          page={page}
          setPage={setPage}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          refetch={refetch}
          filteredArticles={articles}
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmark}
          onResetFilters={handleResetFilters}
          meta={meta}
        />
      </div>

      <Footer />
    </div>
  );
};

export default App;
