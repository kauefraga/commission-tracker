<script setup lang="ts">
import type { Commission } from '@/types/Commission';

defineProps<{
  commissions: Commission[]
}>();
</script>

<template>
  <ul
    id="commission-list"
    class="my-6"
  >
    <li
      class="
        flex justify-between bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400
        text-lg rounded-lg px-12 py-4 m-2
      "
      v-for="commission in commissions"
      v-bind:key="commission.client"
    >
      <p class="p-1">{{ commission.client }}</p>
      <p class="p-1">Price (R$): {{ commission.price }}</p>
    </li>
  </ul>
</template>
