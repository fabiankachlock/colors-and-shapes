<template>
  <div class="scene relative m-1">
    <div class="card w-full h-full" :class="{ 'is-flipped': card.isOpen }">
      <div class="card-face card-back p-4 bg-sky-200 dark:bg-slate-700 cursor-pointer rounded-lg">
        <div class="card-content w-full h-full grid place-items-center" :class="card.getBackDescriptor()">
          <div class="card-inner max-h-full h-full max-w-full"></div>
        </div>
      </div>
      <div class="card-face card-front p-4 bg-sky-200 dark:bg-slate-700 cursor-pointer rounded-lg">
        <div class="w-full h-full grid place-items-center" :class="card.getFrontDescriptor()">
          <p class="card-inner text-xl sm:text-2xl lg:text-4xl">
            {{ order }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DisplayCard } from '@/core/adapters/game/DisplayCard';
import { toRefs } from 'vue';

const props = defineProps<{
  card: DisplayCard<any>;
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
  -moz-backface-visibility: hidden;
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
