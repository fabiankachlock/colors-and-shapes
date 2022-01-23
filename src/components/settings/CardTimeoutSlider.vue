<template>
  <div class="flex flex-row justify-start items-center">
    <p class="mr-4 w-10">{{ Math.round(timeout / 1000) }} s</p>
    <input
      type="range"
      class="rounded-lg overflow-hidden appearance-none h-4 w-128"
      min="1000"
      max="60000"
      step="1000"
      v-model="timeout"
    />
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/core/adapters/config';
import { onMounted, ref, watch } from 'vue';

const config = useConfig();
const timeout = ref(0);

onMounted(() => {
  timeout.value = config.cardTimeout;
});

watch(timeout, cardTimeout => {
  config.setCardTimeout(cardTimeout);
});
</script>
