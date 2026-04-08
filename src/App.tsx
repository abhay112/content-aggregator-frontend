import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainFeed from './components/MainFeed';
import Footer from './components/Footer';

import { useAppDispatch, useAppSelector } from './store';
import { setSearch, setSource, setPage, setShowSidebar } from './store/uiSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { search, source, page, showSidebar } = useAppSelector((state) => state.ui);

  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlSource = searchParams.get('source') || undefined;
    const urlPageRaw = searchParams.get('page');
    const urlPage = urlPageRaw ? Math.max(1, parseInt(urlPageRaw, 10) || 1) : 1;

    if (urlSearch !== search) dispatch(setSearch(urlSearch));
    if (urlSource !== source) dispatch(setSource(urlSource));
    if (urlPage !== page) dispatch(setPage(urlPage));
  }, [searchParams, dispatch]); // Only sync when URL params change


  useEffect(() => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (source) params.source = source;
    params.page = page.toString();

    setSearchParams(params, { replace: true });
  }, [search, source, page, setSearchParams]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-black transition-colors duration-300">
      <Header />

      <div className="max-w-[1440px] mx-auto w-full flex-1 flex relative">
        {showSidebar && (
          <div
            className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-20 lg:hidden animate-in fade-in duration-300"
            onClick={() => dispatch(setShowSidebar(false))}
          />
        )}
        <Sidebar />
        <MainFeed />
      </div>

      <Footer />
    </div>
  );
};

export default App;

