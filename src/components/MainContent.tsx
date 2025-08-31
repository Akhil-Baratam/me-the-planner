import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleNativeSidebarVisibility } from '../features/ui/uiSlice.ts';
import type { RootState } from '../store/store.ts';
import { contentData } from '../data/contentData.tsx';
import MenuIcon from './icons/MenuIcon.tsx';

const MainContent = () => {
    const dispatch = useDispatch();
    const { nativeView, isNativeSidebarCollapsed, globalView } = useSelector((state: RootState) => state.ui);
    const isDashboard = globalView === 'dashboard';

    const handleToggle = () => {
        dispatch(toggleNativeSidebarVisibility());
    };
    
    const mainContentClasses = `
        flex-grow p-8 lg:p-12 overflow-y-auto lg:ml-[68px] 
        transition-[padding-left] duration-300 ease-in-out
        ${!isNativeSidebarCollapsed && !isDashboard ? 'lg:pl-[260px]' : ''}
    `;

    return (
        <main className={mainContentClasses.trim().replace(/\s+/g, ' ')}>
            <header className="flex items-center gap-4 mb-8">
                <button
                    onClick={handleToggle}
                    className="text-text-secondary hover:text-text-primary lg:hidden"
                    aria-label="Toggle sidebar"
                >
                    <MenuIcon />
                </button>
                <h1 className="text-3xl font-bold">{nativeView}</h1>
            </header>
            <div id="view-content">
                {contentData[nativeView] || (
                    <div className="text-center py-16 px-8 text-text-secondary">
                        <p>Content for {nativeView}.</p>
                        <p className="text-sm mt-2 text-text-tertiary">This is a placeholder view.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default MainContent;