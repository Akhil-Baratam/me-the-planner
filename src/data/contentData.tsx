import React from 'react';

const DashboardContent = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-active-item-bg p-6 rounded-lg border border-border-color">
            <h4 className="text-base font-semibold mb-3 text-text-primary">Tasks Due Today</h4>
            <p className="text-4xl font-bold text-text-secondary">5</p>
        </div>
        <div className="bg-active-item-bg p-6 rounded-lg border border-border-color">
            <h4 className="text-base font-semibold mb-3 text-text-primary">Upcoming Meetings</h4>
            <p className="text-4xl font-bold text-text-secondary">2</p>
        </div>
        <div className="bg-active-item-bg p-6 rounded-lg border border-border-color">
            <h4 className="text-base font-semibold mb-3 text-text-primary">Project Progress</h4>
            <p className="text-4xl font-bold text-text-secondary">78%</p>
        </div>
        <div className="bg-active-item-bg p-6 rounded-lg border border-border-color">
            <h4 className="text-base font-semibold mb-3 text-text-primary">New Messages</h4>
            <p className="text-4xl font-bold text-text-secondary">3</p>
        </div>
    </div>
);

const TodayContent = () => (
    <ul className="space-y-3">
        <li className="flex items-center gap-3 py-3 border-b border-border-color">
            <span className="w-4 h-4 border-2 border-text-tertiary rounded-full flex-shrink-0"></span>
            <span>Finalize quarterly report</span>
        </li>
        <li className="flex items-center gap-3 py-3 border-b border-border-color text-text-tertiary line-through">
            <span className="w-4 h-4 border-2 border-text-tertiary rounded-full flex-shrink-0"></span>
            <span>Team stand-up meeting</span>
        </li>
        <li className="flex items-center gap-3 py-3 border-b border-border-color">
            <span className="w-4 h-4 border-2 border-text-tertiary rounded-full flex-shrink-0"></span>
            <span>Review new design mockups</span>
        </li>
    </ul>
);

const SettingsContent = () => (
     <form className="max-w-md">
        <div className="mb-6">
            <label htmlFor="theme" className="block mb-2 text-text-secondary">Theme</label>
            <select id="theme" className="w-full bg-active-item-bg border border-border-color rounded-md p-2">
                <option>Dark</option>
                <option>Light</option>
            </select>
        </div>
        <div className="mb-6">
            <label className="block mb-2 text-text-secondary">Enable Notifications</label>
            <div className="w-12 h-6 bg-active-item-bg rounded-full p-1 flex items-center">
                <div className="w-4 h-4 bg-text-secondary rounded-full"></div>
            </div>
        </div>
    </form>
);

const ProfileContent = () => (
    <div className="flex items-center gap-6 bg-active-item-bg p-6 rounded-lg border border-border-color max-w-md">
        <img 
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="User avatar" 
            className="w-24 h-24 rounded-full border-2 border-border-color"
        />
        <div>
            <h2 className="text-2xl font-bold text-white">Denise</h2>
            <p className="text-text-secondary">denise@example.com</p>
            <button className="mt-4 bg-accent-primary/80 hover:bg-accent-primary text-white text-sm font-semibold py-2 px-4 rounded-md transition-colors">
                Edit Profile
            </button>
        </div>
    </div>
);


const PlaceholderContent = ({ viewName }: { viewName: string }) => (
    <div className="text-center py-16 px-8 text-text-secondary">
        <p>This is the placeholder view for {viewName}.</p>
    </div>
);

export const contentData: { [key: string]: React.ReactNode } = {
    'Dashboard': <DashboardContent />,
    'Today': <TodayContent />,
    'Weeks': <PlaceholderContent viewName="Weeks" />,
    'Months': <PlaceholderContent viewName="Months" />,
    'Quarters': <PlaceholderContent viewName="Quarters" />,
    'Finance Board': <PlaceholderContent viewName="Finance Board" />,
    'Physical Board': <PlaceholderContent viewName="Physical Board" />,
    'Purchase Board': <PlaceholderContent viewName="Purchase Board" />,
    'Calendar': <PlaceholderContent viewName="Calendar" />,
    'Auto-Scheduler': <PlaceholderContent viewName="Auto-Scheduler" />,
    'Settings': <SettingsContent />,
    'Profile': <ProfileContent />,
};