import React, { type ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAppDispatch, useAppSelector } from '../store';
import { setShowSidebar } from '../store/uiSlice';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.ui);

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
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
