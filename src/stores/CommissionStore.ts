import type { Commission } from '@/types/Commission';
import {
  createCommission,
  getAllCommissions,
  removeCommissionById,
  updateCommission as UpdateCommissionInLocalStorage
} from '@/localstorage/Commission';
import { defineStore } from 'pinia';

export const useCommissionStore = defineStore('CommissionStore', {
  state: () => ({
    commissions: [] as Commission[],
    income: 0
  }),
  getters: {
    sortedCommissions: (state) => {
      return state.commissions.sort((a, b) => {
        if (!a.created_at) return 0;
        if (!b.created_at) return 0;

        if (a.created_at > b.created_at) {
          return 1;
        }

        return -1;
      });
    },
  },
  actions: {
    storeCommission(commission: Commission) {
      createCommission(commission);
      this.commissions.push(commission);
      this.income += commission.price;
    },
    findCommissionById(commissionId: string) {
      const commission = this.commissions.find(c => c.id === commissionId);

      if (!commission) throw new Error('Commission does not exist in commission store.');

      /*
        Return value, not store reference :)
        If you change this to a straightforward return (`return commission;`),
        then CommissionModal (on submit) will change store's commission directly
        and `updateCommission` action won't be able to calculate the
        updated income properly.

        Sorry for the workaround.
      */
      return { ...commission };
    },
    updateCommission(commission: Commission) {
      UpdateCommissionInLocalStorage(commission);

      const index = this.commissions.findIndex(c => c.id === commission.id);

      if (index === -1) throw new Error('Commission not found in commission store.');

      this.income -= this.commissions[index].price;
      this.commissions[index] = {
        ...commission
      };
      this.income += commission.price;
    },
    deleteCommissionById(commissionId: string) {
      removeCommissionById(commissionId);

      const index = this.commissions.findIndex(c => c.id === commissionId);

      if (index === -1) throw new Error('Commission not found in commission store.');

      this.commissions.splice(index, 1);
    },
    recoverCommissions() {
      const { storedIncome, storedCommissions } = getAllCommissions();

      this.commissions.push(...storedCommissions);
      this.income = storedIncome
    }
  }
});
