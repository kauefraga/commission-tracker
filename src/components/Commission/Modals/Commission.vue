<script setup lang="ts">
import type { Commission } from '@/types/Commission';
import { reactive, toRefs, onBeforeUpdate } from 'vue';
import { useTrackerViewStore } from '@/stores/TrackerViewStore';
import { useCommissionStore } from '@/stores/CommissionStore';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  commissionId: string
}>();
const { commissionId } = toRefs(props);

const trackerViewStore = useTrackerViewStore();
const { isCommissionModalVisible } = storeToRefs(trackerViewStore);
const { changeCommissionModalVisibility } = trackerViewStore;

const commissionStore = useCommissionStore();
const { findCommissionById, updateCommission } = commissionStore;

let currentCommission = reactive<Commission>(
  findCommissionById(commissionId.value)
);

function updateCommissionAndHideModal() {
  updateCommission(currentCommission);
  changeCommissionModalVisibility();
}

onBeforeUpdate(() => {
  currentCommission = findCommissionById(commissionId.value);
});

</script>

<template>
  <div
    class="
      flex justify-center items-center fixed w-full h-full left-0 top-0
      bg-opacity-80 bg-neutral-800
    "
    v-if="isCommissionModalVisible"
  >
    <form
      class="
        flex flex-col px-8 py-6
        rounded-xl border border-neutral-400 bg-neutral-800
        select-none text-xl
      "
      v-on:submit.prevent="updateCommissionAndHideModal"
    >
      <div class="flex justify-end mb-6">
        <button
          v-on:click.prevent="changeCommissionModalVisibility"
        >
          <img
            src="@/assets/close-white.svg"
            alt="Close icon"
            width="32"
            height="32"
          />
        </button>
      </div>
      <div class="flex space-x-1">
        <input
          class="my-1 p-3 rounded-sm"
          type="text"
          placeholder="Client name"
          required
          v-model="currentCommission.client.name"
        />
        <input
          class="my-1 p-3 rounded-sm"
          type="url"
          placeholder="Client social media"
          required
          pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
          title="Must contain a valid and secure url (https)."
          v-model="currentCommission.client.socialMediaUrl"
        />
      </div>
      <input
        class="my-1 p-3 rounded-sm"
        type="text"
        placeholder="Commission description"
        v-model="currentCommission.description"
      />
      <input
        class="my-1 p-3 rounded-sm "
        type="number"
        placeholder="Commission price"
        required
        min="1"
        step="any"
        v-model.number="currentCommission.price"
      />
      <select
        class="my-1 p-3 rounded-sm"
        name="artwork-status"
        v-model="currentCommission.artWorkStatus"
      >
        <option value="NOT STARTED">Not started</option>
        <option value="STARTED">Started</option>
        <option value="ALMOST DONE">Almost done</option>
        <option value="DONE">Done</option>
      </select>
      <select
        class="my-1 p-3 rounded-sm"
        name="payment-status"
        v-model="currentCommission.paymentStatus"
      >
        <option value="NOT PAID">Not paid</option>
        <option value="HALF PAID">Half paid</option>
        <option value="PAID">Paid</option>
      </select>

      <button
        class="
          my-2 p-3 rounded-sm text-white
          bg-violet-700 hover:bg-violet-800 active:bg-violet-900
        "
      >
        Update Commission
      </button>
    </form>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
