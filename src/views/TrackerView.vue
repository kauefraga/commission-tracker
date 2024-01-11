<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommissionStore } from '@/stores/CommissionStore';
import NewCommissionModal from '@/components/NewCommissionModal.vue';
import CommissionList from '@/components/CommissionList.vue';

const isNewCommissionModalVisible = ref(false);
const changeNewCommissionModalVisibility = () => isNewCommissionModalVisible.value = !isNewCommissionModalVisible.value;

const store = useCommissionStore();
const { income } = storeToRefs(store);
const { recoverLocalStorageCommissions } = store;

onMounted(() => {
  recoverLocalStorageCommissions();
});

</script>

<template>
  <button
    class="
      text-white bg-violet-700 hover:bg-violet-800 active:bg-violet-900
      text-xl rounded-lg px-12 py-4 shadow-lg
    "
    v-on:click="isNewCommissionModalVisible = !isNewCommissionModalVisible"
  >
    New Commission
  </button>

  <CommissionList />
  <p
    class="text-lg"
    id="total-price"
  >
    Income (R$): {{ income.toFixed(2) }}
  </p>

  <NewCommissionModal
    :is-visible="isNewCommissionModalVisible"
    :change-visibility="changeNewCommissionModalVisibility"
  />
</template>
