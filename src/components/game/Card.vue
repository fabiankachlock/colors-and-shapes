<template>
  <div class="relative m-1 p-4 bg-sky-200 dark:bg-slate-700">
    <div class="w-full h-full grid place-items-center" :class="ColorMap[card.color]">
      <!-- Content -->
      <div :class="ShapeMap[card.shape]" class="h-full"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DisplayCard, ShapeMap, ColorMap } from '@/core/adapters/game';
import { toRefs } from 'vue';
import '@/styles/cards.css';

const props = defineProps<{
  card: DisplayCard;
}>();

const { card } = toRefs(props);
</script>
