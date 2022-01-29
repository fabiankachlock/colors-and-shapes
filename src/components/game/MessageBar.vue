<template>
  <div class="h-full flex items-center mx-2">
    <p class="text-xl w-full text-center">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const message = ref<string>('Passt nicht');
</script>
