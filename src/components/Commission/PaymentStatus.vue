<script setup lang="ts">
import type { PaymentStatus } from '@/types/Commission';
import { toRefs } from 'vue';

const props = defineProps<{
  paymentStatus: PaymentStatus
}>();
const { paymentStatus } = toRefs(props);

const paymentSign = {
  'NOT PAID': '$',
  'HALF PAID': '$$',
  'PAID': '$$$',
};

</script>

<template>
  <p
    class="font-bold text-xl text-lime-600 saturate-50"
  >
    {{ paymentSign[paymentStatus] }}
  </p>
</template>
