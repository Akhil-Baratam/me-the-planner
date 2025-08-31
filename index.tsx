document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const appContainer = document.querySelector('.app-container') as HTMLElement;
    const globalSidebar = document.querySelector('.global-sidebar') as HTMLElement;
    const nativeSidebar = document.querySelector('.native-sidebar') as HTMLElement;
    const mainHeaderTitle = document.getElementById('main-header-title') as HTMLHeadingElement;
    const viewContent = document.getElementById('view-content') as HTMLDivElement;
    const mobileSidebarToggle = document.querySelector('.sidebar-toggle') as HTMLButtonElement;

    // --- State ---
    let currentGlobalView: string = 'planner';
    let currentNativeView: string = 'Today';

    // --- Event Listeners ---
    globalSidebar.addEventListener('click', handleGlobalNavClick);
    nativeSidebar.addEventListener('click', handleNativeNavClick);
    mobileSidebarToggle.addEventListener('click', toggleNativeSidebar);

    // --- Initialization ---
    function init() {
        updateGlobalActiveState(currentGlobalView);
        updateNativeSidebarContent(currentGlobalView);
        updateNativeActiveState(currentNativeView);
        updateMainContent(currentNativeView);
    }

    // --- Global Navigation Logic ---
    function handleGlobalNavClick(e: MouseEvent) {
        const target = e.target as HTMLElement;
        const navItem = target.closest('.global-nav-item');
        if (!navItem) return;

        e.preventDefault();
        // FIX: Cast navItem from Element to HTMLElement to access dataset property.
        const viewName = (navItem as HTMLElement).dataset.globalView;
        if (viewName && viewName !== currentGlobalView) {
            currentGlobalView = viewName;
            updateGlobalActiveState(viewName);
            updateNativeSidebarContent(viewName);

            // Set a default native view for the new global section
            const firstNativeLink = nativeSidebar.querySelector(`#${viewName}-native-view .native-nav-item`);
            if (firstNativeLink) {
                currentNativeView = firstNativeLink.getAttribute('data-view') || 'Default';
                updateNativeActiveState(currentNativeView);
                updateMainContent(currentNativeView);
            } else {
                 // Handle global views with no native sidebar items
                currentNativeView = viewName.charAt(0).toUpperCase() + viewName.slice(1);
                updateNativeActiveState(''); // No active item
                updateMainContent(currentNativeView);
            }
        }
    }

    function updateGlobalActiveState(viewName: string) {
        document.querySelectorAll('.global-nav-item').forEach(item => {
            // FIX: Cast item from Element to HTMLElement to access dataset property.
            item.classList.toggle('active', (item as HTMLElement).dataset.globalView === viewName);
        });
    }

    // --- Native Navigation Logic ---
    function handleNativeNavClick(e: MouseEvent) {
        const target = e.target as HTMLElement;
        const navItem = target.closest('.native-nav-item');
        if (!navItem) return;

        e.preventDefault();
        // FIX: Cast navItem from Element to HTMLElement to access dataset property.
        const viewName = (navItem as HTMLElement).dataset.view;
        if (viewName && viewName !== currentNativeView) {
            currentNativeView = viewName;
            updateNativeActiveState(viewName);
            updateMainContent(viewName);
            
            if (window.innerWidth <= 1024) {
                appContainer.classList.remove('native-sidebar-visible');
            }
        }
    }
    
    function updateNativeSidebarContent(globalView: string) {
        document.querySelectorAll('.native-sidebar-content').forEach(content => {
            const element = content as HTMLElement;
            element.style.display = 'none';
        });

        const activeContent = document.getElementById(`${globalView}-native-view`);
        if (activeContent) {
            activeContent.style.display = 'block';
        }
    }
    
    function updateNativeActiveState(viewName: string) {
        document.querySelectorAll('.native-nav-item').forEach(item => {
            // FIX: Cast item from Element to HTMLElement to access dataset property.
            item.classList.toggle('active', (item as HTMLElement).dataset.view === viewName);
        });
    }

    // --- Main Content Logic ---
    function updateMainContent(viewName: string) {
        mainHeaderTitle.textContent = viewName;
        viewContent.innerHTML = `
            <div class="empty-view">
                <p>Content for ${viewName}.</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-tertiary);">
                    This is a placeholder view.
                </p>
            </div>
        `;
    }
    
    // --- Mobile/Responsive Logic ---
    function toggleNativeSidebar() {
        appContainer.classList.toggle('native-sidebar-visible');
    }

    // --- Start the app ---
    init();
});
