<script setup lang="ts">
import type { Commission } from '@/types/Commission';
import { useTrackerViewStore } from '@/stores/TrackerViewStore';
import { storeToRefs } from 'pinia';
import { onBeforeUpdate, reactive } from 'vue';
import { useCommissionStore } from '@/stores/CommissionStore';

const trackerViewStore = useTrackerViewStore();
const {
  isModalVisible,
  currentModal,
  currentCommissionId
} = storeToRefs(trackerViewStore);
const { closeModal } = trackerViewStore;

const commissionStore = useCommissionStore();
const {
  createCommission,
  updateCommission,
  deleteCommissionById,
  findCommissionById
} = commissionStore;

let currentCommission = reactive<Commission>({
  artWorkStatus: 'NOT STARTED',
  paymentStatus: 'NOT PAID',
  client: {
    name: '',
    socialMediaUrl: ''
  },
  price: 0
});

function submitHandler() {
  if (currentModal.value === 'CREATE') {
    createCommission(currentCommission);
    closeModal();
  }

  if (currentModal.value === 'UPDATE') {
    updateCommission(currentCommission);
    closeModal();
  }
}

function deleteCommission() {
  deleteCommissionById(currentCommissionId.value);
  closeModal();
}

onBeforeUpdate(() => {
  if (currentModal.value === 'CREATE') {
    // Clear form
    currentCommission = {
      artWorkStatus: 'NOT STARTED',
      paymentStatus: 'NOT PAID',
      client: {
        name: '',
        socialMediaUrl: ''
      },
      price: 0
    };
  }

  if (currentModal.value !== 'CREATE') {
    if (!currentCommission.id || currentCommission.id !== currentCommissionId.value) {
      currentCommission = findCommissionById(currentCommissionId.value);
    }
  }
});

</script>

<template>
  <div
    class="
      flex justify-center items-center fixed w-full h-full left-0 top-0
      bg-opacity-80 bg-neutral-800
    "
    v-if="isModalVisible"
  >
    <form
      class="
        flex flex-col px-8 py-6
        rounded-xl border border-neutral-400 bg-neutral-800
        select-none text-xl
      "
      v-on:submit.prevent="submitHandler"
    >
      <div class="flex justify-end mb-6">
        <button
          type="button"
          v-on:click.prevent="closeModal"
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
          name="client-name"
          placeholder="Client name"
          required
          v-model="currentCommission.client.name"
        />
        <input
          class="my-1 p-3 rounded-sm"
          type="url"
          name="client-social-media"
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
        name="commission-description"
        placeholder="Commission description"
        v-model="currentCommission.description"
      />
      <input
        class="my-1 p-3 rounded-sm "
        type="number"
        name="commission-price"
        placeholder="Commission price"
        required
        min="1"
        max="9999999"
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
        v-if="currentModal === 'CREATE'"
        class="
          my-2 p-3 rounded-sm text-white
          bg-violet-700 hover:bg-violet-800 active:bg-violet-900
        "
      >
        New Commission
      </button>

      <div
        v-if="currentModal !== 'CREATE'"
        class="flex items-center justify-between my-2"
      >
        <button
          class="
            p-3 rounded-sm text-white
            bg-violet-700 hover:bg-violet-800 active:bg-violet-900
          "
        >
          Update Commission
        </button>

        <button
          type="button"
          v-on:click.prevent="deleteCommission"
        >
          <img
            src="@/assets/trash-red.svg"
            alt="Delete icon"
            width="32"
            height="32"
          />
        </button>
      </div>
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
