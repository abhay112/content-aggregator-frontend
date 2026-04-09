import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Components
import Layout from './components/Layout';
import MainFeed from './components/MainFeed';

import { useAppDispatch, useAppSelector } from './store';
import { setSearch, setSource, setPage } from './store/uiSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { search, source, page } = useAppSelector((state) => state.ui);

  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlSource = searchParams.get('source') || undefined;
    const urlPageRaw = searchParams.get('page');
    const urlPage = urlPageRaw ? Math.max(1, parseInt(urlPageRaw, 10) || 1) : 1;

    if (urlSearch !== search) dispatch(setSearch(urlSearch));
    if (urlSource !== source) dispatch(setSource(urlSource));
    if (urlPage !== page) dispatch(setPage(urlPage));
  }, [searchParams, dispatch]);


  useEffect(() => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (source) params.source = source;
    params.page = page.toString();

    setSearchParams(params, { replace: true });
  }, [search, source, page, setSearchParams]);

  return (
    <Layout>
      <MainFeed />
    </Layout>
  );
};

export default App;

