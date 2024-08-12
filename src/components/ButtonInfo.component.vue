<template>
  <button class="rounded-xl bg-[#111729]">
    <div class="button-container">
      <p class="text-[#4A5567] px-5 py-1.5 tracking-tight">{{ title }}</p>
      <span class="text-[#CDD5E0] px-5 py-1.5">{{ data }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{ title: string, data: string | null }>();

</script>

<style scoped>

.button-container {
  @apply flex flex-row divide-x-2 divide-[#4A5567] items-center py-2.5 font-medium text-lg
}

</style>