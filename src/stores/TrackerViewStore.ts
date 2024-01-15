import { defineStore } from 'pinia';

export const useTrackerViewStore = defineStore('TrackerViewStore', {
  state: () => ({
    isNewCommissionModalVisible: false,
    isCommissionModalVisible: false,
  }),
  actions: {
    changeNewCommissionModalVisibility() {
      if (this.isCommissionModalVisible) return;

      this.isNewCommissionModalVisible = !this.isNewCommissionModalVisible;
    },
    changeCommissionModalVisibility() {
      if (this.isNewCommissionModalVisible) return;

      this.isCommissionModalVisible = !this.isCommissionModalVisible;
    },
  }
});
