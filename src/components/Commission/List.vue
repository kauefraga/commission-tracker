<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTrackerViewStore } from '@/stores/TrackerViewStore';
import { useCommissionStore } from '@/stores/CommissionStore';
import CommissionStatus from '@/components/Commission/Status.vue';

const trackerViewStore = useTrackerViewStore();
const { openModal } = trackerViewStore;

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
        <li
          class="
            flex justify-between shadow bg-neutral-200 active:bg-neutral-400
            md:transition-shadow md:hover:shadow-neutral-300 md:hover:shadow-md
            text-lg rounded-lg px-8 py-4
          "
          v-on:click="openModal(commission.id)"
        >
          <div
            class="flex items-center space-x-2"
          >
            <a
              :href="commission.client.socialMediaUrl"
              target="_blank"
            >
              <img
                src="@/assets/letter.svg"
                alt="Letter icon. It redirects you to the client social media."
                width="24"
                height="24"
              />
            </a>
            <p
              class="max-w-20 md:max-w-44 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {{ commission.client.name }}
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <p>{{ commission.paymentStatus }}</p>
            <CommissionStatus :art-work-status="commission.artWorkStatus" />
          </div>
        </li>
      </template>
    </ul>
  </section>
</template>
