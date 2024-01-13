<script setup lang="ts">
import type { ArtWorkStatus } from '@/types/Commission';
import { toRefs } from 'vue';

const props = defineProps<{
  artWorkStatus: ArtWorkStatus
}>();
const { artWorkStatus } = toRefs(props);

const statusColor = {
  'NOT STARTED': 'bg-violet-900',
  'STARTED': 'bg-pink-500',
  'ALMOST DONE': 'bg-yellow-600',
  'DONE': 'bg-lime-600'
};

</script>

<template>
  <p class="flex items-center">
    <span
      class="min-w-6 min-h-6 rounded-full inline-block"
      :class=statusColor[artWorkStatus]
    ></span>
  </p>
</template>
