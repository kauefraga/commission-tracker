import type { Commission } from '@/types/Commission';
import { validate } from 'uuid';

export function storeCommission(commission: Commission) {
  if (!commission.id) throw new Error('Commission id does not exist.');

  localStorage.setItem(commission.id, JSON.stringify(commission));
}

export function updateCommission(commission: Commission) {
  if (!commission.id) throw new Error('Commission id does not exist.');

  localStorage.setItem(commission.id, JSON.stringify(commission));
}

export function removeCommissionById(commissionId: string) {
  localStorage.removeItem(commissionId);
}

export function getCommissionById(commissionId: string) {
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
