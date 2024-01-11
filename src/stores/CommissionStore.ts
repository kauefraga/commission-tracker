import type { Commission } from '@/types/Commission';
import { createCommission } from '@/localstorage/Commission';
import { defineStore } from 'pinia';

export const useCommissionStore = defineStore('CommissionStore', {
  state: () => ({
    commissions: [] as Commission[],
    income: 0
  }),
  actions: {
    async storeCommission(commission: Commission) {
      createCommission(commission);
      this.commissions.push(commission);
      this.income += commission.price;
    }
  }
});
