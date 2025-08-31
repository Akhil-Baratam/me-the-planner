import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import GlobalSidebar from './components/GlobalSidebar.tsx';
import NativeSidebar from './components/NativeSidebar.tsx';
import MainContent from './components/MainContent.tsx';
import type { RootState } from './store/store.ts';
import { sidebarData } from './data/sidebarData.ts';
import { shouldShowNativeSidebar as calcShouldShowNativeSidebar } from './utils/sidebar.ts';
import { setGlobalView, setNativeView } from './features/ui/uiSlice.ts';
import { toSlug } from './utils/slug.ts';

// Helper to find default native view for a given global view
const getDefaultNativeFor = (g: string) => {
    if (g === 'dashboard') return 'Dashboard';
    const cfg = sidebarData[g];
    if (!cfg) return 'Dashboard';
    const first = cfg.sections?.flatMap(s => s.items)[0];
    return first ? first.view : cfg.title;
};

// Helper to convert slug back to label within a global view's sections
const fromSlugWithin = (g: string, slug?: string) => {
    if (!slug) return undefined;
    const cfg = sidebarData[g];
    const all = cfg?.sections?.flatMap(s => s.items) || [];
    return all.find(i => toSlug(i.view) === slug)?.view;
};

const Layout = () => {
    const dispatch = useDispatch();
    const { globalView, isNativeSidebarCollapsed } = useSelector((s: RootState) => s.ui);
    const params = useParams();
    const routeGlobal = (params.global || 'dashboard').toLowerCase();
    const routeNativeSlug = params.native;
    const navigate = useNavigate();

    React.useEffect(() => {
        // Sync global
        if (globalView !== routeGlobal) {
            dispatch(setGlobalView(routeGlobal));
        }
        // Sync native if provided
        const mapped = fromSlugWithin(routeGlobal, routeNativeSlug);
        if (routeNativeSlug && mapped) {
            dispatch(setNativeView(mapped));
        } else if (!routeNativeSlug) {
            // Ensure default native is selected if none in URL
            const cfg = sidebarData[routeGlobal];
            const firstItem = cfg?.sections?.flatMap(s => s.items)[0];
            const def = getDefaultNativeFor(routeGlobal);
            dispatch(setNativeView(def));
            // If this view has items, navigate to canonical URL with slug
            if (firstItem) {
                navigate(`/${routeGlobal}/${toSlug(firstItem.view)}`, { replace: true });
            }
        }
    }, [routeGlobal, routeNativeSlug, dispatch, navigate]);

    const showNativeSidebar = calcShouldShowNativeSidebar(routeGlobal);

    return (
        <div className="bg-bg-color text-text-primary font-sans min-h-screen overflow-hidden relative">
            <div className="background-glow"></div>
            <div className="flex h-screen">
                <GlobalSidebar />
                {showNativeSidebar && <NativeSidebar />}
                <MainContent />
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path=":global" element={<Layout />} />
            <Route path=":global/:native" element={<Layout />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
};

export default App;