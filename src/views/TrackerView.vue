<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import NewCommissionModal from '@/components/NewCommissionModal.vue';
import CommissionList from '@/components/CommissionList.vue';
import type { Commission } from '@/types/Commission';
import { getAllCommissions } from '@/localstorage/Commission';

const isNewCommissionModalVisible = ref(false);
const changeNewCommissionModalVisibility = () => isNewCommissionModalVisible.value = !isNewCommissionModalVisible.value;

const commissions = reactive<Commission[]>([]);
const income = ref(0);
const emitNewCommission = (commission: Commission) => {
  income.value += commission.price;
  commissions.push(commission);
};

onMounted(() => {
  const { storedIncome, storedCommissions } = getAllCommissions();

  commissions.push(...storedCommissions);
  income.value = storedIncome
});

</script>

<template>
  <button
    class="
    bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400
      text-xl rounded-lg px-12 py-4
    "
    v-on:click="isNewCommissionModalVisible = !isNewCommissionModalVisible"
  >
    New Commission
  </button>

  <CommissionList :commissions="commissions" />
  <p
    class="text-lg"
    id="total-price"
  >
    Income (R$): {{ income.toFixed(2) }}
  </p>

  <NewCommissionModal
    :emit-new-commission="emitNewCommission"
    :is-visible="isNewCommissionModalVisible"
    :change-visibility="changeNewCommissionModalVisibility"
  />
</template>
