<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCommissionStore } from '@/stores/CommissionStore';
import ListItem from '@/components/Commission/ListItem.vue';

const commissionStore = useCommissionStore();
const { income } = storeToRefs(commissionStore);
const { sortedCommissions } = commissionStore;

</script>

<template>
  <section class="my-6">
    <header class="flex justify-between space-x-4 items-center my-3 select-none">
      <p class="text-xl font-bold">Commissions</p>
      <span>|</span>
      <p class="text-xl">
        Income (R$): <span class="select-text">{{ income.toFixed(2) }}</span>
      </p>
    </header>
    <ul class="space-y-4">
      <template v-for="commission in sortedCommissions" :key="commission.id">
        <ListItem :commission="commission" />
      </template>
    </ul>
  </section>
</template>
