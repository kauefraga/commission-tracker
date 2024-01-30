import type { Commission } from '@/types/Commission';
import {
  storeCommission,
  getAllCommissions,
  removeCommissionById,
  updateCommission as UpdateCommissionInLocalStorage
} from '@/database/LocalStorage';
import { defineStore } from 'pinia';
import { v4, validate } from 'uuid';

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
    createCommission(commission: Commission) {
      if (!commission.id) {
        commission.id = v4();
      }

      if (!commission.created_at) {
        commission.created_at = new Date();
      }

      this.commissions.push(commission);
      this.income += commission.price;

      storeCommission(commission)
    },
    findCommissionById(commissionId: string) {
      if (validate(commissionId)) throw new Error('Commission id is invalid.');

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
      if (!commission.id) throw new Error('Commission id does not exist.');
      if (validate(commission.id)) throw new Error('Commission id is invalid.');

      const index = this.commissions.findIndex(c => c.id === commission.id);

      if (index === -1) throw new Error('Commission not found in commission store.');

      this.income -= this.commissions[index].price;
      this.commissions[index] = commission;
      this.income += commission.price;

      UpdateCommissionInLocalStorage(commission);
    },
    deleteCommissionById(commissionId: string) {
      if (validate(commissionId)) throw new Error('Commission id is invalid.');

      const index = this.commissions.findIndex(c => c.id === commissionId);

      if (index === -1) throw new Error('Commission not found in commission store.');

      this.commissions.splice(index, 1);

      removeCommissionById(commissionId);
    },
    recoverCommissions() {
      const { storedIncome, storedCommissions } = getAllCommissions();

      this.commissions.push(...storedCommissions);
      this.income = storedIncome
    }
  }
});
