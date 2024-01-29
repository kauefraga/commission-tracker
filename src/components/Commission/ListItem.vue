<script setup lang="ts">
import { useTrackerViewStore } from '@/stores/TrackerViewStore';
import PaymentStatus from '@/components/Commission/PaymentStatus.vue';
import ArtWorkStatus from '@/components/Commission/ArtWorkStatus.vue';
import type { Commission } from '@/types/Commission';
import { toRefs } from 'vue';

const props = defineProps<{
  commission: Commission
}>();
const { commission } = toRefs(props);

const trackerViewStore = useTrackerViewStore();
const { openModal } = trackerViewStore;

</script>

<template>
  <li
    class="
      flex justify-between shadow-md border border-zinc-600 active:bg-zinc-200
      md:transition-shadow md:hover:shadow-lg md:hover:border-zinc-900
      text-lg select-none rounded-lg px-8 py-4
    "
    v-on:click="openModal(commission.id)"
  >
    <div
      class="flex items-center space-x-3"
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
    <div class="flex items-center space-x-3">
      <PaymentStatus :payment-status="commission.paymentStatus" />
      <ArtWorkStatus :art-work-status="commission.artWorkStatus" />
    </div>
  </li>
</template>
