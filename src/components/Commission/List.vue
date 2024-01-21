<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTrackerViewStore } from '@/stores/TrackerViewStore';
import { useCommissionStore } from '@/stores/CommissionStore';
import CommissionStatus from '@/components/Commission/Status.vue';
import CommissionModal from '@/components/Commission/Modals/Commission.vue';

const trackerViewStore = useTrackerViewStore();
const { changeCommissionModalVisibility } = trackerViewStore;

const commissionStore = useCommissionStore();
const { income, commissions } = storeToRefs(commissionStore);


let commissionId = ref('');
function openCommissionModal(id?: string) {
  if (!id) return;

  commissionId.value = id;
  changeCommissionModalVisibility();
}

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
      <template v-for="commission in commissions" :key="commission.id">
        <li
          class="
            flex justify-between shadow bg-neutral-200 active:bg-neutral-400
            md:transition-shadow md:hover:shadow-neutral-300 md:hover:shadow-md
            text-lg rounded-lg px-8 py-4
          "
          v-on:click="openCommissionModal(commission.id)"
        >
          <a
            class="max-w-20 md:max-w-44 whitespace-nowrap overflow-hidden text-ellipsis"
            :href="commission.client.socialMediaUrl"
            target="_blank"
          >
            {{ commission.client.name }}
          </a>
          <p>{{ commission.paymentStatus }}</p>
          <CommissionStatus :art-work-status="commission.artWorkStatus" />
        </li>
      </template>
    </ul>
  </section>

  <CommissionModal v-if="commissionId" :commission-id="commissionId" />
</template>
