import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    count: 0,
    currentScreen: 'main-menu',
    cursorPointer: false,
    flashIntensityValue: 0, // Renamed state property
  }),
  getters: {
    flashIntensity: (state) => state.flashIntensityValue, // Updated getter to use renamed state property
  },
  actions: {
    changeScreen(screen) {
      this.currentScreen = screen;
    },
    changeCursor(isPointer) {
      this.cursorPointer = isPointer;
    },
    switchIntensity(intensity) {
      this.flashIntensityValue = intensity; // Updated action to use renamed state property
    },
  },
});
