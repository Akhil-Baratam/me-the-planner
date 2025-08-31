import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sidebarData } from '../../data/sidebarData.ts';

interface UIState {
  globalView: string;
  nativeView: string;
  isNativeSidebarVisible: boolean; // For mobile
  isNativeSidebarCollapsed: boolean; // For desktop
}

const initialState: UIState = {
  globalView: 'dashboard',
  nativeView: 'Dashboard',
  isNativeSidebarVisible: false,
  isNativeSidebarCollapsed: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setGlobalView: (state, action: PayloadAction<string>) => {
      const newGlobalView = action.payload;
      if (state.globalView !== newGlobalView) {
        state.globalView = newGlobalView;

        if (newGlobalView === 'dashboard') {
          state.nativeView = 'Dashboard';
        } else {
          const viewConfig = sidebarData[newGlobalView];
          const firstNativeItem = viewConfig?.sections?.[0]?.items?.[0];
          // Set nativeView to the first item, or the view's title, or a capitalized version of the view name
          state.nativeView = firstNativeItem
            ? firstNativeItem.view
            : viewConfig?.title || newGlobalView.charAt(0).toUpperCase() + newGlobalView.slice(1);
        }
      }
    },
    setNativeView: (state, action: PayloadAction<string>) => {
      state.nativeView = action.payload;
      if (window.innerWidth <= 1024) {
        state.isNativeSidebarVisible = false;
      }
    },
    toggleNativeSidebarVisibility: (state) => {
      state.isNativeSidebarVisible = !state.isNativeSidebarVisible;
    },
    toggleNativeSidebarCollapse: (state) => {
      state.isNativeSidebarCollapsed = !state.isNativeSidebarCollapsed;
    },
  },
});

export const { 
    setGlobalView, 
    setNativeView, 
    toggleNativeSidebarVisibility, 
    toggleNativeSidebarCollapse 
} = uiSlice.actions;

export default uiSlice.reducer;