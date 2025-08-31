import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNativeView, toggleNativeSidebarCollapse } from '../features/ui/uiSlice.ts';
import type { RootState } from '../store/store.ts';
import { sidebarData } from '../data/sidebarData.ts';
import ChevronLeftIcon from './icons/ChevronLeftIcon.tsx';
import { NavLink } from 'react-router-dom';
import { toSlug } from '../utils/slug.ts';

const NativeSidebar = () => {
    const dispatch = useDispatch();
    const { globalView, nativeView, isNativeSidebarCollapsed, isNativeSidebarVisible } = useSelector((state: RootState) => state.ui);
    
    const currentData = sidebarData[globalView];

    const handleNavClick = (view: string) => {
        dispatch(setNativeView(view));
    };

    const handleToggleCollapse = () => {
        dispatch(toggleNativeSidebarCollapse());
    };

    const base = 'bg-glass-bg backdrop-blur-lg border-r border-border-color flex flex-col overflow-y-auto transition-all duration-300 ease-in-out z-10 whitespace-nowrap';
    const desktop = isNativeSidebarCollapsed
        ? 'lg:w-0 lg:p-0 lg:opacity-0 lg:border-r-0'
        : 'lg:w-[260px] lg:p-6';
    const mobile = isNativeSidebarVisible
        ? 'max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-full max-lg:w-[260px] max-lg:p-6 max-lg:translate-x-0'
        : 'max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-full max-lg:w-[260px] max-lg:p-6 max-lg:-translate-x-full';
    const withGlobalOffset = 'lg:ml-[68px]';
    const sidebarClasses = `${base} ${withGlobalOffset} ${desktop} ${mobile}`;

    return (
        <aside className={sidebarClasses.trim()}>
             {currentData && (
                <div className="flex-grow">
                    <div className="px-2 pb-6 flex justify-between items-center">
                        <h4 className="text-lg font-semibold">{currentData.title}</h4>
                        <button
                            onClick={handleToggleCollapse}
                            className="p-1 rounded-md text-text-secondary hover:bg-active-item-bg hover:text-text-primary transition-transform duration-300 max-lg:hidden"
                            style={{ transform: isNativeSidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            aria-label="Collapse sidebar"
                        >
                            <ChevronLeftIcon />
                        </button>
                    </div>
                    <nav>
                        {currentData.sections.map((section, index) => (
                            <div key={index} className="mb-8">
                                <h5 className="px-3 mb-3 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                                    {section.title}
                                </h5>
                                <ul>
                                    {section.items.map(item => (
                                        <li key={item.view}>
                                            <NavLink
                                                to={`/${globalView}/${toSlug(item.view)}`}
                                                onClick={() => handleNavClick(item.view)}
                                                className={({ isActive }) => `block py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 overflow-hidden text-ellipsis ${
                                                    isActive || nativeView === item.view
                                                        ? 'bg-white/10 text-text-primary'
                                                        : 'text-text-secondary hover:bg-white/10 hover:text-text-primary'
                                                }`}
                                            >
                                                {item.label}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
            )}
        </aside>
    );
};

export default NativeSidebar;