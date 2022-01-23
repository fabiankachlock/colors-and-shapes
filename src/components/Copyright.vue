<template>
  <div class="fixed top-1 right-1">
    <p class="text-xs text-gray-500 dark:text-gray-500">
      © Fabian Kachlock {{ new Date().getFullYear() }} (v{{ version }})
    </p>
  </div>
</template>

<script setup lang="ts">
const version = APP_VERSION;
</script>
