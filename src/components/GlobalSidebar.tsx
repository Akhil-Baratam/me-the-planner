import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGlobalView } from '../features/ui/uiSlice.ts';
import type { RootState } from '../store/store.ts';

import LogoIcon from './icons/LogoIcon.tsx';
import DashboardIcon from './icons/DashboardIcon.tsx';
import PlannerIcon from './icons/PlannerIcon.tsx';
import SchedulerIcon from './icons/SchedulerIcon.tsx';
import SettingsIcon from './icons/SettingsIcon.tsx';

const navItems = [
    { view: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
    { view: 'planner', title: 'Planner', icon: <PlannerIcon /> },
    { view: 'scheduler', title: 'Scheduler', icon: <SchedulerIcon /> },
];

const GlobalSidebar = () => {
    const dispatch = useDispatch();
    const activeGlobalView = useSelector((state: RootState) => state.ui.globalView);

    const handleNavClick = (view: string) => {
        dispatch(setGlobalView(view));
    };
    
    return (
        <nav className="fixed top-0 left-0 h-full w-[68px] flex-shrink-0 bg-glass-bg backdrop-blur-lg border-r border-border-color p-4 py-6 flex flex-col items-center justify-between z-20">
            <div className="flex flex-col items-center gap-4 w-full">
                <a href="#" className="text-text-secondary hover:text-text-primary mb-4" title="App Logo">
                    <LogoIcon />
                </a>
                {navItems.map(item => (
                    <a
                        key={item.view}
                        href="#"
                        className={`w-11 h-11 rounded-lg grid place-items-center transition-colors duration-200 ${
                            activeGlobalView === item.view
                                ? 'bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]'
                                : 'text-text-secondary hover:bg-accent-primary/20 hover:text-text-primary'
                        }`}
                        data-global-view={item.view}
                        title={item.title}
                        onClick={() => handleNavClick(item.view)}
                    >
                        {item.icon}
                    </a>
                ))}
            </div>
            <div className="flex flex-col items-center gap-4 w-full">
                <a
                    href="#"
                    className={`w-11 h-11 rounded-lg grid place-items-center transition-colors duration-200 ${
                        activeGlobalView === 'settings'
                            ? 'bg-white/10 text-white'
                            : 'text-text-secondary hover:bg-accent-primary/20 hover:text-text-primary'
                    }`}
                    title="Settings"
                    onClick={() => handleNavClick('settings')}
                >
                    <SettingsIcon />
                </a>
                <a
                    href="#"
                    className="global-nav-item profile"
                    title="Profile"
                    onClick={() => handleNavClick('profile')}
                >
                    <img 
                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                        alt="User avatar" 
                        className="w-8 h-8 rounded-full border-2 border-border-color"
                    />
                </a>
            </div>
        </nav>
    );
};

export default GlobalSidebar;