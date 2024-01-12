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
    <ul id="commission-list">
      <template v-for="commission in commissions" :key="commission.id">
        <li
          class="
            flex justify-between bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400
            items-center text-lg rounded-lg px-8 py-4 my-2
          "
        >
          <p class="mx-3 my-2">{{ commission.client }}</p>
          <p class="mx-3 my-2">{{ commission.status }}</p>
        </li>
      </template>
    </ul>
  </section>
</template>
