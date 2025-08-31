import React from 'react';
import { useSelector } from 'react-redux';
import GlobalSidebar from './components/GlobalSidebar.tsx';
import NativeSidebar from './components/NativeSidebar.tsx';
import MainContent from './components/MainContent.tsx';
import type { RootState } from './store/store.ts';

const App = () => {
    const { isNativeSidebarVisible, isNativeSidebarCollapsed, globalView } = useSelector((state: RootState) => state.ui);
    const isDashboard = globalView === 'dashboard';

    const containerClasses = [
        'flex h-screen',
        isNativeSidebarVisible ? 'native-sidebar-visible' : '',
        isNativeSidebarCollapsed ? 'native-sidebar-collapsed' : ''
    ].join(' ');

    return (
        <div className="bg-bg-color text-text-primary font-sans min-h-screen overflow-hidden relative">
            <div className="background-glow"></div>
            <div className={containerClasses}>
                <GlobalSidebar />
                {!isDashboard && <NativeSidebar />}
                <MainContent />
            </div>
        </div>
    );
};

export default App;