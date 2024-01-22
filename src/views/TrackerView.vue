<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTrackerViewStore } from '@/stores/TrackerViewStore';
import { useCommissionStore } from '@/stores/CommissionStore';
import CommissionList from '@/components/Commission/List.vue';
import CommissionModal from '@/components/Commission/Modal.vue';

const trackerViewStore = useTrackerViewStore();
const { openModal } = trackerViewStore;

const commissionStore = useCommissionStore();
const { commissions } = storeToRefs(commissionStore);
const {
  recoverCommissions,
} = commissionStore;

onMounted(() => {
  recoverCommissions();
});

</script>

<template>
  <button
    class="
      text-white bg-violet-700 hover:bg-violet-800 active:bg-violet-900
      text-xl rounded-lg px-12 py-4 shadow-lg
    "
    v-on:click="openModal()"
  >
    New Commission
  </button>

  <CommissionList v-if="commissions.length" />
  <div
    v-if="!commissions.length"
    class="flex flex-col items-center my-12 text-xl space-y-12"
  >
    <p>Get started by clicking in the button above!</p>
    <img
      src="@/assets/bubbles.png"
      alt="Fancy Bubbles"
      width="250"
      height="400"
    />
  </div>

  <CommissionModal />
</template>
