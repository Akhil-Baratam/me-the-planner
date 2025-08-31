import React from 'react';
import { useSelector } from 'react-redux';
import GlobalSidebar from './components/GlobalSidebar.tsx';
import NativeSidebar from './components/NativeSidebar.tsx';
import MainContent from './components/MainContent.tsx';
import type { RootState } from './store/store.ts';
import { sidebarData } from './data/sidebarData.ts';

const App = () => {
    const { isNativeSidebarVisible, isNativeSidebarCollapsed, globalView } = useSelector((state: RootState) => state.ui);
    
    // Determine if the native sidebar should be shown based on the current global view's data.
    // It should only appear if the view is not 'dashboard' and has sections with items.
    const viewConfig = sidebarData[globalView];
    const shouldShowNativeSidebar = globalView !== 'dashboard' && viewConfig?.sections?.some(s => s.items.length > 0);

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
                {shouldShowNativeSidebar && <NativeSidebar />}
                <MainContent />
            </div>
        </div>
    );
};

export default App;