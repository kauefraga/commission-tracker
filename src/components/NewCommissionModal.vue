<script setup lang="ts">
import type { Commission } from '@/types/Commission';
import { createCommission } from '@/localstorage/Commission';
import { useCommissionStore } from '@/stores/CommissionStore';
import { reactive } from 'vue';

defineProps<{
  isVisible: boolean
  changeVisibility: () => boolean
}>();

const store = useCommissionStore();
const currentCommission = reactive<Commission>({
  id: null,
  created_at: null,
  status: 'NONE',
  client: '',
  clientSocialMedia: '',
  price: 0
});

function clearForm() {
  currentCommission.id = null;
  currentCommission.client = '';
  currentCommission.clientSocialMedia = '';
  currentCommission.price = 0;
  currentCommission.created_at = null;
}

function createCommissionAndHideModal(changeModalVisibility: () => boolean) {
  store.income += currentCommission.price;
  store.commissions.push({ ...currentCommission });
  createCommission(currentCommission);

  changeModalVisibility();
  clearForm();
}

</script>

<template>
  <div
    class="
      flex justify-center items-center fixed w-full h-full left-0 top-0
      bg-opacity-80 bg-neutral-800
    "
    v-if="isVisible"
  >
    <form
      class="
        flex flex-col px-8 py-6
        rounded-xl border border-neutral-400 bg-neutral-800
        select-none text-xl
      "
      v-on:submit.prevent="createCommissionAndHideModal(changeVisibility)"
    >
      <div class="flex justify-end mb-6">
        <button
          v-on:click.prevent="changeVisibility"
        >
          <img
            src="../assets/close.svg"
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
          v-model="currentCommission.client"
        />
        <input
          class="my-1 p-3 rounded-sm"
          type="text"
          placeholder="Client social media"
          required
          v-model="currentCommission.clientSocialMedia"
        />
      </div>
      <input
        class="my-1 p-3 rounded-sm "
        type="number"
        placeholder="Commission price"
        required
        min="0"
        v-model.number="currentCommission.price"
      />
      <select
        class="my-1 p-3 rounded-sm"
        name="status"
        v-model="currentCommission.status"
      >
        <option>NONE</option>
        <option>STARTED</option>
        <option>ALMOST DONE</option>
        <option>DONE</option>
      </select>

      <button
        class="
          my-2 p-3 rounded-sm text-white
          bg-violet-700 hover:bg-violet-800 active:bg-violet-900
        "
      >
        New Commission
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
