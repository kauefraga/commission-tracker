import type { Commission } from '@/types/Commission';
import { defineStore } from 'pinia';

export const useCommissionStore = defineStore('CommissionStore', {
  state: () => ({
    commissions: [] as Commission[],
    income: 0
  }),
});
