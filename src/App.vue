<script setup lang="ts">
import Home from './pages/Home.page.vue';

</script>

<template>
  <div class="app grid grid-rows-[auto,1fr] grid-cols-1 relative">
    <Home/>
  </div>
</template>

<style>

.border {
  border: 1px solid red;
}

.app {
  min-height: 100dvh;
}

.container-section {
  @apply mx-auto max-w-[1150px] w-11/12
}

</style>
