<script setup lang="ts">
import type { Commission } from '@/types/Commission';
import { createCommission } from '@/localstorage/Commission';
import { reactive } from 'vue';

defineProps<{
  emitNewCommission: (commission: Commission) => void
  isVisible: boolean
  changeVisibility: () => boolean
}>();

const commission = reactive<Commission>({
  id: null,
  created_at: null,
  status: 'NONE',
  client: '',
  clientSocialMedia: '',
  price: 0
});

function clearForm() {
  commission.id = null;
  commission.client = '';
  commission.clientSocialMedia = '';
  commission.price = 0;
  commission.created_at = null;
}

function createCommissionAndHideModal(
  emitNewCommission: (commission: Commission) => void,
  changeModalVisibility: () => boolean
) {
  createCommission(commission);
  emitNewCommission({
    id: commission.id,
    client: commission.client,
    clientSocialMedia: commission.clientSocialMedia,
    price: commission.price,
    created_at: commission.created_at
  } as Commission);

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
      v-on:submit.prevent="createCommissionAndHideModal(emitNewCommission, changeVisibility)"
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
      <input
        class="my-1 p-3 rounded-sm"
        type="text"
        placeholder="Client name"
        required
        v-model="commission.client"
      />
      <input
        class="my-1 p-3 rounded-sm"
        type="text"
        placeholder="Client social media"
        required
        v-model="commission.clientSocialMedia"
      />
      <input
        class="my-1 p-3 rounded-sm"
        type="number"
        placeholder="Commission price"
        v-model.number="commission.price"
      />
      <button
        class="
          my-2 p-3 rounded-sm text-white
          bg-violet-700 hover:bg-violet-800 active:bg-violet-900
        "
      >
        Create
      </button>
    </form>
  </div>
</template>
