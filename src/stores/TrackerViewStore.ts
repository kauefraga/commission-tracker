import { defineStore } from 'pinia';

type ModalState = 'CREATE' | 'UPDATE';

export const useTrackerViewStore = defineStore('TrackerViewStore', {
  state: () => ({
    isModalVisible: false,
    currentModal: 'CREATE' as ModalState,
    currentCommissionId: '',
  }),
  actions: {
    closeModal() {
      this.isModalVisible = false;
    },
    openModal(commissionId?: string) {
      if (!commissionId) {
        this.currentModal = 'CREATE';
        this.isModalVisible = true;
      }

      if (commissionId) {
        this.currentCommissionId = commissionId;
        this.currentModal = 'UPDATE';
        this.isModalVisible = true;
      }
    }
  }
});
