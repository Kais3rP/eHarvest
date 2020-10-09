import { createSlice } from "@reduxjs/toolkit"

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    windowSize: {},
    isCartOpen: false,
    isHeaderModalOpen: false,
    isHeaderMobileOpen: false,
    isHeaderMobileModalOpen: false,
  },
  reducers: {
    setWindowSize: (state, action) => {
      state.windowSize = action.payload
    },
    toggleCart: (state, action) => {
      state.isCartOpen = !state.isCartOpen
    },
    toggleHeaderModal: (state, action) => {
      state.isHeaderModalOpen = !state.isHeaderModalOpen
    },
    openHeaderModal: (state, action) => {
      state.isHeaderModalOpen = true
    },
    closeHeaderModal: (state, action) => {
      state.isHeaderModalOpen = false
    },
    toggleHeaderMobile: (state, action) => {
      state.isHeaderMobileOpen = !state.isHeaderMobileOpen
    },
    toggleHeaderMobileModal: (state, action) => {
      state.isHeaderMobileModalOpen = !state.isHeaderMobileModalOpen
    },
  },
})

export const {
  setWindowSize,
  toggleCart,
  toggleHeaderModal,
  openHeaderModal,
  closeHeaderModal,
  toggleHeaderMobile,
  toggleHeaderMobileModal,
} = uiSlice.actions

// Thunks

/// Helper functions:

export default uiSlice.reducer
