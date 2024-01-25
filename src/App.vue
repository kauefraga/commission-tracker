<script setup lang="ts">
import { RouterView } from 'vue-router'
import Container from './components/Container.vue';
</script>

<template>
  <header class="p-8">
    <img
      src="@/assets/logo.svg"
      alt="Commission Tracker's logo"
      width="60"
      height="60"
    />
  </header>

  <Container>
    <RouterView />
  </Container>

  <footer class="flex justify-center px-2 py-4 md:p-8">
    <p class="select-none">Feito com ❤ por <a class="underline md:no-underline md:hover:underline decoration-violet-700" href="https://github.com/kauefraga" target="_blank">Kauê Fraga Rodrigues</a>.</p>
  </footer>
</template>
