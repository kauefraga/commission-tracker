import type { Commission } from '@/types/Commission';
import { createCommission, getAllCommissions } from '@/localstorage/Commission';
import { defineStore } from 'pinia';

export const useCommissionStore = defineStore('CommissionStore', {
  state: () => ({
    commissions: [] as Commission[],
    income: 0
  }),
  actions: {
    storeCommission(commission: Commission) {
      createCommission(commission);
      this.commissions.push(commission);
      this.income += commission.price;
    },
    recoverLocalStorageCommissions() {
      const { storedIncome, storedCommissions } = getAllCommissions();

      this.commissions.push(...storedCommissions);
      this.income = storedIncome
    }
  }
});
