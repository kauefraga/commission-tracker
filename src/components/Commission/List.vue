<script setup lang="ts">
import { useCommissionStore } from '@/stores/CommissionStore';
import { storeToRefs } from 'pinia';
import CommissionStatus from './CommissionStatus.vue';

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
            text-lg rounded-lg px-8 py-4
          "
        >
          <p class="max-w-20 md:max-w-44 whitespace-nowrap overflow-hidden text-ellipsis">{{ commission.client.name }}</p>
          <a :href="commission.client.socialMediaUrl">Link</a>
          <p>{{ commission.paymentStatus }}</p>
          <CommissionStatus :art-work-status="commission.artWorkStatus" />
        </li>
      </template>
    </ul>
  </section>
</template>
