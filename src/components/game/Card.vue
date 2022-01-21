<template>
  <div class="relative m-1 p-4 bg-sky-200 dark:bg-slate-700 cursor-pointer">
    <div class="w-full h-full grid place-items-center" :class="ColorMap[card.color]">
      <!-- Content -->
      <div v-if="card.isOpen" :class="ShapeMap[card.shape]" class="max-h-full h-full max-w-full"></div>
      <div v-else>
        <p class="text-4xl">
          {{ order }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DisplayCard, ShapeMap, ColorMap } from '@/core/adapters/game';
import { toRefs } from 'vue';
import '@/styles/cards.css';

const props = defineProps<{
  card: DisplayCard;
  order: number;
}>();

const { card, order } = toRefs(props);
</script>
