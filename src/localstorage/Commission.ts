import type { Commission } from '@/types/Commission';
import { v4, validate } from 'uuid';

export function createCommission(commission: Commission) {
  if (!commission.id) {
    commission.id = v4();
  }

  if (!commission.created_at) {
    commission.created_at = new Date();
  }

  localStorage.setItem(commission.id, JSON.stringify(commission));
}

export function getCommissionById(commissionId: string) {
  if (!validate(commissionId)) throw new Error('Invalid commission id.');

  const json = localStorage.getItem(commissionId);

  if (!json) throw new Error('Commission does not exist.');

  return JSON.parse(json) as Commission;
}

export function getAllCommissions() {
  const storedCommissions: Commission[] = [];
  let storedIncome = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (!key) throw new Error('Commission out of range. :(');

    if (validate(key)) {
      const json = localStorage.getItem(key);

      if (!json) throw new Error('Commission does not exist.');

      const commission = JSON.parse(json) as Commission;

      storedCommissions.push(commission);
      storedIncome += commission.price
    }
  }

  return {
    storedCommissions,
    storedIncome
  }
}
