<script setup lang="ts">
import { useCommissionStore } from '@/stores/CommissionStore';
import { storeToRefs } from 'pinia';

const store = useCommissionStore();
const { commissions } = storeToRefs(store);

</script>

<template>
  <section class="my-6">
    <p class="my-3 text-xl font-bold">Commissions</p>
    <ul
      id="commission-list"
    >
      <li
        class="
          flex justify-between bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400
          items-center text-lg rounded-lg px-8 py-4 my-2
        "
        v-for="commission in commissions"
        :key="commission.client"
      >
        <p class="mx-3 my-2">{{ commission.client }}</p>
        <p class="mx-3 my-2">{{ commission.status }}</p>
      </li>
    </ul>
  </section>
</template>
