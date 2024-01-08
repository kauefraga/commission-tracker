<script setup lang="ts">
import { RouterView } from 'vue-router'
import Container from './components/Container.vue';
</script>

<template>
  <header class="m-8">
    <img
      src="./assets/logo.svg"
      alt="Commission Tracker's logo"
      width="60"
      height="60"
    />
  </header>

  <Container>
    <RouterView />
  </Container>
</template>
