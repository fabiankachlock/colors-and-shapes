<template>
  <div class="flex flex-row justify-start items-center">
    <p class="mr-4 w-6">{{ amount }}</p>
    <input
      type="range"
      class="rounded-lg overflow-hidden appearance-none bg-lime-300 dark:bg-green-300 h-4 w-128"
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

<style>
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type='range']::-webkit-slider-thumb {
    width: 15px;
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    cursor: ew-resize;
    background: #1f2937; /* gray-800 */
    box-shadow: -405px 0 0 400px #84cc16; /* lime-500 */
    border-radius: 50%;
  }
  .dark input[type='range']::-webkit-slider-thumb {
    width: 15px;
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    cursor: ew-resize;
    background: #e5e7eb; /* gray-200 */
    box-shadow: -405px 0 0 400px #16a34a; /* green-600 */
    border-radius: 50%;
  }
}
</style>
