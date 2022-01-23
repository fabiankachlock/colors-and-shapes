<template>
  <div class="flex flex-row justify-start items-center">
    <p class="mr-4 w-6">{{ amount }}</p>
    <input
      type="range"
      class="rounded-lg overflow-hidden appearance-none h-4 w-128"
      min="2"
      max="72"
      step="2"
      v-model="amount"
    />
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/core/adapters/config';
import { onMounted, ref, watch } from 'vue';

const config = useConfig();
const amount = ref(0);

onMounted(() => {
  amount.value = config.numberOfCards;
});

watch(amount, cardAmount => {
  config.setCardAmount(cardAmount);
});
</script>
