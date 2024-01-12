<script setup lang="ts">
import { useCommissionStore } from '@/stores/CommissionStore';
import { storeToRefs } from 'pinia';

const store = useCommissionStore();
const { income, commissions } = storeToRefs(store);

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
    <ul class="space-y-3">
      <template v-for="commission in commissions" :key="commission.id">
        <li
          class="
            flex justify-between shadow bg-neutral-200 active:bg-neutral-400
            md:transition-shadow md:hover:shadow-neutral-300 md:hover:shadow-md
            items-center text-lg rounded-lg px-8 py-4
          "
        >
          <p>{{ commission.client }}</p>
          <p>{{ commission.status }}</p>
        </li>
      </template>
    </ul>
  </section>
</template>
