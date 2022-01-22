<template>
  <div class="scene relative m-1">
    <div class="card w-full h-full" :class="{ 'is-flipped': card.isOpen }">
      <div class="card-face card-back p-4 bg-sky-200 dark:bg-slate-700 cursor-pointer rounded-lg">
        <div class="w-full h-full grid place-items-center" :class="ColorMap[card.color]">
          <div :class="ShapeMap[card.shape]" class="max-h-full h-full max-w-full"></div>
        </div>
      </div>
      <div class="card-face card-front p-4 bg-sky-200 dark:bg-slate-700 cursor-pointer rounded-lg">
        <div class="w-full h-full grid place-items-center" :class="ColorMap[card.color]">
          <div>
            <p class="text-4xl">
              {{ order }}
            </p>
          </div>
        </div>
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

<style>
.scene {
  perspective: 600px;
}

.card {
  transition: transform 1s;
  transform-style: preserve-3d;
}

.card-face {
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}

.card.is-flipped {
  transform: rotateY(180deg);
}
</style>
