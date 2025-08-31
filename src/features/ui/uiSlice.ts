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
      if (state.globalView === newGlobalView) return;

      state.globalView = newGlobalView;

      const viewConfig = sidebarData[newGlobalView];

      // Default to a capitalized title from the global view name
      let newNativeView = newGlobalView.charAt(0).toUpperCase() + newGlobalView.slice(1);

      if (newGlobalView === 'dashboard') {
          newNativeView = 'Dashboard';
      } else if (viewConfig) {
          // Check if there are any items in any section
          const firstItem = viewConfig.sections?.flatMap(s => s.items)?.[0];
          if (firstItem) {
              // If there are items, set the native view to the first one
              newNativeView = firstItem.view;
          } else {
              // If there are no items (e.g., Settings, Profile), use the view's title
              newNativeView = viewConfig.title;
          }
      }
      
      state.nativeView = newNativeView;
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