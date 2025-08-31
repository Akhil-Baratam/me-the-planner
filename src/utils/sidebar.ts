import { sidebarData } from '../data/sidebarData';

export const shouldShowNativeSidebar = (globalView: string): boolean => {
  if (globalView === 'dashboard') return false;
  const viewConfig = sidebarData[globalView];
  return !!viewConfig?.sections?.some((s) => s.items.length > 0);
};
