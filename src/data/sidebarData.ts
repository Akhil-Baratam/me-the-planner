interface NavItem {
    view: string;
    label: string;
}

interface NavSection {
    title: string;
    items: NavItem[];
}

interface SidebarConfig {
    [key: string]: {
        title: string;
        sections: NavSection[];
    };
}

export const sidebarData: SidebarConfig = {
    planner: {
        title: 'Planner',
        sections: [
            {
                title: 'Horizons',
                items: [
                    { view: 'Today', label: 'Today' },
                    { view: 'Weeks', label: 'Weeks' },
                    { view: 'Months', label: 'Months' },
                    { view: 'Quarters', label: 'Quarters' },
                ],
            },
            {
                title: 'My Boards',
                items: [
                    { view: 'Finance Board', label: 'Finance' },
                    { view: 'Physical Board', label: 'Physical' },
                    { view: 'Purchase Board', label: 'Purchase' },
                ],
            },
        ],
    },
    scheduler: {
        title: 'Scheduler',
        sections: [
            {
                title: '',
                items: [
                    { view: 'Calendar', label: 'Calendar' },
                    { view: 'Auto-Scheduler', label: 'Auto-Scheduler' },
                ],
            },
        ],
    },
    settings: {
        title: 'Settings',
        sections: [],
    },
    profile: {
        title: 'Profile',
        sections: [],
    }
};
